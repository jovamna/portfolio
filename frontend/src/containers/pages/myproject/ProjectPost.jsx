import { useEffect } from "react";
import { connect } from "react-redux";
import { get_project } from "../../../redux/actions/project";
import FullWidthLayout from "../../../hocs/FullWidthLayout";
import { useParams } from "react-router-dom";
import DOMPurify from 'dompurify'
import LoadingCard from "../../../components/loaders/LoadingCard";
import "../../../styles/index.css";

import { GiFastForwardButton } from "react-icons/gi";




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




    {/**SEO */}

{/** SEO INICIO **/}
  useEffect(() => {
    if (project) {
      // 1. Título dinámico con tu Stack
      document.title = `${project.title} | Proyecto Full Stack | Jovamna Medina`;

      // 2. Meta descripción limpia (usando la función cleanDescription que ya tienes arriba)
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = cleanDescription;

      // 3. Meta tags: Open Graph y Twitter
      const metaTags = [
        { property: 'og:title', content: `${project.title} | Jovamna Medina - Dev` },
        { property: 'og:description', content: cleanDescription },
        { property: 'og:image', content: project.image || 'https://www.jovamnamedina.com/og-image-tech.png' },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:label1', content: 'Tecnologías' },
        { name: 'twitter:data1', content: tags || 'Django, React, Redux' }
      ];

      metaTags.forEach(({ property, name, content }) => {
        const attribute = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
        let metaTag = document.querySelector(attribute);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          if (property) metaTag.setAttribute('property', property);
          if (name) metaTag.setAttribute('name', name);
          document.head.appendChild(metaTag);
        }
        metaTag.content = content || '';
      });

      // 4. JSON-LD (Cambiado a 'project-post' y usando variables correctas)
      let scriptJsonLd = document.querySelector('script[data-schema="project-post"]');
      if (!scriptJsonLd) {
        scriptJsonLd = document.createElement('script');
        scriptJsonLd.type = 'application/ld+json';
        scriptJsonLd.setAttribute('data-schema', 'project-post');
        document.head.appendChild(scriptJsonLd);
      }

      scriptJsonLd.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork', // Para proyectos es mejor CreativeWork o SoftwareSourceCode
        'headline': project.title,
        'description': cleanDescription,
        'image': project.image || 'https://www.jovamnamedina.com/logo.png',
        'author': {
          '@type': 'Person',
          'name': 'Jovamna Medina',
          'jobTitle': 'Full Stack Developer',
          'knowsAbout': ['Django', 'React', 'Redux', 'Python', 'PostgreSQL']
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Jovamna Medina Dev'
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://jovamnamedina.com/myproject/project/${project.slug}`
        }
      });
    }
  }, [project, cleanDescription]); // Dependencia corregida a project
  {/** FIN SEO **/}


{/**FIN SEO */}







    return(
     
        <FullWidthLayout>

      
   

            <div className="wrapper w-full min-h-screen">

                <div className="flex lg:flex-row  flex-col md:flex-col  w-full lg:pt-[90px] mb-[10px] pt-[70px] px-4">

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
                        

                  <a 
                  href ={project.url} 
                  target="_blank"  // **Recomendado:** Abre el enlace en una nueva pestaña
                  rel="noopener noreferrer" // **Recomendado:** Por seguridad y rendimiento
                  className ="hover:text-gray-500" >
                  <p className="flex flex-row text-xs text-center font-semibold text-gray-900 mb-4 hover:text-blue-500">
                  LINK AL PROJECTO &nbsp; <GiFastForwardButton className='text-blue-700 hover:text-blue-300 text-xl font-extrabold'/>
                  </p>
                  </a>


                      </div>



                       {/**IMPORTANTE PARA URL */}
                      {/*<span className="flex flex-col">
                            <p className="lg:text-base text-xs font-extrabold mr-[8px]">
                            Enlace al Projecto en GitHub:
                            </p>
                          
                                <a 
                         href={project.url} 
                         target="_blank"  // **Recomendado:** Abre el enlace en una nueva pestaña
                         rel="noopener noreferrer" // **Recomendado:** Por seguridad y rendimiento
                         className="
                          text-xs 
                         overflow-hidden 
                          text-ellipsis 
                        whitespace-nowrap*/}  {/*Necesario** para que truncate funcione 
                         block */} {/* **Necesario** para que ocupe espacio y aplique overflow 
                        text-blue-600 hover:text-blue-800 hover:underline //* Estilos de enlace 
                        ">*/}
                       {/*{project.url*/}
                         {/*</a> </span>*/}




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

                    



                   
                 <div className='div-languages mt-[10px] flex flex-col overflow-hidden w-[30%]'>
    
                 <p className="text.base font-extrabold">Tags:</p>

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
                        bg-blue-100 text-blue-700 
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