import { useEffect, useState } from 'react';

function ResetPasswordSuccess() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get('success');

    if (successParam === 'true') {
      // Si el parámetro "success" está presente, muestra el mensaje de éxito
      setShowSuccessMessage(true);
      // Configura un temporizador para ocultar el mensaje después de 10 segundos (10000 ms)
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 10000);

      // Limpia el temporizador cuando el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div>
      {showSuccessMessage && (
        <div className="success-message absolute w-[90%] italic text-sm font-mono flex flex-col justify-center max-auto">
          <p className='text-center'>enviado exitosamente. Por favor, revisa tu bandeja de entrada.</p>
        </div>
      )}
    </div>
  );
}

export default ResetPasswordSuccess;