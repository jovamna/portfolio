import { useState, useEffect } from 'react';
import {
  ingredienteVacio, pasoVacio, calcularCosteTotal,
  TEMPERATURAS,
} from '../../utils/hosteleria/ficha-tecnica/fichaUtils';
import FullWidthLayout from "../../hocs/FullWidthLayout";


import { generarPDF } from '../../utils/hosteleria/ficha-tecnica/pdfGenerator';

import PlatoHeader        from './components/PlatoHeader';
import IngredientesTable  from './components/IngredientesTable';
import AlergenosSelector  from './components/AlergenosSelector';
import PreparacionSteps   from './components/PreparacionSteps';
import EmplatadoSection   from './components/EmplatadoSection';
import RentabilidadPanel  from './components/RentabilidadPanel';



// ─── SEO ──────────────────────────────────────────────────────────────────────
function useSEO() {
  useEffect(() => {
    // 1. Título de la página (¡Excelente elección de palabras clave!)
    document.title = 'Ficha Técnica de Plato Gratis — Genera PDF para tu Restaurante';

    // Helper para gestionar las etiquetas meta
    const setMeta = (attr, val, content) => {
      let tag = document.querySelector(`meta[${attr}="${val}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, val);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('name', 'description',
      'Crea fichas técnicas de cocina profesionales gratis. Ingredientes, alérgenos, ' +
      'preparación y emplatado. Descarga en PDF listo para tu restaurante.'
    );
    setMeta('name', 'keywords',
      'ficha tecnica plato, ficha tecnica cocina pdf, plantilla ficha tecnica restaurante, ' +
      'alergenos carta restaurante, escandallo ficha tecnica'
    );

    // ─── 🔗 AÑADIR LA ETIQUETA CANONICAL ──────────────────────────────────────
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    // Pon aquí la URL real definitiva de donde estará alojada tu app
    canonicalTag.setAttribute('href', 'https://jovamnamedina.com/hosteleria-ficha-tecnica');


    // ─── 📊 JSON-LD SCHEMA ORG (¡Puntazo extra para Google!) ──────────────────
    let ld = document.querySelector('script[data-schema="ficha-tecnica-app"]');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.setAttribute('data-schema', 'ficha-tecnica-app');
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Generador de Fichas Técnicas de Cocina',
      description: 'Herramienta gratuita para crear fichas técnicas de platos con ingredientes, alérgenos y emplatado, descargables en PDF.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    });
  }, []);
}





// ─── Estado inicial ─────────────────────────────────────────────────────────────
const initialState = () => ({
  nombrePlato: '',
  tiempoElaboracion: '',
  temperatura: 'caliente',
  ingredientes: [ingredienteVacio()],
  alergenos: [],
  pasos: [pasoVacio()],
  emplatado: { descripcion: '', imagen: null, imagenNombre: null },
  pvp: '',
});

export default function FichaTecnica() {
  useSEO();
  const [ficha, setFicha] = useState(initialState());

  const costeTotal = calcularCosteTotal(ficha.ingredientes);

  const handleDescargarPDF = () => {
    if (!ficha.nombrePlato.trim()) {
      alert('Ponle un nombre al plato antes de descargar la ficha.');
      return;
    }
    const temperaturaLabel = TEMPERATURAS.find((t) => t.value === ficha.temperatura)?.label;
    generarPDF({ ...ficha, temperaturaLabel });
  };

  const handleReset = () => {
    if (confirm('¿Empezar una ficha nueva? Se perderán los datos actuales.')) {
      setFicha(initialState());
    }
  };

  return (
      <FullWidthLayout>
    <main className="min-h-screen bg-gray-50/50 py-8 lg:pt-[90px] pt-[80px] px-4 sm:px-6 lg:px-8">
      {/* Header de la página */}
      <header className="max-w-4xl mx-auto text-center lg:mb-4 mb-2">
        <h1 className="lg:text-3xl sm:text-4xl text-lg font-extrabold text-black tracking-tight mb-2">
          Ficha Técnica de Plato
        </h1>
        <p className="text-xs sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Crea la ficha técnica de tu receta gratis y descárgala en PDF — ingredientes,
          alérgenos, preparación y emplatado
        </p>
      </header>

      {/* Contenedor del Formulario */}
      <div className="max-w-4xl mx-auto space-y-6">
        <PlatoHeader
          values={ficha}
          onChange={(v) => setFicha({ ...ficha, ...v })}
        />

        <IngredientesTable
          ingredientes={ficha.ingredientes}
          onChange={(ingredientes) => setFicha({ ...ficha, ingredientes })}
        />

        <RentabilidadPanel
          costeTotal={costeTotal}
          pvp={ficha.pvp}
          onPvpChange={(pvp) => setFicha({ ...ficha, pvp })}
        />

        <AlergenosSelector
          selected={ficha.alergenos}
          onChange={(alergenos) => setFicha({ ...ficha, alergenos })}
        />

        <PreparacionSteps
          pasos={ficha.pasos}
          onChange={(pasos) => setFicha({ ...ficha, pasos })}
        />

        <EmplatadoSection
          values={ficha.emplatado}
          onChange={(emplatado) => setFicha({ ...ficha, emplatado })}
        />

        {/* Acciones del Formulario */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button 
            type="button" 
            onClick={handleReset} 
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
          >
            Empezar de nuevo
          </button>
          <button 
            type="button" 
            onClick={handleDescargarPDF} 
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all text-center"
          >
            📄 Descargar ficha en PDF
          </button>
        </div>
      </div>

      {/* Footer legal/informativo */}
      <footer className="max-w-4xl mx-auto text-center mt-12 pt-6 border-t border-gray-200/60 text-xs text-gray-400 leading-relaxed">
        Hecho por{' '}
        <a href="/" rel="author" className="font-medium text-gray-500 hover:text-blue-600 transition-colors">
          Jovamna Medina
        </a>{' '}
        · La imagen y los datos no se envían a ningún servidor, todo ocurre en tu navegador
      </footer>
    </main>

    </FullWidthLayout>


  );

  
}