import Language from "../modelUno/LanguagesSkillUno";
//import pythImage  from '../../../assets/img/languages/pyth.png';
import React from 'react';  // Asegúrate de importar React si no lo has hecho ya

//FOTOS DE  software development, web, alguna de data ciencia
const languageInformations= {
    "python": {
        imageUrl: "./images/hard_skills/languages/pyth.png",
        //imageUrl:pythImage,
        name: "Python",
        color: "#3572a5",
        link: "https://en.wikipedia.org/wiki/Python_(programming_language)",
        logoUrl: "./images/hard_skills/languages/pyt.png",
        tabs: ["Software Development", "Data Science"],
        level: 2,
    },
    
    "javascript": {
        name: "Javascript",
        imageUrl: "./images/hard_skills/languages/javaAgencia.png",
        color: "#f1e05a",
        link: "https://en.wikipedia.org/wiki/JavaScript",
        logoUrl: "./images/hard_skills/languages/java-blanco-fijo.png",
        tabs: ["Software Development", "Web"],
        level: 2,
    },
    "typescript": {
        name: "Typescript",
        color: "#2b7489",
        imageUrl: "./images/hard_skills/languages/typescript.png",
        link: "https://en.wikipedia.org/wiki/TypeScript",
        logoUrl: "./images/hard_skills/languages/type-f.png",
        tabs: ["Software Development", "Web"],
        level: 1,
    },
    
    "html": {
        name: "HTML",
        color: "#e34c26",
        imageUrl: "./images/hard_skills/languages/html.png",
        link: "https://en.wikipedia.org/wiki/HTML",
        logoUrl: "/images/hard_skills/languages/ml.png",
        tabs: ["Software Development", "Web"],
        level: 3,
    },
    "css": {
        name: "CSS",
        color: "#563d7c",
        imageUrl: "./images/hard_skills/languages/css.png",
        link: "https://en.wikipedia.org/wiki/CSS",
        logoUrl: "./images/hard_skills/languages/c.png",
        tabs: ["Software Development", "Web"],
        level: 2,
    },
    
    "tailwind": {
        name: "Tailwind css",
        color: "#563d7c",
        imageUrl: "./images/hard_skills/languages/tailwind-fijo.png",
        link: "https://en.wikipedia.org/wiki/CSS",
        logoUrl: "./images/hard_skills/languages/tail.png",
        tabs: ["Software Development", "Web"],
        level: 2,
    },
    
    

    
    "sql": {
        name: "SQL",
        color: "#ffffff",
        link: "https://en.wikipedia.org/wiki/SQL",
        logoUrl: "./images/hard_skills/languages/sql-blanco-fij.png",
        imageUrl: "./images/hard_skills/languages/sql.png",
        tabs: ["Software Development", "Databases"],
        level: 2,
    },
   
};

export default languageInformations;



