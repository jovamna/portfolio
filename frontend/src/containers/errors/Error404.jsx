
import React from 'react';
import error from "../../assets/img/error.jpg";



      

function Error404(){
    return (
        <div className="fullscreen-bg relative h-screen">
        <img src={error} alt="Error 404"
        className="absolute inset-0 w-full h-full object-cover z-0" />
            <div className="error-message bg-opacity-50 bg-black text-white p-8 max-w-lg absolute inset-0 flex flex-col justify-center items-center z-10">
                <p className="text-3xl font-bold mb-2text-center">Sorry, page not found.</p>
                <button className=" border-gray-300 border-2 text-white font-bold py-2 px-4 rounded">
                <a href = "/" className ="hover:text-gray-400 " >
                    Go back to Home
                    </a>
                </button>
            </div>

        </div>
    );
};

export default Error404







{ /*  <div className="w-full flex flex-row bg-orange-400">*/}
                   


{/* <div className="flex flex-col items-center  w-2/5">
     <h1 className="text-4xl font-extrabold font-sans  mt-60">
     Sorry, page not found.
     </h1>


     <button className="px-4 py-2 mt-4 border-gray-300 border-2 text-white rounded-md hover:bg-neutral-500 font-semibold "> 
     <a href = "/" className ="hover:bg-grey-300 " >
     Go back to Home
     </a>
       
     </button>
</div>*/}





