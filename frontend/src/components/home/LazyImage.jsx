import { useState, useEffect } from 'react';

const LazyImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
    };
  }, [src]);

  if (!imageSrc) {
    return null; // Puedes mostrar un indicador de carga aquí si lo deseas
  }

  return <img src={imageSrc} alt={alt} className={className} />;
};

export default LazyImage;

