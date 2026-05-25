import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SmoothScrollbar () {
  // El hook useLocation nos avisa cada vez que la URL cambia (ej: de '/' a '/escandallo')
  const { pathname } = useLocation();

  useEffect(() => {
    // ¡Aquí está el truco mágico! Forzamos al navegador a ir a la coordenada (0,0) arriba del todo
    window.scrollTo(0, 0);
  }, [pathname]); // Se ejecuta cada vez que cambia la ruta

  return null; // No pinta nada en pantalla, trabaja en secreto en segundo plano
}