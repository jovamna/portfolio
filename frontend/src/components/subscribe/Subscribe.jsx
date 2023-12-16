import { useState } from 'react';
import axios from 'axios';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_REACT_API_URL
    : "http://localhost:8000";

  console.log(URL);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/api/contacts/subscribe`, { email: email });
      if (response.status === 201) {
        setMessage(response.data.success);
        setEmail('');
      } else if (response.status === 409) {
        setMessage(response.data.error);  // Usuario ya existente
      } else {
        setMessage('Ha ocurrido un error al suscribirse. Inténtalo de nuevo más tarde.');  // Otros errores
      }

    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        setMessage('Ya estás suscrito.');  // Usuario ya existente
      } else {
        setMessage('Ha ocurrido un error al suscribirse. Inténtalo de nuevo más tarde.');  // Otros errores o error de conexión
      }
    }
  };





  
  return (

    <div className='footer-suscribe w-auto flex flex-col items-center py-4 mb-2 mt-8'>

        {/*text-gray-400 */}
        <div className='movil-suscribe-text-div flex flex-col w-[100%] items-center justify-center'>
            <label 
            className="movil-suscribe-text text-gray-100 mb-4 text-xl  text-center "  
            htmlFor="email">
            ¿No quieres perderte nada? Suscríbete a los boletines
            </label>
        </div>
    


        <form onSubmit={handleSubmit} className='w-[42%] footer-form-suscribe'>
            {/*CONTAINER DE INPUT Y BOTON */}
           <div className='flex flex-row w-full  border-b-2 border-zinc-500/50 hover:border-white'>
             {/*INPUT */}
             <div className='input-footer-suscribe flex w-[80%]  py-2 '>
             <input 
             className='w-full appearance-none bg-transparent border-none leading-tight border focus:outline-none   font-semibold border-transparent focus:border-transparent focus:ring-0 placeholder-white text-white'
             type="email" 
             id="email" 
             value={email}
             placeholder="Escribe tu e-mail *"  
             onChange={(e) => setEmail(e.target.value)} 
             />
             </div>
             {/*bg-neutral-400  */}



          {/*BOTON*/}
          <div className='boton-footer-suscribe flex w-[20%] py-2'>
             <button 
              className="footer-suscribe-bo relative w-[100%] tracking-wide"
             type="submit"
             >
            <span className="footer-suscribe-enviar text-white font-semibold"> enviar </span>
             <span className="newsletter-animation absolute inset-0 flex items-center text-black justify-center ml-20 text-[0.5rem] ">
           ⚪
            </span>
           </button>
             </div>


           </div>

           <p className='text-gray-500'>{message}</p>
        </form>




    </div>
   
  );
};

export default SubscribeForm;
