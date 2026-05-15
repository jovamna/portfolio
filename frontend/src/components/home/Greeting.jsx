import "../../styles/index.css";
import developerFullStack from '../../assets/img/portadas/nuevo/developerFullStack.png';
import fullStackDjangoReact from '../../assets/img/portadas/nuevo/fullStackDjangoReact.png';
import React from 'react';
import LazyImage from './LazyImage';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';







//min-h-screen 






function Greeting() {
  return (
    <>
      <div className="home w-full lg:h-full bg-black flex items-center relative overflow-hidden">

        <div className="home-container mx-auto  w-full h-full relative w-full md:w-full lg:w-full 2xl:w-full 2xl:h-full">



          {/* Contenedor principal con hover */}
          <div className="hidden lg:block group relative flex flex-col lg:flex-row  w-full md:w-full lg:w-full 2xl:w-full  items-center gap-12 lg:gap-20">

             <div className="group relative flex items-center justify-between  h-full ">

                {/* SECTIONS*/}
               <div className="group relative 
               w-full md:w-full lg:w-full 2xl:w-full
               h-[420px] sm:h-[590px]
               md:h-[650px]
               lg:h-[820px]
               2xl:h-[990px] overflow-hidden">

                  {/* ========================= */}
                  {/* PRIMER LAYOUT */}
                  {/* ========================= */}
                  <div className="absolute inset-0 flex items-center justify-between transition-all duration-700 group-hover:opacity-0
             group-hover:pointer-events-none">

                     {/* IMAGEN */}
                    <div className="lg:w-1/2 w-[60%] 2xl:w-[55%] h-full flex justify-center">
                      <LazyImage
                      src={developerFullStack}
                      alt="developer-Full-Stack"
                      className="w-full h-full object-cover"/>
                      
                    </div>

                     {/* TEXTO */}
                     <div className="text-wrapper w-[40%] lg:w-1/2 2xl:w-[45%] transition-all duration-700 ease-in-out 
                           group-hover:lg:translate-x-[-90%] lg:translate-x-0 2xl:px-18">

                          <div className="px-3 sm:px-6 lg:pl-[40px] max-w-xl">
                             <h1 className='text-lg sm:text-2xl md:text-4xl lg:text-6xl 2xl:text-8xl font-light text-white tracking-wide leading-tight'>
                              Hola, soy <span className="text-violet-400">Jovamna</span>
                             </h1>

                              <h2 className="text-sm sm:text-lg md:text-2xl lg:text-3xl 2xl:text-5xl text-gray-300 mt-2 lg:mt-3 font-light">
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
                     <div className="text-wrapper mx-auto w-[40%] lg:w-1/2 2xl:w-[45%] transition-all duration-700 ease-in-out 
                           group-hover:lg:translate-x-[10%] lg:translate-x-0 px-2 sm:px-6 lg:px-8 2xl:px-16 ">
                         <div className=" lg:w-[90%] 2xl:w-[90%]">
                          

                                <h1 className="mt-2 lg:mt-6 text-[12px] sm:text-base md:text-xl lg:text-3xl 2xl:text-5xl  text-gray-300 lg:leading-relaxed">
                                  Django APIs · JWT Auth · Databases  
                                  React + Redux Interfaces · UX Interactions
                                  E-commerce + AI-powered workflows



                               </h1>
                         </div>
                     </div>


                     {/* IMAGEN */}
                     <div className="lg:w-1/2 w-[60%] 2xl:w-[55%] h-full flex justify-center translate-x-[200px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 
                     transition-all duration-700 ease-in-out">

                      <LazyImage
                      src={fullStackDjangoReact}
                      alt="fullStack Django React Redux"
                      className="w-full h-full object-cover "/>

              
                     </div>

                  </div>

               </div> 
               {/**FIN SECTIONS */}








             </div>
          </div>
          {/**FINAL CONTENEDOR PRINCIPAL CON HOVER */}



          {/**INICO VERSION MOVIL TABLETS */}
          {/* MOBILE/TABLET */}
          <div className="lg:hidden w-full h-full">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              }}
              loop={true}
              className="h-full">
              
              {/* SLIDE 1 */}
              <SwiperSlide>
                  <div className="flex items-center justify-between h-[430px] sm:h-[590px]">
                     <div className="w-[60%] h-full">
                      <LazyImage
                      src={developerFullStack}
                      alt="developer Full Stack"
                      className="w-full h-full object-cover"
                      />
                     </div>
                     <div className="w-[40%] px-[16px]">
                        <h1 className='text-lg sm:text-2xl text-white'>
                         Hola, soy <span className="text-violet-400">Jovamna</span>
                        </h1>
                        <h2 className="text-sm text-gray-300 mt-2">
                          Full Stack Developer · React · Django
                        </h2>
                     </div>
                  </div>
              </SwiperSlide>



          
              {/* SLIDE 2 */}
              <SwiperSlide>
                  <div className="flex items-center justify-between h-[420px] sm:h-[590px]">
                      <div className="w-[40%] px-[16px]">
                          <h1 className="text-[14px] sm:text-base text-gray-300">
                          Django APIs · JWT Auth · Databases
                          React + Redux Interfaces · UX Interactions
                         </h1>
                      </div>
              
                      <div className="w-[60%] h-full">
                         <LazyImage
                          src={fullStackDjangoReact}
                          alt="fullStack Django React Redux"
                          className="w-full h-full object-cover"/>
                      </div>
                  </div>

              </SwiperSlide>

            </Swiper>

          </div>

          {/**FIN VERSION MOVIL TABLETS */}

















        </div>
      </div>
    </>
  );
}

export default Greeting;


