import LoadingCard from "../../../components/loaders/LoadingCard";
import FullWidthLayout from "../../../hocs/FullWidthLayout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios"
import { setAlert } from "../../../redux/actions/alert";
import { get_blog } from "../../../redux/actions/blog";
import {get_reviews,} from '../../../redux/actions/reviews/reviews';
import FormReview from "../../../components/blog/reviews/FormReview";
import Top from "../../../components/topbutton/Top";
import Hearts from '../../../components/blog/Hearts';
import moment from "moment";
import DOMPurify from 'dompurify'
import Alert from "../../../components/Alert"
import autorblog from '../../../assets/img/users/autorblog.jpg';
import enviarlo from '../../../assets/img/users/enviarlo.png';
import vistas from '../../../assets/img/vistas.png';
import "../../../styles/index.css";
import { Link, useParams, useNavigate, Navigate  } from "react-router-dom";
import ShareButton  from '../../../components/blog/ShareButton'




// 2. CONFIGURACIÓN GLOBAL (Fuera de la función)


 const URL =
   process.env.NODE_ENV === "production"
     ? import.meta.env.VITE_REACT_API_URL
     : "http://localhost:8000";
 
   console.log(URL);


function PostDetail({
    get_blog,
    post,
    get_reviews,
    setAlert,
    title,
    currentPost,
    allPosts
}){
    const params = useParams()
  
    const { postSlug, slug} = useParams(); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    console.log("🚀 BlogDetail SE MONTA");
    console.log("📌 postSlug:", postSlug);




  useEffect(() => {
    window.scrollTo(0, 0);

    get_blog(postSlug, navigate);   // ← Pasamos navigate
  }, [postSlug, get_blog, navigate]);



  // ============================================
      // EFECTO PARA REVIEWS
      // ============================================
      //useEffect(() => {
      //    if (slug) {
      //        get_reviews(slug);
       //   }
      //}, [slug, get_reviews]);
  
    

  

    
{/**SEO */}

///SEO
// ─── SEO POST BLOG ─────────────────────────────────────────────────────────────
useEffect(() => {
  if (!post) return;

  const canonicalUrl = `https://jovamnamedina.com/blog/post/${post.slug}`;

  // 1. TITLE (Optimizado para no superar los 60 caracteres y cortar en Google)
  document.title = `${post.title} | Jovamna Medina`;

  // 2. CANONICAL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  // 3. DESCRIPTION
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = (post.excerpt || post.title).substring(0, 160);

  // Formatear imagen absoluta de forma segura
  // Si el post tiene imagen propia la usa; si no, usa tu 'facebookweb.jpg' de respaldo
  const postImageUrl = post.image 
    ? (post.image.startsWith('http') ? post.image : `${window.location.origin}${post.image}`)
    : 'https://jovamnamedina.com/custom-static/images/facebookweb.jpg';

  // 4. OPEN GRAPH & TWITTER
  const metas = [
    { property: 'og:title', content: `${post.title} | Jovamna Medina` },
    { property: 'og:description', content: (post.excerpt || post.title).substring(0, 160) },
    { property: 'og:image', content: postImageUrl },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:type', content: 'article' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${post.title} | Jovamna Medina` },
    { name: 'twitter:description', content: (post.excerpt || post.title).substring(0, 160) },
    { name: 'twitter:image', content: postImageUrl }
  ];

  metas.forEach(({ property, name, content }) => {
    const selector = property 
      ? `meta[property="${property}"]` 
      : `meta[name="${name}"]`;
    
    let tag = document.querySelector(selector);
    if (!tag) {
      tag = document.createElement('meta');
      if (property) tag.setAttribute('property', property);
      if (name) tag.setAttribute('name', name);
      document.head.appendChild(tag);
    }
    tag.content = content;
  });

  // 5. JSON-LD (Schema.org BlogPosting)
  let scriptJsonLd = document.querySelector('script[type="application/ld+json"][data-schema="blog-post"]');
  if (!scriptJsonLd) {
    scriptJsonLd = document.createElement('script');
    scriptJsonLd.type = 'application/ld+json';
    scriptJsonLd.setAttribute('data-schema', 'blog-post');
    document.head.appendChild(scriptJsonLd);
  }

  scriptJsonLd.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.title,
    image: postImageUrl,
    datePublished: post.published,
    dateModified: post.updated || post.published,
    author: {
      '@type': 'Person',
      name: 'Jovamna Medina'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jovamna Medina Dev'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    }
  });

  // Cleanup
  return () => {
    document.title = "Jovamna Medina | Blog de Desarrollo Web";

    if (metaDesc) {
      metaDesc.content = "Aprende desarrollo web con Django, React y buenas prácticas Full Stack.";
    }

    if (scriptJsonLd) scriptJsonLd.remove();
  };

}, [post]);
{/**FIN SEO */}






