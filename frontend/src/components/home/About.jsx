
import {skillsSection} from "../../portfolio";
import { motion} from "framer-motion";
import React from "react";
import { BiChevronsUp } from "react-icons/bi";
import "../../styles/index.css";
import aboutPro from '../../assets/img/home/aboutPro.png';
import { useEffect, useState } from "react";





const slides = [
  { id: 1, text: "<p>class BlogListView(APIView):</p> <p> def get(self, request, format=None):</p>", style: { backgroundColor: "red" } },
  { id: 2, text: "<p>class PostSerializer(serializers.Mod..</p> <p>total_hearts = serializers.IntegerField...</p> ", style: { backgroundColor: "red" } },
  { id: 3, text: "<p> function Contact(){ </p>  <p> const [agreed, setAgreed] = useState(false)</p>", style: { backgroundColor: "#ff7f50" } },
];


export default function About() {

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };



  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 2000); // Cambia el slide cada 2 segundos (2000 milisegundos)

    return () => clearInterval(interval);
  }, []);



  return (
  
    
 <div className= "about h-[100%] w-[100%] flex items-center justify-center pt-8">



      <div className="container-about-tres max-w-[95%]  flex flex-col bg-neutral-600 mx-auto isolate  sm:rounded-3xl px-8 pt-12">



          {/*  DIV 2 COLUMNS ROW     shadow-2xl  */}
          <div className="container-about-dos max-w-[100%] flex flex-row isolate sm:rounded-3xl justify-center items-center mb-[20px]">
                {/*PRIMERA COLUMNA */}
                <div className="subcontainer-about-movil flex flex-col w-[59%] ">
                    <h1
                    className="underline underline-offset-8  text-5xl font-bold text-center tracking-tight text-white sm:text-4xl  md:text-center mb-8"
                    >
                   {skillsSection.title}{" "}
                   </h1>

                   <h2
                   className="text-center underline underline-offset-4 mb-8 font-extrabold"
                   >
                   {skillsSection.subTitle}
                   </h2>


                   <div className="skill-item ">
                   {skillsSection.skills.map((skill, index) => (
                    <p className="text-gray-300 mb-2" key={index}>
                    {skill.text}
                    </p>
                     ))}
                   </div>
                </div>
                {/*FIN PRIMERA COLUMNA */}

               {/*SEGUNDA COLUMNA IMAGEN */}
               <div className="subcontainer-about-movil-img flex flex-col justify-end items-end w-[40%]">

                  <div  className="letra-dise text-white text-[0.7em] hover:text-orange-400">
               

                   {slides.map((slide, index) => (
                   <motion.div
                   key={slide.id}
                   className="slide"
                   style={{
                   flex: "0 0 100%",
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                    width: "175px",
                   height: "85px",
                   marginLeft:"29px",
                   position: "absolute",
                   top: 0,
                   left: `${index * 100}%`,
                    transform: `translateX(-${currentSlide * 100}%)`,
                    transition: "transform 3s ease",
                   }}
                   >
         
                  <div dangerouslySetInnerHTML={{ __html: slide.text }} />
                  </motion.div>
                 ))}

                  </div>



                  <img
                  className=""
                  src={aboutPro}
                  alt="programmer"
                  />
               </div>
               {/*FIN SEGUNDA COLUMNA IMAGEN */}
          </div>
          {/*  FIN DIV 2 COLUMNS ROW */}
    
       
          {/*BOTON SUBIR */}
          <div className="top-center flex flex-col justifiy-center mx-auto items-center w-full h-[40px]">
             <button className="semicirculo"
              onClick={handleScrollToTop}
             >
             <BiChevronsUp className="icon-centre mx-auto text-3xl  text-neutral-600  text-center"/>
             </button>
          </div>









      </div>

     
</div>






  );
}



