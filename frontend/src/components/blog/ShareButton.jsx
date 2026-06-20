import { useState } from 'react';
import { FiShare2 } from 'react-icons/fi'; // Puedes usar react-icons

const ShareButton = ({ title, text, url }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Verificar si el navegador soporta la función nativa de compartir (móviles sobre todo)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title, // Título del post
          text: text,   // Pequeña descripción
          url: url || window.location.href, // URL del post actual
        });
      } catch (error) {
        console.log('Error al compartir:', error);
      }
    } else {
      // 💡 PLAN B: Si está en una PC vieja que no lo soporta, copiamos al portapapeles
      navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // El aviso dura 2 segundos
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 
      bg-zinc-100 hover:bg-indigo-50 hover:text-indigo-600 text-zinc-800 
      text-sm font-medium rounded-lg transition-all duration-200"
    >
      <FiShare2 className="text-base" />
      {copied ? '¡Enlace copiado! 📋' : 'Compartir'}
    </button>
  );
};

export default ShareButton;

