import { Link, NavLink } from "react-router-dom"
import { useEffect } from'react'

import moment from 'moment'
function BlogCardSearchUno({data,index}){
  console.log("BlogCardSearchUno Data: ", data);
  console.log("BlogCardSearchUno Data: ", index);
  //console.log("BlogCardSearchUno Term: ", term);

  const URL =
   process.env.NODE_ENV === "production"
     ? import.meta.env.VITE_REACT_API_URL
     : "http://localhost:8000";
 
   console.log(URL);

  const videoUrl = `${URL}${data.video}`;
  const thumbnailUrl = `${URL}${data.thumbnail}`;

    


    // Función para renderizar el componente de imagen o video
    const renderMedia = () => {
    
        if (data.thumbnail && !data.video) {
            return (
                   <div className="relative flex flex-col justify-center items-center ">
                   <span aria-hidden="true" className="absolute inset-x-0 bottom-0 w-2/3 bg-gradient-to-t from-gray-200 opacity-50" />
                   <img 
                   src={thumbnailUrl} 
                   alt="post" 
                   className="inset-0 object-cover z-0"/>
                   </div>
                   );
        } else if (data.video && !data.thumbnail){
          return <video 
                 src={videoUrl} 
                 controls width="100%" 
                 className="inset-0 object-cover z-0 "
                 onError={(e) => {
                   console.error("Error al cargar el video:", e.target.error);
                   }}
                 />;

        } else if (data.thumbnail && data.video) {
          return <video 
                 src={videoUrl} 
                 controls width="100%" 
                 className="bg-gray-200  inset-0 object-cover z-0  " 
                 />;

        } else {
                // Si no hay imagen ni video, no se muestra nada
                return null;
                }
                   
      };
          //FIN Función para renderizar el componente de imagen o video       
             
















    
    return(
        <li className="search  hover:bg-gray-100 border-b-2 border-neutral-200 ">
         
          <div className="card-search-imagen-description w-[100%] flex flex-row justify-between">
              {/*LADO LEFT IMAGEN*/}
              <div className="card-search-imagen w-[24%] h-[18%] py-4">
              {renderMedia()}
              </div>



              {/*LADO RIGHT, DESCRIPTION, TITLE, CATEGOROY */}
              <div className="card-search-description w-[68%] py-4">

              {/*TITULO */}
              <Link to={`/blog/post/${data.slug}`}
                onMouseEnter={()=>{
                    // const img = document.getElementById(index)
                    // img.classList.add('object-fill')
                    const title = document.getElementById(`title`+data.id)
                    title.classList.add('text-orange-500')
                }} 
                onMouseLeave={()=>{
                    // const img = document.getElementById(index)
                    // img.classList.remove('object-fill')
                    const title = document.getElementById(`title`+data.id)
                    title.classList.remove('text-orange-500')
                }}
            className="block transition duration-300 ease-in-out">


           <div className="flex items-center">
              <h1 
              id={`title`+data.id} 
              className="text-neutral-800 leading-10 text-2xl font-semibold transition duration-300 ease-in-out hover:text-orange-500 underline underline-offset-4 mb-2">
              {data.title.length > 80 ? data.title.slice(0,79):data.title}
              </h1>
           </div>
        </Link>

          

          {/*bloque category fecha etc*/}
          <div className="search-card-cat-date flex flex-row">      
            <span
           className={`${
           data.category.name === "Relatos"
          ? "bg-green-100 text-green-700 text-semibold"
          : data.category.name === "Machine Learning"
          ? "bg-rose-100 text-rose-700"
          : data.category.name === "Misterios"
          ? "bg-blue-100 text-blue-700 text-semibold"
          : data.category.name === "Inteligencia Artificial"
          ? "bg-blue-100 text-fuchsia-500 text-semibold"
          : data.category.name === "Diseño"
          ? "bg-yellow-100 text-yellow-700 text-semibold"
          : data.category.name === "Historietas"
          ? "bg-violet-100 text-violet-700 text-semibold"

          : "bg-gray-100 text-gray-700 hover:bg-green-200"
          } inline-flex  px-3 py-0.5 rounded-full  text-xs font-gilroy-medium tracking-wide`}
           >

          <NavLink to={`/blog/categories/${data.category.slug}`}>
          {data.category.name}
          </NavLink>
          </span>

         <span className="text-gray-300">
          &middot;
          </span> 
         <span className=" ml-2 mr-1 font-semibold text-gray-500 text-sm">{moment(data.published).format('LL')}
         </span> 
         <span className="text-gray-300">&middot;
         </span>
         <span className=" mx-2 font-medium text-gray-800 text-sm">{data.time_read} min read
         </span> 
          </div>



         {/*description */}
          <Link to={`/blog/post/${data.slug}`}>
            <p className="mt-4 text-lg font-mono text-zinc-800 leading-6 hover:text-gray-600">{data.description.length > 150 ? data.description.slice(0,149):data.description}
            </p>
          </Link>



      </div>
          

      </div>
           
  
                  
           
    </li>
    )
}
export default BlogCardSearchUno