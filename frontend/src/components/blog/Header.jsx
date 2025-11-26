import blogVid from "../../assets/img/portadas/blogVid.mp4";
import CategoriesBlogHeader from "./CategoriesBlogHeader";
import ResetPasswordSuccess from '../auth//ResetPasswordSuccess'; 
import React, { useState } from 'react';

function Header(){

    const [videoLoaded, setVideoLoaded] = useState(false);

const handleVideoLoad = () => {
  setVideoLoaded(true);
};

return (
  <>
    <div className={`portada-blog ${videoLoaded ? 'loaded' : ''} w-[100%] h-[500px] flex flex-col`}>
      <video
        autoPlay
        loop
        muted
        className={`portada-blog-video object-cover h-[100%] z-0 ${videoLoaded ? 'loaded' : ''}`}
        onLoadedData={handleVideoLoad}
      >
                <source 
                src={blogVid} 
                //src={`blogVideo#t=1,10`}
                type="video/mp4" 
                //autoPlay
                //loop
                //muted
                //duration="10" // Cambia este valor a la duración deseada en segundos
                 className="object-cover z-0 "
               
                />
                Your browser does not support the video tag.
            </video>



            
            <div className="error-message bg-opacity-50 bg-black text-white p-8 max-w-lg absolute inset-0 flex flex-col justify-center items-center z-10 h-[500px] ">

            <h1 className="text-4xl underline underline-offset-4 font-bold tracking-tight text-sans text-white pt-16 sm:text-6xl mb-2 text-center">
            Blog
            </h1>
            <p className="border-gray-300 border-2 text-white font-bold py-2 px-4 rounded">
            <a href="/" className="hover:text-gray-400">
            AI & Code Chronicles
            </a>
            </p>
            </div>
  
              </div>

         
</>

    );
}

export default Header