// 5. PREPARACIÓN DE DATOS (DATA DERIVATION)
// Construir las URL completas utilizando la URL base de tu aplicación React
    const imageUrl = `${URL}${post?.image}`; 
    const videoUrl = `${URL}${post?.video}`;
    const thumbnailUrl = `${URL}${post?.thumbnail}`;
    //FIN URL PARA LAS IMAGENES LOCALIZEN EN LA CARPETA BACKEND

 

    /* ============================================================
     RENDER MEDIA
  ============================================================ */


  const renderMedia = () => {
    if (post.thumbnail && !post.video) {
      return (
        <img
          src={thumbnailUrl}
          alt={`${post?.title|| 'Jovamna Medina Desarrolladora Full Stack en Django y React.'}`}
          loading="lazy"
          className="object-contain w-full lg:w-[60%]"
        />
      );
    }

    if (post.video && !post.thumbnail) {
      return (
        <video
          src={videoUrl}
          className="object-cover w-full h-[400px]"
          autoPlay
          loop
          muted
          title={post.title}
        />
      );
    }

    if (post.thumbnail && post.video) {
      return (
        <>
          <img
            src={thumbnailUrl}
            alt={post.title}
            loading="lazy"
            className="object-contain w-full mb-4 lg:w-[60%]"
          />
          <video
            src={videoUrl}
            className="object-cover w-full h-[400px]"
            autoPlay
            loop
            muted
            title={post.title}
          />
        </>
      );
    }

    return null;
  };

  if (!post) return <div />;

  /* ============================================================
     RENDER PRINCIPAL
  ============================================================ */

    

     //CODIGO pARA RENDERIZAR VIDEO O IMAGEN, SEGUN SEA INCLUIDO EN EL ADMIN DE DJANGO
    




 //URL PARA LAS IMAGENES QUE ESTAN EN LA CARPETA MEDIA LOCALIZEN EN LA CARPETA DEL BACKEND
    if (!post) {
     return <div> </div>;
   }


   // 1. Añade esta función helper arriba del todo de tu archivo (fuera del componente)
  const quitarEtiquetasHTML = (textoString) => {
    if (!textoString) return '';
    // Esta expresión regular busca cualquier cosa entre < y > y la borra
    return textoString.replace(/<\/?[^>]+(>|$)/g, "");
  };



     

    return(

       
    <FullWidthLayout>

          
  
      <div className="wrapper w-full min-h-screen">

        <div className="flex lg:flex-row xl:flex-row 
        flex-col md:flex-col container-blogpost-tres-columnas  
        pt-[70px]">
        
        {/*COLUMNA LATERAL */}
      <div className="blogpost-column-1 hidden md:hidden lg:w-[12%] lg:block">
      </div>
      {/*FIN COLUMNA LATERAL */}

        {/*COLUMNA CENTRO */}
    <div className="blogpost-column-2 w-[100%] md:w-[100%] lg:w-[76%] max-auto">
        {/*POST DETAIL TITULO, DESCRIPTION, IMAGE, CONTENT*/}
       {
       post ?
            //CONTAINER DE CATEGORIA TITULO DESCRPITON
            //prose prose-indigo prose-lg 
       <div className="relative text-neutral-900 flex flex-col lg:w-[100%]">
              


              {/* TITULO*/}
          <div className="z-10 mx-auto lg:pt-12 lg:pb-4 pb-2 px-4 md:px-4">                     
              { /*span title sm:text-4xl*/}
                  <h1 className="kaushan blog-detail-title 
                  block tracking-wide text-center font-semibold 
                  tracking-tight text-neutral-900 lg:underline lg:underline-offset-8 
                  underline underline-offset-4
                  lg:text-3xl md:text-xl lg:leading-12 leading-8 md:leading-8">
                  
                  {quitarEtiquetasHTML(post.title)}
                  </h1>   
          </div>

              {/* EXCERPT*/}
          <div className=" z-10 max-w-lg max-w-prose mx-auto px-4 md:px-4">                     
              { /*span title sm:text-4xl*/}
                  <p className="roboto-condensed-muckas blog-detail-title 
                  block tracking-wide text-center font-normal tracking-tight 
                  text-neutral-700  lg:text-xl text-base mt-[20px]">
            
                  {quitarEtiquetasHTML(post.excerpt)}
                  </p>   
          </div>


            {/**PRIMERA IMAGEN IMAGEN IMAGEN IMAGEN IMAGEN IMAGEN IMAGEN */}
          <div className="flex  items-center justify-center mx-auto mt-[8px] ">
                {renderMedia()}
          </div>


          {/**CONTENIDO CONTENIDO CONTENIDO CONTENIDO  CONTENIDO CONTENIDO*/}

          <div className="flex flex-col lg:w-[100%] w-[100%] md:w-[100%] items-center lg:px-4  px-4 md:px-4">
              <h2 className="kaushan tracking-wide lg:text-2xl text-xl font-bold text-black mt-10">
                 Introducción
              </h2>

             {/*DESCRIPTION prose prose-indigo prose-lg*/}
             <p 
             className="roboto-condensed-muckas parrafo mt-6 text-black lg:text-lg  whitespace-pre-line
             [&_.blog-cta-banner]:bg-neutral-50 [&_.blog-cta-banner]:border-2 [&_.blog-cta-banner]:border-dashed [&_.blog-cta-banner]:border-purple-600 [&_.blog-cta-banner]:p-6 [&_.blog-cta-banner]:rounded-2xl [&_.blog-cta-banner]:text-center [&_.blog-cta-banner]:my-8
             [&_.banner-title]:text-lg [&_.banner-title]:font-bold [&_.banner-title]:text-neutral-900 [&_.banner-title]:m-0
             [&_.banner-text]:text-sm [&_.banner-text]:text-neutral-600 [&_.banner-text]:mb-4
             [&_.banner-button]:inline-block [&_.banner-button]:bg-purple-700 [&_.banner-button]:text-white [&_.banner-button]:px-6 [&_.banner-button]:py-2.5 [&_.banner-button]:rounded-xl [&_.banner-button]:font-bold [&_.banner-button]:no-underline [&_.banner-button]:text-sm
             [&_.table-container]:overflow-x-auto [&_.table-container]:my-4
             [&_table]:w-full [&_table]:text-left [&_table]:border-collapse [&_table]:border [&_table]:border-neutral-200 [&_table]:text-sm
             [&_th]:bg-neutral-100 [&_th]:p-3 [&_th]:border [&_th]:border-neutral-200 [&_th]:font-semibold
             [&_td]:p-3 [&_td]:border [&_td]:border-neutral-200
             [&_li]:mt-2 [&_li]:text-zinc-900 
             [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:tracking-tight
             [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:tracking-wide
             [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-purple-800 [&_h4]:mt-6 [&_h4]:mb-3 [&_h4]:tracking-wide
             [&_h5]:mt-2 [&_h5]:font-semibold [&_h5]:mb-2 [&_h5]:text-fuchsia-400
             [&_ul]:mt-2 [&_ul]:mb-4
             [&_ol]:mb-4
             [&_strong]:text-black [&_strong]:font-bold
             [&_pre]:bg-neutral-900 [&_pre]:text-neutral-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:shadow-sm
             [&_code]:font-mono [&_code]:bg-neutral-100 [&_code]:text-purple-700 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.9em] [&_pre_code]:bg-transparent [&_pre_code]:text-neutral-100 [&_pre_code]:p-0
             "
             >
             {quitarEtiquetasHTML(post.description)}
            </p>

            {/*imageUrl*/}


             
               {/**PRIMER CONTENT oswald-muckas parrafo*/}
              <section
              className="roboto-condensed-muckas mt-6 text-black lg:text-lg
              [&_.blog-cta-banner]:bg-neutral-50 [&_.blog-cta-banner]:border-2 [&_.blog-cta-banner]:border-dashed [&_.blog-cta-banner]:border-purple-600 [&_.blog-cta-banner]:p-6 [&_.blog-cta-banner]:rounded-2xl [&_.blog-cta-banner]:text-center [&_.blog-cta-banner]:my-8
              [&_.banner-title]:text-lg [&_.banner-title]:font-bold [&_.banner-title]:text-neutral-900 [&_.banner-title]:m-0
              [&_.banner-text]:text-sm [&_.banner-text]:text-neutral-600 [&_.banner-text]:mb-4
              [&_.banner-button]:inline-block [&_.banner-button]:bg-purple-700 [&_.banner-button]:text-white [&_.banner-button]:px-6 [&_.banner-button]:py-2.5 [&_.banner-button]:rounded-xl [&_.banner-button]:font-bold [&_.banner-button]:no-underline [&_.banner-button]:text-sm
              [&_.table-container]:overflow-x-auto [&_.table-container]:my-4
              [&_table]:w-full [&_table]:text-left [&_table]:border-collapse [&_table]:border [&_table]:border-neutral-200 [&_table]:text-sm
              [&_th]:bg-neutral-100 [&_th]:p-3 [&_th]:border [&_th]:border-neutral-200 [&_th]:font-semibold
              [&_td]:p-3 [&_td]:border [&_td]:border-neutral-200
              [&_li]:mt-2 [&_li]:text-zinc-900 
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:tracking-tight
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:tracking-wide
              [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-purple-800 [&_h4]:mt-6 [&_h4]:mb-3 [&_h4]:tracking-wide
              [&_h5]:mt-2 [&_h5]:font-semibold [&_h5]:mb-2 [&_h5]:text-fuchsia-400
               [&_ul]:mt-2 [&_ul]:mb-4
              [&_ol]:mb-4
              [&_strong]:text-black [&_strong]:font-bold
              [&_pre]:bg-neutral-900 [&_pre]:text-neutral-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:shadow-sm
              [&_code]:font-mono [&_code]:bg-neutral-100 [&_code]:text-purple-700 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.9em] [&_pre_code]:bg-transparent [&_pre_code]:text-neutral-100 [&_pre_code]:p-0
               "
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.narrative) }}
             />

                   

             {/**SEGUNDA IMAGEN */}
            <div className="flex items-center justify-center mt-6 lg:w-[400px] mx-auto ">
                {post.image && (
                <img
                  src={imageUrl}
                  alt={post.title}
                  loading="lazy"
                  className="w-full object-contain mt-6"
                  />
                 )}
            </div>


        

              {/* SEGUNDO CONTENT (Enriquecido con TinyMCE) */}
            <section
             className="roboto-condensed-muckas mt-6 text-black lg:text-lg 
          [&_.blog-cta-banner]:bg-neutral-50 [&_.blog-cta-banner]:border-2 [&_.blog-cta-banner]:border-dashed [&_.blog-cta-banner]:border-purple-600 [&_.blog-cta-banner]:p-6 [&_.blog-cta-banner]:rounded-2xl [&_.blog-cta-banner]:text-center [&_.blog-cta-banner]:my-8
          [&_.banner-title]:text-lg [&_.banner-title]:font-bold [&_.banner-title]:text-neutral-900 [&_.banner-title]:m-0
          [&_.banner-text]:text-sm [&_.banner-text]:text-neutral-600 [&_.banner-text]:mb-4
          [&_.banner-button]:inline-block [&_.banner-button]:bg-purple-700 [&_.banner-button]:text-white [&_.banner-button]:px-6 [&_.banner-button]:py-2.5 [&_.banner-button]:rounded-xl [&_.banner-button]:font-bold [&_.banner-button]:no-underline [&_.banner-button]:text-sm
          [&_.table-container]:overflow-x-auto [&_.table-container]:my-4
          [&_table]:w-full [&_table]:text-left [&_table]:border-collapse [&_table]:border [&_table]:border-neutral-200 [&_table]:text-sm
          [&_th]:bg-neutral-100 [&_th]:p-3 [&_th]:border [&_th]:border-neutral-200 [&_th]:font-semibold
          [&_td]:p-3 [&_td]:border [&_td]:border-neutral-200
          [&_li]:mt-2 [&_li]:text-zinc-900 
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:tracking-tight
          [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:tracking-wide
          [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-purple-800 [&_h4]:mt-6 [&_h4]:mb-3 [&_h4]:tracking-wide
          [&_h5]:mt-2 [&_h5]:font-semibold [&_h5]:mb-2 [&_h5]:text-fuchsia-400
          [&_ul]:mt-2 [&_ul]:mb-4
          [&_ol]:mb-4
          [&_strong]:text-black [&_strong]:font-bold
          [&_pre]:bg-neutral-900 [&_pre]:text-neutral-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:shadow-sm
          [&_code]:font-mono [&_code]:bg-neutral-100 [&_code]:text-purple-700 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.9em] [&_pre_code]:bg-transparent [&_pre_code]:text-neutral-100 [&_pre_code]:p-0
          "
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
             />
            {/*FIN SEGUNDO CONTENT*/}
          </div>




                       {/* Bloque de compartir emocional */}
           
            
             <div>
              {post?.title && (
               <div className="flex flex-col sm:flex-row 
               items-center justify-between gap-4 bg-zinc-50 
               rounded-xl p-4 border border-zinc-100 my-6">
                <div className="flex flex-col">
                  <p className="text-sm lg:text-base italic  font-semibold text-neutral-800 text-center sm:text-left">
                      ¿Te ha servido este artículo?
                      </p>
                        <p className="text-xs lg:text-base text-neutral-500 italic text-center sm:text-left mt-0.5">
                        Compártelo con otros desarrolladores y ayuda a crecer a la comunidad tech.
                         </p>
                </div>

                 {/* Tu botón corregido y optimizado */}
                <ShareButton 
                    title={`${post.title} | Blog Jovamna Medina`} 
                          text={`Te recomiendo este artículo sobre desarrollo web: "${post.title}"`} 
                        url={`https://jovamnamedina.com/blog/post/${post.slug}`} 
                        />
                         </div>
                      )}
                </div>







              
          
          
  
          
              {/**SOLO CATEGORIA */}
              {/*CATEGORIA*/}
              <div className="px-4">
                <p className="block text-xs font-mono text-orange-400 my-[10px] font-bold tracking-wide uppercase">
              {post.category.name}
              </p>
              </div>
              
              {/**FIN CATEGGORIA */}

                     
                <div className="border-t border-gray-200 my-6 " />
                     {/*AUHOR Y FECHA border-t-2 border-zinc-200*/}
               <div className='flex flex-row w-[100%] py-4 mx-auto px-4'>
               <div className='flex flex-row w-[68%] items-center '>
                  <img 
                  src={enviarlo}
                   width={50}
                   height={40}
                  alt={post.title}
                   className='rounded-full border border-zinc-400 px-[4px] py-[4px] ml-[9px] mr-[12px] outline outline-offset-2 outline-gray-400'
                   />    
                   <div className="flex flex-col">
                    <p className="oswald-muckas text-neutral-900 lg:text-lg  text-xs md:text-basefont-bold">
                    {post.author}
                  </p>
                  <p className="oswald-muckas text-neutral-900 lg:text-sm  text-xs md:text-base font-bold">
                     {new Date(post.published).toLocaleDateString("es-ES")}
                  </p> 

                   </div>
             





                 
               </div>



 


                <div className=' w-[16%] flex justify-end items-center '>
                     <p> 💛 {post.total_hearts}</p>
                </div>

                  <div className=' w-[16%] flex justify-end items-center '>   
                  <img 
                  src={vistas}
                  alt={post.title}
                  className=' w-[22px]  h-[14px] mr-[4px]'/>
                  <p className='mr-[4px]'> {post.views}</p>
                  </div> 


                  
 
                </div>



                

              {/**POSTS RELACIONADOS POST RELACIONADOS POST RELACIONADOS */}
                 <div className="lg:mt-[30px] mt-[18px] md:mt-[20px] px-4 md:px-4
                 md:w-[100%] lg:w-[100%] w-[100%] lg:mb-[20px] mb-[10px]">
                  {/* Mostrar título solo si hay relacionados */}
                  {post.related_products?.length > 0 && (
                  

                    <div className=" border-t border-neutral-800 py-4 ">
                      <h3 className="font-extrabold lg:text-lg 
                    text-black text-base">
                      Posts Relacionados
                      </h3>
                 

                      </div>
                    )}
                    {/* Listado de productos relacionados */}
                    {post.related_products.map((rp) => (
                      <div key={rp.slug} className="lg:mt-[2px] mt-[4px]">
                        <Link to={`/blog/post/${rp.slug}`}>
                        <h4 className="hover:underline cursor-pointer text-sm lg:text-base text-black">
                          - { rp.title}
                        </h4>
                        </Link>
                      </div>
                    ))}
                 </div>
                 {/**FIN PRODUCTOS RELACIONADOS */}







                  










               </div>

           
               :
               <LoadingCard/>
          }
            {/*FIN POST DETAIL TITULO, DESCRIPTION, IMAGE, CONTENT */}



           {/*REVIEWS */}
      
    
         <div className=" ">
           <FormReview postSlug={postSlug} />
         </div>





           <div>
            
           </div>





        
        
        </div>
        {/*FIN COLUMNA CENTRO */}
  

             {/*COLUMNA LATERAL */}
             <div className="blogpost-column-3 w-[100%] lg:w-[12%] ">
            
             </div>


        </div>

         </div>




        
       
      </FullWidthLayout>

    )
}




