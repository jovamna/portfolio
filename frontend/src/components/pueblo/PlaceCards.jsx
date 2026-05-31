



export default function PlaceCards({ places }) {
  
  // Estado de aviso si tras filtrar no hay ningún local en esa categoría
  if (!places || places.length === 0) {
    return (
      <div className="w-full p-12 text-center bg-white rounded-xl border border-gray-100 shadow-sm">
        <p className="text-sm font-medium text-gray-400">No se encontraron lugares en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {places.map((place) => (
        <div 
          key={place.id} 
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md group"
        >
          {/* Contenedor Superior: Imagen y Badge de Distancia */}
          <div className="relative w-full h-48 overflow-hidden bg-gray-100">
            <img 
              src={place.foto} 
              alt={place.nombre}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Badge flotante con la distancia en metros o kilómetros */}
            <span className="absolute bottom-3 left-3 text-xs font-extrabold px-2.5 py-1 bg-mauve-500 text-white rounded-lg shadow-sm font-mono tracking-wide">
              🏃 a {place.distanciaFormateada} 
            </span>
            
            {/* Badge flotante con la puntuación */}
            <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 bg-white/90 backdrop-blur-sm text-gray-800 rounded-md shadow-sm flex items-center gap-1">
              ⭐ {place.puntuacion.toFixed(1)}
            </span>
          </div>

          {/* Contenedor Central: Textos informativos */}
          <div className="p-5 flex bg-mauve-200 rounded-b-xl flex-col gap-2 flex-grow">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-mauve-600 transition-colors">
              {place.nombre}
            </h3>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              {place.categoria === 'hotel' ? '🏨 Alojamiento' : place.categoria === 'restaurante' ? '🍔 Comida' : '☕ Cafetería'}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-1">
              {place.descripcion}
            </p>
          </div>

          {/* Contenedor Inferior: Botón de acción hacia Google Maps */}
          {/* Contenedor Inferior: Botón de acción hacia Google Maps */}
           <div className="p-5 pt-0">
            <a
            href={`https://www.google.com/maps/search/?api=1&query=${place.latitud},${place.longitud}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center 
            justify-center gap-2 px-4 py-2.5 bg-gray-50 
            hover:bg-blue-50 text-gray-900 hover:text-blue-700 
            font-bold text-xs rounded-xl transition-all 
            duration-200 border border-gray-100 hover:border-blue-100">
                <span>🗺️</span> Cómo llegar en coche o andando
                </a>
               </div>
               </div>
             ))}
             </div>
             );
            }
