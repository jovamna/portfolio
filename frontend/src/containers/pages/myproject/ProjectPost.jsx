import { useEffect } from "react";
import { connect } from "react-redux";
import { get_project } from "../../../redux/actions/project";
import FullWidthLayout from "../../../hocs/FullWidthLayout";
import { useParams } from "react-router-dom";
import DOMPurify from 'dompurify'
import LoadingCard from "../../../components/loaders/LoadingCard";
import "../../../styles/index.css";
import { Helmet } from 'react-helmet-async';





function ProjectPost({get_project, project}){

    //TRABAJAREMOS EL SLUG USAMOS PARAMS
    const params= useParams()
    const slug = params.slug


    useEffect(()=>{
         window.scrollTo(0,0)
        get_project(slug)
      
    },[])

    const title = project ? project.title : 'Cargando Proyecto...';
    // Nota: Es mejor usar un campo específico para SEO como 'seo_description',
    // pero aquí usamos la descripción general por ahora.
    const description = project ? project.description : 'Una descripción de nuestro proyecto.';
    const tags = project ? project.tags : 'proyectos, desarrollo, web'; 
    const projSlug = project ? project.slug : 'default-slug'; // Necesario para la URL canónica
    
    // Función para limpiar la descripción si se usa HTML
    const cleanDescription = DOMPurify.sanitize(description).replace(/<[^>]+>/g, '').substring(0, 150) + '...';



    return(
     
        <FullWidthLayout>

            {/* ⭐️ POSICIÓN CORRECTA DEL HELMET ⭐️ */}
            <Helmet>
                {/* Título de la página */}
                <title>{title}</title>
                
                {/* Meta Description para SEO */}
                <meta name="description" content={cleanDescription} />

                {/* Meta Keywords */}
                <meta name="keywords" content={tags} />

                {/* Enlaces canónicos (Buena práctica de SEO) */}
                <link rel="canonical" href={`https://jovamnamedina.com/myproject/project/${projSlug}`} />

                {/* Open Graph (OG) Tags para redes sociales (Facebook, LinkedIn) */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={cleanDescription} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://jovamnamedina.com/myproject/project/${projSlug}`} />
                {/* <meta property="og:image" content={project.image_url} /> <-- Si tienes una imagen */}

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={cleanDescription} />
                {/* <meta name="twitter:image" content={project.image_url} /> */}

            </Helmet>
                   






   

            <div className="wrapper w-full min-h-screen">

                <div className="flex lg:flex-row  flex-col md:flex-col px-8 w-full lg:pt-[90px] mb-[10px] pt-[70px] px-4">

                    {/*COLUMNA LATERAL */}
                    <div className="column-1 flex lg:w-[10%] w-[100%]">
                    </div>
                   {/*FIN COLUMNA LATERAL */}

                    {/*COLUMNA CENTRO */}
                   <div className="column-2 flex  flex-col lg:w-[80%] w-[98%]">

                     {project ?(
                        <div>
                      <div className="flex justify-center items-center"> 
                        <h1 className="kaushan text-center lg:text-3xl text-lg font-extrabold underline underline-offset-8">
                             {project.title}

                        </h1>
                       
                      </div>
                      {/**DESCRIPTION TYNCY */}
                      <div className="mt-[40px]"> 
                     <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description)}} />
                        
                      </div>

                      <div className="mt-4"> 
                        <span className="flex flex-row">
                            <p className="font-extrabold mr-[8px]">
                            Enlace al Projecto en GitHub:
                            </p>
                            <p>
                                {project.url}
                            </p>
                        </span>


                      </div>


                      <div className="mt-4">
                        <span className="flex flex-row">
                            <p className="font-extrabold mr-[8px]">Category: </p>
                            <p> {project.category}</p>
                        </span> 
                        

                        <div className="mt-4">
                            <p>{project.authors}</p>
                           <p className="oswald-muckas text-neutral-900 lg:text-sm  text-xs md:text-base font-bold">
                     {new Date(project.published).toLocaleDateString("es-ES")}
                  </p> 
                             </div>

                      </div>

                      <div className="mt-4">
                        <p className="text.base font-extrabold">Tags:</p>
                       
                        </div>



                   
                 <div className='div-languages mt-[10px] flex flex-col items-center space-x-2 overflow-hidden w-[30%]'>
    
                 

                  {/* Contenedor de Tags: Usamos flex-1 y overflow-hidden para la truncaCión */}
                  <div className="flex flex-row flex-wrap gap-1 flex-1 overflow-hidden h-6">
    
                  {/* Mapeamos el array de tags para renderizar cada uno */}
          {
            project.tags.map((tag, index) => (
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
            ))
        }

                  </div>

                 </div>






                      </div>

                     ):(
                      <div> <p>....</p></div>
                      )}


                   </div>

                  {/*COLUMNA LATERAL */}
             <div className="column-3 flex lg:w-[10%] w-[100%]">
            
             </div>



                </div>
                

       




              </div>
        </FullWidthLayout>
    )
}

const mapStateToProps = state =>({
   project:state.project.project
})

export default connect(mapStateToProps,{
  get_project
   
})(ProjectPost)