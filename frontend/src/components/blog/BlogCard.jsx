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
  


    


    // Función para renderizar el componente de imagen o video
    const renderMedia = () => {
    
        if (post.thumbnail && !post.video) {
            return (
                   <div className="blog-image relative flex flex-col justify-center items-center h-[40vh] h-[40%] ">
                   {/* <div className="img-blog w-full min-h-60 lg:h-60 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">*/}
                   <span aria-hidden="true" className="absolute inset-x-0 bottom-0 w-2/3 bg-gradient-to-t from-gray-200 opacity-50" />
                   <img src={thumbnailUrl} 
                   alt="post" 
                   className="w-[100%] h-[40vh] inset-0 object-cover z-0 "/>
                   </div>
                   );
        } else if (post.video&& !post.thumbnail) {//para el border radious de izquierda y derecha del top className="rounded-t-2xl"
          return <div className="bg-green-400 h-[55%]"  >
               <video 
                 src={videoUrl} 
                 controls width="100%" 
                 //height="auto" 
                 className="blog-image w-[100%] h-[40vh]  inset-0 object-cover z-0 "
                 onError={(e) => {
                   console.error("Error al cargar el video:", e.target.error);
                   }}
                 />;

          </div>
       

        } else if (post.thumbnail && post.video) {

          return <div className="bg-green-400 h-[55%] ">
             <video 
                 src={videoUrl} 
                 controls width="100%" 
                 //height="auto" 
                 className="blog-image bg-gray-200  w-[100%] h-[40vh] inset-0 object-cover z-0 " 
                 />;


          </div>
         

        } else {
                // Si no hay imagen ni video, no se muestra nada
                return null;
                }
                   
      };
          //FIN Función para renderizar el componente de imagen o video       
             


      return (
              <>
              {post ? (
                     <div className="responsive-altura-blogcard h-[100%] flex flex-col hover:bg-gray-100 hover:opacity-90 opacity-100 border-b-2 border-zinc-300">
                     
                        {/*1 CONTAINER DE IIMAGEN O VIDEO*/}
                        <div className="responsive-altura-img-blog h-[55%]">   
                        {renderMedia()}
                        </div>
                            


                         {/*2 CONTAINER DE TITULO EXRCEPT LEER MAS--*/}
                         <div className="relative responsive-blogcard-title-excerpt h-[38%] ">

                              {/*POST TITULO  QUITAR SI SE QUIERE  padding izq y derech px-4 */}
                              <Link 
                              to={`/blog/post/${post.slug}`} 
                              className="block px-2"
                              >
                               <h1 className="text-center font-extrabold text-gray-900 dark:text-white tracking-tight text-xl sm:text-xl  md:text-center" dangerouslySetInnerHTML={{
                                   __html:
                                  post.excerpt && DOMPurify.sanitize(post.title.length) > 50
                                    ? DOMPurify.sanitize(post.title.slice(0, 50)) 
                                    : post.title && DOMPurify.sanitize(post.title),
                                   }}>
                               {/*post.title*/}
                               </h1>  
                               </Link>

                            
                          
                                 {/*POST LA CATEGORIA */}
                                 <div className=" flex items-center justify-center">
                                     <Link 
                                     to={`/categories/${post.category.slug}`} 
                                     className="inline-block"
                                     >

                                     {/*QUITAR SI SE QUIERE  padding izq y derech px-3 py-0.5*/}
                                     <span
                                     className={`${
                                      post.category.name === "Relatos"
                                      ? "bg-green-100 text-green-700"
                                      : post.category.name === "Machine Learning"
                                      ? "bg-rose-100 text-rose-700"
                                      : post.category.name === "Misterios"
                                      ? "bg-blue-100 text-blue-700"
                                      : post.category.name === "Inteligencia Artificial"
                                      ? "bg-blue-100 text-fuchsia-500"
                                      : post.category.name === "Diseño"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : post.category.name === "Historietas"
                                      ? "bg-violet-100 text-violet-700"

                                      : "bg-gray-100 text-gray-700 hover:bg-green-200"
                                      } inline-flex  px-3 py-0.5 rounded-full  text-xs font-gilroy-medium tracking-wide`}
                                       >
                                      {post.category.name}
                                      </span>

                                      </Link>
                                 </div>


            
                                 {/*POST EXCERPT   PADDING IZQ Y DERECH px-4 PADDING BOTTOM pb-4*/}
                                 <Link 
                                 to={`/blog/post/${post.slug}`} 
                                 className="block"
                                 >
                                 <div
                                  className="px-2 mt-2 text-sm dark:text-dark-txt text-center  text-zinc-700 tracking-wide font-light"
                                   dangerouslySetInnerHTML={{
                                   __html:
                                  post.excerpt && DOMPurify.sanitize(post.excerpt.length) > 80
                                    ? DOMPurify.sanitize(post.excerpt.slice(0, 80)) + "..."
                                    : post.excerpt && DOMPurify.sanitize(post.excerpt),
                                   }}
                                 />
                                  </Link>
                  
                       
                   
                                  <div className=" flex items-center justify-center pb-4">
                                    <Link 
                                    to={`/blog/post/${post.slug}`} 
                                    className="block"
                                    >
                                    <p className="text-xs text-zinc-500 italic hover:opacity-75">Leer mas</p>
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