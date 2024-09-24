import NavbarProject from "../../../../components/navigation/NavbarProject";
import Footer from "../../../../components/navigation/Footer";
import Header from "../../../../components/blog/Header";
import BlogList from "../../../../components/blog/BlogList";
import BlogListCategory from "../../../../components/blog/BlogListCategory";
import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { get_blog_list_category, get_blog_list_category_page } from "../../../../redux/actions/blog"
import FullWidthLayout from "../../../../hocs/FullWidthLayout";
import { Helmet} from 'react-helmet-async';
import LoadingCard from "../../../../components/loaders/LoadingCard";





function BlogCategory({
    get_blog_list_category,
    blog_list_category, 
    get_blog_list_category_page,
    count, 
    next,
    previous,
  
}){
    
    const params = useParams()
    const categorySlug = params.categorySlug 
    console.log(categorySlug)
    useEffect(() => {
        get_blog_list_category(categorySlug);
    }, [categorySlug]);

    return(
        <>
        <FullWidthLayout>
        <div>
            <Helmet>
       
          <title>                  
          {categorySlug} | Portafolio, Blog | Jovamna Medina
           </title>
           </Helmet>
            </div>



            <Header/>
            <BlogListCategory 
            get_blog_list_category_page={get_blog_list_category_page} 
            list_categories_blog={blog_list_category} 
            categorySlug={categorySlug} // Pasar el categorySlug como prop
            count={count&&count} 
            />
         
      </FullWidthLayout>
            </>
        )
}

const mapStateToProps = state => ({
    list_categories_blog: state.blog.blog_list_category,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,

})

export default connect(mapStateToProps,{
    get_blog_list_category,
    get_blog_list_category_page
})(BlogCategory)

