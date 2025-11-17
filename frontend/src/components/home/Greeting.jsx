import "../../styles/index.css";
import portadaFinalTres from '../../assets/img/portadas/nuevo/portadaFinalTres.jpg';
import portadaFinalDos from '../../assets/img/portadas/nuevo/portadaFinalDos.jpg';
import greetingMano from '../../assets/img/home/greetingMano.svg';
import React from 'react';
import LazyImage from './LazyImage'; // Asegúrate de importar correctamente el componente LazyImage
import { motion } from 'framer-motion';





function Greeting() {

  return (
  
        <>
          <div className= "home h-[100%] w-[100%] ">

              {/*  */}
               
              <div className="home-images h-[100%] relative">
                <div className="greeting-images-dos bg-red-300">
                <motion.div className='home-image  bg-yellow-400' initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <LazyImage src={portadaFinalTres} alt="portada" className="base-image"/>
                <LazyImage src={portadaFinalDos} alt="portada"  className="hover-image" />
                 {/* </div>*/}
                </motion.div>
                </div>

                {/* /End replace 👋 */}
                <div className='ipad-greeting absolute lg:top-[200px] lg:left-[50px] lg:w-[400px] lg:h-[440px] md:top-[80px] md:w-[390px] top-[60px] w-[110px] left-[30px] h-[170px]'>
                 <h1 className='texto-animado-developer ipad-pro kaushan tracking-wide font-normal text-3xl text-neutral-900 '>
                  Hola Soy Jovamna <span className="wave-emoji"><img src ={greetingMano} width={35} className="manito lg:w-[30px] w-[10px]"/></span>
                  </h1>
                { /* <h2 className='texto-animado-developer kaushan tracking-wider font-normal lg:text-lg text-base lg:leading-8 md:leading-2 text-neutral-900'>
                  fusiono programación Fullstack con arte digital impulsado por IA.
                  </h2>*/}

                 {/*roboto-condensed-muckas */}


                 <p className='texto-animado kaushan tracking-widest text-neutral-900 font-light lg:text-base leading-6 mt-[6px]'>
                 

Transformo ideas en soluciones tecnológicas, usando mi base en la programación Full Stack y la integración estratégica de la Inteligencia Artificial para construir experiencias digitales.
                 </p>



               </div>



          </div>
    
      </div>
   
      </>
  )
}


   

export default Greeting  















       





