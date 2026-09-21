   
import React from 'react'; // Agrega esta línea arriba del todo

import FullWidthLayout from "../../hocs/FullWidthLayout";
import { FcCalculator } from "react-icons/fc";

import { useState, useEffect, useMemo, useCallback } from 'react';

import { exportarPDF } from './components/exportarPdf';
import ConsejosMermas  from './components/consejosMermas';










// ==========================================
// 1. CONSTANTES (UN SOLO LUGAR)
// ==========================================

const STORAGE_KEY = 'escandallo-data';

// 🆕 Tu ejemplo en un solo lugar (¡no más duplicación!)
const EJEMPLO_INICIAL:{
  namePlato: string;
  raciones: number;
  precioVenta: number;
  gastosFijosPorRacion: number;
  ingredients: Ingrediente[];
 }={
  namePlato: "Salsa Boloñesa Casera 🍝",
  raciones: 10,
  precioVenta: 15,
  gastosFijosPorRacion: 6, // 🆕 añadido, faltaba
  ingredients: [
    {
      id: "ejemplo-1",
      name: "Carne picada de ternera",
      priceTotalCompra: 8.50,
      grossWeight: 2.700,
      mermaKg: 0.290,
      usedWeight: 2.700,
      unitGross: 'kg',
      unitMerma: 'kg',
      unitUsed: 'kg',
      density: undefined             // no es líquido
    },
    {
      id: "ejemplo-2",
      name: "Tomate triturado",
      priceTotalCompra: 2.80,
      grossWeight: 2.600,
      mermaKg: 0.100,
      usedWeight: 1.900,
      unitGross: 'kg',
      unitMerma: 'kg',
      unitUsed: 'kg',
      density: 1.05                 // por ejemplo, densidad del tomate
    }
  ]
};

// ==========================================
// 2. INTERFACES
// ==========================================

//interface Ingrediente {
//  id: string;
  //name: string;
//  priceTotalCompra: string;
//  grossWeight: string;
//  mermaKg: string;
//  usedWeight: string;
//}


interface Ingrediente {
  id: string;
  name: string;
  priceTotalCompra: number;  // precio total en euros (número)
  grossWeight: number;       // siempre en KG (unidad base para peso)
  mermaKg: number;           // siempre en KG
  usedWeight: number;        // siempre en KG
  // Unidades que el USUARIO selecciona para cada campo (para mostrar y parsear)
  unitGross: 'kg' | 'g' | 'l'; 
  unitMerma: 'kg' | 'g' | 'l';
  unitUsed: 'kg' | 'g' | 'l';
  // Opcional: si es líquido, la densidad en kg/l (para convertir litros a kg)
  density?: number; // si no se provee, asumimos 1 (agua)
}

const parseAndConvertToKg = (raw: string, selectedUnit: 'kg' | 'g' | 'l', density = 1): number => {
  let clean = raw.trim().replace(',', '.').replace(/\s/g, '');
  if (clean === '') return 0;

  // Detectar unidad en el string
  let detectedUnit = selectedUnit;
  if (clean.toLowerCase().includes('kg')) detectedUnit = 'kg';
  else if (clean.toLowerCase().includes('g') && !clean.toLowerCase().includes('kg')) detectedUnit = 'g';
  else if (clean.toLowerCase().includes('l')) detectedUnit = 'l';

  // Quitar letras
  const numericStr = clean.replace(/[^0-9.]/g, '');
  const num = parseFloat(numericStr);
  if (isNaN(num) || num < 0) return 0;

  //switch (selectedUnit) {
  switch (detectedUnit) {
    case 'g': return num / 1000;
    case 'l': return num * density;
    default: return num;
  }
};






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
  gastosFijosPorRacion: number; // ← ALQUILERES
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

    //DEBE CONCIDIR CON LA VIEW DE DJANGO DE SEO_TITLE
    document.title = "Calculadora de Escandallos Online Gratis y Sin Registro";


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
 
    metaDescription.setAttribute('content', 'Calcula el coste y margen de tus platos y bebidas al instante. Herramienta 100% gratuita, sin registros y sin anuncios. Incluye análisis de beneficios.');


    const metaTags = [
      { property: 'og:title', content: 'Calculadora de Escandallo de Cocina y Bar Gratis' },
      { property: 'og:description', content: 'Herramienta online gratuita para calcular el coste real de tus platos y cócteles. Controla mermas y asegura tu beneficio.' },
      { property: 'og:image', content: 'https://jovamnamedina.com/custom-static/images/googleweb.jpg' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Calculadora de Escandallos Online Gratis' },
      { name: 'twitter:description', content: 'Calcula el coste de tus recetas de cocina y coctelería gratis. Controla mermas y costes.' },
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

    //NUEVO
  const [gastosFijosPorRacion, setGastosFijosPorRacion] = useState<number>(() =>
    loadFromStorage('gastosFijosPorRacion', EJEMPLO_INICIAL.gastosFijosPorRacion)
  );

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<'limpiar' | 'ejemplo' | null>(null);




  const [ingredients, setIngredients] = useState<Ingrediente[]>(() => {
  const saved = loadFromStorage<Ingrediente[]>('ingredients', []);
  if (saved && saved.length > 0) {
    // MIGRACIÓN: si los campos son strings, los convertimos a number y añadimos unidades
    return saved.map(item => ({
      id: item.id,
      name: item.name || '',
      priceTotalCompra: typeof item.priceTotalCompra === 'string' 
        ? parseFloat(item.priceTotalCompra) || 0 
        : item.priceTotalCompra,
      grossWeight: typeof item.grossWeight === 'string' 
        ? parseFloat(item.grossWeight) || 0 
        : item.grossWeight,
      mermaKg: typeof item.mermaKg === 'string' 
        ? parseFloat(item.mermaKg) || 0 
        : item.mermaKg,
      usedWeight: typeof item.usedWeight === 'string' 
        ? parseFloat(item.usedWeight) || 0 
        : item.usedWeight,
      // Si no tienen unidades, las ponemos por defecto a 'kg'
      unitGross: item.unitGross || 'kg',
      unitMerma: item.unitMerma || 'kg',
      unitUsed: item.unitUsed || 'kg',
      density: item.density || undefined,
    }));
  }
  // Si no hay guardado, usamos el ejemplo inicial (que ya tiene la nueva estructura)
  return EJEMPLO_INICIAL.ingredients;
  });

  const [infoVisible, setInfoVisible] = useState<string | null>(null);





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
      precioVenta,
      gastosFijosPorRacion, // ← ALQUILERES
    });
  }, [ingredients, namePlato, raciones, precioVenta, gastosFijosPorRacion]);

  // =========================
  // 🆕 HANDLERS CON MEMORIZACIÓN (useCallback) Y VALIDACIONES
  // =========================

  const handleAddRow = useCallback(() => {
    setIngredients(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: '',
        priceTotalCompra: 0,
        grossWeight: 0,
        mermaKg: 0,
        usedWeight: 0,
        unitGross: 'kg',
        unitMerma: 'kg',
        unitUsed: 'kg',
        density: undefined, // o 1 si quieres asumir agua
      }
    ]);
  }, []);


  const handleRemoveRow = useCallback((id: string) => {
  setIngredients(prev => prev.filter(row => row.id !== id));
}, []);


  //===================================================================
  // Formateador EN RESULTADOS inteligente de pesos (elimina ceros innecesarios)
  //======================================
