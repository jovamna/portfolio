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
      document.title = `${post.title} | Jovamna Medina - Full Stack Django & React`;

      // 2. Descripción técnica para Google
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      // Combinamos el título del post con tus habilidades principales
      metaDescription.content = `${post.title}. Articulo de Jovamna Medina, Full Stack Developer experta en Django, React y Redux.`;

      // 3. Meta tags: Open Graph y Twitter
      const metaTags = [
        { property: 'og:title', content: `${post.title} | Jovamna Medina - Dev Django/React` },
        { property: 'og:description', content: `Explora este post de Jovamna Medina, especialista en desarrollo Full Stack con Django, React y Redux.` },
        { property: 'og:image', content: post.image || 'https://www.jovamnamedina.com/og-image-tech.png' },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:label1', content: 'Tech Stack' }, // Dato extra para Twitter
        { name: 'twitter:data1', content: 'Django, React, Redux, PostgreSQL' }
      ];

      metaTags.forEach(({ property, name, content }) => {
        const attribute = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
        let metaTag = document.querySelector(attribute);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          if (property) metaTag.setAttribute('property', property);
          if (name) metaTag.setAttribute('name', name);
          document.head.appendChild(metaTag);
        }
        metaTag.content = content || '';
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
        'headline': post.title,
        'author': {
          '@type': 'Person',
          'name': 'Jovamna Medina',
          'jobTitle': 'Full Stack Developer',
          'knowsAbout': ['Django', 'React', 'Redux', 'Python', 'JavaScript', 'SQL'] // <-- ¡Esto es SEO puro!
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Jovamna Medina Dev',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://www.jovamnamedina.com/logo.png'
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://www.jovamnamedina.com/blog/post/${post.slug}`
        }
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

 

    

     //CODIGO pARA RENDERIZAR VIDEO O IMAGEN, SEGUN SEA INCLUIDO EN EL ADMIN DE DJANGO
    const renderMedia = () => {
      if (post.thumbnail && !post.video) {
        return (
                 <div className="movil-portada-subcaja lg:w-full ">
                 <img 
                 src={thumbnailUrl} 
                 
                 alt="post"  
                 className="object-contain w-[100%]"
                 />
                 </div>
               );



        } else if (post.video && !post.thumbnail) {
          // Renderizar el componente de video aquí
          // Reemplaza 'video' con la propiedad de video en tu objeto 'post'
          // Por ejemplo, si el video está almacenado en post.video_url:
          return (
            <div className=" w-[100%] h-[400px] mb-4">
                 <video
                 className="object-cover h-[100%] z-0 movil-video-portada"
                 src={videoUrl}
                 controlsList="nodownload nofullscreen" // Ocultar botón de reproducción
                 width="100%"
                 type="video/mp4"
                 autoPlay
                 loop
                 muted
                 duration="10" // Cambia este valor a la duración deseada en segundos
                 onError={(e) => {
                 console.error("Error al cargar el video:", e.target.error);
                 }}
                />
                </div>
                );


        } else if (post.thumbnail && post.video) {
          // Ambos están presentes, decide cuál mostrar o muestra ambos
          // Aquí se muestra solo el video, pero puedes cambiar el orden o mostrar ambos si lo deseas
          return (
                 <>
                 <div className=" w-[100%]  aspect-w-1 aspect-h-1 lg:[100%] lg:aspect-none rounded-md overflow-hidden group-hover:opacity-75 movil-portada-subcaja">
                     <img 
                     src={thumbnailUrl} 
                     alt="post"  
                     className="object-contain w-[100%] inset-0 z-0"
                     />
                 </div>

                 <div className=" w-[100%] h-[400px] mb-4">
                 <video
                 className="object-cover h-[100%] inset-0 z-0 movil-video-portada"
                 src={videoUrl}
                 controlsList="nodownload nofullscreen" // Ocultar botón de reproducción
                 width="100%"
                 type="video/mp4"
                 autoPlay
                 loop
                 muted
                 duration="10" // Cambia este valor a la duración deseada en segundos
                 />
                 </div>
                 </>
                 );


        } else {
                // Si no hay imagen ni video, no se muestra nada
                return null;
               }
    };





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
            <div className="movil-redaccion-blog-post relative text-gray-500 mx-auto font-gilroy-regular">
              


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
                  <h2 className="kaushan blog-detail-title block tracking-wide text-center font-normal tracking-tight text-neutral-700  lg:text-xl text-base mt-[20px]">
                  {post.excerpt}
                  </h2>   
              </div>


                 {/**PRIMERA IMAGEN */}
              <div className="flex  items-center justify-center mx-auto mt-[8px]">
                {renderMedia()}
              </div>


    
            {/*DESCRIPTION prose prose-indigo prose-lg*/}
            <div className="oswald-muckas parrafo mt-6 text-black lg:text-lg  whitespace-pre-line">
              {post.description}
           </div>

            {/*imageUrl*/}


             
               {/**PRIMER CONTENT */}
              <div
              className="oswald-muckas parrafo mt-6 text-black lg:text-lg"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.narrative) }}
           />

                   

             {/**SEGUNDA IMAGEN */}
            <div className="flex items-center justify-center mt-6 lg:[700px] mx-auto ">
                {post.image && (
                <img
                  src={imageUrl}
                  
                  alt={post.title}
                  className="w-[100%] object-contain"
                  />
                 )}
            </div>


              {/*SEGUNDO CONTENT*/}

             <div
              className="oswald-muckas parrafo mt-6  text-black lg:text-lg"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
           />

              {/**PRODUCTOS RELACIONADOS */}
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
              <span className="block text-xs font-mono text-orange-400 text-center my-[50px] font-bold tracking-wide uppercase">
              {post.category.name}
              </span>

          
                     
                     {/*AUHOR Y FECHA border-t-2 border-zinc-200*/}
               <div className='flex flex-row w-[100%] py-4 mx-auto bg-neutral-100'>
               <div className='flex flex-row w-[68%] items-center '>
                  <img 
                  src={enviarlo}
                   width={50}
                   height={40}
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
                  className=' w-[22px]  h-[14px] mr-[4px]'
                  />
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
