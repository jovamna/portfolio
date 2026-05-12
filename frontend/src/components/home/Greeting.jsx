import "../../styles/index.css";


import uno from '../../assets/img/portadas/nuevo/uno.png';
import dos from '../../assets/img/portadas/nuevo/dos.png';
import React from 'react';
import LazyImage from './LazyImage';

//min-h-screen 

function Greeting() {
  return (
    <>
      <div className="home w-full lg:h-full bg-black flex items-center relative overflow-hidden">

        <div className="home-container max-w-7xl mx-auto  w-full h-full relative ">

          {/* Contenedor principal con hover */}
          <div className="group relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

             <div className="group relative flex items-center justify-between w-full  h-full">

                {/* SECTIONS*/}
               <div className="group relative w-full 
               h-[420px] sm:h-[590px]
               md:h-[650px]
               lg:h-[850px]
               2xl:h-[950px] overflow-hidden">

                  {/* ========================= */}
                  {/* PRIMER LAYOUT */}
                  {/* ========================= */}
                  <div className="absolute inset-0 flex items-center justify-between transition-all duration-700 group-hover:opacity-0
             group-hover:pointer-events-none">

                     {/* IMAGEN */}
                    <div className="lg:w-1/2 w-[60%] h-full flex justify-center">
                      <LazyImage
                      src={uno}
                      alt="imagen normal"
                      className="w-full h-full object-cover"/>
                      
                    </div>

                     {/* TEXTO */}
                     <div className="text-wrapper w-[40%] lg:w-1/2 transition-all duration-700 ease-in-out 
                           group-hover:lg:translate-x-[-90%] lg:translate-x-0 ">

                          <div className="px-3 sm:px-6 lg:pl-[40px] max-w-xl">
                             <h1 className='text-lg sm:text-2xl md:text-4xl lg:text-6xl 2xl:text-8xl font-light text-white tracking-wide leading-tight'>
                              Hola, soy <span className="text-violet-400">Jovamna</span>
                             </h1>

                              <h2 className="text-sm sm:text-lg md:text-2xl lg:text-3xl text-gray-300 mt-2 lg:mt-3 font-light">
                             Full Stack Developer · React · Django
                             </h2>

                            {/*<p className="mt-2 lg:mt-6 text-[10px] sm:text-sm md:text-base lg:text-lg text-gray-400 lg:leading-relaxed">
                             Transformo ideas en soluciones tecnológicas, 
                             usando mi base en la programación Full Stack y la integración estratégica 
                             de la Inteligencia Artificial para construir experiencias digitales.
                             </p>*/}
                          </div>

                     </div>
                  </div>

                  {/* ========================= */}
                  {/* SEGUNDO LAYOUT */}
                  {/* ========================= */}
                  <div className="absolute inset-0 flex items-center justify-between opacity-0 transition-all duration-700 group-hover:opacity-100">

                     {/* TEXTO */}
                     <div className="text-wrapper w-[40%] lg:w-1/2 transition-all duration-700 ease-in-out 
                           group-hover:lg:translate-x-[10%] lg:translate-x-0">
                         <div className="px-2 sm:px-6 lg:pr-[40px] max-w-xl">
                          

                                <h1 className="mt-2 lg:mt-6 text-[12px] sm:text-base md:text-xl lg:text-3xl text-gray-300 lg:leading-relaxed">
                                  Django APIs · JWT Auth · Databases  
                                  React Interfaces · UX Interactions  
                                  E-commerce + AI-powered workflows
                               </h1>
                         </div>
                     </div>


                     {/* IMAGEN */}
                     <div className="lg:w-1/2 w-[60%] h-full flex justify-center translate-x-[200px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 
                     transition-all duration-700 ease-in-out">

                      <LazyImage
                      src={dos}
                      alt="imagen hover"
                      className="w-full h-full object-cover "/>

              
                     </div>

                  </div>

               </div> 
               {/**FIN SECTIONS */}








             </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Greeting;


