// ─── Formatters ──────────────────────────────────────────────────────────────

export const fmtCents = (price) =>
  `${(price * 100).toFixed(3)} c€/kWh`;

export const fmtEur = (value) =>
  value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 4 });

// ─── Price classification ─────────────────────────────────────────────────────

export const getPriceCategory = (entry) => {
  if (entry['is-cheap']) return 'cheap';
  if (entry['is-under-avg']) return 'medium';
  return 'expensive';
};

export const PRICE_COLORS = {
  cheap:     '#639922',
  medium:    '#EF9F27',
  expensive: '#E24B4A',
  current:   '#185FA5',
};

export const PRICE_LABELS = {
  cheap:     'Barata',
  medium:    'Media',
  expensive: 'Cara',
};

// ─── Zones ───────────────────────────────────────────────────────────────────

export const ZONES = {
  PCB: 'Península',
  CYM: 'Canarias',
  BAL: 'Baleares',
};

// ─── Appliances ──────────────────────────────────────────────────────────────

export const APPLIANCES = [
  { label: 'Lavadora',            kw: 2.0  },
  { label: 'Lavavajillas',        kw: 1.8  },
  { label: 'Horno eléctrico',     kw: 2.2  },
  { label: 'Secadora',            kw: 2.5  },
  { label: 'Aire acondicionado',  kw: 1.5  },
  { label: 'Calefactor eléctrico',kw: 2.0  },
  { label: 'Plancha',             kw: 1.5  },
  { label: 'Microondas',          kw: 0.9  },
  { label: 'Cargador VE (lento)', kw: 7.4  },
  { label: 'Frigorífico',         kw: 0.15 },
  { label: 'TV',                  kw: 0.1  },
];

// ─── Data helpers ─────────────────────────────────────────────────────────────

/** Returns the API key for the current hour, e.g. "14-15" */
export function getCurrentHourKey() {
  const now = new Date();
  const h  = now.getHours().toString().padStart(2, '0');
  const h2 = ((now.getHours() + 1) % 24).toString().padStart(2, '0');
  return `${h}-${h2}`;
}

/** Derives summary stats from the full day object returned by the API */
export function computeStats(data) {
  const entries = Object.values(data);
  const prices  = entries.map((e) => e.price);
  const avg     = prices.reduce((a, b) => a + b, 0) / prices.length;
  const min     = Math.min(...prices);
  const max     = Math.max(...prices);

  const curKey      = getCurrentHourKey();
  const currentEntry = data[curKey] || entries[new Date().getHours()] || entries[0];

  return { avg, min, max, current: currentEntry.price, currentEntry, currentKey: curKey };
}

/** Returns hour keys sorted chronologically */
export function getSortedHours(data) {
  return Object.keys(data).sort();
}

//prices.reduce((calculadora, precioActual) => calculadora + precioActual, 0)