const formatCleanWeight = (value: number | string | null | undefined, unit: string = 'kg'): string => {
  if (value === undefined || value === null || value === '') return `0 ${unit === 'l' ? 'L' : unit}`;

  const num = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
  if (isNaN(num)) return `0 ${unit === 'l' ? 'L' : unit}`;

  // El valor SIEMPRE llega en kg: convertimos si la unidad de visualización es gramos
  const displayNum = unit === 'g' ? num * 1000 : num;
  const maxDecimals = unit === 'g' ? 2 : 3;
  const rounded = parseFloat(displayNum.toFixed(maxDecimals));

  const formatted = new Intl.NumberFormat('es-ES', {
    maximumFractionDigits: maxDecimals,
    useGrouping: false
  }).format(rounded);

  const displayUnit = unit === 'l' ? 'L' : unit;
  return `${formatted} ${displayUnit}`;
};





 //================================================================================
// 🆕 Formatea el número que se ve en el INPUT: sin ceros de más, con coma española
//=========================================================================
//NO LO ESTOY USANDO PORQUE NO ME DEJA PONER 0.0365 CANDO ESTA EN GRAMOS
const formatEditableNumber = (num: number, unit: 'kg' | 'g' | 'l'): string => {
  const displayNum = unit === 'g' ? num * 1000 : num;
  const maxDecimals = unit === 'g' ? 2 : 3; // gramos en enteros, kg/l hasta 3 decimales

  // Redondeamos antes de formatear para evitar artefactos de coma flotante
  // (ej: 0.29 * 1000 puede dar 289.99999999999994 en JS)
  const rounded = parseFloat(displayNum.toFixed(maxDecimals));

  return new Intl.NumberFormat('es-ES', {
    maximumFractionDigits: maxDecimals,
    useGrouping: false // evita el "1.234" confundiéndose con separador de miles
  }).format(rounded);
};


 //================================================================================
// 🆕 Formatea LOS PRECIOS
//=========================================================================
const formatPrice = (value: number | string | null | undefined): string => {
  if (value === undefined || value === null || value === '') return '0,00';
  const num = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
  if (isNaN(num)) return '0,00';
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
    // useGrouping en true por defecto: aquí SÍ queremos separador de miles,
    // al contrario que en los pesos, porque un precio como "87.000" no se confunde
    // con un peso de "87 kg" — el símbolo € y el contexto lo dejan claro.
  }).format(num);
};


  // ==========================================
// 1. HANDLER CON VALIDACIÓN (CON useCallback)
// ==========================================
// Añade un estado para los textos de los inputs (uno por fila y campo)
const [inputValues, setInputValues] = useState<Record<string, string>>({});

// Helper para obtener la clave única de cada input
const getInputKey = (id: string, field: string) => `${id}-${field}`;

