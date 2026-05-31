import { useState, useCallback } from 'react';
import { SITIOS_PUEBLO, PUEBLO_CENTRO } from '../data/puebloData';

// ─── FÓRMULA MATEMÁTICA DE HAVERSINE ─────────────────────────────────────────
// Calcula la distancia exacta en kilómetros entre dos coordenadas geográficas
function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la Tierra en kilómetros
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distancia final en Km
}

// ─── HOOK PERSONALIZADO DE GEOLOCALIZACIÓN ────────────────────────────────────
export function useNearbyPlaces() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  /**
   * Obtiene la ubicación actual del usuario y calcula la cercanía de los locales
   * @param {string} categoriaFiltro - 'todos', 'hotel', 'restaurante', 'cafeteria'
   */
  const loadNearbyPlaces = useCallback((categoriaFiltro = 'todos') => {
    setLoading(true);

    // Intentamos usar el GPS real del navegador del internauta
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const uLat = position.coords.latitude;
          const uLng = position.coords.longitude;
          setUserLocation({ lat: uLat, lng: uLng });
          procesarSitios(uLat, uLng, categoriaFiltro);
        },
        () => {
          // Si el usuario deniega el GPS, usamos por defecto el centro del pueblo para simular
          console.warn("GPS denegado. Usando centro del pueblo por defecto.");
          setUserLocation(PUEBLO_CENTRO);
          procesarSitios(PUEBLO_CENTRO.lat, PUEBLO_CENTRO.lng, categoriaFiltro);
        }
      );
    } else {
      setUserLocation(PUEBLO_CENTRO);
      procesarSitios(PUEBLO_CENTRO.lat, PUEBLO_CENTRO.lng, categoriaFiltro);
    }
  }, []);

  // Función interna para filtrar, calcular distancias y ordenar el array
  const procesarSitios = (userLat, userLng, filtro) => {
  let resultado = SITIOS_PUEBLO;
  if (filtro !== 'todos') {
    resultado = SITIOS_PUEBLO.filter(sitio => sitio.categoria === filtro);
  }

  // 1. Calculamos la distancia real al primer sitio para ver si el usuario está en el pueblo
  const distanciaAlPueblo = calcularDistanciaKm(userLat, userLng, PUEBLO_CENTRO.lat, PUEBLO_CENTRO.lng);
  
  let latFinal = userLat;
  let lngFinal = userLng;

  // 2. Si el usuario está a más de 15km (está en otra ciudad), simulamos que está en el centro del pueblo
  if (distanciaAlPueblo > 15) {
    console.log("Usuario fuera del rango del pueblo. Activando ubicación simulada del centro.");
    latFinal = PUEBLO_CENTRO.lat;
    lngFinal = PUEBLO_CENTRO.lng;
  }

  // 3. Calculamos las distancias finales
  const sitiosConDistancia = resultado.map(sitio => {
    const dist = calcularDistanciaKm(latFinal, lngFinal, sitio.latitud, sitio.longitud);
    return {
      ...sitio,
      distanciaKm: dist,
      distanciaFormateada: dist < 1 
        ? `${Math.round(dist * 1000)} metros` 
        : `${dist.toFixed(1)} km`
    };
  });

  sitiosConDistancia.sort((a, b) => a.distanciaKm - b.distanciaKm);
  setPlaces(sitiosConDistancia);
  setLoading(false);
};

  return { places, userLocation, loading, loadNearbyPlaces };
}
