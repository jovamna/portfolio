


export default function EscaladorReceta({
  racionesOriginales,
  racionesNuevas,
  onRacionesNuevasChange,
  ingredientesEscalados,
  onEscalar,
}) {
  const factor =
    parseFloat(racionesOriginales) > 0 &&
    parseFloat(racionesNuevas) > 0
      ? parseFloat(racionesNuevas) / parseFloat(racionesOriginales)
      : 0;

  return (
    <section className="mt-16 p-5 border border-neutral-700 rounded-2xl shadow-sm">

      <div className="mb-5 flex flex-col">
        <h2 className="text-lg lg:text-2xl font-bold text-center text-gray-900 uppercase">
          Escalar receta
        </h2>

        <p className="text-sm text-gray-500 mt-1 text-center">
          Calcula automáticamente las cantidades necesarias
          para una producción diferente.
        </p>
      </div>

      {/**INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end py-8">

        {/* Raciones originales */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Raciones actuales
          </label>

          <input
            type="number"
            value={racionesOriginales}
            readOnly
            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2"
          />
        </div>

        {/* Nuevas raciones */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Nueva cantidad
          </label>

          <input
            type="number"
            min="1"
            value={racionesNuevas}
            onChange={(e) =>
              onRacionesNuevasChange(e.target.value)
            }
            placeholder="Ej: 20"
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Factor */}

         <div>
           <span className="block text-xs text-gray-500">
            Factor de escalado
          </span>
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
         

          <strong className="text-xl text-blue-600">
            × {factor > 0 ? factor.toFixed(2) : '—'}
          </strong>
        </div>


         </div>

         <button
          type="button"
          onClick={onEscalar}
          className="hover:bg-mauve-400 hover:text-white bg-white border border-neutral-400 rounded-xl py-2 "
            >
              <p className="text-bold uppercase lg:text-sm text:sm">
    Escalar receta
              </p>
        
           </button>
        



      </div>




      {/**RESULTADOS */}

      {ingredientesEscalados.length > 0 && (
        <div className="mt-6  py-8 border-y border-neutral-400 ">

          <h3 className="font-bold text-gray-800 mb-3">
            Receta escalada
          </h3>

          <div className="overflow-hidden border border-gray-200 rounded-xl">

            <div className="grid grid-cols-[2fr_1fr_1fr] gap-3 px-4 py-3 bg-gray-50 text-xs font-bold text-gray-500 uppercase">
              <span>Ingrediente</span>
              <span>Original</span>
              <span>Escalado</span>
            </div>

            {ingredientesEscalados.map((ing) => (
              <div
                key={ing.id}
                className="grid grid-cols-[2fr_1fr_1fr] gap-3 px-4 py-3 border-t border-gray-100"
              >
                <span className="font-medium text-gray-800">
                  {ing.nombre}
                </span>

                <span className="text-gray-500">
                  {ing.cantidad} {ing.unidad}
                </span>

                <strong className="text-blue-600">
                  {ing.cantidadEscalada.toFixed(2)} {ing.unidad}
                </strong>
              </div>
            ))}

          </div>

        </div>
      )}

    </section>
  );
}