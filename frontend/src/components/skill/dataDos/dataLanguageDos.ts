
import Language from "../modelUno/ModelALanguages";
import pytImage  from '../../../assets/img/hard_skills/languages/pyt.png';
//import pythImage from '../../../assets/img/hard_skills/languages/pyth.png';
import pytbImage from '../../../assets/img/hard_skills/languages/pyblanco.png';


//import javImage  from '../../../assets/img/hard_skills/languages/javaAgencia.png';
import javhImage from '../../../assets/img/hard_skills/languages/java-blanco-fijo.png';
import javbImage from '../../../assets/img/hard_skills/languages/javblanco.png';

//import typImage  from '../../../assets/img/hard_skills/languages/typescript.png';
import typhImage from '../../../assets/img/hard_skills/languages/type-f.png';
import typbImage from '../../../assets/img/hard_skills/languages/typeblanco.png';

//import htmImage  from '../../../assets/img/hard_skills/languages/html.png';
import hthImage from '../../../assets/img/hard_skills/languages/ml.png';
import htbImage from '../../../assets/img/hard_skills/languages/htblanco.png';


//import cssImage  from '../../../assets/img/hard_skills/languages/css.png';
import csshImage from '../../../assets/img/hard_skills/languages/c.png';
import cssbImage from '../../../assets/img/hard_skills/languages/csblanco.png';

//import tailImage  from '../../../assets/img/hard_skills/languages/tailwind-fijo.png';
import tailhImage from '../../../assets/img/hard_skills/languages/tail.png';
import tailbImage from '../../../assets/img/hard_skills/languages/tailblanco.png';

import sqlImage  from '../../../assets/img/hard_skills/languages/sql-blanco-fij.png';
//import sqlhImage from '../../../assets/img/hard_skills/languages/sql.png';
import sqlbImage from '../../../assets/img/hard_skills/languages/sqlblanco.png';





const languageInformations: {[id: string]: Language} = {
    "python": {
        imageUrl:pytbImage,
        name: "Python",
        color: "#3572a5",
        link: "https://en.wikipedia.org/wiki/Python_(programming_language)",
        logoUrl: pytImage,
        tabs: ["Software Development", "Data Science"],
        level: 2,
    },
    
    "javascript": {
        name: "Javascript",
        imageUrl: javbImage,
        color: "#f1e05a",
        link: "https://en.wikipedia.org/wiki/JavaScript",
        logoUrl: javhImage,
        tabs: ["Software Development", "Web"],
        level: 2,
    },
    "typescript": {
        name: "Typescript",
        color: "#2b7489",
        imageUrl: typbImage,
        link: "https://en.wikipedia.org/wiki/TypeScript",
        logoUrl: typhImage ,
        tabs: ["Software Development", "Web"],
        level: 1,
    },
    
    "html": {
        name: "HTML",
        color: "#e34c26",
        imageUrl: htbImage,
        link: "https://en.wikipedia.org/wiki/HTML",
        logoUrl: hthImage,
        tabs: ["Software Development", "Web"],
        level: 3,
    },
    "css": {
        name: "CSS",
        color: "#563d7c",
        imageUrl: cssbImage,
        link: "https://en.wikipedia.org/wiki/CSS",
        logoUrl: csshImage,
        tabs: ["Software Development", "Web"],
        level: 2,
    },
    
    "tailwind": {
        name: "Tailwind css",
        color: "#563d7c",
        imageUrl: tailbImage,
        link: "https://en.wikipedia.org/wiki/CSS",
        logoUrl: tailhImage,
        tabs: ["Software Development", "Web"],
        level: 2,
    },
    
    
    "sql": {
        name: "SQL",
        color: "#ffffff",
        link: "https://en.wikipedia.org/wiki/SQL",
        logoUrl:  sqlImage,
        imageUrl:  sqlbImage,
        tabs: ["Software Development", "Databases"],
        level: 2,
    },
   
};

export default languageInformations;



