// Configuración de las categorías disponibles en la Guía
const CATEGORIAS = [
  { id: 'todos',       label: 'Ver Todo',    icon: '📍', colorActive: 'bg-mauve-500 text-white' },
  { id: 'hotel',       label: 'Hoteles',     icon: '🏨', colorActive: 'bg-amber-500 text-white' },
  { id: 'restaurante', label: 'Restaurantes', icon: '🍔', colorActive: 'bg-green-600 text-white' },
  { id: 'cafeteria',   label: 'Cafeterías',  icon: '☕', colorActive: 'bg-purple-600 text-white' },
  { id: 'farmacia',   label: 'farmacias',  icon: '☕', colorActive: 'bg-yellow-800 text-white' },
];

export default function PlaceSelector({ active, onChange, disabled }) {
  return (
    <div 
      className="inline-flex flex-wrap p-1 lg:mt-[40px] bg-gray-100 
      gap-1 w-full sm:w-auto border-t border-b border-black" 
      role="group" 
      aria-label="Filtrar lugares por categoría"
    >
      {CATEGORIAS.map((cat) => {
        const isActive = active === cat.id;
        
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            disabled={disabled}
            aria-pressed={isActive}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 disabled:opacity-50 ${
              isActive
                ? `${cat.colorActive} shadow-sm scale-100`
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
            }`}
          >
            {/* Icono visual de la categoría */}
            <span className="text-sm">{cat.icon}</span>
            
            {/* Texto descriptivo */}
            <span className="whitespace-nowrap">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
