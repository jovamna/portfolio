import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { SkillDetails } from "./SkillDetails";
import { useState } from "react";
import styled from "styled-components";
import skillPro from "../../../assets/img/home/skillPro.png";
import skillFond1 from "../../../assets/img/home/skillFond1.jpg";





/*CONTAINER PRINCIPAL blanco height: 481px width: 50%;;*/
const CardWrapper = styled.div`
width: 270px;
  perspective: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
/*..background-color: #1d1f21*/
/*SUBCONTAINER PRINCIPAL  GRIS*/
/*--PARTE BAJA DONDE ESTA ESTA LA FRASE*/
/*margin-top baja el card del dibujo*/
/* box-shadow: 0 2px 7px 1px rgba(31, 31, 31, 0.2);*/ 
const CardContainer = styled(motion.div)`
  width: 250px;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
 
  color: #fff;
  position: relative;
  cursor: grab;
`;
/*CONTAINER PRINCIPÀL DE LA IMAGEN FONDO top:0;*/
const CircleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;
  border-top-right-radius: 25px;
  height:  250px;
 
  img {
    width: auto;
    height: auto;
    user-select: none;
  }
`;
//imagen del fonfo
const Circle = styled.div`
  position: absolute;
  width: 350px;
  height: 245px;
  top: 0em;
  right: -2.5em;
  z-index: 5;
  overflow: hidden;
  border-top-left-radius: 4rem;
  border-top-right-radius: 4rem;
`;

/*padding: 1em 15px;*/
  {/*flex: 1.2;*/}
const TopContainer = styled.div`
  width: 100%;
  height:70%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  
`;

const BottomContainer = styled.div`
  display: flex;
  flex: 0.8;
  padding: 0 1em;
  height:30%;
`;

const LogoText = styled.h1`
  color: #fff;
  text-transform: uppercase;
  margin: 0;
  z-index: 10;
  font-size: 76px;
  font-weight: 900;
`;
/*AQUI NO LLEVABA BACKGROUNCOLOR*/
/*ESTA ES LA PARTE MAS GRANDE DONDE ESTA EL DIBUJO*/
const DeveloperWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;
/*CONTENEDOR DE LA IMAGEN*/
const Developer = styled(motion.div)`
  width: auto;
  height: auto;
  z-index: 99;
  user-select: none;
  margin-left: 0.2em;
  margin-top: 6em;

  img {
    width: auto;
    height:240px;
   
    user-select: none;
  }
`;







export default function SkillCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const shouldReduceMotion = useReducedMotion();


  const [size, setSize] = useState({ width: 0, height: 0 });

 
  function handleImageLoad(event) {
    setSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight });
  }
  


  return (
    <CardWrapper className="skill-card-movil w-[24%] h-[430px]">
          {/*bg-neutral-500 */}
          {/* CONTAINER DEL TEXTO DEVELOPER ,  backgroundColor:"rgb(115 115 115)"*/}
         <CardContainer className="skill-card-movil-img-title  w-[100%] h-[430px]"
           style={{ x, y, rotateX, rotateY, z: 100 }}
           drag
           //dragElastic={0.16}
           dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
           whileTap={{ cursor: "grabbing" }}
           >


            <TopContainer className="skill-container-images h-[350px]">
                 { /*CONTAINER DEL LA IMAGEN FONDO DE LA DEVELOPER />*/}
                <CircleWrapper  className="skillcard-container-fondo w-[100%] rounded-tl-2xl rounded-tr-2xl" >
                   <Circle className=" rounded-tl-2xl rounded-tr-2xl overflow-hidden">
                    
                      <img className="skillcard-img-circle w-[100%] rounded-lg" 
                          onLoad={handleImageLoad} 
                          src={skillFond1} 
                          alt="skillFond" 
                           />
                   </Circle >

                </CircleWrapper>


                 { /*CONTAINER DEL LA IMAGEN DEVELOPER />*/}
                <DeveloperWrapper className="skillcard-container-developer w-[100%] ">
                   <Developer 
                       style={{ x, y, rotateX, rotateY, rotate: "0deg", z: 100000 }}
                       whileTap={{ cursor: "grabbing"  }}
                       drag
                       dragElastic={0.12}
                       dragConstraints={{ left: -100, right: 100 }}
                       whileHover={{ scale: 1.1 }}  
                      >
                      <img src={skillPro} className="skillcard-img-developer"/>
          
            </Developer>

         
                </DeveloperWrapper>
       
            </TopContainer>


            {/*TEXTO DEVELOPER FULL STACK */}
            <BottomContainer  className="flex h-full pt-[0px] pb-[0px]">
            {/*AQUI ESTA EL TEXTO DEL CARD ..DEVELOPER FULL STACK */}
            {/*ESTA EEN OTTRA PAGINA EEN SKILLDETAIL.JSX */}
           <SkillDetails className=""/>
            </BottomContainer>




        </CardContainer>
    </CardWrapper>






  );

}
