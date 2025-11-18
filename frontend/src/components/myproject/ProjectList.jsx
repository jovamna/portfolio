import { useEffect } from "react"
import { connect } from "react-redux"
import ProjectCard from "./ProjectCard"
import { get_project_list, get_project_list_page } from "../../redux/actions/project";
import project from "../../redux/reducers/project";
import LoadingCard from "../loaders/LoadingCard"
import SmallSetPaginationProject from "../pagination/SmallSetPaginationProject";




  function ProjectList({
    get_project_list,
    get_project_list_page,
    projects, //esto es de mapStateToProps
    count,
    next,
    previous,
   

}){

    console.log(get_project_list)
    useEffect(()=>
    {
        get_project_list()

    },[])  


    
    return(
        <div className="project-list px-0">
            {
                projects?
              
           
                <>
              
                
            
  
       <div className="project-list-grid mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:max-w-none  py-4 px-0 ">

       
      







                            {
                                projects&&projects.map((project, index)=>(
                                 
                                    <ProjectCard 
                                    key={index} 
                                    data={project}
                                    index={index}
                                    />
                                
                                ))
                            }
                        </div>






                        <SmallSetPaginationProject 
                        get_project_list_page={get_project_list_page} 
                        project_list={projects} 
                        count={count} 
                        next={next} 
                        previous={previous}
                        />



                        


                        
                       
                
        
                </>
                :
                <LoadingCard/>
                //{/*AQUI VA UN LOADINGcARD */}
               
            }
        </div>






    )
}








const mapStateToProps = state => ({
    projects: state.project.project_list,
    count: state.project.count,
    next: state.project.next,
    previous: state.project.previous,
   
})

export default connect(mapStateToProps,{
    get_project_list,
    get_project_list_page
   
})(ProjectList)