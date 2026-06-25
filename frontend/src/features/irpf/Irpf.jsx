import { useState, useMemo, useEffect } from 'react';
import { calcularRetencion } from '../../../utils/irpfCalc';
import SalaryForm   from '../../../components/irpf/SalaryForm';
import FamilyForm   from '../../../components/irpf/FamilyForm';
import ResultsPanel from '../../../components/irpf/ResultsPanel';
import FullWidthLayout from "../../../hocs/FullWidthLayout";


// ─── SEO ──────────────────────────────────────────────────────────────────────
function useSEO() {
  useEffect(() => {
    document.title = 'Calculadora Retención IRPF 2026 — Cuánto me retienen en nómina';

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

    setMeta('name', 'description',
      'Calcula gratis tu retención de IRPF 2026 según tu salario, situación familiar e hijos. ' +
      'Descubre tu neto mensual y el desglose del cálculo paso a paso.'
    );
    setMeta('name', 'keywords',
      'calculadora irpf, retención irpf, cuanto me retienen nómina, irpf 2026, ' +
      'calculadora retención, neto mensual españa'
    );
    setMeta('property', 'og:title',   'Calculadora IRPF 2026 — Retención en nómina');
    setMeta('property', 'og:type',    'website');
    setMeta('property', 'og:description',
      'Calcula tu retención de IRPF y cuánto cobras neto al mes en España.'
    );

    // JSON-LD
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
    <main className="w-full min-h-screen 
    bg-gray-50/50 text-gray-800 
    pt-[140px] pb-[60px] flex flex-col justify-center">
      
      {/* Header */}
      <header className="w-full max-w-7xl px-4 md:px-8 mb-6">
        <div className="w-full  bg-white">
          <h1 className="kaushan tracking-wider 
              lg:text-5xl  text-2xl font-black text-gray-900  
              lg:py-4 flex items-center gap-2 underline underline-offset-8">
            Calculadora de retención IRPF
          </h1>
          <p className="text-sm font-medium text-neutral-700 mt-0.5">
            Estima cuánto te retienen en la nómina y cuánto cobras neto al mes · 2026
          </p>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="w-full max-w-7xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start flex-1">
        
        {/* Columna Izquierda: Formularios y botón de reset */}
        <div className="lg:col-span-2 w-full flex flex-col gap-6">
          <SalaryForm values={values} onChange={setValues} />
          <FamilyForm values={values} onChange={setValues} />
          
          <button
            onClick={() => setValues(DEFAULTS)}
            type="button"
            className="text-xs lg:text-sm rounded-lg font-bold text-white 
            hover:text-red-500 self-start 
            transition-colors bg-mauve-600 px-2 py-2 "
          >
            Restablecer datos del formulario
          </button>
        </div>


       {/**COLUMNA DEL COSTADO */}
        {/* Columna Derecha: Resultados (Sticky / Fijo en escritorio) */}
        <aside className="w-full lg:sticky lg:top-[100px] flex flex-col gap-3">
          <p className="kaushan tracking-wider underline underline-offset-8 lg:text-2xl text-xs font-bold text-black text-center  tracking-tight px-1">
            Resultado del Análisis
          </p>
          <div className="w-full bg-white border border-gray-100 rounded-xl shadow-sm p-5">
            <ResultsPanel result={result} />
          </div>
        </aside>
      </div>

     


    {/**CONTENIDO */}

    <div>


      <section className="max-w-4xl mx-auto px-4 py-12 text-gray-800 space-y-8">
  
  <header className="space-y-2">
    <h2 className="text-2xl font-bold text-black tracking-tight underline underline-offset-8">
      ¿Cómo calcular tu Sueldo Neto en España? Guía Paso a Paso
    </h2>
    <p className="text-sm text-gray-600 leading-relaxed">
      Calcular el salario neto a partir del sueldo bruto anual puede parecer complejo debido a las retenciones del IRPF y las cotizaciones a la Seguridad Social. A continuación, te explicamos cómo funciona el algoritmo de nuestra <strong>calculadora de sueldo neto</strong> para que entiendas tu nómina mes a mes.
    </p>
  </header>

  <hr className="border-gray-100" />

  <article className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900">
      1. Cotizaciones a la Seguridad Social en la Nómina
    </h3>
    <p className="text-sm text-gray-600 leading-relaxed">
      El primer descuento aplicable a tu salario bruto es la aportación a la Seguridad Social. Dependiendo de tu tipo de contrato, el porcentaje varía ligeramente:
    </p>
    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
      <li><strong>Contrato Indefinido:</strong> Se aplica una retención del <strong>6,35%</strong> sobre la base de cotización.</li>
      <li><strong>Contrato Temporal:</strong> La cuota asciende al <strong>6,40%</strong>.</li>
    </ul>
  </article>

  <article className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900">
      2. El Mínimo Personal y Familiar: ¿Cuánto dinero está exento de IRPF?
    </h3>
    <p className="text-sm text-gray-600 leading-relaxed">
      El impuesto sobre la renta es progresivo y protege las situaciones familiares particulares. El <strong>mínimo personal exento por defecto es de 5.550 €</strong> (cuantía que aumenta a partir de los 65 y 75 años). Además, tener hijos menores de 25 años a cargo o ascendientes que convivan contigo reduce la base imponible, haciendo que pagues menos impuestos mensuales.
    </p>
  </article>

  <article className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900">
      3. Tramos de IRPF por Comunidad Autónoma
    </h3>
    <p className="text-sm text-gray-600 leading-relaxed">
      El IRPF se divide en un tramo estatal y otro autonómico. Regiones como <strong>Madrid, Cataluña, Andalucía o la Comunidad Valenciana</strong> tienen escalas propias que hacen que el sueldo neto de un mismo salario bruto varíe según dónde residas. Nuestra calculadora aplica estas tablas de forma automática para ofrecerte el cálculo de retención mensual más preciso.
    </p>
  </article>

  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl text-xs text-blue-800 leading-relaxed">
    <strong>💡 Consejo para trabajadores:</strong> Las retenciones reflejadas en esta herramienta emulan el cálculo mensual de tu empresa (Modelo 145). El ajuste definitivo de tus impuestos se realiza al año siguiente durante la campaña de la Declaración de la Renta.
  </div>

</section>

    </div>














 {/* Footer */}
      {/* Footer */}
        <footer className="w-full max-w-5xl mt-4 px-4 text-center">
          <div className="border-t border-gray-200 pt-2 text-xs text-gray-700">
            Cálculo orientativo según normativa IRPF 2026 · 
           
          </div>
        </footer>





    </main>









    </FullWidthLayout>
  );
}