import { useState, useEffect, useCallback } from 'react';
import {
  ingredienteVacio, pasoVacio, calcularCosteTotal,
  TEMPERATURAS, escalarIngredientes
} from '../../utils/hosteleria/estandarizar-recetas/fichaUtils';
import FullWidthLayout from "../../hocs/FullWidthLayout";
import { generarPDF } from '../../utils/hosteleria/estandarizar-recetas/pdfGenerator';

import PlatoHeader        from './components/PlatoHeader';
import IngredientesTable  from './components/IngredientesTable';
import AlergenosSelector  from './components/AlergenosSelector';
import PreparacionSteps   from './components/PreparacionSteps';
import EmplatadoSection   from './components/EmplatadoSection';
import RentabilidadPanel  from './components/RentabilidadPanel';
import EscaladorReceta from './components/EscaladorReceta';



// ─── SEO ──────────────────────────────────────────────────────────────────────

function useSEO() {
  useEffect(() => {
    const canonicalUrl = 'https://jovamnamedina.com/estandarizar-recetas';
  
    
    // 1. Título de la página (Abarca platos de restaurante y recetas de coctelería/bar)
    //DEBE COINICIDR CON EL SEO_TITLE DE LA VIEW DE  DJANGO
    document.title = 'Estandarizar y Escalar Recetas Online Gratis — Sin Registro (Descarga PDF)';



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
      'Estandariza recetas de cocina, pastelería y coctelería online. Organiza ingredientes, cantidades, elaboración y alérgenos. Guarda tus recetas, descárgalas en PDF y trabaja sin registro.'
    );

    // 3. Open Graph\
    setMeta('property', 'og:title', 'Gestor y Escalador de Recetas Estandarizadas Gratis Online');
    setMeta('property', 'og:type',        'website');
    setMeta('property', 'og:url',         canonicalUrl);
    setMeta('property', 'og:image',       'https://jovamnamedina.com/custom-static/images/googleweb.jpg');

     setMeta('property', 'og:description', 'Herramienta online para crear, organizar, escalar y gestionar recetas estandarizadas de cocina, pasteleria y coctelería. Gratis, sin registro y con descarga en PDF. Exporta a PDF y guarda tus recetas.'
    );


    // 4. Twitter Cards
    setMeta('name', 'twitter:card',        'summary_large_image');
    setMeta('name', 'twitter:title',       'Estandarizar y Escalar Recetas Gratis Sin Registro');
    setMeta('name', 'twitter:description', 'Herramienta online para crear, organizar, escalar y gestionar recetas estandarizadas de cocina, pasteleria y coctelería. Gratis, sin registro y con descarga en PDF. Exporta a PDF y guarda tus recetas.');
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
      name: 'Gestor de Recetas Estandarizadas',
      description: 'Herramienta gratuita para crear, organizar y gestionar recetas estandarizadas de cocina, pastelería y coctelería con ingredientes, cantidades, alérgenos y exportación a PDF.',
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
    let ldFaq = document.querySelector('script[data-schema="recetas-estandar-faq"]');
    if (!ldFaq) {
      ldFaq = document.createElement('script');
      ldFaq.type = 'application/ld+json';
      ldFaq.setAttribute('data-schema', 'recetas-estandar-faq');
      document.head.appendChild(ldFaq);
      createdElements.push(ldFaq);
    }
    ldFaq.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Necesito registrarme para estandariar mis recetas?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. Puedes crear y descargar tus recetas estandarizadas sin crear ninguna cuenta ni dar tu email.' }
        },
        {
          '@type': 'Question',
          name: '¿Puedo descargar mi receta estandarizada en PDF?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí, la generación y descarga del PDF es completamente gratuita, sin límite de recetas ni marcas de agua.' }
        },
        {
          '@type': 'Question',
          name: '¿Tengo que instalar alguna aplicación?',
          acceptedAnswer: { '@type': 'Answer', text: 'No, es una herramienta 100% online que funciona directamente desde el navegador.' }
        },
        {
          '@type': 'Question',
          name: '¿Mis recetas se guardan en vuestros servidores?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. Todo el proceso se realiza localmente en tu navegador. Tus recetas permanecen bajo tu control y no se envían a servidores externos.' }
        },
        {
          '@type': 'Question',
          name: '¿Puedo guardar mis recetas para editarlas más adelante?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí. Puedes exportar tu receta y volver a cargarla posteriormente para actualizar ingredientes, cantidades o cualquier otro dato antes de generar un nuevo PDF.' }
        },
        {
          '@type': 'Question',
          name: '¿Para quién está pensada esta herramienta?',
          acceptedAnswer: { '@type': 'Answer', text: 'Está diseñada para cocinas profesionales, restaurantes, hoteles, caterings, pastelerías, obradores y coctelerías que necesitan mantener recetas estandarizadas.' }
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






const STORAGE_KEY = 'estandarizar-receta-data';

const loadFromStorage = (defaultValue) => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn('Error loading receta:', error);
  }

  return defaultValue;
};



