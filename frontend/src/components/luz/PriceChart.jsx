import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  Cell, ResponsiveContainer,
} from 'recharts';
import {
  getSortedHours, getPriceCategory,
  PRICE_COLORS, fmtCents,
} from '../../utils/priceUtils';

// Mapeo de colores de texto y fondo en Tailwind según la categoría
const COLOR_TAILWIND_MAP = {
  cheap:     { text: 'text-green-600',  bg: 'bg-green-500' },
  medium:    { text: 'text-amber-500',  bg: 'bg-amber-500' },
  expensive: { text: 'text-red-500',    bg: 'bg-red-500' },
  current:   { text: 'text-blue-500',   bg: 'bg-blue-500' },
};

// ─── Custom tooltip ───────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const { price, category } = payload[0].payload;
  const colors = COLOR_TAILWIND_MAP[category] || { text: 'text-gray-900' };

  return (
    <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-md flex flex-col gap-0.5">
      <p className="text-xs font-semibold text-gray-500">{label}:00 h</p>
      <p className={`text-sm font-bold ${colors.text}`}>
        {fmtCents(price)}
      </p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PriceChart({ data, currentKey }) {
  const hours = getSortedHours(data);
  const chartData = hours.map((key) => {
    const entry    = data[key];
    const category = key === currentKey ? 'current' : getPriceCategory(entry);
    return {
      hour:       key.split('-')[0],   // "14" instead of "14-15"
      fullKey:    key,
      price:      entry.price,
      priceCents: parseFloat((entry.price * 100).toFixed(3)),
      category,
      color:      PRICE_COLORS[category], // Mantenemos esto porque Recharts necesita el color hexadecimal para pintar la barra
    };
  });

  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      
      {/* Legend - 100% Tailwind CSS */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 justify-start sm:justify-end text-xs font-medium text-gray-600">
        {[
          ['cheap',     'Barata'],
          ['medium',    'Media'],
          ['expensive', 'Cara'],
          ['current',   'Hora actual'],
        ].map(([cat, label]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${COLOR_TAILWIND_MAP[cat].bg}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 4, right: 4, left: -10, bottom: 0 }}
            barCategoryGap="12%"
          >
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 10, fill: '#6B7280' }} // Color gris de Tailwind
              interval={2} // Muestra las horas de dos en dos para que no se amontone en móvil
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(v) => v.toFixed(1)}
              tick={{ fontSize: 10, fill: '#6B7280' }}
              tickLine={false}
              axisLine={false}
              label={{
                value: 'c€/kWh',
                angle: -90,
                position: 'insideLeft',
                offset: 10,
                style: { fontSize: 10, fill: '#9CA3AF' },
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(243, 244, 246, 0.6)' }} />
            <Bar dataKey="priceCents" radius={[4, 4, 0, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.fullKey} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}