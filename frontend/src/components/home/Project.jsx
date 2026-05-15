

import ProjectCard from "../myproject/ProjectCard"
import { get_project_list} from "../../redux/actions/project";
import { BiChevronsUp } from "react-icons/bi";
import { useEffect } from "react"
import { connect } from "react-redux"
import LoadingCard from "../loaders/LoadingCard"
import djangoReactGithub from "../../assets/img/home/djangoReactGithub.png";






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
                     <div className=" flex mt-[20px] w-[70%] lg:w-[30%] 2xl:w-[30%]">
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
                           <a href="/myproject" className="text-base md:text-center text-center font-semibold leading-7 text-white hover:text-gray-400">
                           Ver todos mis Projectos <span aria-hidden="true">→</span>
                            </a>
                           </div>
                 
                           <div className="project-home flex lg:flex-row flex-col lg:justify-between lg:px-12">


                               {
                               project_list ?
                               <>
               
                              {/**  <div className="project-home-subcontainer  grid gap-5 lg:grid-cols-2 md:grid-cols-2 lg:max-w-none max-w-lg mx-auto  "> */}
                              {/*CONTAINER NARANJA QUE ALOJA A LOS 2 GITHUBS */}
                              <div className="project-home-subcontainer 
                               grid gap-8 md:gap-12 lg:gap-16 grid-cols-1 
                               md:grid-cols-2 lg:max-w-7xl mx-auto px-4">
                     
                                {
                                  project_list.slice(0, project_list.length > 2 ? 2 : project_list.length).map(project => (
                                      <ProjectCard key={project.slug} data={project} />
                                    ))
                                  
                               }
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
