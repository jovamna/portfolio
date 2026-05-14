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
        <div className={` ${videoLoaded ? 'loaded' : ''} w-[100%] h-[390px] sm:h-[590px] md:h-[650px]
               lg:h-[600px]
               2xl:h-[800px] 2xl:w-[100%] overflow-hidden lg:w-[100%] flex flex-row`}>



         

            
            <div className=" bg-opacity-50 bg-black text-white p-8 w-[40%] inset-0 flex flex-col justify-center items-center z-10 ">

            <h1 className="text-4xl underline underline-offset-4 font-bold tracking-tight text-sans text-white pt-16 sm:text-6xl mb-2 text-center">
            Blog
            </h1>
            <p className="border-gray-300 border-2 text-white font-bold py-2 px-4 rounded">
            <a href="/" className="hover:text-gray-400">
            AI & Code Chronicles
            </a>
            </p>
            </div>

       <div className="w-[60%]">
         <video
        autoPlay
        loop
        muted
        className={` w-full h-full object-cover z-0 ${videoLoaded ? 'loaded' : ''}`}
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



       </div>
              

  
        </div>

         
    </>

    );
 }

export default Header