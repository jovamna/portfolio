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
  <div className="fixed bottom-4 right-4 z-[1000] flex justify-end items-end">
    
    {/* BOTÓN CHAT CERRADO */}
    {!isChatbotVisible && (
      <div
        className="container-chat-circulo cursor-pointer"
        onClick={handleChatbotIconClick}
      >
        <img
          src={chatbot}
          width={56}
          height={56}
          alt="Chatbot"
          className="hover:opacity-75 transition-opacity"
        />
      </div>
    )}

    {/* CHAT */}
    {isChatbotVisible && (
      <div
        className="
          bg-white
          shadow-2xl
          border border-neutral-300
          rounded-xl
          flex flex-col

          w-[95vw]
          sm:w-[420px]
          lg:w-[430px]

          h-[50vh]
          sm:h-[50vh]
          lg:h-[50vh]

          overflow-hidden
        "
      >

        {/* HEADER */}
        <div
          className="
            flex
            justify-between
            items-center
            px-4
            py-3
            border-b
            border-neutral-300
            bg-white
            shrink-0
          "
        >
          <h1
            className="
              text-base
              font-serif
              font-semibold
              text-gray-800
            "
          >
            Asistente Online
          </h1>

          <button
            type="button"
            className="
              text-black
              font-bold
              hover:opacity-70
              text-lg
              ml-4
            "
            onClick={handleChatbotIconClick}
          >
            ×
          </button>
        </div>

        {/* MENSAJES */}
        <div
          className="
            flex-1
            overflow-y-chat
            px-3
            py-4
            bg-white
          "
        >
          {chatbotResponse.map((chatMessage, index) => (
            <div
              key={index}
              className={`
                flex
                mb-4
                ${chatMessage.isUser ? "justify-end" : "justify-start"}
              `}
            >

              {chatMessage.isUser ? (
                <div
                  className="
                    max-w-[85%]
                    py-2
                    px-4
                    rounded-2xl
                    font-mono
                    text-sm
                    sm:text-base
                    text-orange-950
                    bg-orange-400
                    break-words
                  "
                >
                  {chatMessage.message}
                </div>
              ) : (
                <div
                  className="
                    flex
                    max-w-[92%]
                    items-start
                    gap-2
                  "
                >
                  <div
                    className="
                      shrink-0
                      px-2
                      pt-1
                      font-extrabold
                      font-mono
                      text-black
                      text-sm
                      sm:text-base
                    "
                  >
                    JM
                  </div>

                  <div
                    className="
                      p-3
                      rounded-2xl
                      border
                      border-neutral-200
                      text-neutral-950
                      text-sm
                      sm:text-base
                      font-mono
                      break-words
                      bg-white
                    "
                  >
                    {chatMessage.message}
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

        {/* INPUT */}
        <form
          onSubmit={handleSubmit}
          className="
            border-t
            border-neutral-300
            bg-white
            p-3
            shrink-0
          "
        >
          <div className="flex items-center gap-2">
            
            <input
              className="
                flex-1
                text-sm
                text-black
                px-3
                py-2
                rounded-lg
                border
                border-neutral-300
                placeholder-neutral-500
                focus:outline-none
                focus:ring-2
                focus:ring-neutral-300
              "
              type="text"
              placeholder="Escribe tu consulta"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />

            <button
              type="submit"
              className="
                text-sm
                font-bold
                text-orange-950
                px-3
                py-2
                hover:opacity-75
              "
            >
              enviar
            </button>

          </div>
        </form>

      </div>
    )}
  </div>
);


} export default Chatbot;


  