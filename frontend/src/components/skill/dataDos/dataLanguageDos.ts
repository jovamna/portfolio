import Language from "../modelUno/LanguagesSkillUno";
import pytImage  from '../../../assets/img/hard_skills/languages/pyt.png';
import pythImage from '../../../assets/img/hard_skills/languages/pyth.png';
import javImage  from '../../../assets/img/hard_skills/languages/javaAgencia.png';
import javhImage from '../../../assets/img/hard_skills/languages/java-blanco-fijo.png';
import typImage  from '../../../assets/img/hard_skills/languages/typescript.png';
import typhImage from '../../../assets/img/hard_skills/languages/type-f.png';
import htmImage  from '../../../assets/img/hard_skills/languages/html.png';
import hthImage from '../../../assets/img/hard_skills/languages/ml.png';
import cssImage  from '../../../assets/img/hard_skills/languages/css.png';
import csshImage from '../../../assets/img/hard_skills/languages/c.png';
import tailImage  from '../../../assets/img/hard_skills/languages/tailwind-fijo.png';
import tailhImage from '../../../assets/img/hard_skills/languages/tail.png';
import sqlImage  from '../../../assets/img/hard_skills/languages/sql-blanco-fij.png';
import sqlhImage from '../../../assets/img/hard_skills/languages/sql.png';






const languageInformations: {[id: string]: Language} = {
    "python": {
        imageUrl:pythImage,
        name: "Python",
        color: "#3572a5",
        link: "https://en.wikipedia.org/wiki/Python_(programming_language)",
        logoUrl: pytImage,
        tabs: ["Software Development", "Data Science"],
        level: 2,
    },
    
    "javascript": {
        name: "Javascript",
        imageUrl: javImage,
        color: "#f1e05a",
        link: "https://en.wikipedia.org/wiki/JavaScript",
        logoUrl: javhImage,
        tabs: ["Software Development", "Web"],
        level: 2,
    },
    "typescript": {
        name: "Typescript",
        color: "#2b7489",
        imageUrl: typImage ,
        link: "https://en.wikipedia.org/wiki/TypeScript",
        logoUrl: typhImage ,
        tabs: ["Software Development", "Web"],
        level: 1,
    },
    
    "html": {
        name: "HTML",
        color: "#e34c26",
        imageUrl: htmImage,
        link: "https://en.wikipedia.org/wiki/HTML",
        logoUrl: hthImage,
        tabs: ["Software Development", "Web"],
        level: 3,
    },
    "css": {
        name: "CSS",
        color: "#563d7c",
        imageUrl: cssImage,
        link: "https://en.wikipedia.org/wiki/CSS",
        logoUrl: csshImage,
        tabs: ["Software Development", "Web"],
        level: 2,
    },
    
    "tailwind": {
        name: "Tailwind css",
        color: "#563d7c",
        imageUrl: tailImage,
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
        imageUrl:  sqlhImage,
        tabs: ["Software Development", "Databases"],
        level: 2,
    },
   
};

export default languageInformations;



