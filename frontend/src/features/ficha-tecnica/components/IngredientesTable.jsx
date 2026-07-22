import { UNIDADES, ingredienteVacio, calcularCosteTotal, fmtEur } from '../../../utils/hosteleria/ficha-tecnica/fichaUtils';

export default function IngredientesTable({ ingredientes, onChange }) {

  const updateRow = (id, field, value) => {
    onChange(ingredientes.map((ing) =>
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const addRow = () => {
    onChange([...ingredientes, ingredienteVacio()]);
  };

  const removeRow = (id) => {
    onChange(ingredientes.filter((ing) => ing.id !== id));
  };

  const removeAll = () => {
    if (ingredientes.length === 0) return;
    if (confirm('¿Eliminar todos los ingredientes?')) {
      onChange([ingredienteVacio()]);
    }
  };

  const costeTotal = calcularCosteTotal(ingredientes);

  return (
    <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-700">
      <div className="flex justify-between items-center lg:mb-6 mb-2">
          <h2 className="text-base lg:text-base font-bold text-black lg:mb-4 mb-2 underline underline-offset-4 uppercase">
          Ingredientes</h2>
        <button 
          type="button" 
          onClick={removeAll} 
          className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          Vaciar todo
        </button>
      </div>

      {/* Cabecera para pantallas de escritorio (Oculta en móviles) */}
      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_2fr_40px] gap-3 px-3 py-2 bg-gray-50 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        <span>Ingrediente</span>
        <span className="text-center">Cantidad</span>
        <span>Unidad</span>
        <span>Coste (€)</span>
        <span>Proveedor</span>
        <span></span>
      </div>

      {/* Filas de ingredientes */}
      <div className="space-y-4 md:space-y-2">
        {ingredientes.map((ing) => (
          <div 
            key={ing.id} 
            className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_2fr_40px] gap-3 bg-gray-50/50 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none border border-gray-100 md:border-none relative"
          >
            {/* Input Nombre */}
            <div className="flex flex-col md:block">
              <span className="md:hidden text-xs font-bold text-gray-400 uppercase mb-1">Ingrediente</span>
              <input
                type="text"
                placeholder="Ej: Arroz carnaroli"
                value={ing.nombre}
                onChange={(e) => updateRow(ing.id, 'nombre', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                data-label="Ingrediente"
              />
            </div>

            {/* Input Cantidad */}
            <div className="flex flex-col md:block">
              <span className="md:hidden text-xs font-bold text-gray-400 uppercase mb-1">Cantidad</span>
              <input
                type="number"
                min={0}
                step={0.01}
                placeholder="200"
                value={ing.cantidad}
                onChange={(e) => updateRow(ing.id, 'cantidad', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-left md:text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                data-label="Cantidad"
              />
            </div>

            {/* Select Unidad */}
            <div className="flex flex-col md:block">
              <span className="md:hidden text-xs font-bold text-gray-400 uppercase mb-1">Unidad</span>
              <select
                value={ing.unidad}
                onChange={(e) => updateRow(ing.id, 'unidad', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                data-label="Unidad"
              >
                {UNIDADES.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>

            {/* Input Coste */}
            <div className="flex flex-col md:block">
              <span className="md:hidden text-xs font-bold text-gray-400 uppercase mb-1">Coste (€)</span>
              <input
                type="number"
                min={0}
                step={0.01}
                placeholder="1.20"
                value={ing.coste}
                onChange={(e) => updateRow(ing.id, 'coste', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                data-label="Coste (€)"
              />
            </div>

            {/* Input Proveedor */}
            <div className="flex flex-col md:block">
              <span className="md:hidden text-xs font-bold text-gray-400 uppercase mb-1">Proveedor</span>
              <input
                type="text"
                placeholder="Ej: Mercabarna"
                value={ing.proveedor}
                onChange={(e) => updateRow(ing.id, 'proveedor', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                data-label="Proveedor"
              />
            </div>

            {/* Botón Eliminar */}
            <div className="absolute top-4 right-4 md:relative md:top-0 md:right-0 flex items-center justify-end h-full pt-0 md:pt-1">
              <button
                type="button"
                onClick={() => removeRow(ing.id)}
                disabled={ingredientes.length === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-900 hover:text-red-500 hover:bg-red-50 disabled:opacity-0 disabled:cursor-not-allowed transition-all text-sm"
                aria-label="Eliminar ingrediente"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <button 
        type="button" 
        onClick={addRow} 
        className="w-full mt-4 border-2 border-dashed border-gray-500 hover:border-blue-400 text-gray-900 hover:text-blue-600 font-medium py-2.5 rounded-xl transition-all text-sm"
      >
        + Añadir ingrediente
      </button>

      <div className="mt-6 flex justify-between items-center p-4 bg-blue-50/50 rounded-xl border border-blue-100/50 text-sm">
        <span className="text-gray-600 font-medium">Coste total de ingredientes</span>
        <strong className="text-lg font-bold text-blue-600">{fmtEur(costeTotal)}</strong>
      </div>
    </section>
  );
}