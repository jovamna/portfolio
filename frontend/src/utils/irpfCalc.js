/**
 * Calculadora de Retención IRPF 2026
 * Basada en el RIRPF (Real Decreto 439/2007) y la LIRPF (Ley 35/2006)
 *
 * NOTA: Este cálculo es una estimación orientativa.
 * Para el dato oficial usa el calculador de la AEAT:
 * https://sede.agenciatributaria.gob.es
 */

// ─── Constantes 2024 ──────────────────────────────────────────────────────────

// Cuotas del trabajador a la Seguridad Social
const SS = {
  indefinido: 0.0635, // CC 4.70% + Desempleo 1.55% + FP 0.10%
  temporal:   0.0640, // CC 4.70% + Desempleo 1.60% + FP 0.10%
};

// Gastos deducibles fijos (art. 19.2.f LIRPF)
const GASTOS_DEDUCIBLES = 2_000;

// Tipo mínimo de retención (art. 86 RIRPF)
const TIPO_MINIMO = 0.02;

// Escala de retención (art. 85 RIRPF — tipos estatal + autonómico medio)
const ESCALA = [
  { hasta: 12_450,    tipo: 0.19 },
  { hasta: 20_200,    tipo: 0.24 },
  { hasta: 35_200,    tipo: 0.30 },
  { hasta: 60_000,    tipo: 0.37 },
  { hasta: 300_000,   tipo: 0.45 },
  { hasta: Infinity,  tipo: 0.47 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Aplica la escala progresiva a una base dada */
function aplicarEscala(base) {
  if (base <= 0) return 0;
  let cuota = 0;
  let tramoAnterior = 0;

  for (const tramo of ESCALA) {
    if (base <= tramoAnterior) break;
    const baseEnTramo = Math.min(base, tramo.hasta) - tramoAnterior;
    cuota += baseEnTramo * tramo.tipo;
    tramoAnterior = tramo.hasta;
  }

  return cuota;
}

/**
 * Reducción por obtención de rendimientos del trabajo (art. 20 LIRPF)
 * Se aplica sobre el rendimiento neto (ya descontada SS y gastos deducibles)
 */
function calcularReduccionRendimientos(rendimientoNeto) {
  if (rendimientoNeto <= 13_115) return 5_565;
  if (rendimientoNeto <= 16_825) {
    return 5_565 - 1.5 * (rendimientoNeto - 13_115);
  }
  return 0;
}

/**
 * Mínimo personal del contribuyente (art. 57 LIRPF)
 */
function calcularMinimoPersonal(edadTrabajador) {
  if (edadTrabajador >= 75) return 8_100; // 5550 + 1150 + 1400
  if (edadTrabajador >= 65) return 6_700; // 5550 + 1150
  return 5_550;
}

/**
 * Mínimo por descendientes (art. 58 LIRPF)
 * hijosTotal: número total de hijos menores de 25 años
 * hijosMenores3: cuántos de esos hijos tienen menos de 3 años
 */
function calcularMinimoDescendientes(hijosTotal, hijosMenores3) {
  let minimo = 0;
  for (let i = 1; i <= hijosTotal; i++) {
    if (i === 1) minimo += 2_400;
    else if (i === 2) minimo += 2_700;
    else if (i === 3) minimo += 4_000;
    else minimo += 4_500;
  }
  minimo += hijosMenores3 * 2_800; // Adicional por menores de 3 años
  return minimo;
}

/**
 * Mínimo por ascendientes (art. 59 LIRPF)
 * ascendientes65: número de padres/abuelos entre 65 y 74 años
 * ascendientes75: número de padres/abuelos de 75 o más años
 */
function calcularMinimoAscendientes(ascendientes65, ascendientes75) {
  return ascendientes65 * 1_150 + ascendientes75 * 2_550; // 1150 + 1400
}

/**
 * Reducción por discapacidad del trabajador (art. 60 LIRPF)
 */
function calcularReduccionDiscapacidad(grado) {
  if (grado >= 65) return 9_000;
  if (grado >= 33) return 3_000;
  return 0;
}

// ─── Función principal ────────────────────────────────────────────────────────

/**
 * Calcula el tipo y cuota de retención del IRPF
 *
 * @param {Object} params
 * @param {number} params.salarioBruto       - Salario bruto anual en €
 * @param {'indefinido'|'temporal'} params.contrato
 * @param {number} params.edadTrabajador     - Edad del trabajador
 * @param {number} params.hijosTotal         - Nº de hijos < 25 años
 * @param {number} params.hijosMenores3      - Nº de hijos < 3 años (incluidos en hijosTotal)
 * @param {number} params.ascendientes65     - Nº de ascendientes 65-74 años que conviven
 * @param {number} params.ascendientes75     - Nº de ascendientes ≥ 75 años que conviven
 * @param {number} params.discapacidad       - Grado de discapacidad: 0, 33 o 65
 * @param {number} params.pagas              - Nº de pagas anuales: 12 o 14
 */
export function calcularRetencion({
  salarioBruto,
  contrato       = 'indefinido',
  edadTrabajador = 30,
  hijosTotal     = 0,
  hijosMenores3  = 0,
  ascendientes65 = 0,
  ascendientes75 = 0,
  discapacidad   = 0,
  pagas          = 12,
}) {
  if (!salarioBruto || salarioBruto <= 0) return null;

  // 1. Cotización SS trabajador
  const cotizacionSS = salarioBruto * SS[contrato];

  // 2. Rendimiento neto del trabajo
  const rendimientoNeto = salarioBruto - cotizacionSS - GASTOS_DEDUCIBLES;

  // 3. Reducción por rendimientos del trabajo
  const reduccionRendimientos = calcularReduccionRendimientos(rendimientoNeto);

  // 4. Base de cálculo de la retención
  const baseRetencion = Math.max(0, rendimientoNeto - reduccionRendimientos);

  // 5. Mínimo personal y familiar
  const minimoPersonal      = calcularMinimoPersonal(edadTrabajador);
  const minimoDescendientes = calcularMinimoDescendientes(hijosTotal, hijosMenores3);
  const minimoAscendientes  = calcularMinimoAscendientes(ascendientes65, ascendientes75);
  const reduccionDiscap     = calcularReduccionDiscapacidad(discapacidad);
  const minimoTotal         = minimoPersonal + minimoDescendientes + minimoAscendientes + reduccionDiscap;

  // 6. Cuota íntegra (escala sobre la base) - cuota del mínimo
  const cuotaBase   = aplicarEscala(baseRetencion);
  const cuotaMinimo = aplicarEscala(Math.min(minimoTotal, baseRetencion));

  // 7. Retención anual y tipo
  const retencionAnual = Math.max(0, cuotaBase - cuotaMinimo);
  const tipoRetencion  = Math.max(TIPO_MINIMO, retencionAnual / salarioBruto);

  // 8. Datos mensuales (según nº de pagas)
  const brutoMensual      = salarioBruto / pagas;
  const retencionMensual  = (salarioBruto * tipoRetencion) / pagas;
  const ssMensual         = cotizacionSS / pagas;
  const netoMensual       = brutoMensual - retencionMensual - ssMensual;

  return {
    // Inputs resumidos
    salarioBruto,
    contrato,
    pagas,

    // Cálculo paso a paso (para mostrar el desglose)
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

    // Resultados principales
    tipoRetencion,                          // decimal, ej: 0.1523
    tipoRetencionPct: tipoRetencion * 100,  // porcentaje, ej: 15.23

    // Mensuales
    brutoMensual,
    retencionMensual,
    ssMensual,
    netoMensual,
  };
}

// ─── Formateadores ────────────────────────────────────────────────────────────

export const fmtEur = (n) =>
  n?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }) ?? '—';

export const fmtPct = (n) =>
  n != null ? `${(n * 100).toFixed(2)} %` : '—';
