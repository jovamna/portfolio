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
                <div className='ipad-greeting absolute lg:top-[170px] lg:left-[50px] lg:w-[400px] lg:h-[440px] md:top-[80px] md:w-[390px] top-[50px] w-[110px] left-[20px] h-[170px]'>
                 <h1 className='texto-animado-developer ipad-pro font-mono font-extrabold text-3xl '>
                  Hola Soy Jovamna <span className="wave-emoji"><img src ={greetingMano} width={35} className="manito w-[10px]"/></span>
                  </h1>
                  <h2 className='texto-animado-developer font-mono font-extrabold lg:text-2xl text-base lg:leading-6 md:leading-2'>
                  fusiono programación Fullstack con arte digital impulsado por IA.
                  </h2>

                 {/*<p className='texto-animado font-mono text-xl leading-6 mt-[20px]'>
                 Transformo tus ideas en soluciones tecnologicas, creando experiencias digitales a través de mi pasión por la programación FullStack
                 </p>*/}


                 <p className='texto-animado font-mono lg:text-lg leading-6 mt-[20px]'>
                 

Transformo ideas en soluciones tecnológicas completas, usando mi base en la programación Full Stack y la integración estratégica de la Inteligencia Artificial para construir experiencias digitales que van desde software personalizado hasta proyectos de E-commerce.
                 </p>



               </div>



          </div>
    
      </div>
   
      </>
  )
}


   

export default Greeting  















       





