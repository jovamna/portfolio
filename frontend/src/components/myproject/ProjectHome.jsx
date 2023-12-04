import { useEffect } from "react"
import { connect } from "react-redux"
import ProjectCard from "./ProjectCard"
import { get_project_list } from "../../redux/actions/project";
import project from "../../redux/reducers/project";
import LoadingCard from "../loaders/LoadingCard"
import "../../styles/index.css";



  function ProjectHome({
    get_project_list,
    project_list, //esto es de mapStateToProps

}){

    //console.log(get_project_list)
    useEffect(()=>
    {
        get_project_list()

    },[])  

  
    return(
        <div className="project-home flex flex-row justify-between w-[88%] py-4  px-4 bg-neutral-800 opacity-90">


            {
               project_list ?
              
                <>
               
                
                  
                        {/*CONTAINER NARANJA QUE ALOJA A LOS 2 GITHUBS */}
                        <div className="project-home-subcontainer  grid gap-5 lg:grid-cols-2 md:grid-cols-2 lg:max-w-none max-w-lg mx-auto bg-yellow-800 ">
                            
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
       
    )
}

const mapStateToProps = state => ({
    project_list: state.project.project_list,
   
})

export default connect(mapStateToProps,{
    get_project_list,
   
})(ProjectHome)




