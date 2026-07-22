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
    // URL definitiva de la App
    const canonicalUrl = 'https://jovamnamedina.com/hosteleria-ficha-tecnica';

    // 1. Título de la página (Abarca platos de restaurante y recetas de coctelería/bar)
    document.title = 'Ficha Técnica de Cocina y Cócteles Gratis — Generador PDF';

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

    // 2. Meta Descripción & Keywords (Atracción para Chefs y Head Bartenders)
    setMeta('name', 'description',
      'Crea fichas técnicas de cocina y coctelería profesionales gratis. Estandariza recetas, ' +
      'ingredientes, alérgenos y emplatado/presentación. Descarga en PDF para tu restaurante o bar.'
    );
    setMeta('name', 'keywords',
      'ficha tecnica plato, ficha tecnica coctel, receta estandar bar, ficha tecnica cocina pdf, ' +
      'plantilla ficha tecnica restaurante, alergenos carta restaurante, recetario de barra'
    );

    // 3. Open Graph (Redes Sociales)
    setMeta('property', 'og:title',       'Generador de Fichas Técnicas de Cocina y Bar Gratis (PDF)');
    setMeta('property', 'og:type',        'website');
    setMeta('property', 'og:url',         canonicalUrl);
    setMeta('property', 'og:image',       'https://jovamnamedina.com/custom-static/images/facebookweb.jpg');
    setMeta('property', 'og:description', 'Crea y estandariza fichas técnicas profesionales para platos y cócteles gratis. Control de alérgenos y exportación a PDF.');

    // 4. Twitter Cards
    setMeta('name', 'twitter:card',        'summary_large_image');
    setMeta('name', 'twitter:title',       'Ficha Técnica de Platos y Cócteles | Jovamna Medina');
    setMeta('name', 'twitter:description', 'Herramienta para crear fichas técnicas de cocina y barra en PDF. Estandariza tu carta.');
    setMeta('name', 'twitter:image',       'https://jovamnamedina.com/custom-static/images/facebookweb.jpg');

    // 5. Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Schema.org (WebApplication para Cocina y Bar)
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
      name: 'Generador de Fichas Técnicas de Cocina y Bar',
      description: 'Herramienta gratuita para crear fichas técnicas de platos y cócteles con ingredientes, alérgenos, pasos y presentación, descargables en PDF.',
      url: canonicalUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      author: {
        '@type': 'Person',
        name: 'Jovamna Medina',
        url: 'https://jovamnamedina.com/'
      },
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
      <header className="max-w-4xl mx-auto text-center mb-4 md:mb-4 lg:mb-4 px-4">
        <h1 className="text-base lg:text-3xl sm:text-4xl  font-extrabold text-black tracking-tight mb-2">
         Ficha Técnica Gratuita para Hosteleria
        </h1>
        <p className="text-xs sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
          

          Crea la ficha técnica de tu receta gratis y descárgala en PDF
        </p>
    




         <div className="lg:my-6  bg-amber-50 p-6 rounded-xl border border-mauve-800">
         <h3 className="text-sm lg:text-xl font-bold text-neutral-800 mb-2">
        📄 ¿Por qué necesitas fichas técnicas en tu cocina o barra?
        </h3>
         <ul className="space-y-2 text-neutral-700">
         <li className='text-sm'>🍳 <strong>Estandariza tus recetas:</strong> Mantén el mismo sabor y presentación, cocine quien cocine o prepare quien prepare la copa.</li>
         <li className='text-sm'>🚀 <strong>Evita pérdidas por descontrol:</strong> Registra gramajes, ingredientes y mermas exactas en cada elaboración.</li>
       <li className='text-sm'>⚠️ <strong>Control de alérgenos:</strong> Cumple con la normativa sanitaria y protege la salud de tus clientes.</li>
       </ul>
       </div>

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