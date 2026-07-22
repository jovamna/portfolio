import { ALERGENOS } from '../../../utils/hosteleria/ficha-tecnica/fichaUtils';

export default function AlergenosSelector({ selected, onChange }) {

  const toggle = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-700">
         <h2 className="text-base lg:text-base font-bold text-black mb-4 underline underline-offset-4 uppercase">
        Alérgenos que contiene</h2>
      <p className="text-xs text-gray-700 leading-relaxed mb-6">
        Marca los alérgenos presentes según el Reglamento (UE) 1169/2011, de obligada
        declaración en cartas y menús.
      </p>

      {/* Grid responsivo para las etiquetas de alérgenos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {ALERGENOS.map((a) => {
          const active = selected.includes(a.id);
          return (
            <label
              key={a.id}
              className={`
                flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium cursor-pointer select-none transition-all duration-200 text-center
                ${active 
                  ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm shadow-blue-500/10' 
                  : 'bg-gray-50/50 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                }
              `}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => toggle(a.id)}
                className="sr-only" /* 👈 Oculta el checkbox original de forma accesible */
              />
              {/* Si habilitas los emojis en el futuro, se verán geniales aquí */}
              {a.emoji && <span className="text-base">{a.emoji}</span>}
              <span>{a.label}</span>
            </label>
          );
        })}
      </div>
    </section>
  );
}