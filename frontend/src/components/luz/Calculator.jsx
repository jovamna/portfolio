import { useState, useMemo } from 'react';
import { APPLIANCES, fmtEur } from '../../utils/priceUtils';

// ─── Result row ───────────────────────────────────────────────────────────────
function ResultRow({ label, value, textColorClass, large }) {
  return (
    <div className="flex justify-between items-center py-2">
      <p className={`text-sm ${large ? 'font-bold text-gray-800' : 'text-gray-600'}`}>{label}</p>
      <p className={`font-bold tracking-tight ${large ? 'text-xl text-gray-900' : textColorClass || 'text-gray-800'}`}>
        {value}
      </p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Calculator({ stats }) {
  const [applianceIndex, setApplianceIndex] = useState(0);  // index into APPLIANCES
  const [hours,          setHours]          = useState(1);
  const [customKw,       setCustomKw]       = useState('');
  const [useCustom,      setUseCustom]      = useState(false);

  const kw = useCustom
    ? parseFloat(customKw) || 0
    : APPLIANCES[applianceIndex].kw;

  const result = useMemo(() => {
    if (!stats || kw <= 0) return null;
    const costoNow = kw * hours * stats.current;
    const costoMin = kw * hours * stats.min;
    const costoMax = kw * hours * stats.max;
    const ahorro   = costoNow - costoMin;
    return { costoNow, costoMin, costoMax, ahorro };
  }, [stats, kw, hours]);

  return (
    <div className="w-full p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col gap-6">
      <p className="text-base font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
        <span>🧮</span> Calculadora de consumo
      </p>

      {/* Selector de electrodoméstico e Input de Horas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Field: Electrodoméstico */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Electrodoméstico</label>
          <select
            value={applianceIndex}
            onChange={(e) => { setApplianceIndex(Number(e.target.value)); setUseCustom(false); }}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {APPLIANCES.map((a, i) => (
              <option key={a.label} value={i}>
                {a.label} ({a.kw} kW)
              </option>
            ))}
          </select>
        </div>

        {/* Field: Horas Slider */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex justify-between">
            <span>Horas de uso:</span> 
            <span className="text-blue-600 font-bold">{hours} h</span>
          </label>
          <input
            type="range"
            min={0.5}
            max={12}
            step={0.5}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] font-medium text-gray-400 px-0.5">
            <span>0.5h</span><span>6h</span><span>12h</span>
          </div>
        </div>
      </div>

      {/* Custom kW input (Checkbox & Input) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
        <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={useCustom}
            onChange={(e) => setUseCustom(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 accent-blue-600"
          />
          Introducir potencia manualmente
        </label>
        {useCustom && (
          <input
            type="number"
            min={0.01}
            step={0.01}
            placeholder="kW (ej: 3.5)"
            value={customKw}
            onChange={(e) => setCustomKw(e.target.value)}
            className="w-full sm:w-36 px-2.5 py-1 text-sm bg-white border border-gray-200 rounded-md outline-none focus:border-blue-500"
          />
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="mt-2 p-4 bg-slate-50/70 rounded-xl border border-slate-100 flex flex-col gap-1">
          <ResultRow
            label="Coste ahora mismo"
            value={fmtEur(result.costoNow)}
            large
          />
          <hr className="my-1.5 border-gray-200/60" />
          <ResultRow
            label="Con la hora más barata hoy"
            value={fmtEur(result.costoMin)}
            textColorClass="text-green-600"
          />
          <ResultRow
            label="Con la hora más cara hoy"
            value={fmtEur(result.costoMax)}
            textColorClass="text-red-500"
          />
          <hr className="my-1.5 border-gray-200/60" />
          <ResultRow
            label="Ahorro si esperas a la hora barata"
            value={`+ ${fmtEur(Math.max(0, result.ahorro))}`}
            textColorClass="text-blue-600"
          />

          {/* Context note */}
          <p className="text-[11px] leading-relaxed text-gray-400 mt-3 text-center sm:text-left">
            * Precio de mercado sin impuestos (IVA, peaje, etc.). El coste real
            en tu factura será superior según tu comercializadora.
          </p>
        </div>
      )}
    </div>
  );
}



