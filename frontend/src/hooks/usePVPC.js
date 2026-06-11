import { useState, useCallback } from 'react';
import { computeStats } from '../utils/priceUtils';

// =========================
// Zonas eléctricas
// =========================
const ZONE_GEO_IDS = {
  PCB: 8741,
  BAL: 8743,
  CYM: 8745,
};

// =========================
// Mock data (fallback)
// =========================
function generateMockData() {
  const d = {};

  for (let i = 0; i < 24; i++) {
    const h = i.toString().padStart(2, '0');
    const h2 = ((i + 1) % 24).toString().padStart(2, '0');
    const key = `${h}-${h2}`;

    const t = (i - 13) * Math.PI / 12;
    const p = Math.max(0.04, 0.135 + 0.065 * Math.sin(t) + 0.015 * (Math.random() - 0.5));

    d[key] = {
      price: p,
      'is-cheap': p < 0.09,
      'is-under-avg': p < 0.135,
      hour: key,
    };
  }

  return d;
}

// =========================
// EXTRACCIÓN ROBUSTA API
// =========================
function extractPVPCValues(json) {
  if (!json?.included || !Array.isArray(json.included)) return [];

  const source = json.included.find(
    item => Array.isArray(item?.attributes?.values)
  );

  return source?.attributes?.values ?? [];
}

// =========================
// CACHE HELPERS
// =========================
function getCacheKey(zone) {
  return `pvpc_cache_${zone}_v1`;
}

function getCache(zone) {
  try {
    const key = getCacheKey(zone);
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const parsed = JSON.parse(cached);
    const CACHE_TIME = 1000 * 60 * 60 * 24; // 24 horas (recomendado)

    if (Date.now() - parsed.timestamp > CACHE_TIME) {
      localStorage.removeItem(key); // limpiar cache expirado
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
}

function setCache(zone, data) {
  try {
    const key = getCacheKey(zone);
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now()
      })
    );
  } catch (e) {
    console.warn('No se pudo guardar cache', e);
  }
}

// =========================
// HOOK PRINCIPAL
// =========================
export function usePVPC() {
  const [data, setData] = useState({});
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [error, setError] = useState(null);

  const fetchZone = useCallback(async (zone) => {
    setLoading(true);
    setError(null);

    try {
      // 1. CACHE FIRST
      const cached = getCache(zone);
      if (cached) {
        setData(cached);
        setStats(computeStats(cached));
        setIsDemo(false);
        setLoading(false);
        return;
      }

      // 2. API CALL
      const hoy = new Date().toISOString().slice(0, 10);
      const geoId = ZONE_GEO_IDS[zone] || ZONE_GEO_IDS.PCB;

      const url = `https://api.esios.ree.es/indicators/10229?start_date=${hoy}T00:00&end_date=${hoy}T23:59&time_trunc=hour&geo_ids=${geoId}`;

      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          // 'Authorization': `Token token=${import.meta.env.VITE_REE_TOKEN}`
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();
      // 👀 ESPÍA 1: Aquí ves el JSON gigante y "sucio" tal cual sale del servidor del gobierno
      console.log('--- JSON CRUDO DEL GOBIERNO ---', json);

      const pvpcData = extractPVPCValues(json)
        .filter(item => item?.datetime && typeof item.value === 'number');
         console.log('--- NUMBER-', json);

      if (!pvpcData.length) {
        throw new Error('Sin datos válidos de la API');
      }

      // Calcular promedio del día
      const totalSum = pvpcData.reduce((sum, item) => sum + item.value / 1000, 0);
      const dayAverage = totalSum / pvpcData.length;

      // Transformar datos
      const transformedData = {};

      pvpcData.forEach(item => {
        const date = new Date(item.datetime);
        if (Number.isNaN(date.getTime())) return;

        const h1 = String(date.getHours()).padStart(2, '0');
        const h2 = String((date.getHours() + 1) % 24).padStart(2, '0');
        const key = `${h1}-${h2}`;

        const price = item.value / 1000;

        transformedData[key] = {
          price,
          'is-cheap': price < dayAverage * 0.85,
          'is-under-avg': price < dayAverage,
          hour: key,
        };
      });

      // 3. GUARDAR CACHE
      setCache(zone, transformedData);
      // 👀 ESPÍA 2: Aquí ves tus datos ya filtrados, limpios y "masticados" en tu diccionario bonito
      console.log('--- MI DATA LIMPIA Y MASTICADA ---', transformedData);

      setData(transformedData);
      setStats(computeStats(transformedData));
      setIsDemo(false);

    } catch (err) {
      console.error('Error fetching PVPC:', err);

      const mock = generateMockData();
      setData(mock);
      setStats(computeStats(mock));
      setIsDemo(true);
      setError(err.message);

    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    stats,
    loading,
    isDemo,
    error,
    fetchZone
  };
}





//1. map
//array.map(x => x * 2)
//👉 “transforma cada elemento”

//En Django sería:
//[n * 2 for n in lista]

//👉 “sumar todo”
//2. reduce
//array.reduce((acc, curr) => acc + curr, 0)

//Equivalente Django:
//sum(lista)
//Significado real:
//acc = acumulador (lo que llevas sumado)
//curr = valor actual
//👉 “ordenar”
//3. sort(a, b)
//array.sort((a, b) => a.price - b.price)
//Equivalente Django:
//order_by("price")