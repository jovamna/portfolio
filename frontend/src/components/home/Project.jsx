

import ProjectCard from "../myproject/ProjectCard"
import { get_project_list} from "../../redux/actions/project";
import { BiChevronsUp } from "react-icons/bi";
import { useEffect } from "react"
import { connect } from "react-redux"
import LoadingCard from "../loaders/LoadingCard"
import djangoReactGithub from "../../assets/img/home/djangoReactGithub.png";
import {Link} from "react-router-dom";





 const URL =
   process.env.NODE_ENV === "production"
     ? import.meta.env.VITE_REACT_API_URL
     : "http://localhost:8000";
 
   console.log(URL);


function Project({  get_project_list, project_list}) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
 

    useEffect(()=>
    {
        get_project_list()

    },[])  



    return (
              
      <div className='project 
      h-[100%] w-[100%] 
      items-center justify-center
       py-4 md:py-[30px] lg:py-[40px] 2xl:py-[40px]'>



             {/*CONTAINER DIV COLUMNA total del contenido modificar en movil a 95%*/}
             <div className="project-movil  
             flex flex-col isolate 
             lg:w-[100%] max-w-[95%] mx-auto">

              
              <h2 className="kaushan 
              underline underline-offset-8 
              lg:text-5xl text-3xl font-bold text-center 
              tracking-tight text-black sm:text-4xl  md:text-center
              mb-[30px] lg:mb-[40px] 2xl:mb-[40px]">
                Mis Projectos de GitHub
              </h2>



              {/* 1 DIV ROW COLORES DE FONDO Y GRAL DEL CONTENIDO*/}

                 {/* CONTAINER DE LAS 2 COLUMNAS*/}
                 <div className='flex lg:flex-row lg:w-[100%]  flex-col w-[92%]  justify-between'> 

                      {/*PRIMERA COLUMNA IMAGEN IMAGEN DEL COSTADO DE LOS GTHUBS */}
                     <div className=" mx-auto flex mt-[20px] w-[70%] md:w-[80%] lg:w-[30%] 2xl:w-[30%]">
                        <img
                        className=" w-full h-full object-contain"
                        src={djangoReactGithub}
                        alt="Jovamna Medina Full Stack Django React"
                     
                        />
                     </div>





                       {/*SEGUNDA COLUMNA LOS CARD DE LOS GITHUB DOS CARDS GITHUB */}
                     <div className="project-h-title flex flex-col lg:w-[70%] 2xl:w-[70%] w-[100%] lg:mx-0 ">
                            <br />

                           <div className='ver-mis-projectos flex justify-center items-center mb-4'>
                           <a href="/myproject" className="text-base md:text-center text-center font-semibold leading-7 text-black hover:text-gray-400">
                           Ver todos mis Projectos <span aria-hidden="true">→</span>
                            </a>
                           </div>
                 
                         


<div className="project-home flex lg:flex-row flex-col lg:justify-between lg:px-12">
  {
    project_list ?
    <>
      {/* CONTAINER QUE ALOJA LAS TARJETAS (1 de GitHub + 1 del Escandallo) */}
      <div className="project-home-subcontainer 
                      grid gap-8 md:gap-6 lg:gap-16 grid-cols-1 
                      md:grid-cols-2 lg:max-w-7xl mx-auto px-4 w-full">
        
        {/* 1. TARJETA DINÁMICA DE GITHUB (Ahora solo pinta la primera) */}
        {
          project_list.slice(0, 1).map(project => (
            <ProjectCard key={project.slug} data={project} />
          ))
        }




        {/* 2. TARJETA ESTÁTICA DEL ESCANDALLO (Se adapta al diseño) */}
        <div className="flex flex-col 
        justify-between overflow-hidden 
        rounded-2xl bg-zinc-300  p-4 shadow-lg 
        border b-4 border-black 
        transition-all duration-300 
        hover:-translate-y-1 hover:shadow-xl">
          
          <div>
            {/* Cabecera de la Tarjeta */}
            <div className="flex items-center justify-between mb-4">
              <Link 
             to="/escandallo" className="inline-flex ">
              <span className="items-center rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-650/20">
                🚀 Acceso Gratuito & Libre
              </span>
              <span className="px-2 text-sm font-semibold text-gray-400">
                React + TS
              </span>
              </Link>
            </div>

            {/* Título y Descripción */}
            <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
              Calculadora de Escandallos Profesional Gratuita 🍳
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-2">
             Diseñado para ayudar a digitalizar la gestión de pequeños negocios de hostelería de forma gratuita. Calcula mermas en bruto, costes reales y la rentabilidad por ración.  Food Cost de restaurantes de forma profesional con persistencia de datos local.
            </p>
          </div>

          {/* Botón de acción inferior */}
          <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">
              Usa LocalStorage
            </span>
             <Link 
             to="/escandallo" 
             className="kaushan lg:text-lg inline-flex items-center ...">
             Probar Herramienta →
            </Link>
          </div>

        </div>

      </div>     
    </>
    :
    <LoadingCard/>            
  }
</div>






































































            
                     </div>

                 </div>
                 {/*fin container general del contenido y el de colores*/}




             {/*BOTON ARRIBA */}
             <div className="top-center-project flex flex-col mx-auto items-center
              justify-end mt-[30px] md:mt-[40px] lg:mt-[40px] 2xl-mt-[50px]">
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





const mapStateToProps = state => ({
    project_list: state.project.project_list,
   
})

export default connect(mapStateToProps,{
    get_project_list,
   
})(Project)
