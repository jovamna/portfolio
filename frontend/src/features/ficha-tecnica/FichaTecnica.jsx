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
    const canonicalUrl = 'https://jovamnamedina.com/hosteleria-ficha-tecnica';

    // 1. Title Optimizado
    //document.title = 'Ficha Técnica de Cocina y Cócteles Online Gratis | PDF';
    
    // 1. Título de la página (Abarca platos de restaurante y recetas de coctelería/bar)
    document.title = 'App de Ficha Técnica Online Gratis — Sin Registro | PDF';


    // Array para rastrear elementos creados por nosotros y limpiarlos al desmontar
    const createdElements = [];

    const setMeta = (attr, val, content) => {
      let tag = document.querySelector(`meta[${attr}="${val}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, val);
        document.head.appendChild(tag);
        createdElements.push(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Meta Descripción
    setMeta('name', 'description',
      'Crea tu ficha técnica de cocina o coctelería online, sin registrarte y sin descargar ninguna app. ' +
      'Añade ingredientes, alérgenos, elaboración y descarga en PDF al instante. 100% gratis.'
    );

    // 3. Open Graph
    setMeta('property', 'og:title',       'App Ficha Técnica de Cocina y Cócteles Gratis (PDF)');
    setMeta('property', 'og:type',        'website');
    setMeta('property', 'og:url',         canonicalUrl);
    setMeta('property', 'og:image',       'https://jovamnamedina.com/custom-static/images/facebookweb.jpg');
    setMeta('property', 'og:description', 'Crea y estandariza fichas técnicas profesionales para platos y cócteles gratis. Control de alérgenos y exportación a PDF.');

    // 4. Twitter Cards
    setMeta('name', 'twitter:card',        'summary_large_image');
    setMeta('name', 'twitter:title',       'App Ficha Técnica de Platos y Cócteles | Jovamna Medina');
    setMeta('name', 'twitter:description', 'Herramienta para crear fichas técnicas de cocina y barra en PDF. Estandariza tu carta.');
    setMeta('name', 'twitter:image',       'https://jovamnamedina.com/custom-static/images/facebookweb.jpg');

    // 5. Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
      createdElements.push(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // 6. Schema JSON-LD WebApplication
    let ld = document.querySelector('script[data-schema="ficha-tecnica-app"]');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.setAttribute('data-schema', 'ficha-tecnica-app');
      document.head.appendChild(ld);
      createdElements.push(ld);
    }
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Generador de Fichas Técnicas de Cocina y Bar',
      description: 'Herramienta gratuita para crear fichas técnicas de platos y cócteles con ingredientes, alérgenos y pasos, descargables en PDF.',
      url: canonicalUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      author: {
        '@type': 'Person',
        name: 'Jovamna Medina',
        url: 'https://jovamnamedina.com/'
      },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
    });

    // 7. Schema JSON-LD FAQPage
    let ldFaq = document.querySelector('script[data-schema="ficha-tecnica-faq"]');
    if (!ldFaq) {
      ldFaq = document.createElement('script');
      ldFaq.type = 'application/ld+json';
      ldFaq.setAttribute('data-schema', 'ficha-tecnica-faq');
      document.head.appendChild(ldFaq);
      createdElements.push(ldFaq);
    }
    ldFaq.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Necesito registrarme para usar esta ficha técnica?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. Puedes crear y descargar tu ficha técnica sin crear ninguna cuenta ni dar tu email.' }
        },
        {
          '@type': 'Question',
          name: '¿Es gratis descargar la ficha técnica en PDF?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí, la generación y descarga del PDF es completamente gratuita, sin límite de fichas ni marcas de agua.' }
        },
        {
          '@type': 'Question',
          name: '¿Tengo que instalar alguna aplicación?',
          acceptedAnswer: { '@type': 'Answer', text: 'No, es una herramienta 100% online que funciona directamente desde el navegador.' }
        },
        {
          '@type': 'Question',
          name: '¿Qué pasa con mis datos y recetas?',
          acceptedAnswer: { '@type': 'Answer', text: 'Todo el proceso ocurre localmente en tu navegador. Nada se envía ni se almacena en ningún servidor externo.' }
        }
      ]
    });

    // 🧹 LIMPIEZA AL DESMONTAR EL COMPONENTE
    return () => {
      createdElements.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
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



  //    <h1 className="text-base lg:text-3xl sm:text-4xl  font-extrabold text-black tracking-tight mb-2">

  return (
      <FullWidthLayout>
    <main className="min-h-screen bg-gray-50/50 py-8 lg:pt-[90px] pt-[80px] px-4 sm:px-6 lg:px-8">
      {/* Header de la página */}
      <header className="w-full lg:w-[90.8%] 2xl:w-[90%]  mx-auto text-center mb-6 px-4 ">
  {/* H1 Principal con Palabras Clave de Cocina y Coctelería */}
  <h1 className="text-xl md:text-2xl lg:text-4xl font-black text-neutral-900 mb-3 text-center leading-tight">
    App de Ficha Técnica de Cocina y Coctelería — Gratis y Sin Registro
  </h1>

  <p className="text-xs sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed mb-2">
    Crea tu ficha técnica directamente en el navegador. Sin cuentas, sin instalar nada y sin límites. Descarga en PDF profesional cuando termines.
  </p>

  {/* BLOQUE DE ACLARACIÓN Y GARANTÍAS (SEO + Confianza de usuario) */}
  <div className="mx-auto mb-2 px-5 py-3 bg-amber-50 border border-amber-200/80 rounded-2xl shadow-sm">
    <h3 className="text-sm lg:text-lg font-bold text-neutral-800 mb-3 text-center ">
      🔒 100% Online, Sin Registro y Sin Apps que Instalar
    </h3>
    
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 gap-2 text-neutral-700 text-sm">
      <li>✅ <strong>Sin crear cuenta:</strong> Empieza a usarla ya, sin emails ni contraseñas.</li>
      <li>✅ <strong>Sin descargar nada:</strong> Funciona en cualquier navegador, móvil u ordenador.</li>
      <li>✅ <strong>Sin coste ni límites:</strong> Crea todas las fichas técnicas que necesites.</li>
      <li>🔐 <strong>Tus datos son privados:</strong> Proceso 100% en tu navegador, sin enviar datos a servidores.</li>
      <li className="md:col-span-2">📄 <strong>PDF al instante:</strong> Descarga tu ficha técnica lista para imprimir en segundos.</li>
    </ul>
  </div>

  {/* BLOQUE DE BENEFICIOS DE LA FICHA TÉCNICA */}
  <div className="mx-auto bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
    <h3 className="text-sm lg:text-lg font-bold text-neutral-800 mb-3">
      📄 ¿Por qué necesitas fichas técnicas en tu cocina o barra?
    </h3>
    
    <ul className="space-y-2 text-neutral-700 text-sm">
      <li>🍳 <strong>Estandariza tus recetas:</strong> Mantén el mismo sabor, porciones y presentación, cocine quien cocine o prepare quien prepare la copa.</li>
      <li>🚀 <strong>Evita pérdidas por descontrol:</strong> Registra gramajes e ingredientes exactos de cada elaboración.</li>
      <li>⚠️ <strong>Control estricto de alérgenos:</strong> Cumple con la normativa sanitaria e identifica rápidamente los alérgenos para proteger a tus clientes.</li>
    </ul>
  </div>
      </header>






      {/* Contenedor del Formulario */}
      <div className="w-full lg:w-[90.8%] 2xl:w-[90%] mx-auto space-y-6">
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









      {/**FAQS */}
      <section className="max-w-4xl mx-auto mt-18 mb-6 px-4 ">
  <h2 className="text-lg lg:text-2xl font-extrabold text-neutral-900 mb-4 text-center ">
    Preguntas frecuentes sobre esta ficha técnica online
  </h2>
  <div className="space-y-4">
    <details className="bg-white p-4 rounded-lg border border-gray-200">
      <summary className="font-semibold text-neutral-800 cursor-pointer">
        ¿Necesito registrarme para usar esta ficha técnica?
      </summary>
      <p className="text-sm text-gray-700 mt-2">
        No. Puedes crear y descargar tu ficha técnica sin crear ninguna cuenta ni dar tu email.
      </p>
    </details>

    <details className="bg-white p-4 rounded-lg border border-gray-200">
      <summary className="font-semibold text-neutral-800 cursor-pointer">
        ¿Es gratis descargar la ficha técnica en PDF?
      </summary>
      <p className="text-sm text-gray-700 mt-2">
        Sí, la generación y descarga del PDF es completamente gratuita, sin límite de fichas ni marcas de agua.
      </p>
    </details>

    <details className="bg-white p-4 rounded-lg border border-gray-200">
      <summary className="font-semibold text-neutral-800 cursor-pointer">
        ¿Tengo que instalar alguna aplicación?
      </summary>
      <p className="text-sm text-gray-700 mt-2">
        No, es una herramienta 100% online. Funciona directamente desde el navegador de tu móvil, tablet u ordenador.
      </p>
    </details>

    <details className="bg-white p-4 rounded-lg border border-gray-200">
      <summary className="font-semibold text-neutral-800 cursor-pointer">
        ¿Qué pasa con mis datos y recetas? ¿Se guardan en algún servidor?
      </summary>
      <p className="text-sm text-gray-700 mt-2">
        No. Todo el proceso —desde los ingredientes hasta la imagen del emplatado— ocurre localmente en tu navegador. 
        Nada se envía ni se almacena en ningún servidor externo.
      </p>
    </details>

    <details className="bg-white p-4 rounded-lg border border-gray-200">
      <summary className="font-semibold text-neutral-800 cursor-pointer">
        ¿Sirve tanto para platos de cocina como para cócteles?
      </summary>
      <p className="text-sm text-gray-700 mt-2">
        Sí, puedes usar la misma herramienta para estandarizar recetas de cocina y también fichas de coctelería, 
        incluyendo alérgenos, elaboración y emplatado.
      </p>
    </details>
  </div>
</section>



      {/**FIN FAQS */}























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