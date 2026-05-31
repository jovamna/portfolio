import { useEffect, useState } from 'react';
import { useNearbyPlaces } from '../../hooks/useNearbyPlaces';
import PlaceSelector from '../../components/pueblo/PlaceSelector';
import PlaceCards from '../../components/pueblo/PlaceCards';
import FullWidthLayout from "../../hocs/FullWidthLayout";


export default function PuebloDashboard() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const { places, userLocation, loading, loadNearbyPlaces } = useNearbyPlaces();

  // 1. Carga inicial: Busca los locales más cercanos la primera vez que se monta la app
  useEffect(() => {
    loadNearbyPlaces(categoriaActiva);
  }, [categoriaActiva, loadNearbyPlaces]);

  // 2. SEO Dinámico nativo optimizado para buscadores
  useEffect(() => {
    document.title = "Guía Inteligente del Pueblo | Sitios Cerca de Ti";

    const canonicalUrl = "https://jovamnamedina.com/guia-mollet"; 
    
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.rel = 'canonical';
        document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = canonicalUrl;

    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Descubre los mejores hoteles, restaurantes y cafeterías de nuestro pueblo. Filtra por categoría y calcula la distancia exacta desde tu ubicación en tiempo real.');
  }, []);
 // <span>🌲</span> 





 
  return (
        <FullWidthLayout>

    <div className="w-full min-h-screen 
    bg-gray-50/50 text-gray-800 
    pt-[140px] pb-[60px] flex justify-center">

      <main className="w-full max-w-7xl px-4 md:px-8 flex flex-col gap-6">
        
        {/* Bloque Superior: Cabecera e Instrucciones */}
        <div className="w-full  bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col ">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center ">
            <div>
              <h1 className="kaushan tracking-wider 
              lg:text-5xl  text-2xl font-black text-gray-900  
              lg:py-4 flex items-center gap-2 underline underline-offset-8">
              Guía Local Inteligente
              </h1>
              <p className="text-xs font-semibold text-gray-800 mt-1 uppercase">
                Explora los rincones más cercanos a ti en tiempo real
              </p>
            </div>
            
            {/* Botón interactivo de refresco de GPS */}
            <button
              onClick={() => loadNearbyPlaces(categoriaActiva)}
              disabled={loading}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-xs rounded-xl transition-all border border-blue-100 flex items-center gap-2 disabled:opacity-50"
            >
              <span>🔄</span> {loading ? 'Actualizando GPS...' : 'Actualizar mi Ubicación'}
            </button>
          </div>

          <hr className="border-gray-100" />

          {/* Selector de Categorías Modular */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/**BOTONES */}
            <PlaceSelector 
              active={categoriaActiva} 
              onChange={setCategoriaActiva} 
              disabled={loading} 
            />
            
            {/* Estado del GPS */}
            {userLocation && (
              <span className="text-[11px] font-bold px-2.5 py-1 bg-green-50 text-green-700 rounded-lg border border-green-100">
                🛰️ GPS Conectado
              </span>
            )}
          </div>
        </div>

        {/* Estado de carga principal */}
        {loading && places.length === 0 ? (
          <div className="w-full p-16 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm gap-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-gray-400">Calculando distancias geográficas desde tu posición...</p>
          </div>
        ) : (
          /* Renderizado de la Cuadrícula de Tarjetas Modulares */
          <PlaceCards places={places} />
        )}

        {/* Pie de página profesional */}
        <footer className="text-center text-[11px] font-medium text-gray-500 mt-6 py-4 border-t border-gray-100">
          Guía turística de proximidad · Datos locales securizados en entorno Frontend · Desarrollado de forma modular con React


          {/* Al final de tu página de Mollet, justo antes de cerrar el contenedor principal */}
         <div className="mt-2 border-t border-gray-100 pt-4 text-center">
          <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
           Nota: Este es un proyecto demostrativo con fines educativos para mi portfolio de desarrollo. 
           Las imágenes y nombres comerciales pertenecen a sus respectivos propietarios y han sido 
            utilizados exclusivamente para recrear un entorno de uso real en el municipio de Mollet del Vallès.
           </p>
           </div>


        </footer>

      </main>



    </div>

    </FullWidthLayout>
  );
}
