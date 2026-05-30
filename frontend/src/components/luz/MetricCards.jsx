import { fmtCents, getPriceCategory, PRICE_LABELS } from '../../utils/priceUtils';

// Componente Card interno optimizado con Tailwind
function Card({ label, value, textColorClass, badge }) {
  return (
    <div className="flex-1 min-w-[150px] p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
      
      <p className={`text-2xl font-bold tracking-tight ${textColorClass || 'text-gray-900'}`}>
        {value ?? '—'}
      </p>

      {badge && (
        <span className={`self-start mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${badge.bgClass} ${badge.textClass}`}>
          {badge.text}
        </span>
      )}
    </div>
  );
}

// Mapeo de estilos de Tailwind según la categoría de precio
const BADGE_TAILWIND_STYLES = {
  cheap:     { bgClass: 'bg-green-50',   textClass: 'text-green-700' },
  medium:    { bgClass: 'bg-amber-50',   textClass: 'text-amber-700' },
  expensive: { bgClass: 'bg-red-50',     textClass: 'text-red-700' },
};

// Clases de color de texto para las tarjetas específicas
const TEXT_COLOR_STYLES = {
  cheap:     'text-green-600',
  medium:    'text-amber-600',
  expensive: 'text-red-600',
};

export default function MetricCards({ stats }) {
  if (!stats) return null;

  const category = getPriceCategory(stats.currentEntry);
  
  // Construimos el objeto badge con clases de Tailwind
  const badge = {
    text: PRICE_LABELS[category],
    ...BADGE_TAILWIND_STYLES[category],
  };

  return (
    // Contenedor flex que se vuelve columna en móviles y fila en pantallas más grandes
    <div className="flex flex-col sm:flex-row gap-4 p-4 w-full">
      <Card
        label="Ahora mismo"
        value={fmtCents(stats.current)}
        badge={badge}
        textColorClass={TEXT_COLOR_STYLES[category]}
      />
      <Card
        label="Media del día"
        value={fmtCents(stats.avg)}
      />
      <Card
        label="Hora más barata"
        value={fmtCents(stats.min)}
        textColorClass={TEXT_COLOR_STYLES.cheap}
      />
      <Card
        label="Hora más cara"
        value={fmtCents(stats.max)}
        textColorClass={TEXT_COLOR_STYLES.expensive}
      />
    </div>
  );
}