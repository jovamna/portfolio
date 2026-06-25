import { fmtCents } from '../../../utils/priceUtils';

export default function BestHours({ data }) {
  // Ordenamos de menor a mayor precio y tomamos las 3 mejores horas
  
  const best = Object.entries(data)
    .sort((a, b) => a[1].price - b[1].price)
    .slice(0, 3);

  // 🛠️ Función mágica para tunear el texto (ej: "07-08" pasa a "07:00 a 08:00")
  //ANADIDO ULYIMO PARA CORREGIR FORMATO 07h
  const formatHourRange = (rangeStr) => {
    // Separa el "07" y el "08" usando el guion como corte
    const [start, end] = rangeStr.split('-');
    if (!start || !end) return rangeStr; // Por si acaso viene un formato raro
    return `${start}:00 a ${end}:00`;
  };

  return (
    <div className="w-full p-5 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4">
     {/* Título de la sección */}
<     p className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
     {/* El icono se queda limpio y sin subrayar */}
      <span className="text-base">⚡</span> 
  
      {/* El subrayado se aplica solo al texto del título */}
      <span className="underline underline-offset-8">
       Mejores horas para enchufar hoy
       </span>
      </p>
      
      {/* Contenedor de las 3 horas (se adapta a móviles) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {best.map(([hourKey, entry], i) => (
          <div 
            key={hourKey} 
            className="relative flex flex-col 
            items-center justify-center p-4 bg-green-50/50 
            border border-green-100 rounded-xl transition-all 
            hover:shadow-md">
            {/* Badge de posición (#1, #2, #3) */}
            <span className="absolute top-2 left-2 text-[10px] font-extrabold px-1.5 py-0.5 bg-green-200 text-green-800 rounded-md uppercase tracking-wider">
              #{i + 1}
            </span>

             {/* Intervalo de hora */}
            {/* 🕒 ¡Aquí está el cambio! Ahora se lee: "07:00 a 08:00 h" */}
            <p className="text-base font-bold text-gray-700 mt-3 text-center">
             de:  {formatHourRange(hourKey)} <span className="text-xs font-normal text-gray-400">h</span>
            </p>
          
            
            {/* Intervalo de hora */}
           { /*<p className="text-lg font-bold text-gray-700 mt-2">{hourKey}h</p>*/}
            
            {/* ¡Aquí está la solución! Usamos text-green-600 de Tailwind */}
           {/* <p className="text-sm font-semibold text-green-600 mt-0.5">
              {fmtCents(entry.price)}
            </p>*/}

            <p className="text-sm font-semibold text-green-600 mt-1">
             {fmtCents(entry.price).replace('c€', '')} céntimos <span className="text-xs text-gray-400 font-normal">/ kWh</span>
           </p>



          </div>
        ))}
      </div>
    </div>
  );
}