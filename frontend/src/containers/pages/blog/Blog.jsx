import "../../../styles/index.css";

import Header from "../../../components/blog/Header";
import FullWidthLayout from "../../../hocs/FullWidthLayout";
import { useEffect } from "react";
import { connect } from "react-redux";
import { get_blog_list_category, get_blog_list } from "../../../redux/actions/blog";
import { get_categories } from "../../../redux/actions/categories";
import { useParams } from "react-router-dom"
import ResetPasswordSuccess from '../../../components/auth//ResetPasswordSuccess'; 
import CategoriesBlogHeader from "../../../components/blog/CategoriesBlogHeader";
import LoadingCard from "../../../components/loaders/LoadingCard"
import SmallSetPaginationBlog from "../../../components/pagination/SmallSetPaginationBlog"
import BlogCard from "../../../components/blog//BlogCard"



function Blog({
    categories,
    get_categories,
    get_blog_list,
    blog_list,
    count,
    next,
    previous,
    //posts,
}){
    const params = useParams(); // Agrega esta línea para obtener el objeto params
    const { categorySlug} = useParams();

    useEffect(() => {
        get_blog_list()
      }, []);


      //console.log(import.meta.env.VITE_REACT_API_URL)


      /**SEO */
      useEffect(() => {
       // 1. Cambiamos el título de la pestaña
       document.title = "Blog | Jovamna Medina - Full Stack Developer";

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

           <div className="">
               <Header />
       
                <div className="reset-password z-50 absolute w-[40%] max-auto">
                <ResetPasswordSuccess /> {/* Agrega el componente aquí */}
                </div>

                  {/*max-w-lg limita el ancho y lo pone a lado left segmento-header-categoria */}
                 <div className=" inset-x-0  top-0 bg-opacity-50  w-[100%] text-white z-10">
            
                 <CategoriesBlogHeader />
                 </div>


                 {/*el violet son nombres de la pagination*/}
                 <div className=" flex-1 ">
                 
           
          
                  {
                    blog_list ?
                    <>
                   <div className="relative bg-gray-50 sm:px-2 lg:pb-30 lg:px-8">
                 

                    
                    <div className="relative max-w-7xl mx-auto">
                        
                        <div className="mt-2 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                            {
                                blog_list.map((post,index)=>(
                                    <BlogCard 
                                    key={post.slug}
                                    data={post}
                                    index={index}
                                    />
                                ))
                            }
                        </div>




                             <SmallSetPaginationBlog count={count}/>
                    </div>
                </div>
                   </>
                    :
                   <LoadingCard/>
                    }
                 </div>
                
                
                
                
             




            </div>




        </FullWidthLayout>
    )
}

const mapStateToProps = state =>({
    categories: state.categories.categories,
    blog_list_category: state.blog.blog_list_category,
    blog_list:state.blog.blog_list,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,
})

export default connect(mapStateToProps,{
    get_categories,
    get_blog_list,
    get_blog_list_category,
})(Blog)