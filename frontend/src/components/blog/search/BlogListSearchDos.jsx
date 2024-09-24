
import SmallSetPaginationSearch from "../../pagination/SmallSetPaginationSearch"
import BlogCardSearchUno from "./BlogCardSearchUno"
import {search_blog, search_blog_page} from "../../../redux/actions/blog";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";




function BlogListSearchDos({
  search_blog,
  filtered_posts,
  posts,
  search_blog_page,
  count,
  next,
  previous,

}){


  //console.log(posts)  //correcto



    
  const params = useParams()
  const term = params.term


  useEffect(()=>{
      //window.scrollTo(0,0)
      search_blog(term)

  },[])  


  //divide-neutral-400 divide-y
  return(
    <div className="overflow-hidden px-8 bg-white">
      <ul role="list" className="space-y-8 gap-8">
        {posts&&posts.map((post,index) => (
          <BlogCardSearchUno 
          data={post} 
          key={index} 
          index={index}
          />
        ))}
      </ul>
      <SmallSetPaginationSearch 
      list_page={search_blog_page}
      list={posts}  
      term={term} 
      count={count} 
      next={next}
      previous={previous}
      />
    </div>
    )
}

const mapStateToProps = state => ({
  posts: state.blog.filtered_posts,
  count: state.blog.count,
  next: state.blog.next,
  previous : state.blog.previous
})

export default connect(mapStateToProps,{
  search_blog,
  search_blog_page,

})(BlogListSearchDos)