const mapStateToProps = state =>({
    post: state.blog.post,
    reviews: state.Reviews.reviews,
    alert:state.Alert.alert,
    
})

export default connect(mapStateToProps,{
    get_blog,
    get_reviews,
    setAlert,
})(PostDetail)


//INSTALE npm install dompurify

//npm audit
//npm prune
//npm outdated //para ver las librerias que necesitan actualizarlas
//npm update nombre-de-la-dependencia
//npm update  //actualiza todo
//npm uninstall bootstrap




//case GET_BLOG_SUCCESS:
    //return {
    //   ...state,
      //  pepita: payload // Guardamos los datos en una caja llamada 'pepita'
    //}


//const mapStateToProps = state => ({
//    post: state.blog.pepita 
//})




 {/*<div className="lg:mt-[30px] mt-[18px] md:mt-[20px] px-4 md:px-4
                 md:w-[100%] lg:w-[100%] w-[100%] lg:px-30">
                  {/* Mostrar título solo si hay relacionados */}
       //           {post.recent_posts?.length > 0 && (
       //             <h3 className="mb-[6px] lg:mb-[12px] font-bold lg:text-lg 
       //             text-black text-base underline underline-offset-2">
        //              Posts Recientes
        //              </h3>
       //             )}
                    {/* Listado de productos relacionados */}
       //             {post.recent_posts.map((rp) => (
       //               <div key={rp.slug} className="lg:mt-[2px] mt-[10px]">
        //                <Link to={`/blog/post/${rp.slug}`}>
        //                <h4 className="hover:underline cursor-pointer text-sm lg:text-base text-black">
       //                   - { rp.title}
       //                 </h4>
        //                </Link>
        //              </div>
       //             ))}
        //         </div>
///*/}


