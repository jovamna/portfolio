import LoadingCard from "../../../components/loaders/LoadingCard";
import FullWidthLayout from "../../../hocs/FullWidthLayout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
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
import vistas from '../../../assets/img/vistas.png';
import "../../../styles/index.css";
import { Helmet } from 'react-helmet-async';



function BlogPost({
    get_blog,
    post,
    get_reviews,
    setAlert,
    title
}){
    const params = useParams()
    const slug = params.slug



    useEffect(()=>{
        window.scrollTo(0,0)
        get_blog(slug)
        get_reviews(slug)   
    },[])

    //URL PARA LAS IMAGENES QUE ESTAN EN LA CARPETA MEDIA LOCALIZEN EN LA CARPETA DEL BACKEND
    if (!post) {
     return <div>Cargando...</div>;
   }

   const URL =
   process.env.NODE_ENV === "production"
     ? import.meta.env.VITE_REACT_API_URL
     : "http://localhost:8000";
 
   console.log(URL);

    // Construir las URL completas utilizando la URL base de tu aplicación React
    const imageUrl = `${URL}${post.image}`;
    const videoUrl = `${URL}${post.video}`;
    const thumbnailUrl = `${URL}${post.thumbnail}`;
    //FIN URL PARA LAS IMAGENES LOCALIZEN EN LA CARPETA BACKEND

 

    

     //CODIGO pARA RENDERIZAR VIDEO O IMAGEN, SEGUN SEA INCLUIDO EN EL ADMIN DE DJANGO
    const renderMedia = () => {
      if (post.thumbnail && !post.video) {
        return (
                 <div className="movil-portada-subcaja relative w-[100%] h-[400px] mb-4">
                 <img 
                 src={thumbnailUrl} 
                 alt="post"  
                 className="object-cover h-[100%] z-0"
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
                 <div className=" w-[100%] h-[400px] aspect-w-1 aspect-h-1 lg:[66%] lg:aspect-none rounded-md overflow-hidden group-hover:opacity-75 bg-gray-200  movil-portada-subcaja">
                     <img 
                     src={thumbnailUrl} 
                     alt="post"  
                     className="object-cover h-[100%] inset-0 z-0"
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



     

    return(

       
    <FullWidthLayout>

          <Helmet>
          {
          post ?
          <title>                  
          {post.title} | Portafolio, Blog | Jovamna Medina
          </title>
            :
          <LoadingCard/>
          }
           </Helmet>





            {/*PORTADA DEL POST DETAIL*/}
            {
            post ?
              <div className="movil-portada relative pt-12 fullscreen-bg inset-0 object-cover z-0 relative mb-4">
                {renderMedia()}
              </div>

               :
              <LoadingCard/>
             }
          
          {/*FIN DE LA PORTADA DEL POST DETAIL*/}

          

          









  


    <div className="container-blogpost-tres-columnas px-8">

        {/*COLUMNA LATERAL */}
        <div className="blogpost-column-1 ">
        </div>
        {/*FIN COLUMNA LATERAL */}



        {/*COLUMNA CENTRO */}
        <div className="blogpost-column-2">
        {/*POST DETAIL TITULO, DESCRIPTION, IMAGE, CONTENT*/}
        {
          post ?

          
            //CONTAINER DE CATEGORIA TITULO DESCRPITON
            //prose prose-indigo prose-lg 
            <div className="movil-redaccion-blog-post relative text-gray-500 mx-auto font-gilroy-regular">
              {/*CATEGORIA*/}
              <span className="block text-xs font-mono text-orange-400 text-center font-bold tracking-wide uppercase">
              {post.category.name}
              </span>


              {/* TITULO*/}
              <div className=" z-10 max-w-lg max-w-prose mx-auto">                     
              { /*span title sm:text-4xl*/}
                  <h1 className="blog-detail-title block font-mono text-center font-semibold tracking-tight text-gray-900 underline underline-offset-4 text-5xl leading-tight">
                  {post.excerpt}
                  </h1>   
              </div>


               
            {/*DESCRIPTION*/}
            <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto font-gilroy-regular">
                <p className="dangerouslySetInnerHTML={{ __html: richTextFieldContent }">
                {post.description}
                </p>
            </div>
            {/*imageUrl*/}
                   


            <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto font-gilroy-regular bg-red-500">
                {post.image && (
                <img
                  src={imageUrl}
                  width={700}
                  height={300}
                  alt={post.title}
                  className=""
                  />
                 )}
            </div>


              {/*CONTENT Y HEART*/}
              <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto font-gilroy-regular ">
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content)}} />
              </div>


          
                     
                     {/*autor border-t-2 border-zinc-200*/}
               <div className='flex flex-row w-[100%] py-4 mx-auto bg-neutral-100'>
               <div className='flex flex-row w-[68%] items-center '>
                  <img 
                  src={autorblog}
                   width={50}
                   height={40}
                   className='rounded-full border border-zinc-400 px-[4px] py-[4px] ml-[9px] mr-[12px] outline outline-offset-2 outline-gray-400'
                   />    
                   <p className="font-gilroy-regular text-neutral-950 text-base font-bold">
                    {post.author}
                  </p>
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
             <div className="blogpost-column-3 px-2 ">
            
             </div>


        </div>





        <Top/>
       
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

