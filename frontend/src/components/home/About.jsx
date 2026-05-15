import {skillsSection} from "../homePortfolioData/portfolio";

import React from "react";
import { BiChevronsUp } from "react-icons/bi";

import "../../styles/index.css";

import desarrolladoraDjangoReact from '../../assets/img/home/desarrolladoraDjangoReact.png';

import { useEffect, useState } from "react";







export default function About() {



  const handleScrollToTop = () => {

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };




  return (

 
   <div className="about
    h-[100%] w-[100%] flex items-center justify-center
    py-4 md:py-[30px] lg:py-[40px] 2xl:py-[40px]">

      <div className="container-about-tres max-w-[95%] 
      flex flex-col mx-auto">

            <h1 className="kaushan 
            underline underline-offset-8  
            lg:text-5xl text-4xl 
            font-bold text-center tracking-tight text-black 
            sm:text-4xl  md:text-center
            mb-[30px] lg:mb-[40px] 2xl:mb-[40px]">
                   {skillsSection.title}{" "}
            </h1>


          {/*  DIV 2 COLUMNS ROW     shadow-2xl  */}
          <div className="container-about-dos 
          w-[100%] lg:w-[100%] flex flex-row 
          isolate sm:rounded-3xl justify-center 
          items-center mb-[20px]">

             
                 {/*SEGUNDA COLUMNA IMAGEN */}
                 <div className="w-[60%]  lg:w-[30%]">

                  <img
                  className="h-full w-full opacity-150"
                  src={desarrolladoraDjangoReact}
                  alt="programadora React Django Redux Postgres"
                  />
                 </div>
                 {/*FIN SEGUNDA COLUMNA IMAGEN */}

             

                {/*PRIMERA COLUMNA */}
                <div className=" asubcontainer-about-movil flex flex-col lg:w-[72%] w-[100%] lg:px-8 px-2">
                   <h2 className="text-center text-black underline underline-offset-4 mb-8 font-extrabold">
                   {skillsSection.subTitle}
                   </h2>

                   <div className="skill-item ">
                    {skillsSection.skills.map((skill, index) => (
                      <p className="first-letter:text-violet-800 kaushan 
                      first-letter:float-left  
                      first-letter:font-bold 
                      first-letter:text-4xl 
                      first-letter:italic 
                      first-letter:leading-3 
                      leading-7 lg:leading-8
                      tracking-wide 
                      text-black 
                      lg:text-xl 
                      font-medium 
                      lg:mb-[20px] 
                      mb-[16px]" 
                      key={index}>
                         {skill.text}
                      </p>
                     ))}
                   </div>

                </div>

                {/*FIN PRIMERA COLUMNA */}



           

          </div>

          {/*  FIN DIV 2 COLUMNS ROW */}

   

       

          {/*BOTON SUBIR */}

          <div className="top-center 
          flex flex-col justifiy-center mx-auto 
          items-center mt-[30px] md:mt-[40px] lg:mt-[40px] 2xl-mt-[50px]">

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

