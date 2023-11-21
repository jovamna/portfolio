import blogPort from "../../assets/img/portadas/blogPort.mp4";
import CategoriesBlogHeader from "./CategoriesBlogHeader";
import ResetPasswordSuccess from '../auth//ResetPasswordSuccess'; 


function Header(){
    return (
        <>
        <div className="portada-blog relative w-full h-[80%] h-[80vh] mb-4">
              { /* <div className="portada-blog fullscreen relative h-screen ">*/}
            <video
                autoPlay
                loop
                muted
                className="portada-blog-video absolute w-full h-[80vh] h-[80%]  object-cover z-0 "
            >
                <source 
                src={blogPort} 
                type="video/mp4" 
                autoPlay
                loop
                muted
                duration="10" // Cambia este valor a la duración deseada en segundos
                 className="absolute inset-0 w-full h-full object-cover z-0"
               
                />
                Your browser does not support the video tag.
            </video>



            
            <div className="error-message bg-opacity-50 bg-black text-white p-8 max-w-lg absolute inset-0 flex flex-col justify-center items-center z-10 h-[100%]">

            <h1 className="text-4xl underline underline-offset-4 font-bold tracking-tight text-sans text-white pt-16 sm:text-6xl mb-2 text-center">
            Blog
            </h1>
            <p className="border-gray-300 border-2 text-white font-bold py-2 px-4 rounded">
            <a href="/" className="hover:text-gray-400">
            HISTORIAS PARA CONTAR
            </a>
            </p>
            </div>


            
             {/*max-w-lg limita el ancho y lo pone a lado left*/}
            {/*<div className="segmento-header-categoria absolute inset-x-0 bottom-0 bg-opacity-50  w-[100%] text-white   z-10">
            
            <CategoriesBlogList />
    </div>*/}

    
              </div>

             {/*max-w-lg limita el ancho y lo pone a lado left*/}
            <div className="segmento-header-categoria  relative inset-x-0  top-[0] bottom-10 bg-opacity-50  w-[100%] text-white   z-10">
            
            <CategoriesBlogHeader />
            </div>

              </>



    );
}

export default Header