import blogImg from "../../assets/img/portadas/blog/portadaBlog.jpg"; 
import {Link} from "react-router-dom";
import CategoriesBlogHeader from "./CategoriesBlogHeader";
import ResetPasswordSuccess from '../auth//ResetPasswordSuccess'; 





function Header(){

return (
     <>
        <div className="w-[100%] h-[390px] sm:h-[590px] md:h-[650px] lg:h-[600px] 2xl:h-[800px] 2xl:w-[100%] overflow-hidden lg:w-[100%] flex flex-row">

            {/* Bloque Izquierdo: Título del Blog */}
            <div className="bg-opacity-50 bg-black text-white p-8 w-[40%] inset-0 flex flex-col justify-center items-center z-10">
                <Link to="/" className="hover:text-gray-400">
                <h1 className="text-3xl underline underline-offset-4 font-bold tracking-tight text-sans text-white pt-16 sm:text-6xl mb-2 text-center">
                    Blog
                </h1>
                <p className="text-base border-gray-300 border-2 text-white font-bold py-2 px-4 rounded">
            
                        AI & Code Chronicles
                  
                </p>
                    </Link>

            </div>

            {/* Bloque Derecho: Imagen de Portada */}
            <div className="w-[60%]">
                <img 
                    src={blogImg} 
                    alt="Programadora caminando por la ciudad con su portátil" 
                    className="w-full h-full object-cover z-0"
                    loading="eager" // ⚡ Al ser la portada, le decimos al navegador que la cargue con prioridad absoluta
                />
            </div>
               
        </div>
    </>
    );
 }

export default Header;