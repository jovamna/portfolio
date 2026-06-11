// Cuotas del trabajador a la Seguridad Social
const SS = {
  indefinido: 0.0635,
  temporal:   0.0640,
};

// Gastos deducibles fijos
const GASTOS_DEDUCIBLES = 2_000;

// Tipo mínimo de retención
const TIPO_MINIMO = 0.02;

// Escalas por Comunidad Autónoma (2026)
const ESCALAS_POR_CCAA = {
  'media': [
    { hasta: 12450,  tipo: 0.19 },
    { hasta: 20200,  tipo: 0.24 },
    { hasta: 35200,  tipo: 0.30 },
    { hasta: 60000,  tipo: 0.37 },
    { hasta: 300000, tipo: 0.45 },
    { hasta: Infinity, tipo: 0.47 },
  ],
  'madrid': [
    { hasta: 12450,  tipo: 0.19 },
    { hasta: 20200,  tipo: 0.24 },
    { hasta: 35200,  tipo: 0.30 },
    { hasta: 60000,  tipo: 0.37 },
    { hasta: 300000, tipo: 0.45 },
    { hasta: Infinity, tipo: 0.47 },
  ],
  'andalucia': [
    { hasta: 12450,  tipo: 0.19 },
    { hasta: 20200,  tipo: 0.24 },
    { hasta: 35200,  tipo: 0.30 },
    { hasta: 60000,  tipo: 0.37 },
    { hasta: 300000, tipo: 0.45 },
    { hasta: Infinity, tipo: 0.47 },
  ],
  'cataluna': [
    { hasta: 12450,  tipo: 0.19 },
    { hasta: 20200,  tipo: 0.24 },
    { hasta: 35200,  tipo: 0.305 },
    { hasta: 60000,  tipo: 0.38 },
    { hasta: 300000, tipo: 0.46 },
    { hasta: Infinity, tipo: 0.48 },
  ],
  'valencia': [
    { hasta: 12450,  tipo: 0.19 },
    { hasta: 20200,  tipo: 0.24 },
    { hasta: 35200,  tipo: 0.30 },
    { hasta: 60000,  tipo: 0.375 },
    { hasta: 300000, tipo: 0.455 },
    { hasta: Infinity, tipo: 0.475 },
  ],
  'otras': [
    { hasta: 12450,  tipo: 0.19 },
    { hasta: 20200,  tipo: 0.24 },
    { hasta: 35200,  tipo: 0.30 },
    { hasta: 60000,  tipo: 0.37 },
    { hasta: 300000, tipo: 0.45 },
    { hasta: Infinity, tipo: 0.47 },
  ]
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function aplicarEscala(base, escala = ESCALAS_POR_CCAA['media']) {
  if (base <= 0) return 0;
  let cuota = 0;
  let tramoAnterior = 0;

  for (const tramo of escala) {
    if (base <= tramoAnterior) break;
    const baseEnTramo = Math.min(base, tramo.hasta) - tramoAnterior;
    cuota += baseEnTramo * tramo.tipo;
    tramoAnterior = tramo.hasta;
  }
  return cuota;
}

function calcularReduccionRendimientos(rendimientoNeto) {
  if (rendimientoNeto <= 0) return 0;

  const LIMITE1 = 14852;
  const LIMITE2 = 17673.52;
  const LIMITE3 = 19747.5;

  if (rendimientoNeto <= LIMITE1) {
    return 7302;
  } else if (rendimientoNeto <= LIMITE2) {
    return 7302 - 1.75 * (rendimientoNeto - LIMITE1);
  } else if (rendimientoNeto < LIMITE3) {
    return 2364.34 - 1.14 * (rendimientoNeto - LIMITE2);
  }
  return 0;
}

function calcularMinimoPersonal(edadTrabajador) {
  if (edadTrabajador >= 75) return 8100;
  if (edadTrabajador >= 65) return 6700;
  return 5550;
}

function calcularMinimoDescendientes(hijosTotal, hijosMenores3) {
  let minimo = 0;
  for (let i = 1; i <= hijosTotal; i++) {
    if (i === 1) minimo += 2400;
    else if (i === 2) minimo += 2700;
    else if (i === 3) minimo += 4000;
    else minimo += 4500;
  }
  minimo += hijosMenores3 * 2800;
  return minimo;
}

function calcularMinimoAscendientes(ascendientes65, ascendientes75) {
  return ascendientes65 * 1150 + ascendientes75 * 2550;
}

function calcularReduccionDiscapacidad(grado) {
  if (grado >= 65) return 9000;
  if (grado >= 33) return 3000;
  return 0;
}

// ─── Función principal ────────────────────────────────────────────────────────
export function calcularRetencion({
  salarioBruto,
  contrato = 'indefinido',
  edadTrabajador = 30,
  hijosTotal = 0,
  hijosMenores3 = 0,
  ascendientes65 = 0,
  ascendientes75 = 0,
  discapacidad = 0,
  pagas = 12,
  ccaa = 'media',           // ← Correcto
}) {
  if (!salarioBruto || salarioBruto <= 0) return null;

  const ESCALA = ESCALAS_POR_CCAA[ccaa] || ESCALAS_POR_CCAA['media'];

  // 1. Cotización SS trabajador
  const cotizacionSS = salarioBruto * SS[contrato];

  // 2. Rendimiento neto
  const rendimientoNeto = salarioBruto - cotizacionSS - GASTOS_DEDUCIBLES;

  // 3. Reducción por rendimientos
  const reduccionRendimientos = calcularReduccionRendimientos(rendimientoNeto);

  // 4. Base de retención
  const baseRetencion = Math.max(0, rendimientoNeto - reduccionRendimientos);

  // 5. Mínimos
  const minimoPersonal      = calcularMinimoPersonal(edadTrabajador);
  const minimoDescendientes = calcularMinimoDescendientes(hijosTotal, hijosMenores3);
  const minimoAscendientes  = calcularMinimoAscendientes(ascendientes65, ascendientes75);
  const reduccionDiscap     = calcularReduccionDiscapacidad(discapacidad);
  const minimoTotal         = minimoPersonal + minimoDescendientes + minimoAscendientes + reduccionDiscap;

  // 6. Cuotas
  const cuotaBase   = aplicarEscala(baseRetencion, ESCALA);
  const cuotaMinimo = aplicarEscala(Math.min(minimoTotal, baseRetencion), ESCALA);

  // 7. Retención
  const retencionAnual = Math.max(0, cuotaBase - cuotaMinimo);
  const tipoRetencion  = Math.max(TIPO_MINIMO, retencionAnual / salarioBruto);

  // 8. Mensuales
  const brutoMensual     = salarioBruto / pagas;
  const retencionMensual = (salarioBruto * tipoRetencion) / pagas;
  const ssMensual        = cotizacionSS / pagas;
  const netoMensual      = brutoMensual - retencionMensual - ssMensual;

  return {
    salarioBruto,
    contrato,
    pagas,
    ccaa,                    // ← Añadido para mostrarlo

    cotizacionSS,
    rendimientoNeto,
    reduccionRendimientos,
    baseRetencion,
    minimoPersonal,
    minimoDescendientes,
    minimoAscendientes,
    reduccionDiscap,
    minimoTotal,
    cuotaBase,
    cuotaMinimo,
    retencionAnual,

    tipoRetencion,
    tipoRetencionPct: tipoRetencion * 100,

    brutoMensual,
    retencionMensual,
    ssMensual,
    netoMensual,
  };
}

// Formateadores
export const fmtEur = (n) =>
  n?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }) ?? '—';

export const fmtPct = (n) =>
  n != null ? `${(n * 100).toFixed(2)} %` : '—';