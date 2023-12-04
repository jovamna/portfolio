
import React from 'react';
import "../../styles/index.css";
import jova from "../../assets/img/logo/jova.png";


const Logo= () => {
  return (
    


<div className="logo-container fade-in-entry ">
     
     <img className="logo-init-img" src={jova} width={240}  height={240} alt="Logo" /> <h2 className='portfolio-init text-3xl text-bold '>Portafolio </h2> 
   </div>
  

  );
};

export default Logo;
