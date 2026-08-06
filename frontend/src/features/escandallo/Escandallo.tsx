   
import React from 'react'; // Agrega esta línea arriba del todo

import FullWidthLayout from "../../hocs/FullWidthLayout";
import { FcCalculator } from "react-icons/fc";

import { useState, useEffect, useMemo, useCallback } from 'react';

import { exportarPDF } from './components/exportarPdf';


// ==========================================
// 1. CONSTANTES (UN SOLO LUGAR)
// ==========================================

const STORAGE_KEY = 'escandallo-data';

// 🆕 Tu ejemplo en un solo lugar (¡no más duplicación!)
const EJEMPLO_INICIAL = {
  namePlato: "Salsa Boloñesa Casera 🍝",
  raciones: 10,
  precioVenta: 15,
  ingredients: [
    {
      id: "ejemplo-1",
      name: "Carne picada de ternera",
      pricePerKg: "8.50",
      grossWeight: "1.200",
      mermaKg: "0.000",
      usedWeight: "1.200"
    },
    {
      id: "ejemplo-2",
      name: "Tomate triturado",
      pricePerKg: "2.10",
      grossWeight: "2.000",
      mermaKg: "0.100",
      usedWeight: "1.900"
    }
  ]
};

// ==========================================
// 2. INTERFACES
// ==========================================

interface Ingrediente {
  id: string;
  name: string;
  pricePerKg: string;
  grossWeight: string;
  mermaKg: string;
  usedWeight: string;
}

// ==========================================
// 3. HELPERS DE LOCALSTORAGE (¡SIN DUPLICACIÓN!)
// ==========================================

// 🆕 Función para cargar datos del localStorage con manejo de errores
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Si el valor existe en el objeto guardado, lo usamos
      if (parsed[key] !== undefined) {
        return parsed[key];
      }
    }
  } catch (error) {
    // Si hay error (JSON corrupto), no rompemos la app
    console.warn('Error loading from localStorage:', error);
  }
  return defaultValue;
};

// 🆕 Función para guardar datos en localStorage con manejo de errores
const saveToStorage = (data: {
  ingredients: Ingrediente[];
  namePlato: string;
  raciones: number;
  precioVenta: number;
}) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// ==========================================
// 4. COMPONENTE PRINCIPAL
// ==========================================

export default function Escandallo() {
  // =========================
  // SEO (No toco nada, está perfecto)
  // =========================
  useEffect(() => {
    document.title = "Calculadora de Escandallo Online Gratis | Restaurante, Catering, Bar, Platos, Bebidas y Cócteles | Jovamna Medina";

    const canonicalUrl = "https://jovamnamedina.com/escandallo";
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link') as HTMLLinkElement;
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
    metaDescription.setAttribute('content', 'Calcula el escandallo de tus platos, cócteles y bebidas gratis. Controla mermas, calcula el coste por ración o copa y optimiza el Food & Beverage Cost de tu restaurante, bar o pub.');

    const metaTags = [
      { property: 'og:title', content: 'Calculadora de Escandallos Profesional (Cocina y Barra)' },
      { property: 'og:description', content: 'Herramienta hostelera para calcular el coste real de platos, bebidas y cócteles. Controla mermas y asegura el beneficio de tu negocio.' },
      { property: 'og:image', content: 'https://jovamnamedina.com/custom-static/images/googleweb.jpg' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Calculadora de Escandallo: Resturante, Catering, Bar, Platos y Bebidas | Jovamna Medina' },
      { name: 'twitter:description', content: 'Controla el coste de tus recetas, copas y la pérdida por merma con esta herramienta interactiva inteligente.' },
      { name: 'twitter:image', content: 'https://jovamnamedina.com/custom-static/images/facebookweb.jpg' },
      { name: 'twitter:label1', content: 'Categoría' },
      { name: 'twitter:data1', content: 'Software de Gestión Hostelera / Gastronomía y Bar' }
    ];

    metaTags.forEach(({ property, name, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement("meta");
        if (property) tag.setAttribute("property", property);
        if (name) tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      if (content) {
        tag.setAttribute('content', content);
      }
    });

    let scriptJsonLd = document.querySelector('script[data-schema="cooking-app"]') as HTMLScriptElement | null;
    if (!scriptJsonLd) {
      scriptJsonLd = document.createElement('script') as HTMLScriptElement;
      scriptJsonLd.type = 'application/ld+json';
      scriptJsonLd.setAttribute('data-schema', 'cooking-app');
      document.head.appendChild(scriptJsonLd);
    }
    scriptJsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Calculadora de Escandallos para Cocina y Bar',
      description: 'Aplicación web gratuita para realizar escandallos de cocina y coctelería, calcular mermas de ingredientes, costes por copa/ración y porcentaje de Food & Beverage Cost.',
      url: canonicalUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      author: {
        '@type': 'Person',
        name: 'Jovamna Medina',
        jobTitle: 'Full Stack Developer',
        url: 'https://jovamnamedina.com/'
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR'
      }
    });
  }, []);

  // =========================
  // 🆕 ESTADOS (AHORA CON EL HELPER loadFromStorage)
  // =========================

  // ✅ Ya no repetimos el mismo código 3 veces
  const [namePlato, setNamePlato] = useState<string>(() =>
    loadFromStorage('namePlato', EJEMPLO_INICIAL.namePlato)
  );

  const [raciones, setRaciones] = useState<number>(() =>
    loadFromStorage('raciones', EJEMPLO_INICIAL.raciones)
  );

  const [precioVenta, setPrecioVenta] = useState<number>(() =>
    loadFromStorage('precioVenta', EJEMPLO_INICIAL.precioVenta)
  );

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<'limpiar' | 'ejemplo' | null>(null);

  // 🆕 Ahora con manejo de errores y validación
  const [ingredients, setIngredients] = useState<Ingrediente[]>(() => {
    const saved = loadFromStorage<Ingrediente[]>('ingredients', []);
    // Si hay datos guardados Y no están vacíos, los usamos
    if (saved && saved.length > 0) {
      return saved;
    }
    // Si no, usamos el ejemplo inicial
    return EJEMPLO_INICIAL.ingredients;
  });

  // =========================
  // 🆕 EFECTO PARA GUARDAR (CON CANDADO DE SEGURIDAD)
  // =========================

  useEffect(() => {
    // 🛡️ SOLO guardar si hay datos reales (no el estado inicial vacío)
    const hasRealData = ingredients.length > 0 || namePlato || raciones > 0;
    
    // Si no hay datos reales, no guardamos (evita pisar datos del usuario)
    if (!hasRealData) return;

    saveToStorage({
      ingredients,
      namePlato,
      raciones,
      precioVenta
    });
  }, [ingredients, namePlato, raciones, precioVenta]);

  // =========================
  // 🆕 HANDLERS CON MEMORIZACIÓN (useCallback) Y VALIDACIONES
  // =========================

  const handleAddRow = useCallback(() => {
    setIngredients(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: '',
        pricePerKg: '',
        grossWeight: '',
        mermaKg: '',
        usedWeight: ''
      }
    ]);
  }, []);




 // const handleRemoveRow = useCallback((id: string) => {
    // 🛡️ No permitir eliminar si solo hay 1 ingrediente
 //   if (ingredients.length <= 1) {
 //     alert('Debe haber al menos un ingrediente en la receta');
 //     return;
