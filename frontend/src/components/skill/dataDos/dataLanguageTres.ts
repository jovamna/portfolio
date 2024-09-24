
import languageInformations from "./dataLanguageDos";
import SkillOrLanguage, { getOnlySkillsOrLanguagesByKey}  from "../modelUno/ModelBSkillOrLanguage";



//import pandImage  from '../../../assets/img/hard_skills/data_science_libraries/panda-letra.png';
import pandhImage from '../../../assets/img/hard_skills/data_science_libraries/pandas.webp';
import pandbImage from '../../../assets/img/hard_skills/data_science_libraries/panblanco.png';

//import matImage  from '../../../assets/img/hard_skills/data_science_libraries/matplolib.png';
import mathImage from '../../../assets/img/hard_skills/data_science_libraries/matplotlib.webp';
import matbImage from '../../../assets/img/hard_skills/data_science_libraries/matblanco.png';

//import numImage  from '../../../assets/img/hard_skills/data_science_libraries/numpy-fijo.png';
import numhImage from '../../../assets/img/hard_skills/data_science_libraries/numpy-blanco.png';
import numbImage from '../../../assets/img/hard_skills/data_science_libraries/numblanco.png';

//import sciImage  from '../../../assets/img/hard_skills/data_science_libraries/scikit-fijo.png';
import scihImage from '../../../assets/img/hard_skills/data_science_libraries/scikit-learn.webp';
import scibImage from '../../../assets/img/hard_skills/data_science_libraries/sciblanco.png';

//import myImage  from '../../../assets/img/hard_skills/databases/mysql-fij.png';
import myhImage from '../../../assets/img/hard_skills/databases/msql-b.png';
import mybImage from '../../../assets/img/hard_skills/databases/myblanco.png';

//import posImage  from '../../../assets/img/hard_skills/databases/postgres.png';
import poshImage from '../../../assets/img/hard_skills/databases/postgresql.webp';
import posbImage from '../../../assets/img/hard_skills/databases/postblanco.png';

//import monImage  from '../../../assets/img/hard_skills/databases/mongo.png';
import monhImage from '../../../assets/img/hard_skills/databases/mongodb.webp';
import monbImage from '../../../assets/img/hard_skills/databases/mongblanco.png';

//import daImage  from '../../../assets/img/hard_skills/web_frameworks_libraries/django.png';
import dahImage from '../../../assets/img/hard_skills/web_frameworks_libraries/django-icono.png';
import dabImage from '../../../assets/img/hard_skills/web_frameworks_libraries/djangblanco.png';

//import nodImage  from '../../../assets/img/hard_skills/web_frameworks_libraries/node.png';
import nodhImage from '../../../assets/img/hard_skills/web_frameworks_libraries/nodejs.webp';
import nodbImage from '../../../assets/img/hard_skills/web_frameworks_libraries/nodblanco.png';

//import reImage  from '../../../assets/img/hard_skills/web_frameworks_libraries/react.png';
import rehImage from '../../../assets/img/hard_skills/web_frameworks_libraries/re.png';
import rebImage from '../../../assets/img/hard_skills/web_frameworks_libraries/reacblanco.png';

//import gitImage  from '../../../assets/img/hard_skills/tools/git-fijo.png';
import githImage from '../../../assets/img/hard_skills/tools/git.webp';
import gitbImage from '../../../assets/img/hard_skills/tools/gitblanco.png';

//import docImage  from '../../../assets/img/hard_skills/tools/docker.png';
import dochImage from '../../../assets/img/hard_skills/tools/docker.webp';
import docbImage from '../../../assets/img/hard_skills/tools/docblanco.png';

//import ubuImage  from '../../../assets/img/hard_skills/tools/ubuntu-fijo.png';
import ubuhImage from '../../../assets/img/hard_skills/tools/ubuntu.webp';
import ububImage from '../../../assets/img/hard_skills/tools/ubublanco.png';


//import winImage  from '../../../assets/img/hard_skills/tools/window-fijo.png';
import winhImage from '../../../assets/img/hard_skills/tools/windows.webp';
import winbImage from '../../../assets/img/hard_skills/tools/winblanco.png';




//INCLUDE ICONS FROM LANGUAGES DATA IN HARDSKILLDATA
const hardSkillData: SkillOrLanguage[] = [
    // LANGUAGE SOFTWARE DEVELOPMENT
    ...getOnlySkillsOrLanguagesByKey([
        "python", "html", "css", "javascript",  "typescript", "tailwind", "sql", 
    ], languageInformations),

  
    

    // DATA CIENCIA libraries
    {
        name: "Pandas",
        imageUrl: pandbImage ,
        link: "https://pandas.pydata.org/",
        logoUrl: pandhImage,
        tabs: ["Data Science"],
        level: 1  ,
    },
    {
        name: "Matplotlib",
        imageUrl:  matbImage ,
        link: "https://matplotlib.org/",
        logoUrl:  mathImage ,
        tabs: ["Data Science"],
        level: 1,
    },
    {
        name: "Numpy",
        imageUrl: numbImage ,
        link: "https://matplotlib.org/",
        logoUrl: numhImage ,
        tabs: ["Data Science"],
        level: 1,
    },
    {
        name: "Scikit-learn",
        imageUrl: scibImage ,
        link: "https://matplotlib.org/",
        logoUrl: scihImage ,
        tabs: ["Data Science"],
        level: 1,
    },
    
    // DATABASE FOTOS
    {    
        name: "MySql",
        imageUrl: mybImage,
        link: "https://mariadb.org/",
        logoUrl: myhImage,
        tabs: ["Databases"],
        level: 2,
    },

    {
        name: "PostgreSQL",
        link: "https://www.postgresql.org/",
        imageUrl: posbImage,
        logoUrl: poshImage,
        tabs: ["Databases"],
        level: 2,
    },
    {
        name: "MongoDB",
        imageUrl: monbImage ,
        link: "https://www.mongodb.com/",
        logoUrl: monhImage ,
        tabs: ["Databases"],
        level: 2,
    },
   

    // WEB FRAMEWORK LIBRARIES
    {
        name: "Django",
        imageUrl: dabImage,
        link: "https://www.djangoproject.com/",
        logoUrl: dahImage,
        tabs: ["Web"],
        level: 2,
    },
    {
        name: "NodeJS",
        link: "https://nodejs.org/",
        imageUrl: nodbImage,
        logoUrl: nodhImage,
        tabs: ["Web"],
        level: 2,
    },
    {
        name: "ReactJS",
        link: "https://en.reactjs.org/",
        imageUrl: rebImage,
        logoUrl: rehImage,
        tabs: ["Web"],
        level: 2,
    },
   
   
  
    // tools
     // tools
     {
        name: "Git",
        link: "https://git-scm.com/",
        imageUrl: gitbImage,
        logoUrl: githImage,
        tabs: ["Tools"],
        level: 2,
    },
    {
        name: "Docker",
        link: "https://www.docker.com/",
        imageUrl: docbImage,
        logoUrl: dochImage,
        tabs: ["Tools"],
        level: 1,
    },
    {
        name: "Ubuntu",
        link: "https://ubuntu.com/",
        imageUrl: ububImage,
        logoUrl: ubuhImage,
        tabs: ["Tools"],
    },
    {
        name: "Windows",
        imageUrl: winbImage,
        link: "https://www.microsoft.com/en-us/windows",
        logoUrl: winhImage,
        tabs: ["Tools"],
    },
];

export default hardSkillData;
