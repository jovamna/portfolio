import React from 'react';  // Asegúrate de importar React si no lo has hecho ya
import languageInformations from "./languagesDataDos";
import { getOnlySkillsOrLanguagesByKey, SkillOrLanguage } from "../modelUno/SkillOrLanguage";



//INCLUDE ICONS FROM LANGUAGES DATA IN HARDSKILLDATA
const hardSkillData= [


    // LANGUAGE SOFTWARE DEVELOPMENT
    ...getOnlySkillsOrLanguagesByKey([
        "python",
        "html", "css", "javascript",  "typescript", "tailwind",
        "sql", 
    ], languageInformations),

    // quantum libraries
    

    // DATA CIENCIA libraries
    {
        name: "Pandas",
        imageUrl: "/images/hard_skills/data_science_libraries/panda-tres-c.png",
        link: "https://pandas.pydata.org/",
        logoUrl: "/images/hard_skills/data_science_libraries/pandas.webp",
        tabs: ["Data Science"],
        level: 1,
    },
    {
        name: "Matplotlib",
        imageUrl: "/images/hard_skills/data_science_libraries/matplolib.png",
 
        link: "https://matplotlib.org/",
        logoUrl: "/images/hard_skills/data_science_libraries/matplotlib.webp",
        tabs: ["Data Science"],
        level: 1,
    },
    {
        name: "Numpy",
        imageUrl: "/images/hard_skills/data_science_libraries/numpy-fijo.png",
        link: "https://matplotlib.org/",
        //logoUrl: "/images/hard_skills/data_science_libraries/numpy.svg",
        logoUrl: "/images/hard_skills/data_science_libraries/numpy-blanco.png",
        tabs: ["Data Science"],
        level: 1,
    },
    {
        name: "Scikit-learn",
        imageUrl: "/images/hard_skills/data_science_libraries/scikit-fijo.png",
        link: "https://matplotlib.org/",
        logoUrl: "/images/hard_skills/data_science_libraries/scikit-learn.webp",
        tabs: ["Data Science"],
        level: 1,
    },
    
   

    
   

    
   

    // computer graphics
    
    

    // DATABASE FOTOS
    {    
        name: "MySql",
        imageUrl: "/images/hard_skills/databases/mysql-fij.png",
        link: "https://mariadb.org/",
        //logoUrl: "/images/hard_skills/databases/mariadb.svg",
        logoUrl: "/images/hard_skills/databases/msql-b.png",
        tabs: ["Databases"],
        level: 2,
    },
    {
        name: "PostgreSQL",
        link: "https://www.postgresql.org/",
        imageUrl: "/images/hard_skills/databases/postgres.png",
        logoUrl: "/images/hard_skills/databases/postgresql.webp",
        tabs: ["Databases"],
        level: 2,
    },
    {
        name: "MongoDB",
        imageUrl: "/images/hard_skills/databases/mongo.png",
        link: "https://www.mongodb.com/",
        logoUrl: "/images/hard_skills/databases/mongodb.webp",

        tabs: ["Databases"],
        level: 2,
    },
   

    // WEB FRAMEWORK LIBRARIES
    {
        name: "Django",
        imageUrl: "/images/hard_skills/web_frameworks_libraries/django.png",
        link: "https://www.djangoproject.com/",
        logoUrl: "/images/hard_skills/web_frameworks_libraries/django-icono.png",
        tabs: ["Web"],
        level: 2,
    },
    {
        name: "NodeJS",
        link: "https://nodejs.org/",
        imageUrl: "/images/hard_skills/web_frameworks_libraries/node.png",
        logoUrl: "/images/hard_skills/web_frameworks_libraries/nodejs.webp",
        tabs: ["Web"],
        level: 2,
    },
    {
        name: "ReactJS",
        link: "https://en.reactjs.org/",
        imageUrl: "/images/hard_skills/web_frameworks_libraries/react.png",
        logoUrl: "/images/hard_skills/web_frameworks_libraries/re.png",
        tabs: ["Web"],
        level: 2,
    },
   
   
  
    // tools
     // tools
     {
        name: "Git",
        link: "https://git-scm.com/",
        imageUrl: "/images/hard_skills/tools/git-fijo.png",
        logoUrl: "/images/hard_skills/tools/git.webp",
        tabs: ["Tools"],
        level: 2,
    },
    {
        name: "Docker",
        link: "https://www.docker.com/",
        imageUrl: "/images/hard_skills/tools/docker.png",
        logoUrl: "/images/hard_skills/tools/docker.webp",
        tabs: ["Tools"],
        level: 1,
    },
    {
        name: "Ubuntu",
        link: "https://ubuntu.com/",
        imageUrl: "/images/hard_skills/tools/ubuntu-fijo.png",
        logoUrl: "/images/hard_skills/tools/ubuntu.webp",
        tabs: ["Tools"],
    },
    {
        name: "Windows",
        imageUrl: "/images/hard_skills/tools/window-fijo.png",
        link: "https://www.microsoft.com/en-us/windows",
        logoUrl: "/images/hard_skills/tools/windows.webp",
        tabs: ["Tools"],
    },
];

export default hardSkillData;