//    }

    // 🔥 Confirmación antes de eliminar
//    if (window.confirm('¿Eliminar este ingrediente?')) {
//      setIngredients(prev => prev.filter(row => row.id !== id));
////    }
//  }, [ingredients.length]);



  const handleRemoveRow = useCallback((id: string) => {
  setIngredients(prev => prev.filter(row => row.id !== id));
}, []);

  // 🆕 handleInputChange con validación de campos numéricos
  // ==========================================
// 1. HANDLER CON VALIDACIÓN (CON useCallback)
// ==========================================

// =========================
// HANDLERS DEFINITIVOS
// =========================

const handleInputChange = useCallback((id: string, field: string, value: string) => {
  // Permitimos casi todo mientras se escribe (coma, punto, números)
  let cleanValue = value.replace(',', '.');

  // Solo bloqueamos letras y símbolos raros
  if (field !== 'name' && cleanValue !== '' && !/^\d*\.?\d*$/.test(cleanValue)) {
    return;
  }

  setIngredients(prev =>
    prev.map(row =>
      row.id === id ? { ...row, [field]: cleanValue } : row
    )
  );
}, []);


// ==========================================
// 2. FORMATEO AL PERDER EL FOCO (onBlur)
// ==========================================
const handleInputBlur = useCallback((id: string, field: string) => {
  setIngredients(prev =>
    prev.map(row => {
      if (row.id !== id) return row;

      const value = row[field as keyof Ingrediente] as string;
      if (value === '' || value === '.') return row;

      const num = parseFloat(value);
      if (isNaN(num)) return row;

      // Formateamos a 3 decimales solo al salir del input
      return { ...row, [field]: num.toFixed(3) };
    })
  );
}, []);



  // 🆕 Usamos las constantes EJEMPLO_INICIAL (sin duplicar el código)
  const handleCargarEjemplo = useCallback(() => {
    setNamePlato(EJEMPLO_INICIAL.namePlato);
    setRaciones(EJEMPLO_INICIAL.raciones);
    setPrecioVenta(EJEMPLO_INICIAL.precioVenta);
    setIngredients(EJEMPLO_INICIAL.ingredients);
    setModalOpen(false);
  }, []);

  const handleLimpiarTodo = useCallback(() => {
    setNamePlato('');
    setRaciones(0);
    setPrecioVenta(0);
    setIngredients([]);
    setModalOpen(false);
  }, []);

  const handleConfirmarAccion = useCallback(() => {
    if (modalAction === 'ejemplo') handleCargarEjemplo();
    if (modalAction === 'limpiar') handleLimpiarTodo();
  }, [modalAction, handleCargarEjemplo, handleLimpiarTodo]);

  // =========================
  // 🆕 CÁLCULOS (TU LÓGICA DE NEGOCIO INTACTA)
  // =========================

  const { calculatedRows, totales } = useMemo(() => {
    // Acumuladores
    let totalCompra = 0;
    let totalMermaDinero = 0;
    let totalPesoNeto = 0;
    let totalPesoBruto = 0;       // ← EN LUGAR DE RENDIEMIENTO
    let totalGastoConReposicion = 0;
    let totalCosteRealPorRacion = 0;
    let totalPrecioVentaSugeridoSinIva = 0;
    let totalPrecioVentaSugeridoConIva = 0;

    // ==========================================
    // Helper: acepta tanto kilos como gramos
     // ==========================================
    const parseFlexible = (value: string, isWeight = false) => {
      const num = parseFloat(value) || 0;
      if (!isWeight) return Math.max(0, num); // precios siempre en €
      // 
      // // Si el número es >= 10, asumimos que el usuario escribió en gramos
      if (num >= 10) return num / 1000;
       return Math.max(0, num);
    };


    const rows = ingredients.map((row) => {
      // Usamos el helper
      const precioKg = parseFlexible(row.pricePerKg);                 // €/kg
      const pesoBruto = parseFlexible(row.grossWeight, true);         // kg o g
      const mermaKg = Math.min(parseFlexible(row.mermaKg, true), pesoBruto);


      // 1. Coste de la compra inicial original
      const costeTotalCompra = pesoBruto * precioKg;

      // 2. Peso neto obtenido de la compra original
      const pesoNeto = pesoBruto - mermaKg;

      // 3. Cantidad que el chef va a usar
      const cantidadUsada = row.usedWeight !== undefined && row.usedWeight !== ''
      ? parseFlexible(row.usedWeight, true)
      : pesoNeto;

      // ==========================================
      // 🔥 TU LÓGICA DE NEGOCIO (¡INTACTA!)
      // ==========================================
      const rendimiento = pesoBruto > 0 ? pesoNeto / pesoBruto : 0;
      const brutoNecesario = rendimiento > 0 ? cantidadUsada / rendimiento : 0;
      const cantidadFaltanteKg = Math.max(0, cantidadUsada - pesoNeto);
      const cantidadFaltanteGr = cantidadFaltanteKg * 1000;
      const faltanteBruto = Math.max(0, brutoNecesario - pesoBruto);
      const faltanteBrutoGr = faltanteBruto * 1000;

      // 4. Precio por kilo limpio
      const priceKgSinMerma = pesoNeto > 0 ? costeTotalCompra / pesoNeto : 0;

      // 5. Dinero perdido por la merma
      const dineroPerdidoPorMerma = mermaKg * precioKg;

      // 6. COSTE REAL TOTAL (¡TU FÓRMULA!)
      const costeRealTotal = brutoNecesario * precioKg;

      // 7. Coste por ración
      const nuevoCostePorRacion = raciones > 0 ? (costeRealTotal / raciones) : 0;

      // 8. Precio de venta sugerido
      const precioVentaSugeridoSinIva = nuevoCostePorRacion / 0.30;
      const precioVentaSugeridoConIva = precioVentaSugeridoSinIva * 1.10;

      // Acumuladores Globales
      totalCompra += costeTotalCompra;
      totalMermaDinero += dineroPerdidoPorMerma;
      totalPesoNeto += pesoNeto;
      totalPesoBruto += pesoBruto;     // ← acumula el bruto EN LUGAR DE RENDIMENTO
      totalCosteRealPorRacion += nuevoCostePorRacion;
      totalGastoConReposicion += costeRealTotal;
      //totalRendimiento += rendimiento;
      totalPrecioVentaSugeridoSinIva += precioVentaSugeridoSinIva;
      totalPrecioVentaSugeridoConIva += precioVentaSugeridoConIva;

      return {
        ...row,
        rendimiento: (rendimiento * 100).toFixed(1),
        brutoNecesario: brutoNecesario.toFixed(3),
        faltanteBruto: faltanteBruto.toFixed(3),
        faltanteBrutoGr: faltanteBrutoGr.toFixed(2),
        pesoNeto: pesoNeto.toFixed(3),
        cantidadUsada: cantidadUsada.toFixed(3),
        costeTotalCompra: costeTotalCompra.toFixed(2),
        dineroPerdidoPorMerma: dineroPerdidoPorMerma.toFixed(2),
        priceKgSinMerma: priceKgSinMerma.toFixed(2),
        cantidadFaltante: cantidadFaltanteKg.toFixed(3),
        cantidadFaltanteG: cantidadFaltanteGr.toFixed(0),
        costeRealTotal: costeRealTotal.toFixed(2),
        nuevoCostePorRacion: nuevoCostePorRacion.toFixed(2),
      };
    });


    // ✅MODIFCADO  Rendimiento global real de la receta
     const totalRendimiento = totalPesoBruto > 0
    ? (totalPesoNeto / totalPesoBruto) * 100
    : 0;

    // Cálculos finales
    const beneficio = precioVenta - totalCosteRealPorRacion;
    const foodCost = precioVenta > 0 ? (totalCosteRealPorRacion / precioVenta) * 100 : 0;

    return {
      calculatedRows: rows,
      totales: {
        totalCompra: totalCompra.toFixed(2),
        totalMermaDinero: totalMermaDinero.toFixed(2),
        totalPesoNeto: totalPesoNeto.toFixed(3),
        totalCosteRealPorRacion: totalCosteRealPorRacion.toFixed(2),
        beneficio: beneficio.toFixed(2),
        foodCost: foodCost.toFixed(2),
        totalGastoConReposicion: totalGastoConReposicion.toFixed(2),
        totalRendimiento: totalRendimiento.toFixed(1),   // ahora es un % real (ej: 92.5)
        totalPrecioVentaSugeridoSinIva: totalPrecioVentaSugeridoSinIva.toFixed(2),
        totalPrecioVentaSugeridoConIva: totalPrecioVentaSugeridoConIva.toFixed(2),
      }
    };
  }, [ingredients, raciones, precioVenta]);










  // =========================
  // EXPORTAR PDF (TAL CUAL, FUNCIONA PERFECTO)
  // =========================

 const handleExportarPDF = () => {
  exportarPDF({
    namePlato,
    raciones,
    precioVenta,
    calculatedRows,
    totales
  });
};
  // =========================
  // 🆕 BOTÓN "GUARDAR COPIA" (NUEVA FUNCIONALIDAD)
  // =========================

  const guardarCopia = useCallback(() => {
    const nombre = prompt('¿Qué nombre quieres darle a este escandallo?', namePlato || 'Mi escandallo');
    if (!nombre) return;

    const data = {
      version: '1.0',
      nombre,
      fecha: new Date().toISOString(),
      namePlato,
      ingredients,
      raciones,
      precioVenta,
      totales,
      // Guardamos también los datos calculados para referencia
      calculatedRows
    };

    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `escandallo-${nombre.toLowerCase().replace(/ /g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al guardar copia:', error);
      alert('Error al guardar la copia');
    }
  }, [namePlato, ingredients, raciones, precioVenta, totales, calculatedRows]);

  // =========================
  // 🆕 BOTÓN "CARGAR COPIA" (NUEVA FUNCIONALIDAD)
  // =========================

  const cargarCopia = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        // Validar que tiene los campos necesarios
        if (data.namePlato && data.ingredients && Array.isArray(data.ingredients)) {
          setNamePlato(data.namePlato);
          setRaciones(data.raciones || 10);
          setPrecioVenta(data.precioVenta || 15);
          setIngredients(data.ingredients);
          alert(`✅ Escandallo "${data.nombre || 'sin nombre'}" cargado correctamente`);
        } else {
          alert('❌ El archivo no es un escandallo válido');
        }
      } catch (error) {
        console.error('Error al cargar:', error);
        alert('❌ Error al leer el archivo. Asegúrate de que es un JSON válido.');
      }
    };
    reader.readAsText(file);
    
    // Resetear el input para permitir cargar el mismo archivo de nuevo
    event.target.value = '';
  }, []);




  // =========================
  // UI
  // =========================
  return (
      
    <FullWidthLayout>
  
         <div className="wrapper w-full min-h-screen 
         lg:pt-[98px] 2xl:pt-[94px] lg:pb-[80px] pt-[70px] pb-[50px] 
         md:pt-[70px] md:pb-[50px]">



          {/**INICIO APP */}
          <div className="w-full lg:w-[89%] 2xl:w-[70%] mx-auto lg:px-4 px-3 ">

            {/* HEADER */}
            <div className="flex flex-col w-full mb-2 items-center">
 
         
              <h1 className=" flex lg:flex-row 2xl:flex-row lg:text-4xl text-xl 
              md:text-2xl font-black text-neutral-900 mb-1 leading-6 text-center">
              <FcCalculator className='hidden lg:block'/> Escandallo Profesional Gratuito
              </h1>
       
            

               <h2 className="text-neutral-700 lg:text-lg text-base font-medium  text-center">
               Controla mermas, calcula el coste real y asegura la rentabilidad de tus platos, bebidas y cócteles de forma profesional.
               </h2>

                {/* 👇 NUEVO BLOQUE SEO AQUÍ */}
               <h3 className="text-neutral-800 lg:text-xl text-sm font-bold text-center mt-4 leading-5">
                Simulador y Software de Escandallos Online para Cocina y Barra
               </h3>
               {/* Instrucción Estilizada... (tu código actual sigue igual) */}

              <p className="text-neutral-600 text-sm lg:text-base max-w-3xl mx-auto text-center mt-2">
               Este simulador de escandallos gratis es el programa ideal para cocina,
               hostelería, restaurantes, bares y catering. Un software de escandallos 
                pensado para calcular el coste real de tus productos, platos de cocina 
                 y cócteles, controlando mermas y márgenes sin complicaciones. Perfecto 
                también para calcular el escandallo de un menú de catering para eventos 
                o el coste por copa en la barra de tu bar.
               </p>







         {/* Instrucción Estilizada en una pequeña tarjetita de ayuda */}
         <div className="flex flex-col items-center bg-neutral-50 border border-neutral-200 
          lg:mt-[10px] mt-[6px] rounded-xl text-sm text-neutral-600 shadow-sm py-2 px-2">
          <p className="flex items-center gap-2 font-bold text-neutral-800 mb-1">
         💡 ¿Cómo empezar?
         </p>
         <p className='lg:text-base text-sm text-center'>
         Elimina las filas de ejemplo utilizando el botón de borrar y añade tantas filas como ingredientes necesite tu receta. ¡Los datos se guardan solos!
        </p>
        </div>

         <p className='lg:text-base text-sm text-center'>
          Ejemplo: Si necesitas Gramos escribe <strong>0.500 ó 0.5</strong> = 500 gramos, si es en kilo <strong>2.000 ó 2</strong> = 2 kg.
         </p>
         </div>

      {/* TITULOS*/}
      <div className="lg:grid lg:grid-cols-5 
      md:grid md:grid-cols-7 flex flex-col  
      gap-2 lg:mb-8 mb-4 lg:border-2 lg:border-black 
      xl:border-2 xl:border-black py-1">

         {/* NOMBRE DEL PLATO */}
        <div className=" lg:col-span-3 md:col-span-3 px-2 py-2 rounded-3xl shadow">
          <label className="block lg:text-lg md:text-lg text-base font-bold mb-2 text-center">
          Nombre del Plato
         </label>
         <input
          name="namePlato"
          value={namePlato || ''}  // El || '' evita que React se queje si empieza vacío
          onChange={(e) => setNamePlato(e.target.value)} // Pasamos el texto real que escribe el chef
          type="text"
          placeholder="Ej. Tarta de Queso, Paella de Marisco..."
          className="w-full lg:p-4 p-2 border text-mauve-600 text-center rounded-2xl font-bold lg:text-lg md:text-lg text-base "
           />
         </div>

        {/* RACIONES */}
        <div className="bg-white lg:col-span-1 md:col-span-2 px-2 py-2 rounded-3xl shadow">
          <label className="block lg:text-lg md:text-lg text-base font-bold mb-2 text-center">
            N.º de Raciones
          </label>
          <input
          type="number"
          min="1"
          // Si el estado es 0 (porque está borrando), pintamos vacío '' para que no se bloquee
          value={raciones === 0 ? '' : raciones} 
          onChange={(e) => {
            const val = e.target.value;
            // Si el usuario borra todo, dejamos el estado en 0 temporalmente para que pueda escribir
            if (val === '') {
              setRaciones(0);
            } else {
              // Si escribe, convertimos a número entero
              setRaciones(parseInt(val, 10));
            }
          }}
          // EL TRUCO MAESTRO: Cuando el usuario hace clic fuera del input (onBlur), 
          // si dejó un 0 o un vacío, lo obligamos a convertirse en 1 para proteger los cálculos de la cocina.
          onBlur={() => {
            if (raciones < 1) {
              setRaciones(1);
            }
          }}
          className="w-full lg:p-4 p-2 border text-center rounded-2xl lg:text-lg md:text-lg text-base font-black"/>

        
        </div>

        {/* PRECIO VENTA */}
        <div className="bg-white lg:col-span-1 md:col-span-2  px-2 py-2 rounded-3xl shadow">
          <label className="block lg:text-lg md:text-lg text-base font-bold mb-2 text-center">
            P.V. del Plato (€)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={precioVenta}
            onChange={(e) =>
              setPrecioVenta(
                Math.max(
                  0,
                  parseFloat(e.target.value) || 0
                )
              )
            }
            className="w-full lg:p-4 p-2 border text-center rounded-2xl lg:text-lg md:text-lg text-base font-black text-green-700"
          />
        </div>
      </div>




     
      {/* TABLA */}    {/* TABLA */}
   




      {/* ========================================== */}
{/* 💻 VISTA PARA ORDENADORES ( TABLA ACTUAL) */}
{/* ========================================== */}
{/* 💻 VISTA PARA ORDENADORES */}
<div className="hidden lg:block bg-white shadow overflow-x-auto border-2 border-black">
  <table className="w-full">
    <tbody className="divide-y">
      {ingredients.map((ing) => {
        // Buscamos la fila calculada correspondiente
        const row = calculatedRows.find(r => r.id === ing.id) || {} as any;

        return (
          <React.Fragment key={ing.id}>
            <tr className="hover:bg-gray-50">
              {/* NOMBRE */}
              <td className="p-2">
                <p className='text-center lg:text-base font-extrabold text-blue-500 '>Ingrediente</p>
                <div className='py-2'>
                  <input
                    type="text"
                    value={ing.name}
                    onChange={(e) => handleInputChange(ing.id, 'name', e.target.value)}
                    className="w-full text-center p-2 border rounded-xl text-neutral-900"
                    placeholder="Ej. zanahoria"
                  />
                </div>
              </td>

              {/* PRECIO POR KILO */}
              <td className="p-2">
                <p className='text-center lg:text-sm font-bold text-neutral-900'>
                  Compra <span className="text-red-600">€</span> x Kg/Gr 
                </p>
                <div className='py-2'>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={ing.pricePerKg}
                    onChange={(e) => handleInputChange(ing.id, 'pricePerKg', e.target.value)}
                    onBlur={() => handleInputBlur(ing.id, 'pricePerKg')}
                    className="w-full text-center p-2 border rounded-xl text-neutral-900"
                    placeholder="Ej. 4.00 ó 0.40"
                  />
                </div>
              </td>

              {/* PESO BRUTO */}
              <td className="p-2">
                <p className='text-center lg:text-sm font-bold'>P. Bruto Total en Kg/Gr</p>
                <div className='py-2'>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={ing.grossWeight}
                    onChange={(e) => handleInputChange(ing.id, 'grossWeight', e.target.value)}
                    onBlur={() => handleInputBlur(ing.id, 'grossWeight')}
                    className="w-full text-center p-2 border rounded-xl text-neutral-900"
                    placeholder="Ej. 4 ó 0.350 (gr.)"
                  />
                </div>
              </td>

              {/* MERMA */}
              <td className="p-2">
                <p className='text-center lg:text-sm font-bold'>Merma Total en Kg/Gr</p>
                <div className='py-2'>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={ing.mermaKg}
                    onChange={(e) => handleInputChange(ing.id, 'mermaKg', e.target.value)}
                    onBlur={() => handleInputBlur(ing.id, 'mermaKg')}
                    className="w-full text-center p-2 border rounded-xl text-neutral-900"
                    placeholder="Ej. 0 ó 0.140 (140gr)"
                  />
                </div>
              </td>




               {/* CANTIDAD A USAR */}
              <td className="p-2">
                <p className='text-center lg:text-sm font-bold'>Cantidad Total a Usar Kg/Gr</p>
                <div className='py-2'>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={ing.usedWeight}
                    onChange={(e) => handleInputChange(ing.id, 'usedWeight', e.target.value)}
                    onBlur={() => handleInputBlur(ing.id, 'usedWeight')}
                    className="w-full text-center p-2 border rounded-xl text-neutral-900"
                    placeholder={row.pesoNeto ? `Sugerido: ${row.pesoNeto} kg` : "Ej. 0.500 (500g)"}
                  />
                </div>
              </td>

             
            </tr>





            {/* SEGUNDA FILA */}
            <tr className='bg-neutral-50'>


                  {/* RESULTADOS (solo lectura) */}
              <td className="p-2">
                <p className='text-center lg:text-sm font-bold'>P. Neto x Kg/Gr</p>
                <div className='py-2 text-center text-neutral-900 font-bold'>{row.pesoNeto ?? '0.000'} kg/Gr</div>
              </td>





               <td className="p-2">
                <p className='text-center lg:text-sm font-bold'>Precio x Kg/Gr del P.Neto</p>
                <div className='py-2 text-center text-neutral-900 font-bold'>{row.priceKgSinMerma ?? '0.00'} €</div>
              </td>



              {/**PERDIDA */}
              <td className="p-2">
                <p className='text-center lg:text-sm font-bold text-neutral-900'>Perdida €</p>
                <div className='text-center py-2 text-red-600 font-bold'>-{row.dineroPerdidoPorMerma ?? '0.00'} €</div>
              </td>

           

              {/* Faltante, Compra requerida, Costes... (igual que tenías) */}
              <td className="p-2">
                <p className='text-center lg:text-sm font-bold'>Faltante sin merma</p>
                <div className='text-center py-2'>
                  {parseFloat(row.cantidadFaltante || '0') > 0 ? (
                    <span className='text-amber-600 font-semibold text-xs'>
                      ⚠️ {row.cantidadFaltante} kg / ({row.cantidadFaltanteG} g)
                    </span>
                  ) : (
                    <span className="text-emerald-600 font-medium text-sm">✅ Todo cubierto</span>
                  )}
                </div>
              </td>
              
              {/**TOTAL FALTANTE BRUTO */}
              <td className="p-2">
                <p className='text-center lg:text-sm font-bold'>Faltante Bruto Requerido</p>
                <div className='text-center py-2'>
                  {parseFloat(row.faltanteBruto || '0') > 0 ? (
                    <span className='text-red-600 font-semibold text-xs'>⚠️ {row.faltanteBruto} kg</span>
                  ) : (
                    <span className="text-emerald-600 font-medium text-sm">✅ Todo cubierto</span>
                  )}
                </div>
              </td>

           
             


            </tr>





             {/* TERCERA FILA TERCERA FILA*/}
            <tr className='bg-neutral-50'>
             

            

           
              <td className="p-2 font-black">
                <p className='text-center lg:text-sm font-bold'>Total Bruto a Comprar</p>
                <div className='text-center py-2 text-neutral-900 font-bold'>{row.brutoNecesario} kg</div>
              </td>




               <td className="p-2">
                <p className='text-center lg:text-sm font-bold'>Rendimiento del Ingrediente</p>
                <div className='py-2 text-center text-neutral-900 font-bold'> {row.rendimiento}%</div>
              </td>




                 <td className="p-2 font-black">
                <p className='text-center lg:text-sm font-bold'>Coste Total Final</p>
                <div className='text-center py-2 text-neutral-900 font-bold'>{row.costeRealTotal ?? '0.00'} €</div>
              </td>

              <td className="p-2 font-black">
                <p className='text-center lg:text-sm font-bold'>Coste por racion</p>
                <div className='text-center py-2 text-indigo-600'>{row.nuevoCostePorRacion ?? '0.00'} €</div>
              </td>



              <td className="p-2">
                <p className='text-center lg:text-sm font-bold text-neutral-700'>Eliminar</p>
                <div className='text-center py-2'>
                  <button
                    onClick={() => handleRemoveRow(ing.id)}
                    className="text-red-500 font-bold hover:text-red-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
              </td>


            </tr>








          </React.Fragment>
        );
      })}
    </tbody>
  </table>
</div>


{/* ========================================== */}
{/* 📱 VISTA EN TARJETAS (CARDS) PARA MÓVILES */}
{/* ========================================== */}
{/* ========================================== */}
{/* 📱 VISTA EN TARJETAS (CARDS) PARA MÓVILES */}
{/* ========================================== */}
<div className="block lg:hidden space-y-6">
  {ingredients.map((ing, index) => {
    const row = calculatedRows.find(r => r.id === ing.id) || {} as any;

    return (
      <div key={ing.id} className="bg-white rounded-3xl p-5 shadow-md border border-neutral-100 relative">
        
        {/* Cabecera de la Tarjeta */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-neutral-100">
          <span className="text-xs bg-neutral-100 text-neutral-600 font-bold px-2.5 py-1 rounded-full">
            Ingrediente #{index + 1}
          </span>
          <button 
            onClick={() => handleRemoveRow(ing.id)} 
            className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* BLOQUE 1: DATOS REQUERIDOS (INPUTS) */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-blue-500 mb-1">Nombre del Ingrediente</label>
            <input
              type="text"
              value={ing.name}
              onChange={(e) => handleInputChange(ing.id, 'name', e.target.value)}
              className="w-full text-left px-3 py-2 border rounded-xl text-neutral-900 bg-neutral-50/50"
              placeholder="Ej. zanahoria"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Precio Compra (<span className="text-red-600">€</span> x Kg/Gr)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={ing.pricePerKg}
                onChange={(e) => handleInputChange(ing.id, 'pricePerKg', e.target.value)}
                onBlur={() => handleInputBlur(ing.id, 'pricePerKg')}
                className="w-full text-center px-2 py-2 border rounded-xl text-neutral-900"
                placeholder="Ej. 4.00"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">Cantidad Total a Usar Kg/Gr</label>
              <input
                type="text"
                inputMode="decimal"
                value={ing.usedWeight}
                onChange={(e) => handleInputChange(ing.id, 'usedWeight', e.target.value)}
                onBlur={() => handleInputBlur(ing.id, 'usedWeight')}
                className="w-full text-center px-2 py-2 border rounded-xl text-neutral-900 placeholder:text-[10px]"
                placeholder={row.pesoNeto ? `${row.pesoNeto} kg` : "Ej. 0.500"}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Peso Bruto (Kg/Gr)</label>
              <input
                type="text"
                inputMode="decimal"
                value={ing.grossWeight}
                onChange={(e) => handleInputChange(ing.id, 'grossWeight', e.target.value)}
                onBlur={() => handleInputBlur(ing.id, 'grossWeight')}
                className="w-full text-center px-2 py-2 border rounded-xl text-neutral-900"
                placeholder="Ej. 4.00"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Merma (Kg/Gr)</label>
              <input
                type="text"
                inputMode="decimal"
                value={ing.mermaKg}
                onChange={(e) => handleInputChange(ing.id, 'mermaKg', e.target.value)}
                onBlur={() => handleInputBlur(ing.id, 'mermaKg')}
                className="w-full text-center px-2 py-2 border rounded-xl text-neutral-900"
                placeholder="Ej. 0.140"
              />
            </div>
          </div>
        </div>

        {/* BLOQUE 2: ANÁLISIS ECONÓMICO (solo lectura) */}
        <div className="mt-4 pt-4 border-t border-dashed border-neutral-200 grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
          <div className="bg-neutral-50 p-2 rounded-xl">
            <p className="text-gray-900 font-medium">Peso Neto kg/Gr:</p>
            <p className="font-bold text-neutral-900 mt-0.5">{row.pesoNeto ?? '0.000'} kg</p>
          </div>
          <div className="bg-neutral-50 p-2 rounded-xl">
            <p className="text-gray-900 font-medium">Precio limpio x Kg/Gr:</p>
            <p className="font-bold text-neutral-900 mt-0.5">{row.priceKgSinMerma ?? '0.00'} €</p>
          </div>
          <div className="bg-neutral-50 p-2 rounded-xl">
            <p className="text-red-500 font-medium">Pérdida Merma:</p>
            <p className="font-bold text-red-600 mt-0.5">-{row.dineroPerdidoPorMerma ?? '0.00'} €</p>
          </div>
          <div className="bg-indigo-50 p-2 rounded-xl">
            <p className="text-indigo-600 font-bold">Coste Ración:</p>
            <p className="font-black text-indigo-700 mt-0.5 text-sm">{row.nuevoCostePorRacion ?? '0.00'} €</p>
          </div>

          {/* Faltantes */}
          <div className="col-span-2 bg-amber-50/60 p-2.5 rounded-xl border border-amber-100 flex flex-col justify-center space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600 font-medium">Faltante Neto:</span>
              {parseFloat(row.cantidadFaltante || '0') > 0 ? (
                <span className="text-amber-700 font-bold">⚠️ {row.cantidadFaltante} kg/Gr</span>
              ) : (
                <span className="text-emerald-600 font-bold">✅ Cubierto</span>
              )}
            </div>


            <div className="flex justify-between items-center">
              <span className="text-neutral-600 font-medium">Compra Bruta Requerida:</span>
              {parseFloat(row.faltanteBruto || '0') > 0 ? (
                <span className="text-red-600 font-bold">⚠️ {row.faltanteBruto} kg/Gr</span>
              ) : (
                <span className="text-emerald-600 font-bold">✅ Cubierto</span>
              )}
            </div>




               {/* 🆕 NUEVO: Total Bruto a Comprar */}
              <div className="flex justify-between items-center">
               <span className="text-neutral-600 font-medium">Total Bruto a Comprar:</span>
               <span className="text-neutral-900 font-bold">{row.brutoNecesario ?? '0.000'} kg</span>
              </div>

             {/* 🆕 NUEVO: Rendimiento del Ingrediente */}
            <div className="flex justify-between items-center">
            <span className="text-neutral-600 font-medium">Rendimiento:</span>
           <span className="text-cyan-600 font-bold">{row.rendimiento ?? '0.0'}%</span>
            </div>


          </div>
        </div>

        {/* FOOTER: COSTE TOTAL FINAL */}
        <div className="mt-3 bg-neutral-900 text-white rounded-xl p-3 flex justify-between items-center">
          <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">Coste Total Final:</span>
          <span className="text-base font-black text-amber-400">{row.costeRealTotal ?? '0.00'} €</span>
        </div>

      </div>
    );
  })}
</div>


{/* ========================================== */}
{/* 🚀 BOTONES DE ACCIÓN (MÓVIL Y PC) */}
{/* ========================================== */}
 <div className="w-full flex flex-col lg:flex lg:flex-row justify-center items-center mt-2">


  <div className=' inline-flex w-[100%] sm:w-[100%] justify-center sm:justify-center  px-2 py-2'>
  <button
    onClick={handleAddRow}
    className="w-[90%] sm:w-[80%] lg:w-[100%] sm:mb-[6px] bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-bold shadow-lg transition-colors text-center"
  >
    ➕ Añadir Ingrediente
  </button>
  </div>

  <div className='inline-flex w-[100%] sm:w-[100%] justify-center sm:justify-center px-2  py-2 items-center'>
  <button
   onClick={handleExportarPDF}
    className="w-[90%] sm:w-[80%]  sm:mb-[6px] lg:w-[100%] bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-2xl font-bold shadow-lg transition-colors text-center"
  >
    📥 Descargar Reporte PDF
  </button>




  </div>

  <div className='inline-flex w-[100%] sm:w-[100%]  justify-center sm:justify-center px-2 py-2 items-center'>
  <button
  onClick={() => { setModalAction('ejemplo'); setModalOpen(true); }}
   className="w-[90%] sm:w-[80%]  sm:mb-[6px] lg:w-[100%] bg-mauve-500 hover:bg-blue-700 text-white px-2 py-4 rounded-2xl font-bold shadow-lg transition-colors text-center"
  >
  🔄 Cargar Receta de Ejemplo
</button>
  </div>

 <div className='inline-flex w-[100%] sm:w-[100%] justify-center sm:justify-center px-2'>
 <button
  onClick={() => { setModalAction('limpiar'); setModalOpen(true); }}
    className="w-[90%] sm:w-[80%] lg:w-[100%] bg-yellow-900  hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-bold shadow-lg transition-colors text-center"
  >
  🗑️ Limpiar Todo
</button>
</div>
</div>

{/**MESNAJE DE LOS BOTONES */}
{modalOpen && (
  <div className="fixed inset-0 z-50 
  flex items-center justify-center lg:top-[35%] lg:left-[40%] 
  bg-white w-[60%] h-[35%] top-[50%]  left-[18%]
  sm:w-[50%] sm:h-[20%] sm:left-[26%]
  lg:w-[30%] lg:h-[30%] bg-opacity-40 
  backdrop-blur-sm animate-fade-in">
    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-2 border border-gray-100 text-center">
      {/* Icono de advertencia */}
      <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-amber-100 text-amber-600 mb-4">
        ⚠️
      </div>
      
      {/* Título dinámico según lo que haga el usuario */}
      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
        {modalAction === 'ejemplo' ? '¿Cargar receta de ejemplo?' : '¿Limpiar todos los datos?'}
      </h3>
      
      {/* Mensaje descriptivo */}
      <p className="text-sm text-gray-500 mb-2">
        {modalAction === 'ejemplo' 
          ? 'Se borrará lo que tengas en pantalla para restaurar la Salsa Boloñesa inicial. Esta acción no se puede deshacer.' 
          : 'Vas a vaciar por completo el escandallo actual. Perderás los ingredientes introducidos.'}
      </p>

      {/* Botones de acción del modal */}
      <div className="flex space-x-2 justify-center">
        <button
          onClick={() => setModalOpen(false)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirmarAccion}
          className={`px-4 py-2 text-white font-medium rounded-lg text-sm transition-colors ${
            modalAction === 'ejemplo' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          Sí, confirmar
        </button>
      </div>


    </div>
  </div>
)}


   


        {/* 🆕 NUEVOS BOTONES PARA GUARDAR/CARGAR */}
     
<div className='w-full flex flex-col lg:flex-row items-center 
lg:items-start justify-center lg:justify-start gap-3 mb-4 py-2 
lg:px-0 2xl:px-0 md:px-18 px-4'>

  <div className='w-full lg:w-auto flex justify-center px-2'>
    <button
      onClick={guardarCopia}
      className="w-full lg:w-auto bg-cyan-600 text-white px-4 py-2 rounded-2xl hover:bg-cyan-700 transition"
    >
      💾 Guardar Copia (JSON)
    </button>
  </div>

  <div className='w-full lg:w-auto flex justify-center px-2'>
    <label className="w-full lg:w-auto text-center bg-violet-600 text-white px-4 py-2 rounded-2xl hover:bg-violet-700 transition cursor-pointer">
      📂 Cargar Copia
      <input
        type="file"
        accept=".json"
        onChange={cargarCopia}
        className="hidden"
      />
    </label>
  </div>

</div>


             <div className='py-4'> 
             <p className='text-sm lg:text-base 2xl:text-lg text-center'>
             <strong>📄 Exporta PDF</strong> y Genera un informe para imprimir. Útil para tener un registro visual del escandallo archivando físicamente y controlar los costes
             </p>
        </div>



          <div className='flex flex-col items-center'>
            <div className='py-2'>
                <p className='text-sm lg:text-base 2xl:text-lg text-center'>  
              <strong>💾 Guardar Copia (JSON)</strong> de todos los datos del escandallo en un archivo .json es Útil para editar el escandallo más tarde actualizando precios o mermas sin perder los cálculos y guardar varias versiones de un mismo plato, sin tener que reescribirlo.    
            </p>

            </div>

            
            <div className='py-2'>
               <p className='text-sm lg:text-base 2xl:text-lg text-center'>  
                     
                  <strong>📂 Cargar Copia</strong>  - Carga un archivo .json anteriormente guardado para seguir editándolo, ⚠️ Nota: El archivo JSON no es legible directamente; solo se abre desde la app.
               </p>
            
         
          
          
              </div>

          </div>
  









      {/* RESUMEN */}
    <div className="mt-6 bg-gradient-to-r from-gray-900 to-black text-white p-6 md:p-10 rounded-3xl shadow-2xl">
  <h2 className="lg:text-3xl md:text-4xl text-lg font-black text-center mb-10 text-amber-400">
    📊 RESUMEN DEL CALCULO
  </h2>
  
  {/* 💻 GRID EN 2 FILAS PARA PC (3 columnas) Y 1 COLUMNA EN MÓVIL */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
    
    {/* === FILA 1 EN PC === */}
    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-gray-400 text-lg">Gasto Total Inicial</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-white">{totales.totalCompra} €</p>
    </div>

    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-red-400 text-lg">Dinero Perdido</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-red-500">-{totales.totalMermaDinero} €</p>
    </div>

    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-amber-400 text-lg">Gasto Final con Reposición</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-amber-500">{totales.totalGastoConReposicion} €</p>
    </div>

    {/* === FILA 2 EN PC === */}
    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-indigo-400 text-lg">Coste Real por Ración</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-indigo-400">{totales.totalCosteRealPorRacion} €</p>
    </div>

    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-green-400 text-lg">Beneficio por Plato</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-green-400">{totales.beneficio} €</p>
    </div>

    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-cyan-400 text-lg">Rendimiento Global</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-cyan-400">{totales.totalRendimiento}%</p>
    </div>

    {/**=== FILA 3 PC, MOVILES */}
    
    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-green-400 text-lg">Precio Sugerido Sin Iva por Plato</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-green-400">{totales.totalPrecioVentaSugeridoSinIva} €</p>
    </div>

    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-cyan-400 text-lg">Precio Sugerido Con Iva por Plato</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-cyan-400">{totales.totalPrecioVentaSugeridoConIva} €</p>
    </div>






  </div>

  {/* 👑 EL REY DE LAS MÉTRICAS: DESTACADO ABAJO EN GRANDE */}
  <div className="mt-12 pt-8 border-t border-gray-800 text-center">
    <p className="text-gray-400 text-xl mb-2">Food Cost de la Receta</p>
    <p className="lg:text-7xl md:text-6xl text-3xl font-black text-amber-400 tracking-tight">{totales.foodCost}%</p>
    <p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto">
      * Porcentaje ideal recomendado para el control de costes del restaurante.
    </p>
  </div>

   </div>


             </div>
            {/**FIN APP */}
        


       {/** INICO FAQS*/}
       {/* FAQ SEO 👇 AQUÍ */}
<div className="mt-12 max-w-3xl mx-auto px-2 ">
  <h3 className="text-neutral-900 lg:text-2xl text-lg font-black text-center mb-6">
    Preguntas Frecuentes
  </h3>
  <div className="flex flex-col gap-5">
    <div>
      <p className="font-bold text-neutral-800 lg:text-base text-sm">¿Es gratis este programa de escandallos?</p>
      <p className="text-neutral-600 text-sm lg:text-base mt-1 text-justify">Sí, este simulador de escandallos es completamente gratuito y no requiere registro para calcular el coste de tus recetas.</p>
    </div>
    <div>
      <p className="font-bold text-neutral-800 lg:text-base text-sm">¿Sirve para hostelería, bares y catering?</p>
      <p className="text-neutral-600 text-sm lg:text-base mt-1 text-justify">Sí, el software está pensado tanto para cocina como para barra, y se adapta a restaurantes, bares, catering y otros negocios de hostelería.</p>
    </div>
    <div>
      <p className="font-bold text-neutral-800 lg:text-base text-sm">¿Puedo calcular el escandallo de un cóctel o solo de platos de cocina?</p>
      <p className="text-neutral-600 text-sm lg:text-base mt-1 text-justify">Puedes usar la herramienta tanto para platos de cocina como para cócteles y bebidas, calculando el coste por ración o por copa.</p>
    </div>
  </div>
</div>

       {/**FIN FAQS */}





  </div>
     </FullWidthLayout>



  );
}










