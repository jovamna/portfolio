import LoadingCard from "../loaders/LoadingCard"
import CategoriesSmallSetPagination from "../pagination/CategoriesSmallSetPagination"
import { connect } from "react-redux"
import BlogCard from "./BlogCard"
import { get_blog_list_category, get_blog_list_category_page } from "../../redux/actions/blog"




function BlogListCategory({
    blog_list_category,
    get_blog_list_category_page,
    count,
    next,
    previous,
    categorySlug // Usar la prop categorySlug
}){
    
    return(

        <div>
          
            {
                blog_list_category ?
                <>
                <div className="relative bg-gray-50 pb-8 px-4 sm:px-6 lg:pb-12 lg:px-8">
                    <div className="absolute inset-0">
                        <div className="bg-white h-1/3 sm:h-2/3" />
                    </div>


                    
                    <div className="relative max-w-7xl mx-auto">
                        
                        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                            {
                                blog_list_category.map((post,index)=>(
                                    <BlogCard 
                                    key={post.slug}
                                    data={post}
                                    index={index}
                                    />
                                ))
                            }
                        </div>


                        <CategoriesSmallSetPagination 
                            list_page={get_blog_list_category_page} 
                            list={blog_list_category} 
                            count={count}
                            categorySlug={categorySlug}
                            next={next}
                            previous={previous}
                        />
                    </div>
                </div>
                </>
                :
                <LoadingCard/>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    blog_list_category: state.blog.blog_list_category,
    count: state.blog.count,
    next: state.blog.next,
    previous : state.blog.previous
})

export default connect(mapStateToProps,{
    get_blog_list_category,
    get_blog_list_category_page
})(BlogListCategory)