// Handler onChange: actualiza el texto local
const handleInputChange = useCallback((id: string, field: string, value: string) => {
  // Si es nombre o precio, actualiza directamente el estado global
  if (field === 'name' || field === 'priceTotalCompra') {
    setIngredients(prev =>
      prev.map(row =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
    return; // Salimos, no usamos inputValues
  }

  // Para campos de peso, guardamos en inputValues (como ya tenías)
  setInputValues(prev => ({
    ...prev,
    [getInputKey(id, field)]: value
  }));
}, []);


// Handler onBlur: parsea y actualiza el estado global
const handleInputBlur = useCallback((id: string, field: string) => {
  const key = getInputKey(id, field);
  const raw = inputValues[key] || '';

  // Buscamos el ingrediente actual para saber su unidad seleccionada
  const ingredient = ingredients.find(i => i.id === id);
  if (!ingredient) return;

  let unit: 'kg' | 'g' | 'l';
  let density = 1;
  // Determinamos qué unidad corresponde a este campo
  if (field === 'grossWeight') {
    unit = ingredient.unitGross;
    density = ingredient.density || 1;
  } else if (field === 'mermaKg') {
    unit = ingredient.unitMerma;
    density = ingredient.density || 1;
  } else if (field === 'usedWeight') {
    unit = ingredient.unitUsed;
    density = ingredient.density || 1;
  } else {
    return; // no es un campo de peso
  }

  // Parseamos el texto y lo convertimos a KG
  const valueInKg = parseAndConvertToKg(raw, unit, density);

  // Actualizamos el ingrediente en el estado global
  setIngredients(prev =>
    prev.map(row =>
      row.id === id ? { ...row, [field]: valueInKg } : row
    )
  );

  // Limpiamos el texto local (opcional)
  setInputValues(prev => {
    const newState = { ...prev };
    delete newState[key];
    return newState;
  });
}, [ingredients, inputValues]);

// Además, necesitas una función para mostrar el valor en el input:
// Cuando el input no tiene foco, mostramos el valor en KG formateado según la unidad.
// Cuando tiene foco, mostramos el texto local (si existe) o el valor formateado.
// Esto se puede hacer con un estado de "focus" o simplemente mostrando siempre el texto local
// si existe, y si no, mostrando el valor formateado.

// En el render de cada input:
const getDisplayValue = (ingredient: Ingrediente, field: string) => {
  const key = getInputKey(ingredient.id, field);
  if (inputValues[key] !== undefined) return inputValues[key];

  const value = ingredient[field as keyof Ingrediente];
  // Asegurar que es número
  const num = typeof value === 'number' ? value : parseFloat(value as string) || 0;

  let unit: 'kg' | 'g' | 'l';
  if (field === 'grossWeight') unit = ingredient.unitGross;
  else if (field === 'mermaKg') unit = ingredient.unitMerma;
  else if (field === 'usedWeight') unit = ingredient.unitUsed;
  else return '';

  //if (unit === 'g') {
  //  return (num * 1000).toString();
  //} else {
  //  return num.toFixed(3);
  //}

  return formatEditableNumber(num, unit)

};

// ==========================================
// 2. FORMATEO AL PERDER EL FOCO (onBlur)
// ==========================================
const handleBlur = useCallback((id: string, field: string) => {
  setIngredients(prev =>
    prev.map(row => {
      if (row.id !== id) return row;

      const rawValue = row[field as keyof Ingrediente] as string;

      if (!rawValue || rawValue === '' || rawValue === '.') return row;

      const normalizedValue = String(rawValue).replace(',', '.');
      const num = parseFloat(normalizedValue);

      if (isNaN(num)) {
        return { ...row, [field]: '0' };
      }

      // 🔧 Coma en vez de punto, y siempre 2 decimales (es dinero, no pesa)
      const formatted = new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false
      }).format(num);

      return { ...row, [field]: formatted };
    })
  );
}, []);





  // 🆕 Usamos las constantes EJEMPLO_INICIAL (sin duplicar el código)
  const handleCargarEjemplo = useCallback(() => {
    setNamePlato(EJEMPLO_INICIAL.namePlato);
    setRaciones(EJEMPLO_INICIAL.raciones);
    setPrecioVenta(EJEMPLO_INICIAL.precioVenta);
    setGastosFijosPorRacion(EJEMPLO_INICIAL.gastosFijosPorRacion); // 🆕
    setIngredients(EJEMPLO_INICIAL.ingredients);
    setModalOpen(false);
  }, []);

  const handleLimpiarTodo = useCallback(() => {
    setNamePlato('');
    setRaciones(0);
    setPrecioVenta(0);
    setGastosFijosPorRacion(0); // 🆕
    setIngredients([]);
    setModalOpen(false);
  }, []);

  const handleConfirmarAccion = useCallback(() => {
    if (modalAction === 'ejemplo') handleCargarEjemplo();
    if (modalAction === 'limpiar') handleLimpiarTodo();
  }, [modalAction, handleCargarEjemplo, handleLimpiarTodo]);







  // ===========================================================================================================================
  // 🆕 USEMEMO CÁLCULOS (TU LÓGICA DE NEGOCIO INTACTA) USEMEMO USEMEMO USEMEMO
  // ============================================================================================================================

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
  
    const parseFlexible = (val: string | number | null | undefined): number => {
      if (val === undefined || val === null || val === '') return 0;
      if (typeof val === 'number') return Math.max(0, val);
      const parsed = parseFloat(String(val).replace(',', '.'));
       return isNaN(parsed) || parsed < 0 ? 0 : parsed;
      };
    
    const rows = ingredients.map((row) => {
      const precioTotalCompra = parseFlexible(row.priceTotalCompra); // o row.priceTotal si
      // 1. Coste de la compra (ahora es directamente el que puso el usuario)
      const costeTotalCompra = precioTotalCompra;
      //LOS KILOS O KILO COMPRADOS
      const pesoBruto = parseFlexible(row.grossWeight);         // kg o g
       //PRECIO POR KILO EN BRUTO calculamos 20 EUROS ENTRE 5 KILOS
      const priceBrutokilo = pesoBruto > 0 ?  costeTotalCompra / pesoBruto : 0;
    

      //VALIDACION: La merma no puede ser nunca mayor que el peso total (P.BRUTO) del ingrediente
      const mermaKg = Math.min(parseFlexible(row.mermaKg), pesoBruto);
      const pesoNeto = pesoBruto - mermaKg;

      // 4. Precio por kilo limpio
      const priceKgSinMerma = pesoNeto > 0 ? costeTotalCompra / pesoNeto : 0;
      const rendimiento = pesoBruto > 0 ? pesoNeto / pesoBruto : 0;
        // 3. Cantidad que el chef va a usar
      const cantidadUsada = row.usedWeight > 0 
      ? parseFlexible(row.usedWeight) 
      : pesoNeto;

      //const brutoNecesario = rendimiento > 0 ? cantidadUsada / rendimiento : 0;
      const totalBrutoNecesario = rendimiento > 0 ? cantidadUsada / rendimiento : 0;
      const dineroPerdidoPorMerma = (totalBrutoNecesario - cantidadUsada) * priceBrutokilo;  //ORIGINAL
      //const dineroPerdidoPorMerma = (cantidadUsada - totalBrutoNecesario) * priceBrutokilo;
      //const dineroPerdidoPorMerma = -((totalBrutoNecesario - cantidadUsada) * priceBrutokilo);

      const faltanteSinMermaNetoKg = Math.max(0, cantidadUsada - pesoNeto);
      const faltanteSinMermaNetoGr = faltanteSinMermaNetoKg  * 1000;
     ///calculo de lo que sabemos que se necesita - lo usado en receta
      const faltanteBruto = Math.max(0, totalBrutoNecesario - pesoBruto);
      //Esa operación solo hace un cambio de unidad: pasa los kilos sobrantes que te faltan a gramos, multiplicando por 1.000.
      const faltanteBrutoGr = faltanteBruto * 1000;
      // 6. COSTE REAL TOTAL
      const costeRealTotal = totalBrutoNecesario * priceBrutokilo;
      // 7. Coste por ración  FINAL QUE DEBO USAR
      const nuevoCostePorRacion = raciones > 0 ? (costeRealTotal / raciones) : 0;

      // 8. Precio de venta sugerido
      const precioVentaSugeridoSinIva = nuevoCostePorRacion / 0.30;
      const precioVentaSugeridoConIva = precioVentaSugeridoSinIva * 1.10;

      //NUEVO PARA LOS GRAMOS
      const decimalesFaltante = row.unitUsed === 'g' ? 5 : 3;


      // Acumuladores Globales
      totalCompra += costeTotalCompra;
      totalMermaDinero += dineroPerdidoPorMerma;
      totalPesoNeto += pesoNeto;
      totalPesoBruto += pesoBruto;     // ← acumula el bruto EN LUGAR DE RENDIMENTO
      totalCosteRealPorRacion += nuevoCostePorRacion;
      totalGastoConReposicion += costeRealTotal;
      totalPrecioVentaSugeridoSinIva += precioVentaSugeridoSinIva;
      totalPrecioVentaSugeridoConIva += precioVentaSugeridoConIva;
    

      return {
        ...row,
        rendimiento: (rendimiento * 100).toFixed(1),

        totalBrutoNecesario: totalBrutoNecesario.toFixed(decimalesFaltante),
        faltanteBruto: faltanteBruto.toFixed(decimalesFaltante),

        //totalBrutoNecesario: totalBrutoNecesario.toFixed(3),
       // faltanteBruto: faltanteBruto.toFixed(3),
        faltanteBrutoGr: faltanteBrutoGr.toFixed(0),

        pesoNeto: pesoNeto.toFixed(decimalesFaltante),
        cantidadUsada: cantidadUsada.toFixed(decimalesFaltante),
        //pesoNeto: pesoNeto.toFixed(3),
        //cantidadUsada: cantidadUsada.toFixed(3),



        costeTotalCompra: formatPrice(costeTotalCompra),          // 🔧
        dineroPerdidoPorMerma: formatPrice(dineroPerdidoPorMerma), // 🔧
        priceBrutokilo: formatPrice(priceBrutokilo),                // 🔧
        priceKgSinMerma: formatPrice(priceKgSinMerma),   
        //costeTotalCompra: costeTotalCompra.toFixed(2),
        //dineroPerdidoPorMerma: dineroPerdidoPorMerma.toFixed(2),
        //NUEVO
        //priceBrutokilo: priceBrutokilo.toFixed(2),
        //priceKgSinMerma: priceKgSinMerma.toFixed(2),

        faltanteSinMermaNetoKg: faltanteSinMermaNetoKg.toFixed(decimalesFaltante),
        //faltanteSinMermaNetoKg:faltanteSinMermaNetoKg.toFixed(3),
        faltanteSinMermaNetoGr: faltanteSinMermaNetoGr.toFixed(0),



        costeRealTotal: formatPrice(costeRealTotal),                 // 🔧
        nuevoCostePorRacion: formatPrice(nuevoCostePorRacion),      
        //costeRealTotal: costeRealTotal.toFixed(2),
        //nuevoCostePorRacion: nuevoCostePorRacion.toFixed(2),


      };
    });


     // ✅MODIFCADO  Rendimiento global real de la receta
     const totalRendimiento = totalPesoBruto > 0
     ? (totalPesoNeto / totalPesoBruto) * 100
     : 0;

     const beneficio = precioVenta > 0
     ? precioVenta - totalCosteRealPorRacion
     : null;

     // 2. Food Cost solo si hay precio de venta
     const foodCost = precioVenta > 0
     ? (totalCosteRealPorRacion / precioVenta) * 100
     : null
    


     // ===========================================================================================================
     // CALCULO CON GASTOS FIJOS EN EUROS AÑADIDOS POR EL USUARIO + EL 20% RENTABILIDAD (no modifica nada anterior)
    // =============================================================================================================
    // 1. Convertir y verificar si REALMENTE introdujo gastos fijos
    const numGastosFijos = parseFloat(String(gastosFijosPorRacion));
    const tieneGastosFijos = !isNaN(numGastosFijos) && numGastosFijos > 0;
    const gastosFijos = tieneGastosFijos ? numGastosFijos : 0;

    // 2. Coste Total Base del plato
    const costeTotalPlato = totalCosteRealPorRacion + gastosFijos;

    // 3. Aplicar margen y 4. IVA SOLO si tiene gastos fijos
    let precioFinalSinIva = null;
    let precioFinalConIva = null;

    if (tieneGastosFijos) {
     const porcentajeMargen = 20;
     precioFinalSinIva = costeTotalPlato * (1 + porcentajeMargen / 100);
     precioFinalConIva = precioFinalSinIva * 1.10;
    }




    return {
      calculatedRows: rows,
      totales: {
        totalCompra: formatPrice(totalCompra), // 
        //totalCompra: totalCompra.toFixed(2),
        totalMermaDinero: formatPrice(totalMermaDinero),     
        //totalMermaDinero: totalMermaDinero.toFixed(2),
        totalPesoNeto: totalPesoNeto.toFixed(3),
        totalCosteRealPorRacion: formatPrice(totalCosteRealPorRacion),
        //totalCosteRealPorRacion: totalCosteRealPorRacion.toFixed(2),
        beneficio: beneficio !== null ? beneficio.toFixed(2) : null,
        foodCost: foodCost !== null ? foodCost.toFixed(2) : null,
        totalGastoConReposicion: formatPrice(totalGastoConReposicion),
        //totalGastoConReposicion: totalGastoConReposicion.toFixed(2),
        totalRendimiento: totalRendimiento.toFixed(1),   // ahora es un % real (ej: 92.5)
        totalPrecioVentaSugeridoSinIva: formatPrice(totalPrecioVentaSugeridoSinIva),
        //totalPrecioVentaSugeridoSinIva: totalPrecioVentaSugeridoSinIva.toFixed(2),
        totalPrecioVentaSugeridoConIva: formatPrice(totalPrecioVentaSugeridoConIva),
        //totalPrecioVentaSugeridoConIva: totalPrecioVentaSugeridoConIva.toFixed(2),

          //NUEVO ALQUILERES GASTOS FIJOS
        // ← Solo se añade esto nuevo
        precioFinalSinIva: precioFinalSinIva !== null ? precioFinalSinIva.toFixed(2) : null,
        precioFinalConIva: precioFinalConIva !== null ? formatPrice(precioFinalConIva) : null,
        //precioFinalConIva: precioFinalConIva !== null ? precioFinalConIva.toFixed(2) : null,
  

      }
    };
  }, [ingredients, raciones, precioVenta, gastosFijosPorRacion]);




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
    gastosFijosPorRacion, // 🔧 esto faltaba
    totales,
    calculatedRows
  };

  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
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
}, [namePlato, ingredients, raciones, precioVenta, gastosFijosPorRacion, totales, calculatedRows]);



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

      if (data.namePlato && data.ingredients && Array.isArray(data.ingredients)) {
        setNamePlato(data.namePlato);
        setRaciones(data.raciones || EJEMPLO_INICIAL.raciones); // 🔧 antes: || 10
        setPrecioVenta(data.precioVenta || EJEMPLO_INICIAL.precioVenta); // 🔧 antes: || 15
        setGastosFijosPorRacion(data.gastosFijosPorRacion || EJEMPLO_INICIAL.gastosFijosPorRacion); // 🔧 esto faltaba
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
          <div className="w-full lg:w-[93%] 2xl:w-[89%] mx-auto lg:px-4 px-3  bg-white">

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
                 y cócteles, para un menú de catering para eventos o coste por copa en la barra 
                 de tu bar controlando mermas y márgenes sin complicaciones. 
         
               </p>



         {/* Instrucción Estilizada en una pequeña tarjetita de ayuda */}
         <div className="flex flex-col items-center bg-neutral-50 shadow-xl/20 border border-neutral-200 
          lg:mt-[4px] mt-[5px] 2xl:mt-[8px] rounded-xl text-sm text-neutral-600 shadow-sm py-2 px-2">
          <p className="flex items-center gap-2 font-bold text-neutral-800 mb-1">
         💡 ¿Cómo empezar?
         </p>
         <p className='lg:text-base text-sm text-center'>
          El escandallo carga una receta de ejemplo para que veas cómo funciona. Puedes eliminarla con el botón "Limpiar todo" y añadir los ingredientes de tu receta. ¡Los datos se guardan automáticamente!
        </p>
      

         <p className='lg:text-base text-sm text-center 2xl:mt-[2px] px-2'>
          Selecciona la unidad<strong> (Kg, g o L)</strong> y escribe la cantidad correspondiente. Por ejemplo: <strong>500</strong> si 
          eliges <strong>gramos </strong>, ó <strong>0,5 Kg</strong>; si eliges <strong>kilos</strong>
         </p>

         </div>

           </div>

      {/* PRIMER BLOQUE  TITULOS*/}
      <div className="lg:grid lg:grid-cols-5 
      md:grid md:grid-cols-4 sm:grid sm:grid-cols-4 
      flex flex-col  md:gap-2
     lg:mb-8 mb-4 lg:border-2 lg:border-black 
      xl:border-2 xl:border-black py-1">

         {/* NOMBRE DEL PLATO */}
        <div className="lg:col-span-2 md:col-span-2 sm:col-span-2 px-2 py-2 rounded-3xl shadow">
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
        <div className="bg-white lg:col-span-1 md:col-span-2 sm:col-span-2 px-2 py-2 rounded-3xl shadow">
          <label className="block lg:text-base md:text-lg text-base font-bold mb-2 text-center">
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
        <div className="flex flex-col items-center bg-white lg:col-span-1 md:col-span-2  px-2 py-2 rounded-3xl shadow">


         <div className='flex flex-row'>
          <label className="block lg:text-base md:text-lg text-base font-bold mb-2 text-center">
           P.V. del Plato (€) 
            </label>
            <div className="ml-2 relative inline-block group">
              <button
              type="button"
              onClick={() =>
                setInfoVisible(
                  infoVisible === "precio"
                  ? null
                  : "precio"
                )
              }
              className="text-green-700 font-extrabold">[i]
              </button>
              <div className={`absolute z-10 w-64 p-2 text-xs text-white bg-gray-800 rounded-lg 
              lg:right-1/2 lg:translate-x-1/4 right-1/2 translate-x-1/4 mt-2 ${infoVisible === 'precio' ? 'block' : 'hidden'} group-hover:block`}>
               Déjalo en 0, si necesitas que la aplicación calcule el precio recomendado.
                </div>
              </div>
       
          </div>




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



        {/* GASTOS FIJOS ALQUILER LUZ NOMINAS */}
        <div className="flex flex-col items-center bg-white lg:col-span-1 md:col-span-2 px-2 py-2 rounded-3xl shadow">
           <div className='flex flex-row'>
            <label className="block text-center lg:text-base md:text-lg text-base font-bold mb-2">
              G.Fijos x Ración(€)
              </label>
              <div className="ml-2 relative inline-block group">
                 <button
                  type="button"
                  onClick={() =>
                    setInfoVisible(infoVisible === "gastos" 
                      ? null
                      : "gastos"
                    )
                  }
                  className="font-extrabold text-purple-700">
                  [i]
                 </button>

                  <div className={`absolute z-10 w-64 p-2 text-xs text-white bg-gray-800 rounded-lg 
                    right-1/2 lg:translate-x-1/8 translate-x-1/4 mt-2 ${infoVisible === 'gastos' ? 'block' : 'hidden'} group-hover:block`}>
                      Opcional. Si lo dejas en 0, la aplicación estimará el precio recomendado aplicando un margen orientativo del 30% más IVA.
                </div>
               
              </div>
            </div>

            <input
            type="number"
            min="0"
            step="0.01"
            value={gastosFijosPorRacion}
            onChange={(e) => {
              const valor = parseFloat(e.target.value);
              setGastosFijosPorRacion(isNaN(valor) ? 0 : Math.max(0, valor));
            }}
            className="w-full lg:p-4 p-2 border text-center rounded-2xl lg:text-lg md:text-lg text-base font-black text-purple-700"
            placeholder="0.00"
            />
            <p className="text-[11px] text-center text-neutral-500 mt-1">
              Alquiler, personal en €/plato(opcional)
              </p>
        </div>

      </div>






     
  {/* TABLA */}    {/* TABLA */}
   
 {/* ========================================= */}
 {/* 💻 VISTA PARA ORDENADORES ( TABLA ACTUAL) */}
 {/* ========================================== */}
 {/* 💻 VISTA PARA ORDENADORES */}
 <div className="hidden lg:block bg-white shadow overflow-x-auto border-2 border-black">


  <table className="lg:w-full 2xl:w-full">
    <tbody className="divide-y lg:w-full 2xl:w-full">
      {ingredients.map((ing) => {
        // Buscamos la fila calculada correspondiente
        const row = calculatedRows.find(r => r.id === ing.id) || {} as any;

        return (
          <React.Fragment key={ing.id}>
            <tr className="hover:bg-gray-50  lg:w-full 2xl:w-full ">
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

           

              {/* PRECIO TOTAL DE LA COMPRA */}
             <td className="p-2">
             <p className='text-center lg:text-sm font-bold text-neutral-900'>
             Precio total de compra <span className="text-red-600">€</span>
             </p>
             <div className='py-2'>
             <input
             type="text"
             inputMode="decimal"
             value={ing.priceTotalCompra}   // o ing.priceTotal
             onChange={(e) => handleInputChange(ing.id, 'priceTotalCompra', e.target.value)}
             onBlur={() =>   handleBlur(ing.id, 'priceTotalCompra')}
             className="w-full text-center p-2 border rounded-xl text-neutral-900"
            placeholder="Ej. 10 (bolsa) ó 8.50 (1 kg)"
             />
           </div>
          </td>




           {/**BRUTO NUEVO */}
           {/* PESO BRUTO */}
           <td className="p-2 ">
              <div className='w-full flex flex-row mx-auto items-center justify-center'>
                  <p className='text-center lg:text-sm font-bold'>P.Bruto Total</p>
          
                  <select
                  value={ing.unitGross}
                  onChange={(e) => {
                    const newUnit = e.target.value as 'kg' | 'g' | 'l';
                    setIngredients(prev =>
                      prev.map(row =>
                        row.id === ing.id ? { ...row, unitGross: newUnit } : row
                      )
                    );
                  }}
                  className="px-2 py-1 bg-gray-200 rounded-lg text-sm font-bold">
                    <option value="kg">Kg</option>
                    <option value="g">g</option>
                    <option value="l">L</option>
                  </select>

            </div>
            
             <div className='py-2 flex flex-col items-center gap-1'>
              <input
                type="text"
                inputMode="decimal"
                value={getDisplayValue(ing, 'grossWeight')}
                onChange={(e) => handleInputChange(ing.id, 'grossWeight', e.target.value)}
                onBlur={() => handleInputBlur(ing.id, 'grossWeight')}
                className="w-full text-center p-2 border rounded-xl text-neutral-900"
                placeholder="Ej. 1.5 (kg) o 1500g"
              />

            </div>
               <p className="text-[10px] text-gray-600 text-center">
                {ing.unitGross === 'g' ? 'Gramos' : ing.unitGross === 'l' ? 'Litros' : 'Kilogramos'}
                </p>
           </td>


            <td className="p-2 ">
              <div className='w-full flex flex-row mx-auto items-center justify-center'>
               <p className='text-center lg:text-sm font-bold'>Merma Total</p>
               <select
                value={ing.unitMerma}
                onChange={(e) => {
                const newUnit = e.target.value as 'kg' | 'g' | 'l';
                setIngredients(prev =>
                  prev.map(row =>
                  row.id === ing.id ? { ...row, unitMerma: newUnit } : row
                 )
                );
              }}
              className="px-2 py-1 bg-gray-200 rounded-lg text-sm font-bold">
                <option value="kg">Kg</option>
                <option value="g">g</option>
                <option value="l">L</option>
              </select>
            </div>
            

             <div className='py-2 flex flex-col items-center gap-1'>
              <input
               type="text"
               inputMode="decimal"
               value={getDisplayValue(ing, 'mermaKg')}
               onChange={(e) => handleInputChange(ing.id, 'mermaKg', e.target.value)}
               onBlur={() => handleInputBlur(ing.id, 'mermaKg')}
               className="w-full text-center p-2 border rounded-xl text-neutral-900"
                placeholder="Ej. 1.5 (kg) o 1500g"
                />

               </div>
               <p className="text-[10px] text-gray-600 text-center">
                {ing.unitMerma === 'g' ? 'Gramos' : ing.unitMerma === 'l' ? 'Litros' : 'Kilogramos'}
                </p>
           </td>



          {/* CANTIDAD A USAR */}
           <td className="p-2 ">
            <div className='w-full flex flex-row mx-auto items-center justify-center'>
              <p className='text-center lg:text-sm font-bold'>Uso en Receta</p>
              <select
               value={ing.unitUsed}
               onChange={(e) => {
               const newUnit = e.target.value as 'kg' | 'g' | 'l';
               setIngredients(prev =>
                prev.map(row =>
                  row.id === ing.id ? { ...row, unitUsed: newUnit } : row
                 )
                );
              }}
              className="px-2 py-1 bg-gray-200 rounded-lg text-sm font-bold">
                <option value="kg">Kg</option>
                <option value="g">g</option>
                <option value="l">L</option>
              </select>
            </div>
            

             <div className='py-2 flex flex-col items-center gap-1'>  
                <input
                type="text"
                inputMode="decimal"
                value={getDisplayValue(ing, 'usedWeight')}
                onChange={(e) => handleInputChange(ing.id, 'usedWeight', e.target.value)}
                onBlur={() => handleInputBlur(ing.id, 'usedWeight')}
                className="w-full text-center p-2 border rounded-xl text-neutral-900"
                 placeholder="Ej. 1.5 (kg) o 1500g"
                />

            </div>
               <p className="text-[10px] text-gray-600 text-center">
                {ing.unitUsed === 'g' ? 'Gramos' : ing.unitUsed === 'l' ? 'Litros' : 'Kilogramos'}
                </p>
           </td>


        </tr>


        {/* SEGUNDA FILA SEGUNDA FILA SEGUNDA FILA SEGUNDA FILA*/}
          <tr className='hover:bg-gray-50 lg:w-full 2xl:w-full'>


              {/* RESULTADOS (solo lectura) */}
              <td className="p-2">
                <p className='text-center lg:text-sm font-bold'>Peso Neto</p>
                 <div className='py-2 text-center text-neutral-900 font-bold'>
                  {formatCleanWeight(row.pesoNeto, ing.unitUsed)}
                  {/*row.pesoNeto ?? '0.000'*/} 
                  {/*ing.unitGross === 'l' ? ' L' : ' kg'*/}
                </div>
            </td>


               <td className="p-2">
                <p className='text-center lg:text-sm font-bold'>Precio del P.Neto</p>
                <div className='py-2 text-center text-neutral-900 font-bold'>
                  {row.priceKgSinMerma ?? '0.00'}
                   <span className="text-red-600"> € </span> x {ing.unitGross === 'l' ? 'L' : 'kg'}
                  </div>
              </td>

                 

              <td className="p-2 ">
               <p className='text-center lg:text-sm font-bold'>Precio del P.Bruto</p>
                <div className='text-center py-2 text-neutral-900 font-bold'>
                  {row.priceBrutokilo?? '0.000'} 
                  <span className="text-red-600"> € </span> x {ing.unitGross === 'l' ? 'L' : 'kg'}
                </div>
              </td>


              {/**PERDIDA */}
              <td className="p-2">
                <p className='text-center lg:text-sm font-bold text-neutral-900'>Perdida €</p>
                <div className='text-center py-2 text-red-600 font-bold'>-{row.dineroPerdidoPorMerma ?? '0.00'} €</div>
              </td>

           

              <td className="p-2 font-black">
                <p className='text-center lg:text-sm font-bold'>Total Bruto a Comprar</p>
                <div className='text-center py-2 text-neutral-900 font-bold'>
                  {formatCleanWeight(row.totalBrutoNecesario, ing.unitGross)}
                    {/*row.totalBrutoNecesario ?? '0.000'} {ing.unitGross === 'l' ? 'L' : 'kg'*/}
                </div>
              </td>

            </tr>

     


             {/* TERCERA FILA TERCERA FILA*/}
            <tr className='bg-neutral-50'>

                {/* FALTANTE SIN MERMA Faltante, Compra requerida, Costes... (igual que tenías) */}
              <td className="p-2">
                <p className='text-center lg:text-sm font-bold'>Faltante sin merma</p>
                <div className='text-center py-2'>
                  {parseFloat(row.faltanteSinMermaNetoKg || '0') > 0 ? (
                    <span className='text-fuchsia-600 font-semibold lg:text-base 2xl:text-lg sm:text:base text-xs'>
                    
                          ⚠️ {formatCleanWeight(row.faltanteSinMermaNetoKg, ing.unitUsed)}

                       {/*row.faltanteSinMermaNetoKg*/} {/*ing.unitGross === 'l' ? 'L' : 'kg'*/} 
                     {/* ({row.faltanteSinMermaNetoGr} g)*/}
                      </span>
                      ) : (
                      <span className="text-emerald-600 font-medium text-sm">✅ Todo cubierto</span>
                    )}
                </div>

              </td>


              {/**TOTAL FALTANTE BRUTO  */}
               <td className="p-2">
                  <p className='text-center lg:text-sm font-bold'>Faltante Bruto Requerido</p>
                <div className='text-center py-2'>
                 {parseFloat(row.faltanteBruto || '0') > 0 ? (
                    <span className='text-red-600 font-semibold lg:text-base 2xl:text-lg sm:text:base text-xs'>
                      ⚠️ {formatCleanWeight(row.faltanteBruto, ing.unitUsed)}
                       {/*row.faltanteBruto */} {/*ing.unitGross === 'l' ? 'L' : 'kg'*/}  {/*({row.faltanteBrutoGr} g)*/}
                      </span>
                      ) : (
                      <span className="text-emerald-600 font-medium text-sm">✅ Todo cubierto</span>
                    )}
                </div>
             
              </td>



             

         

               <td className="p-2">
                <p className='text-center lg:text-sm font-bold'>Rendimiento del Ingred.</p>
                <div className='py-2 text-center text-neutral-900 font-bold'> {row.rendimiento}%</div>
              </td>




                 <td className="p-2 font-black">
                <p className='text-center lg:text-sm font-bold'>Coste Total Final</p>
                <div className='text-center py-2 text-neutral-900 font-bold'>{row.costeRealTotal ?? '0.00'} €</div>
              </td>

              <td className="p-2 font-black ">
                <p className='text-center lg:text-sm font-bold'>Coste por racion</p>
                <div className='text-center py-2 text-indigo-600'>{row.nuevoCostePorRacion ?? '0.00'} €</div>
              </td>



              <td className="">
                <div className='px-2'>
                <p className='text-center lg:text-sm font-bold text-neutral-700'>Eliminar</p>
                <div className='text-center py-2'>
                  <button
                    onClick={() => handleRemoveRow(ing.id)}
                    className="text-red-500 font-bold hover:text-red-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
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
            <label className="block text-xs font-bold text-blue-500 mb-1 text-center">Nombre del Ingrediente</label>
            <input
              type="text"
              value={ing.name}
              onChange={(e) => handleInputChange(ing.id, 'name', e.target.value)}
              className="w-full text-center px-3 py-2 border rounded-xl text-neutral-900 bg-neutral-50/50"
              placeholder="Ej. zanahoria"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1 text-center">
                Precio Tot.Compra (<span className="text-red-600">€</span>)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={ing.priceTotalCompra}
                onChange={(e) => handleInputChange(ing.id, 'priceTotalCompra', e.target.value)}
                onBlur={() =>   handleBlur(ing.id, 'priceTotalCompra')}
                className="w-full text-center px-2 py-2 border rounded-xl text-neutral-900"
                placeholder="Ej. 4.00"
              />
            </div>


            
          {/* CANTIDAD A USAR */}
           <div className=" ">


            <div className='w-full flex flex-row mx-auto items-center justify-center'>
              <label className="block text-xs font-bold text-neutral-800 text-center">Uso en Receta</label>
              <select
               value={ing.unitUsed}
               onChange={(e) => {
               const newUnit = e.target.value as 'kg' | 'g' | 'l';
               setIngredients(prev =>
                prev.map(row =>
                  row.id === ing.id ? { ...row, unitUsed: newUnit } : row
                 )
                );
              }}
              className="px-2 py-1 bg-gray-200 rounded-lg text-xs font-bold">
                <option value="kg">Kg</option>
                <option value="g">g</option>
                <option value="l">L</option>
              </select>
            </div>
            

             <div className='flex flex-col items-center gap-1'>  
                <input
                type="text"
                inputMode="decimal"
                value={getDisplayValue(ing, 'usedWeight')}
                onChange={(e) => handleInputChange(ing.id, 'usedWeight', e.target.value)}
                onBlur={() => handleInputBlur(ing.id, 'usedWeight')}
                className="w-full text-center p-2 border rounded-xl text-neutral-900"
                 placeholder="Ej. 1.5 (kg) o 1500g"
                />

            </div>
               <p className="text-[10px] text-gray-600 text-center">
                {ing.unitUsed === 'g' ? 'Gramos' : ing.unitUsed === 'l' ? 'Litros' : 'Kilogramos'}
                </p>
           </div>




          



          </div>




            {/**SEGUNDO BLOQUE */}
          <div className="grid grid-cols-2 gap-3">

             {/* PESO BRUTO */}
           <div className="">
            <div className='w-full flex flex-row mx-auto items-center justify-center'>
           
               <label className="block text-xs font-bold text-neutral-700 text-center">
                Peso Bruto
                </label>
        
               <select
               value={ing.unitGross}
               onChange={(e) => {
               const newUnit = e.target.value as 'kg' | 'g' | 'l';
               setIngredients(prev =>
                prev.map(row =>
                  row.id === ing.id ? { ...row, unitGross: newUnit } : row
                 )
                );
               }}
               className="px-2 py-1 bg-gray-200 rounded-lg text-xs font-bold">
                <option value="kg">Kg</option>
                <option value="g">g</option>
                <option value="l">L</option>
              </select>

          
             
            </div>
            
             <div className='flex flex-col items-center gap-1'>
              <input
                type="text"
                inputMode="decimal"
                value={getDisplayValue(ing, 'grossWeight')}
                onChange={(e) => handleInputChange(ing.id, 'grossWeight', e.target.value)}
                onBlur={() => handleInputBlur(ing.id, 'grossWeight')}
                className="w-full text-center px-2 py-2 border rounded-xl text-neutral-900"
                placeholder="Ej. 1.5 (kg) o 1500g"
              />

            </div>
               <p className="text-[10px] text-gray-600 text-center">
                {ing.unitGross === 'g' ? 'Gramos' : ing.unitGross === 'l' ? 'Litros' : 'Kilogramos'}
                </p>
           </div>


                  {/**MERMA TOTAL */}
            <div className="">
              <div className='w-full flex flex-row mx-auto items-center justify-center'>
               <label className="block text-xs font-bold text-neutral-700 text-center">
                Merma
                </label>
               <select
                value={ing.unitMerma}
                onChange={(e) => {
                const newUnit = e.target.value as 'kg' | 'g' | 'l';
                setIngredients(prev =>
                  prev.map(row =>
                  row.id === ing.id ? { ...row, unitMerma: newUnit } : row
                 )
                );
              }}
              className="px-2 py-1 bg-gray-200 rounded-lg text-xs font-bold">
                <option value="kg">Kg</option>
                <option value="g">g</option>
                <option value="l">L</option>
              </select>
            </div>
            

             <div className=' flex flex-col items-center gap-1'>
              <input
               type="text"
               inputMode="decimal"
               value={getDisplayValue(ing, 'mermaKg')}
               onChange={(e) => handleInputChange(ing.id, 'mermaKg', e.target.value)}
               onBlur={() => handleInputBlur(ing.id, 'mermaKg')}
               className="w-full text-center p-2 border rounded-xl text-neutral-900"
                placeholder="Ej. 1.5 (kg) o 1500g"
                />

               </div>
               <p className="text-[10px] text-gray-600 text-center">
                {ing.unitMerma === 'g' ? 'Gramos' : ing.unitMerma === 'l' ? 'Litros' : 'Kilogramos'}
                </p>
           </div>
          </div>
        </div>




        {/* BLOQUE 2: ESTATICOS ECONÓMICO (solo lectura) */}

        <div className="mt-4 pt-4 border-t border-dashed border-neutral-200 grid grid-cols-2 gap-y-3 gap-x-2 text-xs">



             <div className="bg-neutral-50 p-2 rounded-xl">
                <p className="text-gray-900 font-medium text-center">Precio del P.Bruto</p>
                <div className='text-center py-1 text-neutral-900 font-bold'>
                  {row.priceBrutokilo?? '0.000'} <span className="text-red-600">€</span> x {ing.unitGross === 'l' ? 'L' : 'kg'}
                </div>
              </div>




             {/* PESO NETO */}
             
          <div className="bg-neutral-50 p-2 rounded-xl">
                <p className="text-gray-900 text-center font-medium">Peso Neto</p>
                 <div className='py-1 text-center text-neutral-900 font-bold'>
                     {formatCleanWeight(row.pesoNeto, ing.unitGross)}
                  {/*row.pesoNeto ?? '0.000'*/} 
                  {/*ing.unitGross === 'l' ? ' L' : ' kg'*/}
                </div>
            </div>




         
 
         {/**PRECIO DEL PESO NETO */}
         <div className="bg-neutral-50 p-2 rounded-xl">
                <p className='text-center text-gray-900 font-medium'> 
                  Precio Limpio
                  </p>
                <div className='py-1 text-center text-neutral-900 font-bold'>
                  {row.priceKgSinMerma ?? '0.00'} <span className="text-red-600">€</span> x {ing.unitGross === 'l' ? 'L' : 'kg'}
                  </div>
          </div>


          <div className="bg-neutral-50 p-2 rounded-xl">
            <p className="text-center text-red-500 font-medium">Pérdida Merma:</p>
            <p className="text-center font-bold text-red-600 py-1">-{row.dineroPerdidoPorMerma ?? '0.00'} €</p>
          </div>



          <div className="bg-indigo-50 p-2 rounded-xl">
            <p className="text-indigo-600 font-bold">Coste Ración:</p>
            <p className="font-black text-indigo-700 mt-0.5 text-sm">{row.nuevoCostePorRacion ?? '0.00'} €</p>
          </div>

          {/* Faltantes */}
          <div className="col-span-2 bg-amber-50/60 p-2.5 rounded-xl border border-amber-100 flex flex-col justify-center space-y-1">
           
           

         
              {/**FANTANTE SIN MERMA */}
             <div className="flex justify-between items-center">
                <span className="text-neutral-600 font-medium">Faltante Neto:</span>

                <div className='text-center py-2'>
                  {parseFloat(row.faltanteSinMermaNetoKg || '0') > 0 ? (
                    <span className='text-fuchsia-600 font-semibold lg:text-base 2xl:text-lg sm:text:base text-xs'>
                         ⚠️ {formatCleanWeight(row.faltanteSinMermaNetoKg, ing.unitGross)}

                      {/*row.faltanteSinMermaNetoKg*/} {/*ing.unitGross === 'l' ? 'L' : 'kg'*/} 
                     {/* ({row.faltanteSinMermaNetoGr} g)*/}
                      </span>
                      ) : (
                      <span className="text-emerald-600 font-medium text-sm">✅ Todo cubierto</span>
                    )}
                </div>

              </div>


            
              {/**FALTANTE BRUTO  */}
               
            <div className="flex justify-between items-center">
                 <span className="text-neutral-600 font-medium">Faltante Bruta Requerida:</span>
                <div className='text-center py-2'>
                 {parseFloat(row.faltanteBruto || '0') > 0 ? (
                    <span className='text-red-600 font-semibold lg:text-base 2xl:text-lg sm:text:base text-xs'>
                       ⚠️{formatCleanWeight(row.faltanteBruto, ing.unitGross)}

                     {/*row.faltanteBruto } {ing.unitGross === 'l' ? 'L' : 'kg'*/}  {/*({row.faltanteBrutoGr} g)*/}
                      </span>
                      ) : (
                      <span className="text-emerald-600 font-medium text-sm">✅ Todo cubierto</span>
                    )}
                </div>
             
              </div>





               {/* 🆕 NUEVO: Total Bruto a Comprar */}
           

           <div className="flex justify-between items-center">
                 <span className="text-neutral-600 font-medium">Total Bruto a Comprar:</span>
                 <span className="text-neutral-900 font-bold">
                  {formatCleanWeight(row.totalBrutoNecesario, ing.unitGross)}
                 {/*row.totalBrutoNecesario ?? '0.000'} {ing.unitGross === 'l' ? 'L' : 'kg'*/}
              </span>
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
      <p className="text-gray-400 text-lg">Coste Compra Completa</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-white">{totales.totalCompra} €</p>
    </div>

    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-red-400 text-lg">Dinero Perdido</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-red-500">-{totales.totalMermaDinero} €</p>
    </div>


       {/** Gasto Final con Reposición  Gasto Final con Reposición   Gasto Final con Reposición */}
    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-amber-400 text-lg"> Gasto Real Usado en Receta</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-amber-500">{totales.totalGastoConReposicion} €</p>
    </div>

    {/* === FILA 2 EN PC === */}
    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-indigo-400 text-lg">Coste Real por Ración</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-indigo-400">{totales.totalCosteRealPorRacion} €</p>
    </div>



{/* Beneficio */}
<div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
  <p className="text-green-400 text-lg">Beneficio por Plato</p>
  <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-green-400">
    {totales.beneficio !== null ? `${totales.beneficio} €` : '—'}
  </p>
  {totales.beneficio === null && (
    <p className="text-xs text-gray-400 mt-1">Introduce un precio de venta</p>
  )}
</div>

      
      






    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-cyan-400 text-lg">Rendimiento Global</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-cyan-400">{totales.totalRendimiento}%</p>
    </div>

    {/**=== FILA 3 PC, MOVILES */}
    
    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-green-400 text-lg">P.V. Sugerido(30% incluido Sin Iva)</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-green-400">{totales.totalPrecioVentaSugeridoSinIva} €</p>
    </div>

    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-cyan-400 text-lg">P.V. Sugerido(30% + IVA incluidos)</p>
      <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-cyan-400">{totales.totalPrecioVentaSugeridoConIva} €</p>
    </div>

 

<div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
  <p className="text-mauve-500 text-lg">P.V.(Gast.Fijos + 20% + IVA incl)</p>

  {totales.precioFinalConIva ? (
    <p className="lg:text-4xl md:text-5xl text-2xl font-black mt-3 text-mauve-500">
      {totales.precioFinalConIva} €
    </p>
  ) : (
    <p className="text-amber-400 text-sm font-medium mt-3">
      ⚠️ Es necesario introducir los costes fijos
    </p>
  )}
</div>




  </div>

  {/* 👑 EL REY DE LAS MÉTRICAS: DESTACADO ABAJO EN GRANDE */}
 

    <div className="mt-12 pt-8 border-t border-gray-800 text-center">
 <p className="text-gray-400 text-xl mb-2">Food Cost de la Receta</p>
 <p className="lg:text-7xl md:text-6xl text-3xl font-black text-amber-400 tracking-tight">
    {totales.foodCost !== null ? `${totales.foodCost}%` : '—'}
  </p>
  {totales.foodCost === null && (
    <p className="text-xs text-gray-400 mt-1">Introduce un precio de venta</p>
  )}

<p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto">
      * Porcentaje ideal recomendado para el control de costes del restaurante.
    </p>

</div>













   </div>

     <ConsejosMermas ingredients={ingredients} />


     {/* Justo debajo del bloque del RESUMEN DEL CÁLCULO */}


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










