

import { pasoVacio } from '../../../utils/hosteleria/ficha-tecnica/fichaUtils';

export default function PreparacionSteps({ pasos, onChange }) {

  const updateStep = (id, texto) => {
    onChange(pasos.map((p) => (p.id === id ? { ...p, texto } : p)));
  };

  const addStep = () => {
    onChange([...pasos, pasoVacio()]);
  };

  const removeStep = (id) => {
    onChange(pasos.filter((p) => p.id !== id));
  };

  return (
    <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-700">
         <h2 className="text-base lg:text-base font-bold text-black mb-4 underline underline-offset-4 uppercase">
        Preparación paso a paso</h2>

      <div className="space-y-3 mb-4">
        {pasos.map((paso, i) => (
          <div key={paso.id} className="flex gap-3 items-start bg-gray-50/50 p-3 rounded-xl border border-gray-100/50">
            <span className="flex items-center justify-center w-6 h-6 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mt-1.5 shrink-0">
              {i + 1}
            </span>
            <textarea
              placeholder={`Describe el paso ${i + 1}...`}
              value={paso.texto}
              onChange={(e) => updateStep(paso.id, e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              rows={2}
            />
            <button
              type="button"
              onClick={() => removeStep(paso.id)}
              disabled={pasos.length === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-0 disabled:cursor-not-allowed transition-all text-sm mt-1.5 shrink-0"
              aria-label="Eliminar paso"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button 
        type="button" 
        onClick={addStep} 
        className="w-full border-2 border-dashed border-gray-500 hover:border-blue-400 text-gray-900 hover:text-blue-600 font-medium py-2.5 rounded-xl transition-all text-sm"
      >
        + Añadir paso
      </button>
    </section>
  );
}