import { useEffect } from "react";
import { connect } from "react-redux";
import { get_project } from "../../../redux/actions/project";
import FullWidthLayout from "../../../hocs/FullWidthLayout";
import { useParams } from "react-router-dom";




function ProjectPost({
   
   
}){

    //TRABAJAREMOS EL SLUG USAMOS PARAMS
    const params= useParams()
    const slug = params.slug


    useEffect(()=>{
        get_project()
      
    },[])

    return(
     
        <FullWidthLayout>
      { /* <ProjectList  project_list={project_list}/>*/}
        </FullWidthLayout>
    )
}

const mapStateToProps = state =>({
   
})

export default connect(mapStateToProps,{
  
   
})(ProjectPost)