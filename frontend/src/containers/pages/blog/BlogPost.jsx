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
import { Link, useParams} from "react-router-dom";



// 2. CONFIGURACIÓN GLOBAL (Fuera de la función)
const API_URL = import.meta.env.DEV 
  ? "http://localhost:8000" 
  : import.meta.env.VITE_REACT_API_URL;


 const URL =
   process.env.NODE_ENV === "production"
     ? import.meta.env.VITE_REACT_API_URL
     : "http://localhost:8000";
 
   console.log(URL);


function BlogPost({
    get_blog,
    post,
    get_reviews,
    setAlert,
    title,
    currentPost,
    allPosts
}){
    const params = useParams()
    const slug = params.slug
    //const { slug } = params;


    // 3. HOOKS DE ESTADO Y EFECTO
    useEffect(()=>{
        window.scrollTo(0,0)
        get_blog(slug)
        get_reviews(slug)   
    },[slug])




  

    
{/**SEO */}

useEffect(() => {
    if (post) {
      // 1. Título con palabras clave (Keywords)
      document.title = `${post.title} | | Blog de Desarrollo Web | Jovamna Medina`;

      // 2. Descripción técnica para Google
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      // Combinamos el título del post con tus habilidades principales
       metaDescription.content = `${post.excerpt || post.title}. Aprende desarrollo web con Django, React y buenas prácticas Full Stack.`;
   


      // 3. Meta tags: Open Graph y Twitter
      const metaTags = [
        { property: 'og:title', content: `${post.title} | Blog de Desarrollo Web` },
        { property: 'og:description', content: post.excerpt || post.title },
        { property: 'og:image', content: post.image || 'https://www.jovamnamedina.com/og-image-tech.png' },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: `https://www.jovamnamedina.com/blog/post/${post.slug}` },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${post.title} | Jovamna Medina` },
        { name: 'twitter:description', content: post.excerpt || post.title },
        { name: 'twitter:image', content: post.image },
        { name: 'twitter:label1', content: 'Tech Stack' },
        { name: 'twitter:data1', content: 'Django, React, Redux, PostgreSQL' }
      ];





      metaTags.forEach(({ property, name, content }) => {
      const selector = property
        ? `meta[property="${property}"]`
        : `meta[name="${name}"]`;

      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement("meta");
        if (property) tag.setAttribute("property", property);
        if (name) tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });

      // 4. JSON-LD (Esto le fascina a Google)
      let scriptJsonLd = document.querySelector('script[data-schema="blog-post"]');
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
        description: post.excerpt,
        image: post.image ? `${URL}${post.image}` : undefined,
        datePublished: post.published,
        dateModified: post.updated || post.published,
        author: {
          '@type': 'Person',
          name: 'Jovamna Medina',
          jobTitle: 'Full Stack Developer',
          knowsAbout: ['Django', 'React', 'Redux', 'Python', 'JavaScript', 'SQL']
        },
        publisher: {
          '@type': 'Organization',
          name: 'Jovamna Medina Dev',
          logo: {
            '@type': 'ImageObject',
             url: 'https://www.jovamnamedina.com/logo.png'
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.jovamnamedina.com/blog/post/${post.slug}`
          },
          keywords: post.category?.name,
          articleBody: post.content
        });


    
    }
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
          alt={post.title}
          loading="lazy"
          className="object-contain w-full"
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
            className="object-contain w-full mb-4"
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




     

    return(

       
    <FullWidthLayout>

            {/*PORTADA DEL POST DETAIL fullscreen-bg inset-0 object-cover*/}
            {/*
            post ?
              <div className="movil-portada relative pt-12  z-0 relative mb-4">
                {renderMedia()}
              </div>

               :
              <LoadingCard/>
             */}
          
          {/*FIN DE LA PORTADA DEL POST DETAIL*/}

          

  
           <div className="wrapper w-full min-h-screen">


        <div className="flex lg:flex-row xl:flex-row flex-col container-blogpost-tres-columnas px-2 pt-[70px]">
        

        {/*COLUMNA LATERAL */}
        <div className="blogpost-column-1 w-[100%] lg:w-[18%]">
        </div>
        {/*FIN COLUMNA LATERAL */}



        {/*COLUMNA CENTRO */}
        <div className="blogpost-column-2 w-[100%] lg-[64%] px-0">
        {/*POST DETAIL TITULO, DESCRIPTION, IMAGE, CONTENT*/}
        {
          post ?
            //CONTAINER DE CATEGORIA TITULO DESCRPITON
            //prose prose-indigo prose-lg 
            <div className="movil-redaccion-blog-post relative text-neutral-900  mx-auto ">
              


              {/* TITULO*/}
              <div className=" z-10 max-w-lg max-w-prose mx-auto">                     
              { /*span title sm:text-4xl*/}
                  <h1 className="kaushan blog-detail-title block tracking-wide text-center font-semibold tracking-tight text-neutral-900 underline underline-offset-8 lg:text-5xl leading-tight">
                  {post.title}
                  </h1>   
              </div>

              {/* EXCERPT*/}
              <div className=" z-10 max-w-lg max-w-prose mx-auto">                     
              { /*span title sm:text-4xl*/}
                  <p className="kaushan blog-detail-title block tracking-wide text-center font-normal tracking-tight text-neutral-700  lg:text-xl text-base mt-[20px]">
                  {post.excerpt}
                  </p>   
              </div>


                 {/**PRIMERA IMAGEN */}
              <div className="flex  items-center justify-center mx-auto mt-[8px]">
                {renderMedia()}
              </div>


              <h2 className="oswald-muckas text-xl font-semibold mt-10">
                 Introducción
              </h2>

            {/*DESCRIPTION prose prose-indigo prose-lg*/}
            <p className="oswald-muckas parrafo mt-6 text-black lg:text-lg  whitespace-pre-line">
              {post.description}
           </p>

            {/*imageUrl*/}


             
               {/**PRIMER CONTENT */}
              <section
              className="oswald-muckas parrafo mt-6 text-black lg:text-lg"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.narrative) }}
           />

                   

             {/**SEGUNDA IMAGEN */}
            <div className="flex items-center justify-center mt-6 lg:[700px] mx-auto ">
                {post.image && (
                <img
                  src={imageUrl}
                  alt={post.title}
                  loading="lazy"
                  className="w-full object-contain mt-6"
                  />
                 )}
            </div>


              {/*SEGUNDO CONTENT*/}

             <section
              className="oswald-muckas parrafo mt-6  text-black lg:text-lg"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              />

              {/**POSTS RELACIONADOS */}
                 <div className="lg:mt-[2px] md:w-[100%] lg:w-[100%] w-[100%]">
                  {/* Mostrar título solo si hay relacionados */}
                  {post.related_products?.length > 0 && (
                    <h3 className="oswald-muckas mb-[4px] font-semibold lg:text-lg text-black text-base underline underline-offset-8">
                      Posts relacionados
                      </h3>
                    )}
                    {/* Listado de productos relacionados */}
                    {post.related_products.map((rp) => (
                      <div key={rp.slug} className="lg:mt-[20px] mt-[10px]">
                        <Link to={`/blog/post/${rp.slug}`}>
                        <h4 className="hover:underline cursor-pointer text-sm lg:text-sm text-black">
                          - { rp.title}
                        </h4>
                        </Link>
                      </div>
                    ))}
                 </div>
                 {/**FIN PRODUCTOS RELACIONADOS */}





              {/*CATEGORIA*/}
              <p className="block text-xs font-mono text-orange-400 text-center my-[50px] font-bold tracking-wide uppercase">
              {post.category.name}
              </p>

          
                     
                     {/*AUHOR Y FECHA border-t-2 border-zinc-200*/}
               <div className='flex flex-row w-[100%] py-4 mx-auto bg-neutral-100'>
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
                  






               </div>

           
               :
               <LoadingCard/>
          }
            {/*FIN POST DETAIL TITULO, DESCRIPTION, IMAGE, CONTENT */}



           {/*REVIEWS */}
           <div className=" ">
            <FormReview/>
           </div>

             </div>
              {/*FIN COLUMNA CENTRO */}
  

             {/*COLUMNA LATERAL */}
             <div className="blogpost-column-3 w-[100%] lg:w-[18%] ">
            
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
})(BlogPost)


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
