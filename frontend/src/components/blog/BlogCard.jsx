import {Link} from "react-router-dom";
import DOMPurify from "dompurify";
import moment from "moment"



function classNames(...classes){
    return classes.filter(Boolean).join("");


}



//FRONTEND SOLO DE LOS POSTS LIST , EL POST DETAIL(BlogPost) ES DIFERENTE A BlogCard
function BlogCard(data){
    let post = data && data.data;
    console.log(post)

    if (!post) {
      return <div>Cargando...</div>;
    }

    const URL =
    process.env.NODE_ENV === "production"
     ? import.meta.env.VITE_REACT_API_URL
     : "http://localhost:8000";
 
    console.log(URL);

    const videoUrl = `${URL}${post.video}`;
    const thumbnailUrl = `${URL}${post.thumbnail}`;
  
    //*md:aspect-[4/3] /* iPad vertical */lg:aspect-[16/9] /* pantallas grandes */

  // Función para renderizar el componente de imagen o video
  const renderMedia = () => {
  // Solo IMAGEN
  if (post.thumbnail && !post.video) {
    return (
      <div className="w-full overflow-hidden aspect-[16/9] sm:aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9]">

        <img 
          src={thumbnailUrl}
          alt="post"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Solo VIDEO
  if (post.video && !post.thumbnail) {
    return (
      <div className="w-full aspect-video overflow-hidden bg-black">
        <video
          src={videoUrl}
          controls
          className="w-full h-full object-cover"
          onError={(e) => console.error("Error al cargar el video:", e.target.error)}
        />
      </div>
    );
  }

  // VIDEO + THUMBNAIL → prioriza el video
  if (post.thumbnail && post.video) {
    return (
      <div className="w-full aspect-video overflow-hidden bg-black">
        <video
          src={videoUrl}
          controls
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Nada
  return null;
};

          //FIN Función para renderizar el componente de imagen o video       
             


      return (
              <>
              {post ? (
                     <div className="responsive-altura-blogcard  flex lg:flex-col flex-row bg-neutral-300 hover:bg-gray-100 hover:opacity-90 opacity-100 border-b-2 border-zinc-300 lg:py-4 py-2">
                     
                        {/*1 CONTAINER DE IIMAGEN O VIDEO*/}
                        <div className=" responsive-altura-img-blog aspect-video lg:w-full w-[60%] overflow-hidden">   
                        {renderMedia()}
                        </div>
                            


                         {/*2 CONTAINER DE TITULO EXRCEPT LEER MAS--*/}
                         <div className=" flex flex-col relative responsive-blogcard-title-excerpt lg:w-full w-[40%] lg:mt-[10px] ">

                              {/*POST TITULO  QUITAR SI SE QUIERE  padding izq y derech px-4 */}
                              <Link 
                              to={`/blog/post/${post.slug}`} 
                              className="block px-2"
                              >
                               <h1 className=" oswald-muckas  text-center font-extrabold text-black dark:text-white tracking-wider lg:text-xl text-xs sm:text-xl  md:text-center" dangerouslySetInnerHTML={{
                                   __html:
                                  post.excerpt && DOMPurify.sanitize(post.title.length) > 50
                                    ? DOMPurify.sanitize(post.title.slice(0, 50)) 
                                    : post.title && DOMPurify.sanitize(post.title),
                                   }}>
                               {/*post.title*/}
                               </h1>  
                               </Link>

                            
                          
                                 {/*POST LA CATEGORIA */}
                                 <div className=" flex items-center justify-center ">
                                     <Link 
                                     to={`/categories/${post.category.slug}`} 
                                     className="inline-block"
                                     >

                                    
                                      <span className="lg:text-xs text-[0.5em]">
                                      {post.category.name}
                                      </span>

                                      </Link>
                                 </div>


            
                                 {/*POST EXCERPT   PADDING IZQ Y DERECH px-4 PADDING BOTTOM pb-4*/}
                                 <Link 
                                 to={`/blog/post/${post.slug}`} 
                                 className="block"
                                 >
                                 <p
                                  className="oswald-muckas excerpt  px-2 mt-2 text-[0.8em] dark:text-dark-txt text-center  text-neutral-700 tracking-wide font-light"
                                   dangerouslySetInnerHTML={{
                                   __html:
                                  post.excerpt && DOMPurify.sanitize(post.excerpt.length) > 50
                                    ? DOMPurify.sanitize(post.excerpt.slice(0, 50)) + "..."
                                    : post.excerpt && DOMPurify.sanitize(post.excerpt),
                                   }}
                                 />
                                  </Link>



                  
                       
                   
                                  <div className=" flex items-center justify-center">
                                    <Link 
                                    to={`/blog/post/${post.slug}`} 
                                    className="block"
                                    >
                                    <p className="lg:text-base kaushan text-[0.7em] text-zinc-700 font-extrabold hover:opacity-75">Leer mas</p>
                                   </Link>
                                  </div>
 
                         </div>
                           {/*FIN CONTAINER DE TITULO EXRCEPT LEER MAS--*/}




                         
                     </div>
                      







                      ) : (
                      <></>
                      )}
                    </>
                  );
    }
                  
export default BlogCard;




//USARLO PARA LIMITAR CARATERES Y PROBAR SI FUNCIONA
{/*<p>
{post && post.excerpt && (
  <>
    {console.log("Valor de post.excerpt:", post.excerpt)}
    {post.excerpt
      .split(' ')
      .slice(0, 20)
      .join(' ')}
  </>
)}
    </p>*/}