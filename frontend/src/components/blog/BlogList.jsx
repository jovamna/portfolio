import LoadingCard from "../../components/loaders/LoadingCard"
import LoadingFullWidth from "../../components/loaders/LoadingFullWidth"
import SmallSetPaginationBlog from "../../components/pagination/SmallSetPaginationBlog"
import { useEffect } from "react"
import { connect } from "react-redux"
import BlogCard from "./BlogCard"
import { get_blog_list, get_blog_list_page } from "../../redux/actions/blog";
import "../../styles/index.css";




function BlogList({
  
    get_blog_list,
    blog_list,
    get_blog_list_page,
    count,
    next,
    previous
}){

    console.log(get_blog_list)
    useEffect(()=>{
        window.scrollTo(0,0)
        get_blog_list()

    },[])  


    
    return(
   
      <div className=" w-full px-4 sm:px-6 lg:px-8">
          {
          blog_list ?
          <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {blog_list.map(post => (
               <BlogCard key={post.slug} data={post} />
            ))}
          </div>  
          
    

      <SmallSetPaginationBlog 
        get_blog_list_page={get_blog_list_page} 
        blog_list={blog_list} 
        count={count}
        next={next}
        previous={previous}/>


    </>
    :
    <LoadingFullWidth />
  }
</div>






    )
}

const mapStateToProps = state => ({
    blog_list: state.blog.blog_list,
    count: state.blog.count,
    next: state.blog.next,
    previous : state.blog.previous
})

export default connect(mapStateToProps,{
    get_blog_list,
    get_blog_list_page,
 
})(BlogList)


//<h2
//className="px-2 mt-2 text-sm dark:text-dark-txt text-center  text-zinc-700 tracking-wide font-light">
//{post.excerpt && post.excerpt.length > 20
 // ? DOMPurify.sanitize(post.excerpt.slice(0, 20)) 
  //: post.excerpt && DOMPurify.sanitize(post.excerpt)}
//{post.excerpt} 
  // </h2>
