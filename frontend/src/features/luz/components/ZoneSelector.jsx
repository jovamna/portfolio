import { ZONES } from '../../../utils/priceUtils';

export default function ZoneSelector({ active, onChange, disabled }) {
  return (
    <div className="inline-flex rounded-lg bg-gray-100 p-1" role="group" aria-label="Seleccionar zona geográfica">
      {Object.entries(ZONES).map(([code, label]) => {
        const isActive = active === code;
        return (
          <button
            key={code}
            onClick={() => onChange(code)}
            disabled={disabled}
            aria-pressed={isActive}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all duration-200 ${
              isActive
                ? 'bg-mauve-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 disabled:opacity-50'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}