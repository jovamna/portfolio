import github from '../../assets/img/projects/github.png';
import autor from '../../assets/img/users/autor.png';
import DOMPurify from "dompurify";
import { GiFastForwardButton } from "react-icons/gi";
import {Link} from "react-router-dom";
//import "../../assets/styles/index.css";



function ProjectCard(data){
  let project = data && data.data

    return (
        <>

       <div className="project-movil-card flex flex-col rounded-lg  opacity-90 shadow-lg overflow-hidden pb-2 pt-[5px] bg-white h-[350px] px-[5px] ">
   
       
             {/*CONTAINER 1 DE ICONO DE GITHUB TITLE. DESCRIPTION bg-zinc-300*/}
             <div className="project-card-title-description px-4 h-[280px] pt-[15px] flex flex-col items-center w-full rounded-lg border-white  bg-zinc-300">
                  {/*ICONO DE GITHUB */}
                  <div className='flex justify-end items-end'>
                     <div className='w-[26%]'>
                      <img
                      className=" h-[30px] w-[310px]  "
                       src={github}
                       alt="github"
                        />
                      </div>
                  </div>
                  {/*FIN ICONO DE GITHUB */}


                  {/*TITULO DEL CARD DE GITHUB */}
                  <p className="title text-center font-bold lg:text-xl text-sm text-gray-900 mt-2 underline underline-offset-4 uppercase font-mono">
                
                  {project.title.slice(0,15) }
                  {/*console.log(project)*/}
                  </p>

                 

                  <p
                    className="languages px-2 mt-[15px] text-sm dark:text-dark-txt text-center  text-zinc-700 tracking-wide font-light"
                    dangerouslySetInnerHTML={{
                    __html:
                    project.description && DOMPurify.sanitize(project.description.length) > 99
                    ? DOMPurify.sanitize(project.description.slice(0, 99)) + "..."
                   : project.description && DOMPurify.sanitize(project.description),
                    }}
                    />
                    <Link 
                                    to={`/myproject/project/${project.slug}`} 
                                    className="block"
                                    >
                    <p className='lg:text-sm text-xs md:text-xs text-gray-600'>leer mas</p>
                    
                    </Link>
                    
               
               

                 
                  <a 
                  href ={project.url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className ="hover:text-gray-500 mt-[20px]" >
                  <p className="flex flex-row text-xs text-center font-semibold text-gray-900 mb-4 hover:text-blue-300">
                  LINK AL PROJECTO &nbsp; <GiFastForwardButton className='text-blue-700 hover:text-blue-300 text-xl font-extrabold'/>
                  </p>
                  </a>
                


                
                 

                 {/**TAGS MEJOR DISEÑADOS */}
                 <div className='div-languages flex flex-row items-center space-x-2 overflow-hidden'>
    
    <p className="languages text-xs font-bold text-gray-900 flex-shrink-0">
        Keywords:
    </p>

    {/* Definimos el límite de tags a mostrar */}
    {/* Puedes ajustar este número (3) según el espacio disponible */}
    {project.tags.slice(0, 3).length > 0 && (
        <div className="flex flex-row flex-wrap gap-1 flex-1 overflow-hidden h-6">
        
            {/* 1. Mapeamos solo los primeros 3 tags */}
            {project.tags.slice(0, 3).map((tag, index) => (
                <span 
                    key={index}
                    className="
                        px-2 py-0.5 
                        text-xs font-medium 
                        bg-blue-100 text-blue-800 
                        rounded-full 
                        flex-shrink-0 
                        whitespace-nowrap
                    "
                >
                    {tag}
                </span>
            ))}
            
            {/* 2. Verificamos si hay tags ocultos y mostramos el contador */}
            {project.tags.length > 3 && (
                <span 
                    className="
                        px-2 py-0.5 
                        text-xs font-bold 
                        bg-gray-200 text-gray-600 
                        rounded-full 
                        flex-shrink-0 
                        whitespace-nowrap
                    "
                >
                    +{project.tags.length - 3} más
                </span>
            )}

        </div>
    )}
</div>




                 {/**FIN TAGS MEJOR DIEÑADOS */}


            
                
             </div>
             {/*FIN CONTAINER 1*/}






             {/* CONTAINER 2 authors */}
             <div className="project-card-authors bg-zinc-300  rounded-lg items-center mt-2 py-4 px-2 h-[74px]">

                {/*CONTAINER GENERAL DE AUTRORES Y DATA CON ICONO */}
                <div className='div-languages flex flex-row'>
                 {/*SOLO EL ICONO */}
                 <div className="flex-shrink-0 w-[2.2rem]">    
                   <img
                   className="block h-8 w-auto "
                   src={autor}
                   alt="autor"
                   />
                 </div>

                 {/*CONTAINER GRAL DE AUTRHOS Y DATE */}
                 <div className='flex flex-col w-[280px] '>

                      {/*CONTAINER DE AUTHORS Y NOMBRES*/}
                       <div className="flex flex-row  w-[99%]">
                          <p className="languages w-[21%] text-xs font-bold text-gray-900">
                          author: 
                          </p>
                          <div className='d-authors w-[78%] '>
                            <p className="languages text-gray-900 dark:text-white tracking-tight text-sm truncate w-[99%] sm:text-sm" dangerouslySetInnerHTML={{
                                   __html:
                                   project.authors && DOMPurify.sanitize(project.authors.length) > 20
                                    ? DOMPurify.sanitize(project.authors.slice(0, 50)) 
                                    : project.authors && DOMPurify.sanitize(project.authors),
                                   }}>
                               </p>  
                          </div>
                       </div>{/*FIN DEL CONTAINER DE AUTHORS Y NOMBRES */}



                      {/*<div className=" flex space-x-1 ">
                      <time className='w-[4rem] lg:text-xs md:text-xs text-xs font-light text-gray-500'>
                        
                         {new Date(project.published).toLocaleDateString("es-ES")}
                        </time>
                      <span aria-hidden="true">&middot;</span>
                     
                      </div>*/}
               {/*FIN ML-3 */}
                 </div>



            
            </div>
              {/*FIN BACKGROUND-COLOR WHITE, ESTAN E ICONO DE USER Y LOSA UTHORS */}

       </div>
      {/*FIN CONTENEDEDOR 1 */}



     
     
     
       </div>
   




   </>
  )
 }
 export default ProjectCard


