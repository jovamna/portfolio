import { useEffect, useState } from 'react';
import { usePVPC }      from '../../hooks/usePVPC';
import ZoneSelector     from '../../components/luz/ZoneSelector';
import MetricCards      from '../../components/luz/MetricCards';
import PriceChart       from '../../components/luz/PriceChart';
import BestHours        from '../../components/luz/BestHours';
import Calculator       from '../../components/luz/Calculator';
import FullWidthLayout from "../../hocs/FullWidthLayout";

const REFRESH_EVERY_MS = 60 * 60 * 1000; // refrescar cada hora

export default function Luz() {
  const [zone, setZone]   = useState('PCB');
  const { data, stats, loading, isDemo, fetchZone } = usePVPC();

  // Carga inicial y cambios de zona
  useEffect(() => {
    fetchZone(zone);
  }, [zone, fetchZone]);

  // Auto-refresco por hora para mantener precios vigentes
  useEffect(() => {
    const id = setInterval(() => fetchZone(zone), REFRESH_EVERY_MS);
    return () => clearInterval(id);
  }, [zone, fetchZone]);

  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const hasData = Object.keys(data).length > 0;



// Efecto para actualizar el SEO de forma nativa sin librerías
useEffect(() => {
  // 1. Cambiar el título de la pestaña
  document.title = "Precio de la Luz Hoy por Horas | Panel de Control";

  const canonicalUrl = "https://jovamnamedina.com/tarifa-luz"; 
  
    // === CANONICAL (Importante para evitar duplicados) ===
  let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.rel = 'canonical';
        document.head.appendChild(canonicalTag);
  }
  canonicalTag.href = canonicalUrl;



  // 2. Buscar o crear la etiqueta meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', 'Consulta el precio de la luz hoy en España en tiempo real. Gráficos interactivos, mejores horas y calculadora de consumo.');

  // 3. Buscar o crear la etiqueta Open Graph para redes sociales (LinkedIn, WhatsApp)
  let metaOGTitle = document.querySelector('meta[property="og:title"]');
  if (!metaOGTitle) {
    metaOGTitle = document.createElement('meta');
    metaOGTitle.setAttribute('property', 'og:title');
    document.head.appendChild(metaOGTitle);
  }
  metaOGTitle.setAttribute('content', 'Precio de la Luz Hoy por Horas | React App');

}, []); // Se ejecuta solo una vez cuando se monta la página de la luz








  return (
    <FullWidthLayout>
      <div className="w-full min-h-screen bg-gray-50/50 text-gray-800 pt-[80px] pb-[60px] md:pt-[100px] flex justify-center">
        <main className="w-full max-w-5xl px-4 md:px-8 flex flex-col gap-6">
          
          {/* Header Card */}
          <div className="w-full p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Precio de la luz hoy</h1>
              <p className="text-sm font-medium text-gray-400 capitalize mt-0.5">{today}</p>
            </div>
            <ZoneSelector active={zone} onChange={setZone} disabled={loading} />
          </div>

          {/* Demo notice */}
          {isDemo && (
            <div className="w-full p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 flex items-center gap-2" role="alert">
              <span>ℹ️</span> 
              <span>
                Datos de ejemplo — la API real está disponible en{' '}
                <a href="https://api.preciodelaluz.org" target="_blank" rel="noreferrer" className="font-semibold underline hover:text-amber-900">
                  api.preciodelaluz.org
                </a>
              </span>
            </div>
          )}

          {/* Loading state */}
          {loading && !hasData && (
            <div className="w-full p-12 flex justify-center items-center bg-white rounded-xl border border-gray-100 shadow-sm">
              <p className="text-sm font-medium text-gray-400 animate-pulse">Cargando precios del mercado eléctrico…</p>
            </div>
          )}

          {/* Dashboard Content */}
          {hasData && (
            <div className="flex flex-col gap-6">
              <MetricCards stats={stats} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2 w-full">
                  <PriceChart data={data} currentKey={stats?.currentKey} />
                </div>
                <div className="w-full flex flex-col gap-6">
                  <BestHours data={data} />
                  <Calculator stats={stats} />
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="text-center text-[11px] font-medium text-gray-400 mt-4 py-4 border-t border-gray-100">
            Datos PVPC ·{' '}
            <a href="https://api.preciodelaluz.org" target="_blank" rel="noreferrer" className="hover:text-gray-600 underline">
              api.preciodelaluz.org
            </a>{' '}
            · Red Eléctrica de España · Precio de mercado sin impuestos
          </footer>

        </main>
      </div>
    </FullWidthLayout>
  );
}