import { useState } from 'react';
import axios from 'axios';
import chatbot from '../../assets/img/chatbot.png';
import '../../styles/index.css';



{/*npm install react-bootstrap bootstrap */}



function Chatbot() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [chatbotResponse, setChatbotResponse] = useState([]);
  const [userMessage, setUserMessage] = useState('');
 



  //PRIMERA Y UNICA IMAGEN DE RESPUESTA
  const handleChatbotIconClick = () => {
    console.log('Se hizo clic en el icono del chatbot');
    console.log('isChatbotVisible actual:', isChatbotVisible); // Agrega esta línea
   
    // Actualiza isChatbotVisible
    setIsChatbotVisible((prevIsVisible) => !prevIsVisible);
    if (!showWelcomeMessage) {
      setChatbotResponse((prevChatbotResponse) => [
        ...prevChatbotResponse,
        { message: '¡Hola, soy el asistente virtual! Bienvenido / a', isUser: false, botImage: '/images/f.png'}, //segunda imagen de respuestas del chatbot
      ]);
      setShowWelcomeMessage(true);
    }
  };



  //URL de la imagen del chatbot DEBE ESTAR EN LA CARPETA PUBLIC
  //SEGUNDA imagen de respuesta del chatbot
  const chatbotImageURL = "/images/mail.jpg"; // Reemplaza esta URL con la ruta correcta de tu imagen

  const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_REACT_API_URL
    : "http://localhost:8000";

  console.log(URL);

   //SEGUNDA IMAGEN DE RESPUESTA
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${URL}/api/chatbot/chat/`, { user_message: userMessage });
      console.log(response);
      const botResponse = response.data.bot_response;
      // Asegúrate de que este campo esté presente en la respuesta de la API
      // const botImage = response.data.bot_image;
      console.log(response.data.bot_response);
      console.log(response.data.bot_image);
  
      setChatbotResponse((prevChatbotResponse) => [
          ...prevChatbotResponse,
          { message: userMessage, isUser: true },
          { message: botResponse, isUser: false, botImage: chatbotImageURL }, 
          // { message: botResponse, isUser: false, botImage: '/images/f.png' }, 
      ]);
      
      setUserMessage(''); // Limpia el campo de entrada después de enviar el mensaje
  } catch (error) {
      console.log(error);
  }
}



  
  
 



  return (
    //flow-root sirve para q el div interno se puedan poner float-right y se muevan a un lado
    <div className="chat-general max-w-[95%] mx-auto flex justify-end items-end">

      {/*CONTAINER PRINCIPAL QUE ENCIERRA EL CHATBOT USER Y FORMULARIO */}
      <div className="chat-container w-[28%]" 
      style={{ position: "fixed", 
        bottom: "20px", 
        right: "32px", 
        zIndex: "1000", 
        maxHeight: '450px', 
        overflowY: 'auto',  
        scrollbarWidth: 'thin',
        scrollbarColor: 'red', 
        WebkitScrollbarWidth: 'thin', 
        WebkitScrollbarColor: 'red yellow' }}>
       {/*<div className="chat-container w-[28%]">*/}
         {/*<div className='container-general-chat w-[40%] float-right bg-neutral-200 rounded-lg'>*/}
         

            {/* Icono chatbot ABRE CHAT*/}
            {/* Renderizar el icono del chatbot solo si no está visible */}
           {!isChatbotVisible && (
         
           <div className='container-chat-circulo  flex justify-end items-end' onClick={handleChatbotIconClick}>
            {/* Renderiza aquí tu icono del chatbot */}
            <img src={chatbot} width={48} height={48} alt="Chatbot" className='hover:opacity-75'/>
           </div>
         
           )}
            {/*FIN Icono chatbot ABRE */}
   


           {/*CONTAINER que se abre PRINCICPAL DEL CHAT DEL USER Y CHAT AL 100% */}
           {/* Chatbot Y USER*/}
          <div className={`chat   ${isChatbotVisible ? 'visible' : 'hidden'} bg-white `}>

                <div className='chat-asistente-aspa flex flex-row justify-center items-center fixed bg-white w-[353px] border-b-2 border-neutral-300 '>
                  <h1 className='w-[92%] ml-33 mb-0 text-base font-serif  font-semibold text-gray-800 text-center '>
                  Asistente Online
                  </h1>  
                   <p className='w-[8%] hover:opacity-75 text-black py-2 cursor-pointer' 
                   onClick={handleChatbotIconClick} >
                   X
                  </p>
                 
                </div>
                <div className='espacio-separa-fixed-del-chat h-[70px]'></div>

                {/*CONTAINER SECUNDARIO DEL CHAT DEL USER Y EL CHATBOT AL 70%*/}
                {chatbotResponse.map((chatMessage, index) => (      
                  //{chatbotResponse.slice().reverse().map((chatMessage, index) => ( 
                  //{chatbotResponse.reverse().map((chatMessage, index) => ( 
                <div 
                 key={index} 
                 className={`flex items-end ${chatMessage.isUser ? 'justify-end' : 'justify-start'}`}
                 >
                     {chatMessage.isUser ? (
                     //DIV DE USER
                     <div className="py-2 px-4 my-4   rounded-lg font-mono text-orange-950 bg-orange-400">
                     {chatMessage.message}
                     </div>

                    ) : (
                    <>
                    {/* DIV DEL CHATBOT y IMAGEN */}
                   <div className='w-[88%] flex flex-row'>
                      <div className='chat-jm w-1/6 px-4 font-extrabold font-mono text-black text-xl'>
                        JM
                   {/* <img
                      src={chatMessage.botImage}  //segunda imagen handleChatbotIconClick
                      width={650}
                      height={350}
                      alt="Chatbot"
                     className="w-[100%] h-[80%]"
                    />*/}
                     </div>
                     <div className="p-4 w-5/6 rounded-lg border-2 border-neutral-200 text-neutral-950 text-base font-mono">
                    {chatMessage.message}
                    </div>
                </div>
                </>
                )}


        </div>
         //FIN CAJA PRINCICIPAL DE LA CONVERSACION DEL USER Y EL CHATBOT


        
      ))}
        </div>

      
       

   
   {/* Formulario de entrada de usuario */}
   {isChatbotVisible && (
       
      //<Form onSubmit={handleSubmit} className='bg-white pl-2 pr-2'>
      <form onSubmit={handleSubmit} className='bg-white px-4 pt-8 pb-4 border-neutral-300 border-l-2 border-b-2 border-r-2 '>
        <div className='flex flew-row w-full border-b-2 border-neutral-300'>
        {/*<Form.Group  className='w-full'>*/}
        <div className='w-full mr-2'>
        {/*<Form.Control*/}
          <input
            className=' w-full text-sm text-black border-none placeholder-neutral-800 focus-ring-0 focus:outline-none focus:ring focus:ring-neutral-300 '
            type="text"
            placeholder="Escribe tu consulta"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
        </div>
      { /* </Form.Group>*/}

       {/* <Button */}
         <button
        variant="primary" 
        type="submit" 
        className='text-sm text-orange-950 font-bold '>
          enviar
        </button>
       {/* </Button>*/}
        </div>
        </form>
      //</Form>
)}


      </div>


    </div>
    );
    }

export default Chatbot;



   
