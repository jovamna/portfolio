// ─── Los 14 alérgenos oficiales (Reglamento UE 1169/2011) ─────────────────────
export const ALERGENOS = [
  { id: 'gluten',      label: 'Gluten',                emoji: '🌾' },
  { id: 'crustaceos',  label: 'Crustáceos',             emoji: '🦐' },
  { id: 'huevos',      label: 'Huevos',                 emoji: '🥚' },
  { id: 'pescado',     label: 'Pescado',                emoji: '🐟' },
  { id: 'cacahuetes',  label: 'Cacahuetes',             emoji: '🥜' },
  { id: 'soja',        label: 'Soja',                   emoji: '🫘' },
  { id: 'lacteos',     label: 'Lácteos',                emoji: '🥛' },
  { id: 'frutosCascara', label: 'Frutos de cáscara',    emoji: '🌰' },
  { id: 'apio',        label: 'Apio',                   emoji: '🥬' },
  { id: 'mostaza',     label: 'Mostaza',                emoji: '🟡' },
  { id: 'sesamo',      label: 'Sésamo',                 emoji: '◯' },
  { id: 'sulfitos',    label: 'Sulfitos',               emoji: '🍷' },
  { id: 'altramuces',  label: 'Altramuces',             emoji: '🫛' },
  { id: 'moluscos',    label: 'Moluscos',               emoji: '🐚' },
];

// ─── Unidades de medida ─────────────────────────────────────────────────────────
export const UNIDADES = ['kg', 'g', 'l', 'ml', 'ud'];

// ─── Temperatura de servicio ────────────────────────────────────────────────────
export const TEMPERATURAS = [
  { value: 'frio',      label: 'Frío' },
  { value: 'templado',  label: 'Templado' },
  { value: 'caliente',  label: 'Caliente' },
];

// ─── Generación de IDs únicos para filas dinámicas ──────────────────────────────
let idCounter = 0;
export function nextId() {
  idCounter += 1;
  return `row-${Date.now()}-${idCounter}`;
}

// ─── Fila vacía de ingrediente ──────────────────────────────────────────────────
export function ingredienteVacio() {
  return {
    id: nextId(),
    nombre: '',
    cantidad: '',
    unidad: 'g',
    coste: '',       // coste en € de la cantidad usada (no €/kg, el coste real de esa línea)
    proveedor: '',
  };
}

// ─── Paso vacío de preparación ──────────────────────────────────────────────────
export function pasoVacio() {
  return { id: nextId(), texto: '' };
}

// ─── Cálculos ────────────────────────────────────────────────────────────────────

/** Suma el coste de todas las líneas de ingredientes */
export function calcularCosteTotal(ingredientes) {
  return ingredientes.reduce((sum, ing) => sum + (parseFloat(ing.coste) || 0), 0);
}

/**
 * Calcula el food cost % y el margen a partir del coste total y el PVP
 * food cost % = (coste / PVP) * 100  →  estándar de hostelería: ideal 25-35%
 */
export function calcularRentabilidad(costeTotal, pvp) {
  const pvpNum = parseFloat(pvp) || 0;
  if (pvpNum <= 0) return null;

  const foodCostPct = (costeTotal / pvpNum) * 100;
  const margen = pvpNum - costeTotal;
  const margenPct = (margen / pvpNum) * 100;

  return { foodCostPct, margen, margenPct, pvp: pvpNum };
}

/** Clasifica el food cost % en una valoración cualitativa */
export function valorarFoodCost(pct) {
  if (pct == null) return null;
  if (pct <= 28) return { label: 'Excelente', color: '#3B6D11' };
  if (pct <= 35) return { label: 'Saludable', color: '#639922' };
  if (pct <= 40) return { label: 'Ajustado', color: '#EF9F27' };
  return { label: 'Elevado', color: '#E24B4A' };
}

// ─── Formateadores ────────────────────────────────────────────────────────────
export const fmtEur = (n) =>
  (parseFloat(n) || 0).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

export const fmtPct = (n) =>
  n != null ? `${n.toFixed(1)} %` : '—';
