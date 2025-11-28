import "../../../styles/index.css";

import BlogList from "../../../components/blog/BlogList";
import Header from "../../../components/blog/Header";
import FullWidthLayout from "../../../hocs/FullWidthLayout";
import { useEffect } from "react";
import { connect } from "react-redux";
import { get_blog_list_category, get_blog_list, get_blog_list_page } from "../../../redux/actions/blog";
import { get_categories } from "../../../redux/actions/categories";
import { useParams } from "react-router-dom"
import ResetPasswordSuccess from '../../../components/auth//ResetPasswordSuccess'; 
import { Helmet } from 'react-helmet-async';
import CategoriesBlogHeader from "../../../components/blog/CategoriesBlogHeader";

function Blog({
    categories,
    get_categories,
    get_blog_list,
    get_blog_list_page,
    blog_list,
    get_blog_list_category,
    get_blog_list_category_page,
 
    count,
    next,
    previous,
    //posts,
}){
    const params = useParams(); // Agrega esta línea para obtener el objeto params

    useEffect(() => {
        const fetchData = async () => {
          categories ? <></> : get_categories();
          get_blog_list();
          const categorySlug = params.categorySlug; // Reemplaza con el categorySlug adecuado
          if (categorySlug) {
                get_blog_list_category(categorySlug);
            }
       
        };
        fetchData();
      }, [params]);


      //console.log(import.meta.env.VITE_REACT_API_URL)


     


    return(
        
        <FullWidthLayout>

           <Helmet> 
          <title>                  
          Blog | Jovamna Medina
          </title>
           </Helmet>




           <div className="wrapper ">
               <Header />
       
                <div className="reset-password z-50 absolute w-[40%] max-auto">
                <ResetPasswordSuccess /> {/* Agrega el componente aquí */}
                </div>

                  {/*max-w-lg limita el ancho y lo pone a lado left*/}
                 <div className="segmento-header-categoria  inset-x-0  top-0 bg-opacity-50  w-[100%] text-white z-10">
            
                 <CategoriesBlogHeader />
                 </div>


                 {/*el violet son nombres de la pagination*/}
                 <div className="blog-list-top flex-1 py-2">
                 <BlogList 
                 get_blog_list_page={get_blog_list_page} 
                 blog_list={blog_list&&blog_list} 
                 count={count&&count} />
                 </div>




            </div>




        </FullWidthLayout>
    )
}

const mapStateToProps = state =>({
    categories: state.categories.categories,
    blog_list: state.blog.blog_list,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,
})

export default connect(mapStateToProps,{
    get_categories,
    get_blog_list,
    get_blog_list_page,
    get_blog_list_category,
})(Blog)