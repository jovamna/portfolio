
import Header from "../../../../components/blog/Header";

import { connect } from "react-redux";
import { get_blog_list_category, get_blog_list_subcategory} from "../../../../redux/actions/blog";
import { get_category} from "../../../../redux/actions/categories";
import FullWidthLayout from "../../../../hocs/FullWidthLayout";
import LoadingCard from "../../../../components/loaders/LoadingCard"
import BlogCard from "../../../../components/blog/BlogCard"
import CategoriesSmallSetPagination from "../../../../components/pagination/CategoriesSmallSetPagination"
import { useSearchParams } from 'react-router-dom';   // ← importante
import { Link, useParams, useNavigate, Navigate} from "react-router-dom"
import {useEffect, useState, lazy, Suspense } from 'react';
import CategoryBreadcrumbNav from "./menuSubcategory"



function BlogSubCategory({
    get_blog_list_subcategory,
    blog_list_subcategory,
    count, 
    get_category,
    category,        // desde Redux
    subcategory,     // desde Redux
  
}){
    
    const params = useParams()
    const { categorySlug, subcategorySlug } = useParams(); 
    console.log(categorySlug)
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get('p') || '1', 10);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
     // ✅ La subcategoría actual

    
  

   
    console.log("📌 Categoría padre:", categorySlug);
    console.log("📌 Objeto padre completo:", categorySlug);






    useEffect(() => {
    if (!categorySlug || categorySlug === 'undefined' || 
        !subcategorySlug || subcategorySlug === 'undefined') {
        setNotFound(true);
        setLoading(false);
        return;
    }

    const fetchAllData = async () => {
        try {
            setLoading(true);
            setNotFound(false);

            // Redirect check
            const result = await get_category({
                categorySlug,
                subcategorySlug
            });

            if (result?.redirect && result.data?.new_slugs) {
                const newSlugs = result.data.new_slugs;
    
                // Construir la URL con /blog/ al inicio
                const newPath = '/blog/' + newSlugs.join('/');
                console.log("🔄 Redirigiendo a:", newPath);
                navigate(newPath, { replace: true });
                return;
            }
            // Genera: /blog/diseno/subdiseno  ✅

            // Cargar productos
            await get_blog_list_subcategory(
                categorySlug, 
                subcategorySlug, 
                pageFromUrl, 
                navigate
            );

        } catch (err) {
            console.error("Error al cargar subcategoría:", err);
            if (err.response?.status === 404) {
                setNotFound(true);
            }
        } finally {
            setLoading(false);
        }
    };

    fetchAllData();
    window.scrollTo(0, 0);
}, [
    categorySlug, 
    subcategorySlug, 
    pageFromUrl, 
    get_blog_list_subcategory, 
    get_category,
    navigate
]);



       
    {/**SEO */} 
    useEffect(() => {
      if (categorySlug && subcategorySlug) {
        const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
        const subcategoryName = subcategorySlug.charAt(0).toUpperCase() + subcategorySlug.slice(1);
    
        // 1. Título dinámico optimizado para subcategoría
        document.title = `Posts sobre ${subcategoryName} en ${categoryName} | Jovamna Medina`;

        // --- NUEVO: Enlace Canonical con Subcategoría Sin WWW ---
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
          linkCanonical = document.createElement('link');
          linkCanonical.rel = 'canonical';
          document.head.appendChild(linkCanonical);
        }
        linkCanonical.href = `https://jovamnamedina.com/category/${categorySlug}/${subcategorySlug}`;
        // --------------------------------------------------------

        // 2. Meta descripción adaptada
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.content = `Explora tutoriales y artículos sobre ${subcategoryName} dentro de la categoría ${categoryName} en el blog de Jovamna Medina.`;
        }

        // 3. Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = `Artículos de ${subcategoryName} (${categoryName}) - Jovamna Medina`;
    
        // 4. Esquema JSON-LD para Colección de Subcategoría
        let scriptJsonLd = document.querySelector('script[data-schema="blog-subcategory"]');
        if (!scriptJsonLd) {
          scriptJsonLd = document.createElement('script');
          scriptJsonLd.type = 'application/ld+json';
          scriptJsonLd.setAttribute('data-schema', 'blog-subcategory');
          document.head.appendChild(scriptJsonLd);
        }

        scriptJsonLd.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          'name': `Subcategoría: ${subcategoryName}`,
          'description': `Artículos específicos sobre ${subcategoryName} en la sección de ${categoryName}`,
          'url': `https://jovamnamedina.com/category/${categorySlug}/${subcategorySlug}`
        });
       }
    }, [categorySlug, subcategorySlug]); // Añadidos ambos slugs aquí para que reaccione si cambian


    {/**FIN SEO */}



    return(
   
        <FullWidthLayout>

          <div className="wrapper py-24">

            <div className="w-full" bg-orange-400>
                <div className="mx-auto mb-[30px] lg:mb-[40px] 2xl:mb-[40px]">
                    <h1 className="kaushan 
                     underline underline-offset-8  
                     lg:text-4xl text-3xl 
                     font-bold text-center tracking-tight text-neutral-800 
                    sm:text-4xl  md:text-center
                     ">
                      {category?.name}  
                    </h1>
                </div>
             
            
            



                 <CategoryBreadcrumbNav category={category} />


            <div>
          
                {
                blog_list_subcategory ?
                <>
                <div className="relative bg-gray-50 pb-8 px-4 sm:px-6 lg:pb-12 lg:px-8">
                    <div className="absolute inset-0">
                        <div className="bg-white h-1/3 sm:h-2/3" />
                    </div>


                    
                    <div className="relative max-w-7xl mx-auto">
                        
                        <div className="mt-2 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                            {
                                blog_list_subcategory.map((post,index)=>(
                                    <BlogCard 
                                    key={post.slug}
                                    data={post}
                                    index={index}
                                    />
                                ))
                            }
                        </div>


                          <CategoriesSmallSetPagination count={count} />
                    </div>
                </div>
                </>
                :
                <LoadingCard/>
            }
            </div>


     </div>

          </div>


        



         
      </FullWidthLayout>
         
        )
}

const mapStateToProps = state => ({
    blog_list_subcategory: state.blog.blog_list_subcategory,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,
    //subcategory: state.blog.subcategory,
    category: state.categories.category,
})

export default connect(mapStateToProps,{
    get_blog_list_category,
    get_blog_list_subcategory,
    get_category,
})(BlogSubCategory)

