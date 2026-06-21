import Header from "../../../../components/blog/Header";
import { connect } from "react-redux";
import { get_blog_list_category} from "../../../../redux/actions/blog";
import FullWidthLayout from "../../../../hocs/FullWidthLayout";
import LoadingCard from "../../../../components/loaders/LoadingCard"
import BlogCard from "../../../../components/blog/BlogCard"
import CategoriesSmallSetPagination from "../../../../components/pagination/CategoriesSmallSetPagination"
import { Link, useParams, useNavigate, Navigate} from "react-router-dom"
import { useSearchParams } from 'react-router-dom';
import { get_category } from "../../../../redux/actions/categories";
import {useEffect, useState, lazy, Suspense } from 'react';
import CategoryMenuWithSubcategories from "./menuCategory"








function BlogCategory({
    get_blog_list_category,
    blog_list_category, 
    count, 
    next,
    previous,
    get_category,
    category,
    categories
}){
    const params = useParams()
    const navigate = useNavigate();
    const { categorySlug, subcategorySlug} = useParams(); 
    const [searchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get('p') || '1', 10);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    // ============================================
    // LOG 1: AL INICIAR EL COMPONENTE
    // ============================================
    console.log("🚀 BlogCategory SE MONTA");
    console.log("📌 categorySlug:", categorySlug);
    console.log("📌 subcategorySlug:", subcategorySlug);
    console.log("📌 Pathname actual:", window.location.pathname);

    useEffect(() => {
        // ============================================
        // LOG 2: AL EJECUTAR EL useEffect
        // ============================================
        console.log("🔄 useEffect EJECUTADO");
        console.log("🔄 categorySlug en useEffect:", categorySlug);
        
        if (!categorySlug || categorySlug === 'undefined' || categorySlug === '0') {
            console.log("❌ Slug inválido - setting notFound");
            setNotFound(true);
            setLoading(false);
            return;
        }

        const fetchAllData = async () => {
            console.log("⏳ fetchAllData INICIA");
            
            try {
                setLoading(true);
                setNotFound(false);

                // ============================================
                // LOG 3: ANTES DE LLAMAR A get_category
                // ============================================
                console.log("🔍 ANTES de get_category");
                console.log("🔍 Params a enviar:", { categorySlug, subcategorySlug });
                
                const categoryResult = await get_category({
                    categorySlug,
                    subcategorySlug,
                });
                
                // ============================================
                // LOG 4: DESPUÉS DE get_category
                // ============================================
                console.log("📦 DESPUÉS de get_category");
                console.log("📦 categoryResult COMPLETO:", JSON.stringify(categoryResult, null, 2));
                console.log("📦 categoryResult.redirect:", categoryResult?.redirect);
                console.log("📦 categoryResult.data:", categoryResult?.data);
                console.log("📦 categoryResult.data?.new_slugs:", categoryResult?.data?.new_slugs);

                if (categoryResult?.redirect && categoryResult.data?.new_slugs) {
                    // ============================================
                    // LOG 5: REDIRECCIÓN DETECTADA
                    // ============================================
                    console.log("🔄 REDIRECCIÓN DETECTADA!");
                    console.log("🔄 new_slugs:", categoryResult.data.new_slugs);
                    console.log("🔄 frontend_url del backend:", categoryResult.data.frontend_url);
                    
                    // ============================================
                    // LOG 6: CONSTRUYENDO PATHS
                    // ============================================
                    const pathActual = '/' + categoryResult.data.new_slugs.join('/') + '/';
                    const pathCorrecto1 = '/blog/' + categoryResult.data.new_slugs[0];
                    const pathCorrecto2 = '/blog/' + categoryResult.data.new_slugs.join('/');
                    
                    console.log("🛤️ Path ACTUAL (el que genera tu código):", pathActual);
                    console.log("🛤️ Path CORRECTO opción 1:", pathCorrecto1);
                    console.log("🛤️ Path CORRECTO opción 2:", pathCorrecto2);
                    console.log("📌 Path que usa el NAVBAR:", `/blog/${categoryResult.data.new_slugs[0]}`);
                    
                    // ============================================
                    // LOG 7: DECIDIENDO QUÉ PATH USAR
                    // ============================================
                    console.log("✅ DECIDIENDO usar path:", pathCorrecto1);
                    console.log("✅ NAVEGANDO a:", pathCorrecto1);
                    
                    // CAMBIO IMPORTANTE: Usar pathCorrecto1
                    navigate(pathCorrecto1, { replace: true });
                    return;
                }

                // ============================================
                // LOG 8: NO HAY REDIRECCIÓN - CARGAR PRODUCTOS
                // ============================================
                console.log("📊 NO hay redirección, cargando productos...");
                console.log("📊 get_blog_list_category con:", categorySlug, pageFromUrl);
                await get_blog_list_category(categorySlug, pageFromUrl, navigate);

            } catch (err) {
                console.error("❌ ERROR en fetchAllData:", err);
                console.error("❌ Error stack:", err.stack);
                setNotFound(true);
            } finally {
                console.log("🏁 fetchAllData TERMINA");
                setLoading(false);
            }
        };

        fetchAllData();
        window.scrollTo(0, 0);
        
        // ============================================
        // LOG 9: CLEANUP
        // ============================================
        return () => {
            console.log("🧹 useEffect CLEANUP");
        };
    }, [categorySlug, subcategorySlug, pageFromUrl, navigate, get_category, get_blog_list_category]);

    // ============================================
    // LOG 10: CADA VEZ QUE SE RENDERIZA
    // ============================================
    console.log("🖥️ BlogCategory RENDERIZANDO");
    console.log("🖥️ loading:", loading);
    console.log("🖥️ notFound:", notFound);
    console.log("🖥️ category:", category);
    console.log("🖥️ blog_list_category:", blog_list_category?.length);






    // SEO 
   useEffect(() => {
    if (categorySlug) {
        const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
        document.title = `Posts sobre ${categoryName} | Jovamna Medina - Full Stack Developer`;
        
        // --- NUEVO: Enlace Canonical Sin WWW ---
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement('link');
            linkCanonical.rel = 'canonical';
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.href = `https://jovamnamedina.com/category/${categorySlug}`;
        // ----------------------------------------

        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = `Explora todos los artículos sobre ${categoryName} en el blog de Jovamna Medina. Tutoriales y consejos sobre desarrollo Full Stack.`;
        }

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = `Artículos de ${categoryName} - Jovamna Medina`;
        
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
            'url': `https://jovamnamedina.com/category/${categorySlug}`
        });
    }
}, [categorySlug]);





    return(
        <FullWidthLayout>
            <div className="wrapper py-24">

            <div className="w-full" bg-orange-400>
                <div className="mx-auto mb-[30px] lg:mb-[40px] 2xl:mb-[40px]">
                    <h1 className="kaushan 
                     underline underline-offset-8  
                     lg:text-4xl text-xl 
                     font-bold text-center tracking-tight text-neutral-800 
                    sm:text-4xl  md:text-center
                     ">
                        {category?.name}</h1>
                        
                   
                    </div>
                  







                { /* <div className="lg:px-8 ">
                 {category && (
                    <div className="flex flex-row bg-neutral-50 rounded-xl py-2 border border-neutral-200">
                        <h2 className="text-xl font-bold text-neutral-800 kaushan">


                        Explorar 
                      
                         </h2>
                            <Link 
                              to={category.parent 
                            ? `/blog/${category.parent.slug}/${category.slug}`
                            : `/blog/${category.slug}`
                            } 
                             className="pl-2 text-xl font-bold text-neutral-800 kaushan"
                           >
                        <span className="badge">
                            {category.parent 
                          ? `Subcategory: ${category.name} (en ${category.parent.name})` 
                         : `Category: ${category.name}`
                         }
                        </span>
                        </Link>
                        

                    </div>
                    )}
                  </div>*/}







                    {/* Subcategorías horizontales */}
                   

                    <div  className="">
                        <CategoryMenuWithSubcategories 
                    category={category} 
                    categories={categories} 
                />
                     
                    </div>



                    <div>
                        {blog_list_category ? (
                            <>
                                     <div className="relative bg-gray-50 pb-8 px-4 sm:px-6 lg:pb-12 lg:px-8">
                    <div className="relative max-w-7xl mx-auto">    
                        <div className="mt-2 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                                            {blog_list_category.map((post, index) => (
                                                <BlogCard 
                                                    key={post.slug}
                                                    data={post}
                                                    index={index}
                                                />
                                            ))}
                                        </div>
                                        <CategoriesSmallSetPagination count={count} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <LoadingCard />
                        )}
                    </div>



                </div>
            </div>
        </FullWidthLayout>
    )
}

const mapStateToProps = state => ({
    blog_list_category: state.blog.blog_list_category,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,
    category: state.categories.category,
})

export default connect(mapStateToProps, {
    get_blog_list_category,
    get_category,
})(BlogCategory);