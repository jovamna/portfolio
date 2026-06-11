export default function SalaryForm({ values, onChange }) {
  const set = (key) => (e) => onChange({ ...values, [key]: e.target.value });

  // Cambiar entre Mensual y Anual → siempre limpia el campo
  const handleTipoChange = (e) => {
    const nuevoTipo = e.target.value;

    onChange({
      ...values,
      salarioTipo: nuevoTipo,
      salarioBruto: ''        // ← Siempre limpia al cambiar de tipo
    });
  };

  // Cambio en el input de salario
  const handleSalarioChange = (e) => {
    onChange({ ...values, salarioBruto: e.target.value });
  };

  const tipo = values.salarioTipo || 'anual';
  const esMensual = tipo === 'mensual';

  return (
    <section className="w-full p-8 bg-white border-t border-gray-500 hover:shadow-md transition-shadow flex flex-col gap-8">
      <h2 className="text-lg font-bold text-black underline underline-offset-4 tracking-tight">
        Datos del salario
      </h2>

      {/* Selector Mensual / Anual */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          ¿Cómo quieres introducir el salario?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {['anual', 'mensual'].map((t) => (
            <label
              key={t}
              className={`flex items-center justify-center h-12 text-base font-semibold rounded-lg border cursor-pointer transition-all ${
                tipo === t
                  ? 'bg-mauve-600 border-blue-600 text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="salarioTipo"
                value={t}
                checked={tipo === t}
                onChange={handleTipoChange}
                className="sr-only"
              />
              {t === 'anual' ? 'Salario Anual' : 'Salario Mensual'}
            </label>
          ))}
        </div>
      </div>

      {/* Campo de salario */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700" htmlFor="salario">
          Salario bruto <span className="font-bold">{esMensual ? 'mensual' : 'anual'}</span>
        </label>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">€</span>
          <input
            id="salario"
            type="number"
            min={0}
            step={esMensual ? "50" : "1000"}
            placeholder={esMensual ? "2000" : "30000"}
            value={values.salarioBruto || ''}
            onChange={handleSalarioChange}
            className="w-full pl-9 pr-4 py-3 text-base bg-white border border-gray-200 rounded-2xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-medium shadow-sm transition-all"
          />
        </div>

        <p className="text-xs text-gray-500">
          {esMensual 
            ? "Se convertirá automáticamente ×12 para el cálculo anual" 
            : "Introduce el importe total bruto del año"}
        </p>
      </div>

      {/* Número de pagas */}
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

      {/* Comunidad Autónoma */}
      <div className="flex flex-col gap-2">
        <label className="block text-sm font-medium text-gray-700">
          Comunidad Autónoma
        </label>
        <select
          value={values.ccaa || 'media'}
          onChange={(e) => onChange({ ...values, ccaa: e.target.value })}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          <option value="media">📊 Media (recomendado)</option>
          <option value="madrid">🏛️ Madrid</option>
          <option value="andalucia">🌴 Andalucía</option>
          <option value="cataluna">🏔️ Cataluña</option>
          <option value="valencia">🌊 Comunidad Valenciana</option>
          <option value="otras">Otras CCAA</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Afecta al tipo de retención estimado</p>
      </div>
    </section>
  );
}