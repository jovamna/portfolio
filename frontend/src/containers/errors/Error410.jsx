// Puedes crear un componente nuevo: CategoryGone.jsx
import { useNavigate } from 'react-router-dom';

import contact from "../../assets/img/contact.png";



const CategoryGone = ({ message }) => {
    const navigate = useNavigate();

    return (
       
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-20">
                <div className="max-w-md w-full text-center">
                    {/* Icono grande */}
                    <div className="mx-auto flex flex-row  lg:w-[50%] md:w-40 md:h-40 w-[50%] flex items-center justify-center lg:mb-16">
                           <div>
                               <img 
                           src={contact} 
                           alt="Jovamna Medina Dvelope Full Stack" 
                           className="w-full h-full object-contain mb-4" />

                           </div>
                        

                        <div>
                           <span className="lg:text-6xl text-5xl">🪦</span>
                        </div>
                       
                    </div>

                    <h1 className="kaushan lg:text-4xl md:text-5xl text-2xl font-bold text-gray-900 mb-4">
                        Esta página ya no existe
                    </h1>

                    <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                        {message || "La página que estás buscando fue eliminada permanentemente por el administrador."}
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/blog')}
                            className="w-full bg-black text-white py-4 px-8 rounded-2xl text-lg font-medium hover:bg-gray-800 transition-all active:scale-95"
                        >
                            🛍️ Ir a la Blog
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-white border-2 border-gray-300 
                            text-gray-700 py-4 px-8 rounded-2xl text-lg font-medium 
                            hover:bg-gray-50 transition-all"
                        >
                            🏠 Volver al Inicio
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-10">
                        ¿Necesitas ayuda? Escríbenos a <span className="underline">muckas.store@gmail.com</span>
                    </p>
                </div>
            </div>
    
    );
};

export default CategoryGone;