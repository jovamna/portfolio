import {Link} from "react-router-dom";
import DOMPurify from "dompurify";
import moment from "moment"



    const URL =
    process.env.NODE_ENV === "production"
     ? import.meta.env.VITE_REACT_API_URL
     : "http://localhost:8000";
 
    console.log(URL);



//FRONTEND SOLO DE LOS POSTS LIST , EL POST DETAIL(BlogPost) ES DIFERENTE A BlogCard
function BlogCard(data, category){
    let post = data && data.data;
    console.log(post)

    if (!post) {
      return <div>Cargando...</div>;
    }


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
          alt={`${post?.title|| 'Jovamna Medina Desarrolladora Full Stack en Django y React.'}`}
          loading="lazy"
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
          // responsive-altura-blogcard    
             //responsive-altura-img-blog 


      return (
              <>
              {post ? (
                     <div className="
                     flex lg:flex-col flex-row  hover:bg-white 
                     hover:opacity-90 opacity-100 border-b-2 border-zinc-200 
                     lg:py-2 py-2  w-[100%]">
                     
                        {/*1 CONTAINER DE IIMAGEN O VIDEO*/}
                        <div className=" aspect-video lg:w-full w-[50%] overflow-hidden">   
                           <Link 
                            to={`/blog/post/${post.slug}`} 
                            className="block">
                        {renderMedia()}
                        </Link>
                        </div>
                            


                         {/*2 CONTAINER DE TITULO EXRCEPT LEER MAS--*/}
                         <div className=" flex flex-col relative 
                         responsive-blogcard-title-excerpt lg:w-full 
                         w-[50%] lg:mt-[10px] ">

                              {/*POST TITULO  QUITAR SI SE QUIERE  oswald-muckas */}
                              
                          {/* POST TITULO (Corte inteligente con line-clamp: 2 líneas en móvil, libre en PC) */}
                          <Link to={`/blog/post/${post.slug}`} className="block w-full">
                             <h1 className="kaushan text-center font-bold text-black tracking-wider 
                              lg:text-lg text-xs sm:text-xl md:text-center line-clamp-2 lg:line-clamp-none px-6" 
                              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.title) }}>
                            </h1>  
                              </Link>


                              {/* POST TITULO (Corte inteligente con line-clamp: 2 líneas en móvil, libre en PC) */}
                        















                            
                          
                      {/*POST LA CATEGORIA */}
                 
                         {/*POST LA CATEGORIA */}
                    <div className="flex items-center justify-center w-full px-4">
                    <Link 
                     to={post.category.parent 
                     ? `/blog/${post.category.parent.slug}/${post.category.slug}`
                     : `/blog/${post.category.slug}`
                      } 
                    className="block w-full max-w-full text-center">
                   <span className="badge block w-full truncate text-[10px] sm:text-xs px-1 text-center">
                   {post.category.parent 
                   ? `${post.category.parent.name}` 
                    : `${post.category.name}`
                      }
                    </span>
                  </Link>
                      </div>
            
                                 {/*POST EXCERPT   PADDING IZQ Y DERECH px-4 PADDING BOTTOM pb-4*/}
                                 
                                  <Link to={`/blog/post/${post.slug}`} className="block ">
                             <p className="excerpt text-center font-light text-black tracking-wider 
                              lg:text-sm text-[0.7em] sm:text-sm md:text-center line-clamp-2 lg:line-clamp-none px-12" 
                              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt) }}>
                            </p>  
                              </Link>







                  
                       
                   
                                  <div className=" flex items-center justify-center">
                                    <Link 
                                    to={`/blog/post/${post.slug}`} 
                                    className="block"
                                    >
                                    <p className="lg:text-base kaushan text-[0.7em] 
                                    text-zinc-700 font-extrabold 
                                    hover:opacity-75">
                                      Leer mas
                                      </p>
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