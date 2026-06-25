


import { calcularRentabilidad, valorarFoodCost, fmtEur, fmtPct } from '../../../utils/hosteleria/ficha-tecnica/fichaUtils';

export default function RentabilidadPanel({ costeTotal, pvp, onPvpChange }) {
  const rent = calcularRentabilidad(costeTotal, pvp);
  const valoracion = valorarFoodCost(rent?.foodCostPct);

  return (
    <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-700">
         <h2 className="text-base lg:text-lg font-bold text-black mb-4 underline underline-offset-4">
        Rentabilidad</h2>

      <div className="flex flex-col mb-6 w-full max-w-[220px]">
        <label className="text-sm font-semibold text-gray-600 mb-1" htmlFor="pvp">
          PVP (precio de venta en carta)
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-sm font-medium text-gray-400 pointer-events-none">€</span>
          <input
            id="pvp"
            type="number"
            min={0}
            step={0.1}
            placeholder="18.50"
            value={pvp}
            onChange={(e) => onPvpChange(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Coste Total */}
        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Coste total</p>
          <p className="text-xl font-bold text-gray-800">{fmtEur(costeTotal)}</p>
        </div>

        {/* Food Cost % */}
        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center relative">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Food cost %</p>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold" style={valoracion ? { color: valoracion.color } : {}}>
              {fmtPct(rent?.foodCostPct)}
            </p>
            {valoracion && (
              <span 
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide" 
                style={{ background: `${valoracion.color}1A`, color: valoracion.color }}
              >
                {valoracion.label}
              </span>
            )}
          </div>
        </div>

        {/* Margen Bruto */}
        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Margen bruto</p>
          <p className="text-xl font-bold text-[#185FA5]">
            {rent ? fmtEur(rent.margen) : '—'}
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
        💡 <strong>Food cost ideal en hostelería:</strong> 25–35 %. Por encima de 40 % suele indicar
        un precio de venta bajo o mermas elevadas a revisar.
      </p>
    </section>
  );
}