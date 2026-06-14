
import Header from "../../../../components/blog/Header";
import BlogListCategory from "../../../../components/blog/BlogListCategory";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { get_blog_list_category, get_blog_list_category_page } from "../../../../redux/actions/blog";
import FullWidthLayout from "../../../../hocs/FullWidthLayout";






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


        /**SEO */
      {/**SEO */}

 useEffect(() => {
  if (categorySlug) {
    // Ponemos la primera letra en mayúscula para que se vea bien
    const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
    
    // 1. Título dinámico según la categoría
    document.title = `Posts sobre ${categoryName} | Jovamna Medina - Full Stack Developer`;

    // 2. Meta descripción
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = `Explora todos los artículos sobre ${categoryName} en el blog de Jovamna Medina. Tutoriales y consejos sobre desarrollo Full Stack.`;
    }

    // 3. Open Graph (Para redes sociales)
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = `Artículos de ${categoryName} - Jovamna Medina`;
    
    // IMPORTANTE: Para el listado de categoría, no solemos usar JSON-LD de "BlogPosting" 
    // (ese es solo para el post solo). Para una categoría usamos "CollectionPage".
    
    let scriptJsonLd = document.querySelector('script[data-schema="blog-category"]');
    if (!scriptJsonLd) {
      scriptJsonLd = document.createElement('script');
      scriptJsonLd.type = 'application/ld+json';
      scriptJsonLd.setAttribute('data-schema', 'blog-category');
      document.head.appendChild(scriptJsonLd);
    }

    scriptJsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `Categoría: ${categoryName}`,
      'description': `Lista de artículos relacionados con ${categoryName}`,
      'url': `https://www.jovamnamedina.com/category/${categorySlug}`
    });
  }
}, [categorySlug]);

{/**FIN SEO */}



// Convertimos "django-rest" en "Django rest"
const displayCategory = categorySlug ? categorySlug.replace(/-/g, ' ').charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, ' ') : '';


    return(
   
        <FullWidthLayout>

          <div className="wrapper py-24">


            <div className="w-full">

              <h1 className="kaushan 
            underline underline-offset-8  
            lg:text-4xl text-3xl 
            font-bold text-center tracking-tight text-neutral-800 
            sm:text-4xl  md:text-center
            mb-[30px] lg:mb-[40px] 2xl:mb-[40px]">
            Artículos sobre: <span className="">{displayCategory}</span>
              </h1>
           
            
            <BlogListCategory 
            get_blog_list_category_page={get_blog_list_category_page} 
            list_categories_blog={blog_list_category} 
            categorySlug={categorySlug} // Pasar el categorySlug como prop
            count={count&&count} 
            />

     </div>

          </div>


        



         
      </FullWidthLayout>
         
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

