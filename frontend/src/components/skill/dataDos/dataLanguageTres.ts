
import languageInformations from "./dataLanguageDos";
import SkillOrLanguage, { getOnlySkillsOrLanguagesByKey}  from "../modelUno/ModelBSkillOrLanguage";



import pandImage  from '../../../assets/img/hard_skills/data_science_libraries/panda-letra.png';
import pandhImage from '../../../assets/img/hard_skills/data_science_libraries/pandas.webp';
import matImage  from '../../../assets/img/hard_skills/data_science_libraries/matplolib.png';
import mathImage from '../../../assets/img/hard_skills/data_science_libraries/matplotlib.webp';
import numImage  from '../../../assets/img/hard_skills/data_science_libraries/numpy-fijo.png';
import numhImage from '../../../assets/img/hard_skills/data_science_libraries/numpy-blanco.png';
import sciImage  from '../../../assets/img/hard_skills/data_science_libraries/scikit-fijo.png';
import scihImage from '../../../assets/img/hard_skills/data_science_libraries/scikit-learn.webp';
import myImage  from '../../../assets/img/hard_skills/databases/mysql-fij.png';
import myhImage from '../../../assets/img/hard_skills/databases/msql-b.png';


import posImage  from '../../../assets/img/hard_skills/databases/postgres.png';
import poshImage from '../../../assets/img/hard_skills/databases/postgresql.webp';
import monImage  from '../../../assets/img/hard_skills/databases/mongo.png';
import monhImage from '../../../assets/img/hard_skills/databases/mongodb.webp';
import daImage  from '../../../assets/img/hard_skills/web_frameworks_libraries/django.png';
import dahImage from '../../../assets/img/hard_skills/web_frameworks_libraries/django-icono.png';
import nodImage  from '../../../assets/img/hard_skills/web_frameworks_libraries/node.png';
import nodhImage from '../../../assets/img/hard_skills/web_frameworks_libraries/nodejs.webp';
import reImage  from '../../../assets/img/hard_skills/web_frameworks_libraries/react.png';
import rehImage from '../../../assets/img/hard_skills/web_frameworks_libraries/re.png';


import gitImage  from '../../../assets/img/hard_skills/tools/git-fijo.png';
import githImage from '../../../assets/img/hard_skills/tools/git.webp';
import docImage  from '../../../assets/img/hard_skills/tools/docker.png';
import dochImage from '../../../assets/img/hard_skills/tools/docker.webp';
import ubuImage  from '../../../assets/img/hard_skills/tools/ubuntu-fijo.png';
import ubuhImage from '../../../assets/img/hard_skills/tools/ubuntu.webp';
import winImage  from '../../../assets/img/hard_skills/tools/window-fijo.png';
import winhImage from '../../../assets/img/hard_skills/tools/windows.webp';





//INCLUDE ICONS FROM LANGUAGES DATA IN HARDSKILLDATA
const hardSkillData: SkillOrLanguage[] = [
    // LANGUAGE SOFTWARE DEVELOPMENT
    ...getOnlySkillsOrLanguagesByKey([
        "python", "html", "css", "javascript",  "typescript", "tailwind", "sql", 
    ], languageInformations),

  
    

    // DATA CIENCIA libraries
    {
        name: "Pandas",
        imageUrl: pandImage ,
        link: "https://pandas.pydata.org/",
        logoUrl: pandhImage,
        tabs: ["Data Science"],
        level: 1  ,
    },
    {
        name: "Matplotlib",
        imageUrl:  matImage ,
 
        link: "https://matplotlib.org/",
        logoUrl:  mathImage ,
        tabs: ["Data Science"],
        level: 1,
    },
    {
        name: "Numpy",
        imageUrl: numImage ,
        link: "https://matplotlib.org/",
        logoUrl: numhImage ,
        tabs: ["Data Science"],
        level: 1,
    },
    {
        name: "Scikit-learn",
        imageUrl: sciImage ,
        link: "https://matplotlib.org/",
        logoUrl: scihImage ,
        tabs: ["Data Science"],
        level: 1,
    },
    
    // DATABASE FOTOS
    {    
        name: "MySql",
        imageUrl: myImage,
        link: "https://mariadb.org/",
        logoUrl: myhImage,
        tabs: ["Databases"],
        level: 2,
    },

    {
        name: "PostgreSQL",
        link: "https://www.postgresql.org/",
        imageUrl: posImage,
        logoUrl: poshImage,
        tabs: ["Databases"],
        level: 2,
    },
    {
        name: "MongoDB",
        imageUrl: monImage ,
        link: "https://www.mongodb.com/",
        logoUrl: monhImage ,
        tabs: ["Databases"],
        level: 2,
    },
   

    // WEB FRAMEWORK LIBRARIES
    {
        name: "Django",
        imageUrl: daImage,
        link: "https://www.djangoproject.com/",
        logoUrl: dahImage,
        tabs: ["Web"],
        level: 2,
    },
    {
        name: "NodeJS",
        link: "https://nodejs.org/",
        imageUrl: nodImage,
        logoUrl: nodhImage,
        tabs: ["Web"],
        level: 2,
    },
    {
        name: "ReactJS",
        link: "https://en.reactjs.org/",
        imageUrl: reImage,
        logoUrl: rehImage,
        tabs: ["Web"],
        level: 2,
    },
   
   
  
    // tools
     // tools
     {
        name: "Git",
        link: "https://git-scm.com/",
        imageUrl: gitImage,
        logoUrl: githImage,
        tabs: ["Tools"],
        level: 2,
    },
    {
        name: "Docker",
        link: "https://www.docker.com/",
        imageUrl: docImage,
        logoUrl: dochImage,
        tabs: ["Tools"],
        level: 1,
    },
    {
        name: "Ubuntu",
        link: "https://ubuntu.com/",
        imageUrl: ubuImage,
        logoUrl: ubuhImage,
        tabs: ["Tools"],
    },
    {
        name: "Windows",
        imageUrl: winImage,
        link: "https://www.microsoft.com/en-us/windows",
        logoUrl: winhImage,
        tabs: ["Tools"],
    },
];

export default hardSkillData;
