// ─── Componente Counter Mejorado ───────────────────────────
function Counter({ label, hint, value, onChange, min = 0, max = 10 }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">
          {label}
        </label>
        {hint && (
          <span className="text-xs text-gray-500 font-medium">
            {hint}
          </span>
        )}
      </div>

      <div className="flex items-center bg-white border border-gray-200 rounded-2xl p-1 shadow-sm hover:shadow focus-within:shadow-md focus-within:border-blue-500 transition-all h-[46px]">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-9 h-9 flex items-center justify-center 
          text-xl font-light text-gray-500 hover:text-gray-700 
          hover:bg-gray-100 active:bg-gray-200 disabled:opacity-40 
          disabled:hover:bg-transparent rounded-xl transition-all"
        >
          −
        </button>

        <span className="flex-1 text-center text-lg font-semibold text-gray-800 tabular-nums">
          {value}
        </span>

        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-9 h-9 flex items-center justify-center 
          text-xl font-light text-gray-500 hover:text-gray-700 
          hover:bg-gray-100 active:bg-gray-200 disabled:opacity-40 
          disabled:hover:bg-transparent rounded-xl transition-all"
        >
          +
        </button>
      </div>
    </div>
  );
}

// ─── FamilyForm Mejorado ────────────────────────────────
export default function FamilyForm({ values, onChange }) {
  const set = (key) => (val) => onChange({ ...values, [key]: val });
  const setSelect = (key) => (e) => onChange({ ...values, [key]: e.target.value });

  const handleHijosTotal = (val) => {
    onChange({
      ...values,
      hijosTotal: val,
      hijosMenores3: Math.min(values.hijosMenores3, val),
    });
  };

  return (
    <section className="w-full p-8 bg-white 
    border-t border-b border-gray-500 
    hover:shadow-md transition-shadow flex flex-col gap-8">
      <h2 className="text-lg font-bold text-black underline underline-offset-4 t tracking-tight">
        Situación personal y familiar
      </h2>

      {/* Hijos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Counter
          label="Hijos menores de 25 años"
          hint="con rentas < 8.000 €/año"
          value={values.hijosTotal}
          onChange={handleHijosTotal}
        />
        <Counter
          label="De esos, menores de 3 años"
          hint="Mínimo adicional de 2.800 €"
          value={values.hijosMenores3}
          onChange={set('hijosMenores3')}
          max={values.hijosTotal}
        />
      </div>

      {/* Ascendientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Counter
          label="Ascendientes 65-74 años"
          hint="que conviven contigo"
          value={values.ascendientes65}
          onChange={set('ascendientes65')}
        />
        <Counter
          label="Ascendientes de 75 o más años"
          hint="que conviven contigo"
          value={values.ascendientes75}
          onChange={set('ascendientes75')}
        />
      </div>

      {/* Discapacidad */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Grado de discapacidad reconocida
        </label>
        <select
          value={values.discapacidad}
          onChange={setSelect('discapacidad')}
          className="w-full px-4 py-3 text-base bg-white border border-gray-200 rounded-2xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-gray-700 font-medium shadow-sm transition-all"
        >
          <option value={0}>Sin discapacidad reconocida</option>
          <option value={33}>33% – 64% (reducción 3.000 €)</option>
          <option value={65}>65% o más (reducción 9.000 €)</option>
        </select>
      </div>
    </section>
  );
}