import { connect } from "react-redux";
import FullWidthLayout from "../../../hocs/FullWidthLayout";
import ProjectList from "../../../components/myproject/ProjectList";
import Header from "../../../components/myproject/Header";
import NavbarProject from "../../../components/navigation/NavbarProject";
import Footer from "../../../components/navigation/Footer";
import LoadingCard from "../../../components/loaders/LoadingCard"

import { get_project_list, get_project_list_page } from "../../../redux/actions/project";
import { Helmet} from 'react-helmet-async';



function MyProject({
    projects,
    count,
    next,
    previous,
    get_project_list,
    get_project_list_page,
  
}){
   



    return(
     
        <FullWidthLayout>
            
           <Helmet> 
           <title> Projectos en GitHub | Portafolio Developer FullStack, Blog | Jovamna Medina</title>
           </Helmet>

           <Header />


           <div className="project-pagina mx-auto w-[100%] flex lg:flex-row flex-col px-2">

               {/*PRIMERA COLUMNA */}
               <div className="project-column-1 lg:w-[10%] pr-4">
               </div>

               {/*SEGUNDA COLUMNA */}
               <div className="project-column-2 lg:w-[80%] px-0">
                
               <ProjectList 
                 get_project_list_page={get_project_list_page}
                 projects={projects}
                 count={count&&count}          
                  />
                </div>
            
                 {/*TERCERA COLUMA FIJA */}
                 <div className="project-column-3 lg:w-[10%] pl-4">

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