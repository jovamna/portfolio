import { useState, useCallback } from 'react';
import { computeStats } from '../utils/priceUtils';

// Mapas de ID geográficos según la documentación de REE
const ZONE_GEO_IDS = {
  PCB: 8741, // Península (Sistema Eléctrico Peninsular)
  BAL: 8743, // Baleares
  CYM: 8745, // Canarias (Usamos Canarias como principal para CYM)
};

// ─── Mock data generator (used when the API is unreachable) ───────────────────
function generateMockData() {
  const d = {};
  for (let i = 0; i < 24; i++) {
    const h   = i.toString().padStart(2, '0');
    const h2  = ((i + 1) % 24).toString().padStart(2, '0');
    const key = `${h}-${h2}`;
    const t = (i - 13) * Math.PI / 12;
    const p = Math.max(0.04, 0.135 + 0.065 * Math.sin(t) + 0.015 * (Math.random() - 0.5));
    d[key] = {
      price:          p,
      'is-cheap':     p < 0.09,
      'is-under-avg': p < 0.135,
      hour:           key,
    };
  }
  return d;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function usePVPC() {
  const [data,    setData]    = useState({});
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDemo,  setIsDemo]  = useState(false);
  const [error,   setError]   = useState(null);

  /**
   * Fetches all 24h prices for the given zone code from the official REE API.
   * Transforms the data to maintain compatibility with the legacy components.
   */
  const fetchZone = useCallback(async (zone) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Obtener la fecha de hoy en formato local (YYYY-MM-DD)
      const hoy = new Date().toLocaleDateString('sv-SE'); 
      
      // 2. Identificar el geo_id de la zona correspondiente (Península por defecto)
      const geoId = ZONE_GEO_IDS[zone] || 8741;

      // 3. Construir la URL oficial de REData
      const url = `https://ree.es{hoy}T00:00&end_date=${hoy}T23:59&time_trunc=hour&geo_ids=${geoId}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      
      // 4. Extraer el array de valores horarios (PVPC)
      // Buscamos dentro de 'included' la serie de datos que contiene los precios
      const pvpcData = json.included?.find(item => item.id === "1001" || item.type === "Precio voluntario pequeño consumidor")?.attributes?.values;
      
      if (!pvpcData || pvpcData.length === 0) {
        throw new Error("No se encontraron datos de PVPC para el día de hoy.");
      }

      // 5. Calcular la media del día para recrear las propiedades 'is-cheap' e 'is-under-avg'
      const totalSum = pvpcData.reduce((acc, curr) => acc + (curr.value / 1000), 0);
      const dayAverage = totalSum / pvpcData.length;

      // 6. Transformar el formato de REE al formato que tu App espera de la API vieja
      const transformedData = {};
      
      pvpcData.forEach((item) => {
        const dateObj = new Date(item.datetime);
        const hourNum = dateObj.getHours();
        
        // Recrear la clave "00-01", "01-02", etc.
        const h1 = hourNum.toString().padStart(2, '0');
        const h2 = ((hourNum + 1) % 24).toString().padStart(2, '0');
        const key = `${h1}-${h2}`;
        
        // Conversión de €/MWh de la API oficial a €/kWh
        const priceKWh = item.value / 1000; 

        transformedData[key] = {
          price:          priceKWh,
          'is-cheap':     priceKWh < (dayAverage * 0.85), // Recreación lógica: un 15% más barato que la media
          'is-under-avg': priceKWh < dayAverage,
          hour:           key,
        };
      });

      setData(transformedData);
      setStats(computeStats(transformedData));
      setIsDemo(false);
    } catch (err) {
      // Si la API oficial falla o no hay internet, recurre a tus Mock Data para no congelar la app
      console.error("Error cargando API de REE, usando Mock Data:", err);
      const mock = generateMockData();
      setData(mock);
      setStats(computeStats(mock));
      setIsDemo(true);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, stats, loading, isDemo, error, fetchZone };
}
