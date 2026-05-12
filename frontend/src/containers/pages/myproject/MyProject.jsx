import { connect } from "react-redux";
import FullWidthLayout from "../../../hocs/FullWidthLayout";
import ProjectList from "../../../components/myproject/ProjectList";
import Header from "../../../components/myproject/Header";
import { useEffect } from "react";
import { get_project_list, get_project_list_page } from "../../../redux/actions/project";




function MyProject({
    projects,
    count,
    next,
    previous,
    get_project_list,
    get_project_list_page,
  
}){


    
          /**SEO */
          useEffect(() => {
      // 1. Cambiamos el título de la pestaña
      document.title = "Mis Projectos en GItHub| Jovamna Medina - Full Stack Developer";
    
      // 2. Actualizamos la meta-descripción (opcional pero recomendado)
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = "Explora artículos sobre desarrollo web, Django, React y arte digital en el blog oficial de Jovamna Medina.";
      }
    
      // Al ser la página general del blog, no solemos necesitar un JSON-LD 
      // tan complejo como el del post individual, con esto basta.
    }, []);
    
    
   



    return(
     
        <FullWidthLayout>
       

           <Header />


           <div className="project-pagina mx-auto w-[100%] flex lg:flex-row flex-col px-2">

               {/*PRIMERA COLUMNA */}
               <div className="project-column-1 lg:w-[10%] w-[100%]">
               </div>

               {/*SEGUNDA COLUMNA */}
               <div className="project-column-2 lg:w-[80%] w-[98%] px-0">
                
               <ProjectList 
                 get_project_list_page={get_project_list_page}
                 projects={projects}
                 count={count&&count}          
                  />
                </div>
            
                 {/*TERCERA COLUMA FIJA */}
                 <div className="project-column-3 lg:w-[10%] w-[100%]">

                  </div>
      
      

                 </div>




       </FullWidthLayout>

        

    )
}

const mapStateToProps = state =>({
    projects: state.project.project_list,
    count: state.project.count,
    next: state.project.next,
    previous: state.project.previous,

   
})

export default connect(mapStateToProps,{
    get_project_list,
    get_project_list_page,

  
})(MyProject)