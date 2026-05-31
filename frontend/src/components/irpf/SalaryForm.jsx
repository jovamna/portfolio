export default function SalaryForm({ values, onChange }) {
  const set = (key) => (e) => onChange({ ...values, [key]: e.target.value });

  return (
    <section className="w-full p-8 bg-white  border-t 
    border-gray-500
     hover:shadow-md 
    transition-shadow flex flex-col gap-8">
      <h2 className="text-lg font-bold text-black underline underline-offset-4 tracking-tight">
        Datos del salario
      </h2>

      {/* Salario y Pagas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700" htmlFor="salario">
            Salario bruto anual
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">€</span>
            <input
              id="salario"
              type="number"
              min={0}
              step={500}
              placeholder="30000"
              value={values.salarioBruto}
              onChange={set('salarioBruto')}
              className="w-full pl-9 pr-4 py-3 text-base bg-white border border-gray-200 rounded-2xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-medium shadow-sm transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Número de pagas
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[12, 14].map((p) => {
              const isChecked = Number(values.pagas) === p;
              return (
                <label
                  key={p}
                  className={`flex items-center justify-center h-12 text-base font-semibold rounded-lg border cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-mauve-600 border-blue-600 text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="pagas"
                    value={p}
                    checked={isChecked}
                    onChange={set('pagas')}
                    className="sr-only"
                  />
                  {p} pagas
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contrato y Edad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Tipo de contrato
          </label>
          <select
            value={values.contrato}
            onChange={set('contrato')}
            className="w-full px-4 py-3 text-base bg-white border border-gray-200 rounded-2xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-gray-700 font-medium shadow-sm"
          >
            <option value="indefinido">Indefinido</option>
            <option value="temporal">Temporal</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex justify-between" htmlFor="edad">
            <span>Tu edad</span>
            <span className="text-xs text-gray-500 font-normal">afecta al mínimo personal</span>
          </label>
          <input
            id="edad"
            type="number"
            min={16}
            max={99}
            value={values.edadTrabajador}
            onChange={set('edadTrabajador')}
            className="w-full px-4 py-3 text-base bg-white border border-gray-200 rounded-2xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-medium shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}