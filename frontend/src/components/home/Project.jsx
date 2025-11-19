import ProjectHome from '../myproject/ProjectHome';
import go from "../../assets/img/home/go.jpg";


import { BiChevronsUp } from "react-icons/bi";
import { generatePath } from 'react-router-dom';

 


function Project() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
 




    return (
              
      <div className='project h-[100%] w-[100%]  items-center justify-center'>{/*CONTAINER GRAL*/}





          {/*CONTAINER DIV COLUMNA total del contenido modificar en movil a 95%*/}
          <div className="project-movil  flex flex-col isolate bg-neutral-600 w-[95%] mx-auto sm:rounded-3xl">
              {/* 1 DIV ROW COLORES DE FONDO Y GRAL DEL CONTENIDO*/}
              <div className="project-movil-colores flex relative isolate overflow-hidden w-[100%]  px-6 pt-16  sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-10 lg:px-1 lg:pt-0 mb-[65px]">
              <svg
              xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 1024 1024"
             className="absolute top-[20px] left-1/2 -z-10 h-[80vh] w-[64rem] -translate-y-1/2 sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:translate-y-0 lg:-translate-x-1/2" aria-hidden="true"
             >
            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
            <radialGradient
            id="759c1415-0410-454c-8f7c-9a820de03641"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
            </radialGradient>
            </defs>
            </svg>

            {/* 1 DIV ROW IGUAL AL DE COLORES DE FONDO Y GRAL DEL CONTENIDO*/}
            <div className='project-row-movil flex flex-row w-[92%] mx-auto justify-between'> 

                      {/*DOS CARDS GITHUB */}
                     <div className="project-h-title flex flex-col w-[75%] lg:mx-0 lg:py-3 ">

                          <h2 className="underline underline-offset-8  text-3xl font-bold text-center tracking-tight text-white sm:text-4xl  md:text-center mt-8">
                          Mis Projectos de GitHub
                          </h2>
                          <br />

                          <div className='ver-mis-projectos flex justify-center items-center mb-4'>
                           <a href="/myproject" className="text-base md:text-center text-center font-semibold leading-7 text-white hover:text-gray-400">
                           Ver todos mis Projectos <span aria-hidden="true">→</span>
                            </a>
                           </div>
                 
                      <ProjectHome className="project-home "/>
            
                     </div>


                      {/*IMAGEN DEL COSTADO DE LOS GTHUBS */}
                     <div className="project-img-movil flex flex-col lg:mt-6 w-[25%] ">
                        <img
                        className=" left-0 rounded-md bg-white/5  w-[100%]  ring-1 ring-white/10"
                        src={go}
                        alt="App screenshot"
                     
                        />
                     </div>



                 </div>


             </div>
             {/*fin container general del contenido y el de colores*/}




             {/*BOTON ARRIBA */}
             <div className="top-center-project flex flex-col  mx-auto items-center justify-end h-[40px]">
             <button className='semicirculo'
              onClick={handleScrollToTop}
              >
             <BiChevronsUp className="icon-centre mx-auto text-3xl text-neutral-600 text-center"/>
            </button>
            </div>
        </div>











      </div>
    )
  }

export default Project;