import { useState, useRef } from "react";
import subelo from "../../assets/img/home/subelo.png";
import skillFond1 from "../../assets/img/home/skillFond1.jpg";



export default function SkillCard() {
  const cardRef = useRef(null);
  const developerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Rotación del card principal
    const rotateX = (mouseY / rect.height) * -25;
    const rotateY = (mouseX / rect.width) * 25;

    cardRef.current.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;

    // Efecto parallax en el developer
    if (developerRef.current) {
      developerRef.current.style.transform = `translateX(${mouseX * 0.08}px) translateY(${mouseY * 0.08}px) rotateX(${(mouseY / rect.height) * -12}deg) rotateY(${(mouseX / rect.width) * 12}deg)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(2000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    }
    if (developerRef.current) {
      developerRef.current.style.transform = 'translate(0, 0) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div className="lg:w-[24%] w-[45%] lg:h-[100%] h-[100%] mt-[60px] flex items-center justify-center [perspective:1000px]">
      
      {/* CARD CONTAINER */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-col w-full h-[360px] lg:h-[390px] rounded-[25px] text-white cursor-grab transition-transform duration-100 ease-out shadow-2xl select-none overflow-hidden"
      >
        
        {/* PRIMERO TOP SECTION (IMÁGENES) */}
        <div className="lg:w-[100%] lg:h-[75%] relative w-full h-2/3 overflow-hidden rounded-t-[25px]">
          {/* Círculo de Fondo */}
          <div className="absolute inset-0 overflow-hidden">
             <div className="absolute w-full h-full top-0 right-[-25px] rounded-t-[4rem] overflow-hidden bg-green-400">
                <img src={skillFond1} alt="fondo" className="h-full w-full object-cover" />
             </div>
          </div>

          {/* Developer (Parallax) */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div ref={developerRef} className="transition-transform duration-200 ease-out">
              <img src={subelo} alt="Developer" className="w-auto h-auto select-none pointer-events-none" />
            </div>
          </div>
        </div>






        {/*SEGUNDO  BOTTOM SECTION (DETAILS FUSIONADOS) */}
        <div className="lg:w-[100%] lg:h-[25%] flex-1 px-4 flex flex-col justify-center text-black">
          <div className="flex flex-col w-full">
            <span className="font-bold underline underline-offset-8">
              <h1 className="text-base">Developer Full Stack</h1>
            </span>
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-[0.9em] leading-5">
                Basico 1 | Intermedio 2 | Experto 3
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}