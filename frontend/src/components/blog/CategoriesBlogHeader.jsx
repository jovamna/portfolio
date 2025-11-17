import { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { get_categories } from "../../redux/actions/categories"
import { get_blog_list_category, get_blog_list, get_blog_list_page } from "../../redux/actions/blog"
import { useParams } from "react-router-dom"



function CategoriesBlogList ({
  get_categories, 
  categories,
}){
  
  
    useEffect(()=>{
        get_categories()
        console.log(get_categories)
        
      
    }, []);
 

    return(
      <div className="container-blog-categorias h-16  xl:px-8 py-2">
      
      
           {/* Agregamos un contenedor para la sección de categorías */}
      
          {/*IMPORTANTE OVERRFLOW-X-AUTO Agregamos un contenedor con overflow para permitir el desplazamiento horizontal en móviles */}
          <div className="overflow-x-auto scroll py-2">
             {/*UL */}
            <div className="ul-categories-blog inline-flex space-x-4 xl:space-x-8 pr-2">


                {/*<Link 
                to='/blog'
                className={`${location.pathname === '/blog' ? "text-orange-500 bg-white":"text-gray-900 hover:text-orange-500 border border-gray-100 hover:border-gray-200"} mt-[15px] px-6   rounded-md text-lg font-regular`}>
                                        
                   
                    <span className="blog-header-category-name relative z-2 text-center text-xl font-mono font-bold text-black italic">
                          All
                    </span>
                </Link>*/}



              {categories
                ? categories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/categories/${category.slug}`}
                      className="li-categories-blog relative  rounded-lg b flex flex-col overflow-hidden hover:opacity-75 px-4"
                    >
                    

                     

                      <span className="blog-header-category-name relative z-2 text-center lg:text-base text-xs oswald-muckas text-neutral-600 font-bold text-black italic mt-4 ">
                        {category.name}
                      </span>



                      {category.sub_categories.length > 0 && (
                        <div>
                          <h3>Subcategories:</h3>
                          <ul>
                            {category.sub_categories.map((subCategory) => (
                              <li key={subCategory.slug}>{subCategory.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Link>
                  ))
                : <></>}
            </div>
          </div>
          {/* FIN IMPORTANTE OVERRFLOW-X-AUTO Agregamos un contenedor con overflow para permitir el desplazamiento horizontal en móviles */}

  

    </div>
    )
}

const mapStateToProps = state =>({
    categories: state.categories.categories,
})

export default connect(mapStateToProps,{
    get_categories,
})(CategoriesBlogList)