const saveToStorage = (data) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error('Error saving receta:', error);
  }
};


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

  fecha: '',
  ManodeObra: '',
  maquinaria: '',          // ← utensilios usados
  raciones: 1,             // ← nuevo (por defecto 1)
  categoria: 'entrante',   // ← nuevo
});





export default function EstandarizarRecetas() {
  useSEO();
  //const [ficha, setFicha] = useState(initialState());
  const [ficha, setFicha] = useState(() =>
  loadFromStorage(initialState())
);
  const costeTotal = calcularCosteTotal(ficha.ingredientes);
  //AÑADIDO ESCALAR
  const [racionesEscaladas, setRacionesEscaladas] = useState('');
  const [ingredientesEscalados, setIngredientesEscalados] = useState([]);


useEffect(() => {
  saveToStorage(ficha);
}, [ficha]);


  



  const handleReset = () => {
    if (confirm('¿Empezar una ficha nueva? Se perderán los datos actuales.')) {
      setFicha(initialState());
    }
  };

      // =========================
    // 🆕 BOTÓN ESCALAR
    // =========================
  const handleEscalar = () => {
    const resultado = escalarIngredientes(
      ficha.ingredientes,
      ficha.raciones,
      racionesEscaladas
    );

  console.log('RESULTADO DEL ESCALADO:', resultado);

  setIngredientesEscalados(resultado);
};


  const handleDescargarPDF = () => {
  if (!ficha.nombrePlato.trim()) {
    alert('Ponle un nombre al plato antes de descargar la ficha.');
    return;
  }

  const temperaturaLabel = TEMPERATURAS.find((t) => t.value === ficha.temperatura)?.label;

  generarPDF({
    ...ficha,
    temperaturaLabel,
    // Datos de la receta escalada (si existen)
    ingredientesEscalados: ingredientesEscalados.length > 0 ? ingredientesEscalados : null,
    racionesEscaladas: racionesEscaladas || null,
  });
};








  // =========================
    // 🆕 BOTÓN "GUARDAR COPIA" (NUEVA FUNCIONALIDAD)
    // =========================
  
  const guardarCopia = useCallback(() => {
  // 👇 Primero, extraemos todo lo que necesitamos del estado

  const { nombrePlato, tiempoElaboracion, temperatura, ingredientes, alergenos, pasos, emplatado, pvp, ManodeObra, maquinaria, raciones, categoria } = ficha;
  
  const nombre = prompt('¿Qué nombre quieres darle a esta receta?', nombrePlato || 'Mi receta');
  if (!nombre) return;

  const data = {
  version: '1.0',
  nombre,
  fechaGuardado: new Date().toISOString(),   // opcional
  nombrePlato,
  tiempoElaboracion,
  temperatura,
  ingredientes,
  alergenos,
  pasos,
  emplatadoDescripcion: emplatado.descripcion || '',
  pvp,
  ManodeObra,
  maquinaria,
  raciones,
  categoria,
  fecha: ficha.fecha || '',                  // ← la fecha del usuario
};

    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receta-${nombre.toLowerCase().replace(/ /g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al guardar copia:', error);
      alert('Error al guardar la copia');
    }
}, [ficha]); // 👈 Dependencia: el estado ficha

  // =========================
  // 🆕 BOTÓN "CARGAR COPIA" (Sin datos de imagen)
  // =========================

const cargarCopia = useCallback((event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      
      if (data.nombrePlato && data.ingredientes && Array.isArray(data.ingredientes)) {
        // 👇 Actualizamos TODO el estado de una sola vez con setFicha
        setFicha({
           nombrePlato: data.nombrePlato,
           tiempoElaboracion: data.tiempoElaboracion || '',
           temperatura: data.temperatura || 'caliente',
           ingredientes: data.ingredientes,
           alergenos: data.alergenos || [],
           pasos: data.pasos || [],
           emplatado: { 
            descripcion: data.emplatadoDescripcion || '', 
            imagen: null, 
           imagenNombre: null 
            },
            pvp: data.pvp || '',
           ManodeObra: data.ManodeObra || '',
            maquinaria: data.maquinaria || '',
           raciones: data.raciones ?? 1,
           categoria: data.categoria || 'entrante',
           fecha: data.fecha || '',                   // ← añadir esto
       });



      
        
        alert(`✅ Receta "${data.nombre || 'sin nombre'}" cargada correctamente`);
      } else {
        alert('❌ El archivo no es una receta estandarizada válida');
      }
    } catch (error) {
      console.error('Error al cargar:', error);
      alert('❌ Error al leer el archivo.');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}, [setFicha]); // 👈 Dependencia: solo el setter


































  //    <h1 className="text-base lg:text-3xl sm:text-4xl  font-extrabold text-black tracking-tight mb-2">

  return (
      <FullWidthLayout>
    <main className="min-h-screen bg-gray-50/50 py-8 lg:pt-[90px] pt-[80px] px-4 sm:px-6 lg:px-8">
      {/* Header de la página */}
    

   <header className="w-full lg:w-[90.8%] 2xl:w-[90%] mx-auto text-center mb-6">
  {/* H1 Principal con Palabras Clave de Cocina y Coctelería */}
  <h1 className="text-xl md:text-2xl lg:text-4xl font-black text-neutral-900 mb-3 text-center leading-tight">
    Estandariza tus Recetas de Cocina, Pastelería y Coctelería
  </h1>

  {/* Párrafo único, directo y optimizado para SEO */}
  <p className="text-xs sm:text-base text-gray-700 max-w-4xl mx-auto leading-relaxed mb-2">
  Herramienta online gratuita y sin registro para crear, escalar y gestionar recetas estandarizadas profesionales. 
  Organiza ingredientes, alérgenos y métodos de elaboración, y descarga tu informe técnico en PDF al instante.
  </p>

  {/* BLOQUE DE ACLARACIÓN Y GARANTÍAS (Aporta Confianza y destaca frente al Excel) bg-amber-50*/}
  <div className="flex flex-col w-full lg:w-[100%] 2xl:w-[100%] mx-auto 
  mb-4 px-5 py-3 bg-amber-50 border border-amber-200/80 rounded-2xl shadow-sm">

    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-neutral-700 text-sm text-left  mx-auto">
       <li>✅ <strong> Estandarizador + Escalador:</strong>diseña tu receta base y multiplica o divide las raciones al instante, en la misma pantalla.</li>
      <li>✅ <strong>Sin crear cuenta:</strong> Empieza a usarla ya, sin correos ni contraseñas.</li>
      <li>✅ <strong>Sin instalar nada:</strong> Funciona directo en el navegador de tu móvil o tablet de cocina.</li>
      <li>✅ <strong>Consistencia total:</strong> Asegura el mismo sabor, porciones y alérgenos en cada plato o copa.</li>
      <li>🔐 <strong>Datos privados:</strong> Todo se procesa localmente en tu navegador de forma 100% segura.</li>
      <li className="md:col-span-2 text-center mt-1">📄 <strong>Descarga en PDF:</strong> Obtén tu receta estandarizada lista para colgar en la pared o imprimir.</li>
    </ul>
  </div>
      </header>











      {/* Contenedor del Formulario */}
      <div className="w-full lg:w-[92%] 2xl:w-[90%] mx-auto space-y-6">
        <PlatoHeader
          values={ficha}
          onChange={(v) => setFicha({ ...ficha, ...v })}
        />

           <RentabilidadPanel
          costeTotal={costeTotal}
          pvp={ficha.pvp}
          onPvpChange={(pvp) => setFicha({ ...ficha, pvp })}
          raciones={ficha.raciones}
        />

        <IngredientesTable
          ingredientes={ficha.ingredientes}
          onChange={(ingredientes) => setFicha({ ...ficha, ingredientes })}
        />

        

        <PreparacionSteps
          pasos={ficha.pasos}
          onChange={(pasos) => setFicha({ ...ficha, pasos })}
        />


      {/* Utensilios usados (al final) */}
      <div className='flex flex-row w-full justify-between'>
        <div className="flex flex-col  w-[45%]"> 
        <label className="text-sm lg:text-lg font-semibold text-gray-900 mb-1" htmlFor="maquinaria">
          🍴 Utensilios usados
          </label>
         <input
         id="maquinaria"
         type="text"
         placeholder="Ej: batidora, cuchillo, sartén, rallador..."
         value={ficha.maquinaria || ''}
         onChange={(e) => setFicha({ ...ficha, maquinaria: e.target.value })}
        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />

      </div>

      <div className="flex flex-col w-[45%]"> 
        <label className="text-sm lg:text-lg font-semibold text-gray-900 mb-1" htmlFor="colaboradores">
          Mano de Obra
          </label>
         <input
         id="ManodeObra"
         type="text"
         placeholder="Ej: 4 personas."
         value={ficha.ManodeObra || ''}
         onChange={(e) => setFicha({ ...ficha, ManodeObra: e.target.value })}
        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />



      </div>


      </div>
      

     

        <AlergenosSelector
          selected={ficha.alergenos}
          onChange={(alergenos) => setFicha({ ...ficha, alergenos })}
        />

     

        <EmplatadoSection
          values={ficha.emplatado}
          onChange={(emplatado) => setFicha({ ...ficha, emplatado })}
        />

        {/* Acciones del Formulario */}
        <div className="flex flex-col sm:flex-row items-center  justify-end gap-3 pt-4 border-t border-gray-100">
           {/* Botón Guardar */}
           <button onClick={guardarCopia} className="bg-mauve-400 border p-2 rounded-xl text-sm font-semibold">💾 Guardar copia (JSON)</button>
  
           {/* Botón Cargar (con input oculto) */}
            <label className="bg-yellow-700 border p-2 rounded-xl text-sm font-semibold ">
           📂 Cargar copia (JSON)
            <input type="file" accept=".json" onChange={cargarCopia} className="hidden" />
          </label>
  
           {/* Tus botones de siempre */}
             <button 
            type="button" 
            onClick={handleReset} 
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-black 
            hover:text-gray-700 hover:bg-gray-100 border rounded-xl bg-violet-400 transition-all"
          >
            Empezar de nuevo
          </button>
          <button 
            type="button" 
            onClick={handleDescargarPDF} 
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white 
            bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all text-center border"
          >
            📄 Descargar ficha en PDF
          </button>
       </div>
       {/**equipo que se usa */}







      </div>






   {/**PRUEBA PRUEBA PRUEBA  */}

      <div className="w-full lg:w-[90.8%] 2xl:w-[90%] mx-auto space-y-6">




  <EscaladorReceta
  racionesOriginales={ficha.raciones ?? 1}
  //racionesOriginales={ficha.raciones}
  racionesNuevas={racionesEscaladas}
  ingredientesEscalados={ingredientesEscalados}
  onRacionesNuevasChange={setRacionesEscaladas}
  onEscalar={handleEscalar}
/>



</div>





      {/**FAQS */}
<section className="max-w-4xl mx-auto mt-18 mb-6 px-4">
  <h2 className="text-lg lg:text-2xl font-extrabold text-neutral-900 mb-4 text-center">
    Preguntas frecuentes sobre este estandarizador de recetas online
  </h2>
  <div className="space-y-4">
    <details className="bg-white p-4 rounded-lg border border-gray-200">
      <summary className="font-semibold text-neutral-800 cursor-pointer">
        ¿Necesito registrarme para estandarizar mis recetas?
      </summary>
      <p className="text-sm text-gray-700 mt-2">
        No. Puedes estandarizar tus recetas y generar el documento de tu plato sin crear ninguna cuenta ni proporcionar tu correo electrónico.
      </p>
    </details>

    <details className="bg-white p-4 rounded-lg border border-gray-200">
      <summary className="font-semibold text-neutral-800 cursor-pointer">
        ¿Es gratis descargar la receta estandarizada en formato PDF?
      </summary>
      <p className="text-sm text-gray-700 mt-2">
        Sí, la generación del informe y la descarga del PDF de tu ficha técnica es completamente gratuita, sin límite de uso ni marcas de agua.
      </p>
    </details>

    <details className="bg-white p-4 rounded-lg border border-gray-200">
      <summary className="font-semibold text-neutral-800 cursor-pointer">
        ¿Por qué usar esta herramienta web en lugar de una plantilla de Excel tradicional?
      </summary>
      <p className="text-sm text-gray-700 mt-2">
        A diferencia de los archivos Excel de las escuelas de cocina, este estandarizador online cuenta con botones adaptados para pantallas táctiles de cocina y evita que se borren o desconfiguren las fórmulas matemáticas mientras trabajas con tus ingredientes.
      </p>
    </details>

    <details className="bg-white p-4 rounded-lg border border-gray-200">
      <summary className="font-semibold text-neutral-800 cursor-pointer">
        ¿Tengo que instalar alguna aplicación en mi dispositivo?
      </summary>
      <p className="text-sm text-gray-700 mt-2">
        No, es una herramienta 100% online de productividad. Funciona de manera directa desde el navegador de tu móvil, tablet u ordenador de oficina.
      </p>
    </details>

    <details className="bg-white p-4 rounded-lg border border-gray-200">
      <summary className="font-semibold text-neutral-800 cursor-pointer">
        ¿Qué ocurre con mis fórmulas, ingredientes y preparaciones? ¿Se guardan en algún servidor?
      </summary>
      <p className="text-sm text-gray-700 mt-2">
        No. Todo el proceso de cálculo ocurre localmente en el navegador de tu dispositivo. Tus recetas privadas no se envían ni se almacenan en ningún servidor externo, garantizando la total privacidad de tu negocio gastronómico.
      </p>
    </details>

    <details className="bg-white p-4 rounded-lg border border-gray-200">
      <summary className="font-semibold text-neutral-800 cursor-pointer">
        ¿Sirve tanto para pastelería y cocina tradicional como para barras de coctelería?
      </summary>
      <p className="text-sm text-gray-700 mt-2">
        Sí. Esta herramienta interactiva es ideal para formular repostería de precisión en gramos exactos, platos de cocina caliente y fichas técnicas de cócteles de autor, incluyendo su modo de elaboración, control de alérgenos y fotografía del emplatado.
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