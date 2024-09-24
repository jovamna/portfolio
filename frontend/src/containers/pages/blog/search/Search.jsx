import Footer from "../../../../components/navigation/Footer"
import NavbarProject from "../../../../components/navigation/NavbarProject"
import FullWidthLayout from "../../../../hocs/FullWidthLayout"
import { useEffect, useState } from "react"
import { connect } from "react-redux";
import {search_blog, search_blog_page } from "../../../../redux/actions/blog";

import { useParams } from "react-router-dom";
import BlogListSearchDos from "../../../../components/blog/search/BlogListSearchDos";
import BlogCardSearchUno from "../../../../components/blog/search/BlogCardSearchUno";
import SmallSetPaginationSearch from "../../../../components/pagination/SmallSetPaginationSearch";
import { Helmet, HelmetProvider } from 'react-helmet-async';



function Search({
    posts,
    count,
    next,
    previous,
    search_blog,
    search_blog_page,
    filtered_posts
}){

    //console.log(filtered_posts) //indefinido
    //console.log(posts)  //correcto
    
    const params = useParams()
    const term = params.term

 

    useEffect(()=>{
        
        search_blog(term)
    },[])

    return(
        
       <FullWidthLayout>

          <Helmet> 
          <title>                  
          {term} | Portafolio, Blog | Jovamna Medina
          </title>
           </Helmet>





           
           <div className="pt-24">
                <div className="search mx-auto max-w-full px-4 sm:px-6 lg:px-8"> 
                            
                  <h2 className="text-xl text-zinc-700 font-mono font-semibold text-center uppercase lg:mt-8 mb-8">
                  RESULTADOS DE LA BUSQUEDA DE "{term}"
                  </h2>
                  
              
                    <BlogListSearchDos 
                    posts={posts&&posts}
                    search_blog_page ={search_blog_page}
                    term={term}
                    count={count&&count} 
                    />
               
                
                  
                </div>
            </div>
            
            </FullWidthLayout>
       
    )
}
const mapStateToProps=state=>({
    posts: state.blog.filtered_posts,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,

})

export default connect(mapStateToProps,{
    search_blog,
    search_blog_page,
}) (Search)

