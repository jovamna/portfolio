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
               
              <div className="home-images h-[100%] ">
                <motion.div className='home-image' initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <LazyImage src={portadaFinalTres} alt="portada" className="base-image"/>
                <LazyImage src={portadaFinalDos} alt="portada"  className="hover-image absolute" />
                 {/* </div>*/}
                </motion.div>
          

                {/* /End replace 👋 */}
                <div className='greeting-texto absolute top-[180px] left-[70px] w-[380px] h-[440px] '>
                 <h1 className='texto-animado-developer font-mono font-extrabold text-3xl '>
                  Hola Soy Jovamna   <span className="wave-emoji"><img src ={greetingMano} width={35}/></span>
                  </h1>
                  <h2 className='texto-animado-developer font-mono font-extrabold text-2xl leading-6 '>
                  Developer FullStack
                  </h2>

                 <p className='texto-animado font-mono text-xl leading-6 mt-[20px]'>
                 Transformo tus ideas en soluciones tecnologicas, creando experiencias digitales a través de mi pasión por la programación FullStack
                 </p>
               </div>



          </div>
    
      </div>
   
      </>
  )
}


   

export default Greeting  















       





