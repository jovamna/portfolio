import { useState, useMemo, useEffect } from 'react';
import { calcularRetencion } from '../../utils/irpfCalc';
import SalaryForm   from './components/SalaryForm';
import FamilyForm   from './components/FamilyForm';
import ResultsPanel from './components/ResultsPanel';
import FullWidthLayout from "../../hocs/FullWidthLayout";


// ─── SEO ──────────────────────────────────────────────────────────────────────
// ─── SEO APP ──────────────────────────────────────────────────────────────────
function useSEO() {
  useEffect(() => {
  
    document.title = 'Simulador de Retención IRPF en Nómina 2026 — Online, Sin Descargas';

    const canonicalUrl = "https://jovamnamedina.com/calcula-irpf"; 
    
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.rel = 'canonical';
        document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = canonicalUrl;

    const setMeta = (attr, val, content) => {
      let tag = document.querySelector(`meta[${attr}="${val}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, val);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Metadatos Estándar
    setMeta('name', 'description',
      'Simula en segundos cuánto te van a retener de IRPF en tu nómina en 2026. Sin instalar apps, sin registro ' +
      'ni declaración fiscal completa: solo introduce tu salario y obtén una estimación al instante.'
    );
    setMeta('name', 'keywords',
      'calculadora irpf, retención irpf, cuanto me retienen nómina, irpf 2026, calculadora retención, neto mensual españa'
    );

    // Open Graph (Redes Sociales)
    setMeta('property', 'og:title',       'Calculadora IRPF 2026 — Retención en nómina');
    setMeta('property', 'og:type',        'website');
    setMeta('property', 'og:url',         canonicalUrl);
    setMeta('property', 'og:image', 'https://jovamnamedina.com/custom-static/images/facebookweb.jpg');
    setMeta('property', 'og:description', 'Calcula tu retención de IRPF y cuánto cobras neto al mes en España.');

    // JSON-LD (Schema.org WebApplication)
    let ld = document.querySelector('script[data-schema="irpf-app"]');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.setAttribute('data-schema', 'irpf-app');
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Calculadora de Retención IRPF 2026',
      description: 'Herramienta gratuita para calcular la retención del IRPF en la nómina según salario y situación familiar.',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    });
  }, []);
}



// ─── Default form values ──────────────────────────────────────────────────────
const DEFAULTS = {
  salarioBruto:   '',
  contrato:       'indefinido',
  edadTrabajador: 30,
  pagas:          14,
  hijosTotal:     0,
  hijosMenores3:  0,
  ascendientes65: 0,
  ascendientes75: 0,
  discapacidad:   0,
};

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useSEO();

  const [values, setValues] = useState(DEFAULTS);

  const result = useMemo(() => {
    const brutoInput = parseFloat(values.salarioBruto);
    if (!brutoInput || brutoInput <= 0) return null;

  const salarioAnual = values.salarioAnualReal || (values.salarioTipo === 'mensual' ? brutoInput * 12 : brutoInput);



   // const bruto = parseFloat(values.salarioBruto);
   // if (!bruto || bruto <= 0) return null;


  return calcularRetencion({
    salarioBruto: salarioAnual,           // ← Siempre pasamos el anual
    //salarioBruto: bruto,
    contrato: values.contrato,
    edadTrabajador: Number(values.edadTrabajador),
    hijosTotal: Number(values.hijosTotal),
    hijosMenores3: Number(values.hijosMenores3),
    ascendientes65: Number(values.ascendientes65),
    ascendientes75: Number(values.ascendientes75),
    discapacidad: Number(values.discapacidad),
    pagas: Number(values.pagas),
    ccaa: values.ccaa || 'media',        // ← Correcto
  });
}, [values]);



    // Nota: Asegúrate de tener importada la función calcularRetencion en tu archivo
  //  return calcularRetencion({
  //    salarioBruto:   bruto,
  //    contrato:       values.contrato,
  //    edadTrabajador: Number(values.edadTrabajador),
   //   hijosTotal:     Number(values.hijosTotal),
   //   hijosMenores3:  Number(values.hijosMenores3),
  //    ascendientes65: Number(values.ascendientes65),
  //    ascendientes75: Number(values.ascendientes75),
  //    discapacidad:   Number(values.discapacidad),
  //    pagas:          Number(values.pagas),
  //  });
  //}, [values]);





  return (
    <FullWidthLayout>
     <main className="min-h-screen bg-gray-50/50 py-8 lg:pt-[90px] pt-[80px] px-4 sm:px-6 lg:px-8">

      <div className='flex flex-col lg:w-[88.8%] 2xl:w-[72%] items-center w-full px-4 mx-auto'>

         {/* Header */}
        <header className="w-full flex flex-col items-center mb-6 px-4">
       
              <h1 className="text-xl md:text-2xl lg:text-4xl font-black text-neutral-900 mb-3 text-center leading-tight">
             Simulador de Retención IRPF en Nómina — Online al Instante
            </h1>

            <h2 className="text-neutral-600 text-sm lg:text-base mx-auto text-center mt-2">
              Simulador y calculadora online para calcular IRPF y las retenciones de tu 
              nómina en 2026. Sin instalar nada, sin registrarte 
  y sin hacer la declaración completa — solo una estimación rápida y clara.
            </h2>


             <div className="mx-auto mb-2 px-5 py-3 bg-amber-50 border border-amber-200/80 rounded-2xl shadow-sm">
  <h3 className="text-center text-sm lg:text-xl font-bold text-neutral-800 mb-3">
    ⚡ Rápido, Online y Sin Compromiso
  </h3>
   <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 gap-2 text-neutral-700 text-sm">
    <li className="text-sm">🚫 <strong>Sin instalar ninguna app:</strong> Funciona directamente en tu navegador, móvil u ordenador.</li>
    <li className="text-sm">🚫 <strong>Sin registro ni cuenta:</strong> Introduce tus datos y obtén el resultado al momento.</li>
    <li className="text-sm">🎯 <strong>Solo lo que necesitas:</strong> No es la declaración de la Renta completa, es una simulación rápida de tu retención mensual.</li>
    <li className="text-sm">🔐 <strong>Datos privados:</strong> El cálculo se hace en tu navegador, no se envía a ningún servidor.</li>
  </ul>
</div>


        
      </header>

      {/* Grid Layout */}
      <div className="w-full lg:w-[100%] 2xl:w-[100%] 
      grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-6 items-start 
      flex-1 border border-neutral-600 rounded-md 
      lg:py-8 2xl:px-4 lg:px-2">
        
        {/* Columna Izquierda: Formularios y botón de reset */}
        <div className="lg:col-span-2 w-full flex flex-col gap-6 2xl:col-span-3 2xl:pr-6">
          <SalaryForm values={values} onChange={setValues} />
          <FamilyForm values={values} onChange={setValues} />


          <div className='p-8'>
             <button
            onClick={() => setValues(DEFAULTS)}
            type="button"
            className="text-xs lg:text-sm rounded-lg font-bold text-white 
            hover:text-neutral-800 self-start 
            transition-colors bg-mauve-600 px-4 py-4 uppercase"
          >
            Nuevo cálculo
          </button>


          </div>
         
        </div>


       {/**COLUMNA DEL COSTADO */}
        {/* Columna Derecha: Resultados (Sticky / Fijo en escritorio) */}
        <aside className="w-full lg:sticky lg:top-[100px] flex flex-col gap-3">
          <p className="kaushan tracking-wider underline underline-offset-8 lg:text-2xl text-base font-bold text-black text-center  tracking-tight px-1">
            Resultado del Análisis
          </p>
          <div className="w-full bg-white border border-gray-100 rounded-xl shadow-sm p-5 ">
            <ResultsPanel result={result} />
          </div>
        </aside>
      </div>

     
      </div>








    {/**CONTENIDO */}

    <div className="lg:py-16 py-8 md:py-12">
  {/* GUÍA EXPLICATIVA SEO */}
  <section className="max-w-4xl mx-auto px-4 py-8 text-gray-800 space-y-8">
    <header className="space-y-2">
      <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight underline underline-offset-8 leading-8 text-center">
        ¿Cómo calcular tu Sueldo Neto en España? Guía Paso a Paso
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed">
        Calcular el salario neto a partir del sueldo bruto anual puede parecer complejo debido a las retenciones del IRPF y las cotizaciones a la Seguridad Social. A continuación, te explicamos los 3 factores clave que utiliza nuestra <strong>calculadora de sueldo neto</strong> para estimar tu nómina mes a mes.
      </p>
    </header>

    <div className="space-y-6">
      <article className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">
          1. Cotizaciones a la Seguridad Social en la Nómina
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Es el primer descuento obligatorio sobre tu salario bruto para cubrir contingencias comunes, desempleo y formación. Dependiendo del tipo de contrato:
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li><strong>Contrato Indefinido:</strong> Se aplica una retención fija del <strong>6,35%</strong> sobre la base de cotización.</li>
          <li><strong>Contrato Temporal:</strong> La aportación asciende al <strong>6,40%</strong>.</li>
        </ul>
      </article>

      <article className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">
          2. Mínimo Personal y Familiar (Ingresos exentos de IRPF)
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          El impuesto sobre la renta es progresivo. El <strong>mínimo personal exento con carácter general es de 5.550 €</strong> anuales. Tener hijos a cargo, personas mayores o personas con discapacidad reduce tu base imponible, aumentando el dinero neto que recibes cada mes.
        </p>
      </article>

      <article className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">
          3. Tramos de IRPF por Comunidad Autónoma
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          El IRPF se compone de un tramo estatal y otro autonómico. Comunidades como <strong>Madrid, Cataluña, Andalucía o la Comunidad Valenciana</strong> aplican escalas diferentes. Nuestra herramienta contempla estas variaciones regionales para ofrecer un resultado preciso.
        </p>
      </article>
    </div>

    <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-2xl text-xs md:text-sm text-blue-900 leading-relaxed">
      💡 <strong>Nota sobre la retención:</strong> Este simulador calcula la retención mensual que aplica tu empresa en nómina (Modelo 145). El ajuste definitivo se realiza al año siguiente durante la campaña anual de la Renta.
    </div>
  </section>

  {/* SECCIÓN PREGUNTAS FRECUENTES (FAQS) */}
  <section className="mt-6 max-w-4xl mx-auto w-full px-4">
    <h3 className="text-neutral-900 lg:text-2xl text-lg font-black text-center mb-6">
      Preguntas Frecuentes sobre el Cálculo de IRPF
    </h3>

    <div className="flex flex-col gap-4">
      <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
        <p className="font-bold text-neutral-800 lg:text-base text-sm">
          ¿Cómo se calcula la retención del IRPF en la nómina?
        </p>
        <p className="text-neutral-600 text-sm mt-1 leading-relaxed">
          Se calcula cruzando tu salario bruto anual con tu situación personal (hijos, tipo de contrato y comunidad autónoma) para determinar el porcentaje exacto que la empresa debe ingresar a Hacienda en tu nombre.
        </p>
      </div>

      <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
        <p className="font-bold text-neutral-800 lg:text-base text-sm">
          ¿El simulador de IRPF es completamente gratuito?
        </p>
        <p className="text-neutral-600 text-sm mt-1 leading-relaxed">
          Sí. Puedes hacer todas las simulaciones de sueldo neto que necesites de forma gratuita, ilimitada y sin necesidad de registrarte ni introducir datos personales.
        </p>
      </div>

      <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
        <p className="font-bold text-neutral-800 lg:text-base text-sm">
          ¿Este cálculo sustituye a los servicios oficiales de la Agencia Tributaria?
        </p>
        <p className="text-neutral-600 text-sm mt-1 leading-relaxed">
          No. Es una herramienta estimativa de orientación laboral para saber cuánto cobrarás mes a mes. No realiza trámites ni sustituye al borrador oficial de la AEAT.
        </p>
      </div>
    </div>
  </section>
</div>
    {/**FIN FAQS */}










 {/* Footer */}
      {/* Footer */}
        <footer className="flex flex-col items-center w-full max-w-5xl mx-auto mt-4 px-4">
          <div className="border-t border-gray-200 pt-2 text-xs text-gray-700 text-center">
            Cálculo orientativo según normativa IRPF 2026 · 
           
          </div>
        </footer>





    </main>









    </FullWidthLayout>
  );
}