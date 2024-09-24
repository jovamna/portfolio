
import '../../styles/index.css';
import { useState, useEffect } from 'react'



const CookieConsent= () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showPrivacyMessage, setShowPrivacyMessage] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: false,
    rendimiento: false,
  });




 
  useEffect(() => {
    const cookiesAccepted = document.cookie.split(';').some(cookie => cookie.trim().startsWith('cookiesAccepted='));
    if (cookiesAccepted) {
      setShowBanner(false);
     
    } else {
       //Si no se han aceptado las cookies previamente, mostramos el banner
      setShowBanner(true);
    }
  }, []);

 



  


  

  const handleAccept = () => {
  
    setShowBanner(false);
    
    document.cookie = "cookiesAccepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  };

 
  const handleConfigure = () => {
    setShowBanner(false);
    setShowConfig(true);
    setShowPrivacyMessage(true); // Agregar esta línea
   
  };

  const handleConfigClose = () => {
    setShowConfig(false);
    setSelectedOption(null);
    setShowPrivacyMessage(false); // Ocultar la información de privacidad al cerrar la configuración.
  };

  const handlePrivacyInfo = () => {
    setSelectedOption(false); 
    //setSelectedOption('privacy'); //si lo dejo con provacy, sale la casilla de verificacion
    setShowPrivacyMessage(true);
    setShowConfig(true);
    
  };


  const handleOptionClick = (option) => {
    setShowPrivacyMessage(false);
    setSelectedOption(option);
  
  };

 
  const handleSavePreferences = () => {
    setShowConfig(false);
    document.cookie = "cookiesAccepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  };

  const handleRejectAll = () => {
    setShowBanner(false);
  };

  const handleAllowAll= () => {
    setShowConfig(false); // Cierra la ventana de configuración de cookies
    setShowBanner(false);
    setCookiePreferences({
      necessary: true,
      functional: true,
      rendimiento: true,
    });
    document.cookie = "cookiesAccepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  };


  


 




  return (
        <>
           {/*CONTAINER GENERAL DEL AVISO DE COOKIES Y SUS BOTONES*/}
          {showBanner && (
          <div className="cookie-general bg-orange-500">
          <div className="cookie flex flex-col mx-auto isolate bg-black max-w-[60%] items-center py-12 px-12">

            
               {/*CONTAINER DEL AVISO DE COOKIE */}
              <div className="cookie-consent shadow-2xl sm:rounded-3xl">
              <p className='text-white text-xs '>
              Este sitio web utiliza cookies para mejorar su experiencia.
              Puedes aceptar todas las cookies o gestionar tus preferencias en el panel de configuración. Consulta más información en <a href ="/politica-cookies" className='underline underline-offset-4'>Política de cookies.</a>
              </p>
              </div>

               {/*DIVS DE LOS BOTONES */}
              <div className='cookie-buttons flex flex-row mt-6 w-[100%] justify-between'>
              <button 
              className='cookie-button-aceptar text-white text-xs rounded border-2 border-white px-28 py-2 '
              onClick={handleAccept}>
               Aceptar Todas
               </button>
               <button 
               className='cookie-button-configurar text-black bg-white text-xs rounded border-2 border-white px-28 py-2'
               onClick={handleConfigure}>
               Configurar Cookies
               </button>
               </div>
        
          </div>
          </div>
          )}
          {/*FIN CONTAINER GENERAL DEL AVISO DE COOKIES */}



   
         {/*CONTAINER GENERAL DE LA CONFIGURACION DE COOKIES */}
         {showConfig && (
          <div className="container-general-cookie">
           <div className=" cookie flex flex-row h-[25rem] p-[30px] mx-auto isolate bg-white border-black border-2 max-w-[70%] items-center py-4">
           
      



                {/* CONTAINER DEL MENU Y BOTONES GUARDAR CONFIGURACION Y RECHAZAR*/}
               <div className="cookie-options flex flex-col w-[40%] h-[21rem] ">

                  <h2 className='text-2xl bold font-mono'>Configuración de cookies</h2>  

                   {/*MENU*/}
                  <div className=' flex flex-col py-2 h-[20rem]'>

                   <div className="cookie-privacidad text-xs border-white border-2 bg-gray-200 hover:bg-gray-300 px-2 py-4">
                   <button onClick={handlePrivacyInfo}>Tu privacidad </button>
                   </div>

                  <div className="cookie-option  text-xs border-white border-2 bg-gray-200 hover:bg-gray-300 px-2 py-4">
                  <button onClick={() => handleOptionClick('necessary')}>
                  Cookies estrictamente necesarias
                  </button>
                  </div>


                  <div className="text-xs border-white border-2 bg-gray-200 hover:bg-gray-300 px-2 py-4" >
                  <button onClick={() => handleOptionClick('functional')}>
                  Cookies funcionales
                  </button>
                  </div>


                  <div className="cookie-option text-xs border-white border-2 bg-gray-200 hover:bg-gray-300 px-2 py-4">
                  <button onClick={() => handleOptionClick('rendimiento')}>
                   Cookies de rendimiento
                  </button>
                  </div>

                  </div>
                   {/*FIN MENU*/}

                  {/*BOTONOES GUARDAR Y RECHAZAR */}
                  <div className='flex flex-row justify-between '>
                    <button  
                    className="rounded border text-xs    border-black bg-gray-200 hover:bg-gray-300  px-4 py-2 " 
                    onClick={handleSavePreferences}>
                    Guardar configuración
                    </button>
                    <button  className="rounded border border-black bg-gray-200 hover:bg-gray-300 px-8 py-2 text-xs"  
                    onClick={handleRejectAll}>
                    Rechazar todas
                    </button>
            
                  </div>        
               </div>
               {/* FIN CONTAINER DEL MENU Y BOTONES GUARDAR CONFIGURACION Y RECHAZAR*/}




              
               <div className='flex flex-col mx-auto w-[60%] h-[21rem] '>

                  <div className='h-[16.5rem] ml-6 mt-[2.6rem] '>


                    {/* SELECCION OPTIONS*/}
                    {selectedOption && (
                    <div className="cookie-info flex flex-col w-[100%] ">

                  
                     <h3 className='font-bold mb-2'>Cookie {selectedOption}</h3>
                     {selectedOption === 'necessary' && (
                     <>
                     <p className='text-xs'>
                     Estas cookies son necesarias para que el sitio web funcione y no se pueden desactivar en nuestros sistemas. Normalmente están configuradas para responder a acciones hechas por ti para recibir servicios, tales como ajustar tus preferencias de privacidad, iniciar sesión en tu cuenta, o completar formularios. Puedes configurar tu navegador para bloquear o alertar la presencia de estas cookies, pero algunas partes del sitio web no funcionarán. Estas cookies no guardan ninguna información personal identificable.
                      </p>
                     </>
                     )}
                   

                     {selectedOption === 'functional' && (
                      <>
                       <p className='text-xs'>
                       Estas cookies permiten que el sitio ofrezca una mejor funcionalidad y personalización. Pueden ser establecidas por nosotros o por terceras partes cuyos servicios hemos agregado a nuestras páginas. Sin este tipo de cookies, algunos de nuestros servicios no funcionarían correctamente.
                        </p>
                      </>
                      )}
                  


                      {selectedOption === 'rendimiento' && (
                       <>
                       <p className='text-xs'>
                       Estas cookies nos permiten contar las visitas y fuentes de circulación para poder medir y mejorar el desempeño de nuestro sitio web. Nos ayudan a saber qué páginas son las más o menos populares y visitadas, y cómo los usuarios navegan por el sitio. Toda la información que recogen estas cookies es agregada y, por lo tanto, anónima. En definitiva, estas cookies nos permiten saber cuándo visitaste nuestro sitio web y evaluar si funcionó correctamente.
                        </p>
                       </>
                       )}
                          {/*CASILLA DE VERIFICACION */}
                          <div className='flex flex-row justify-end mt-2'>
                         { /*<label className='mr-4 text-xs'>Aceptar {selectedOption}</label>*/}
                          <label className='mr-4 text-xs'>Aceptar </label>
                         <input 
                         className=''
                         type="checkbox"
                         checked={cookiePreferences[selectedOption]}
                          onChange={() =>
                          setCookiePreferences({
                          ...cookiePreferences,
                          [selectedOption]: !cookiePreferences[selectedOption],
                          })
                          }
                            />

                            
                            </div>



                  </div>
                  )}
                  {/*FIN SELECCION OPTIONS*/}

                    
               

               


   


             
                 {/*RENDER DE PRIVACITY */}
                  <div className=' flex flex-col w-[100%]  '>
                  {showPrivacyMessage&&(
                    <>
                     <h2 className='font-bold mb-4'>Tu privacidad</h2>
                     <p className='text-xs'>
                     Al visitar un sitio web, este podría obtener o guardar información en tu navegador, normalmente mediante el uso de cookies. Esta información puede ser acerca de ti, tus preferencias o tu dispositivo, y se usa principalmente para que el sitio funcione según lo esperado. 

                     </p>
                 
                    </>
                  )}
                  </div>

                  </div>


                  
                   {/*BOTONES PERMITIR Y CERRAR */}
                   <div className=' flex flex-row justify-end'>
                    {/*<button onClick={handleSavePreferences}>Guardar configuración</button>
                    <button onClick={handleRejectAll}>Rechazar todas</button>*/}
                      <button 
                      className="rounded border text-xs border-black bg-gray-200 mr-8 hover:bg-gray-300 px-12 py-2 " 
                      onClick={handleConfigClose}>
                      Cerrar
                      </button> 
                      <button 
                      className="rounded border text-xs border-black bg-black text-white hover:bg-gray-300 px-16 py-2 " 
                      onClick={handleAllowAll}>
                      Permitir todas
                      </button>
                   
                   </div>
                  {/*BOTONES PERMITIRI Y CERRAR */}


               </div>














                 
       
        </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;





