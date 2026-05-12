import { SkillOrLanguage } from "../modelUno/ModelBSkillOrLanguage";

const hardSkillData: SkillOrLanguage[] = [
    // --- LENGUAJES & SOFTWARE DEVELOPMENT ---
    {
        name: "Python",
        imageUrl: "/assets/img/hard_skills/languages/pyNEGRO.png",
        logoUrl: "/assets/img/hard_skills/languages/pythonNEGRO.png",
        link: "https://en.wikipedia.org/wiki/Python_(programming_language)",
        tabs: ["Software Development", "Data Science"],

        level: 2,
    },
    {
        name: "Javascript",
        imageUrl: "/assets/img/hard_skills/languages/javnegro.png",
        logoUrl: "/assets/img/hard_skills/languages/java-blanco-fijo.png",
        link: "https://en.wikipedia.org/wiki/JavaScript",
        tabs: ["Software Development", "Web"],
    
        level: 2,
    },
    {
        name: "Typescript",
        imageUrl: "/assets/img/hard_skills/languages/typeNEGRO.png",
        logoUrl: "/assets/img/hard_skills/languages/type-f.png",
        link: "https://en.wikipedia.org/wiki/TypeScript",
        tabs: ["Software Development", "Web"],
      
        level: 1,
    },
    {
        name: "HTML",
        imageUrl: "/assets/img/hard_skills/languages/htmlNEGRO.png",
        logoUrl: "/assets/img/hard_skills/languages/ml.png",
        link: "https://en.wikipedia.org/wiki/HTML",
        tabs: ["Software Development", "Web"],
    
        level: 3,
    },
    {
        name: "CSS",
        imageUrl: "/assets/img/hard_skills/languages/csnegro.png",
        logoUrl: "/assets/img/hard_skills/languages/C-NEGRO.png",
        link: "https://en.wikipedia.org/wiki/CSS",
        tabs: ["Software Development", "Web"],
  
        level: 2,
    },
    {
        name: "Tailwind css",
        imageUrl: "/assets/img/hard_skills/languages/tailNEGRO-fijo.png",
        logoUrl: "/assets/img/hard_skills/languages/tailNEGRO.png",
        link: "https://en.wikipedia.org/wiki/CSS",
        tabs: ["Software Development", "Web"],
   
        level: 2,
    },
    {
        name: "SQL",
        imageUrl: "/assets/img/hard_skills/languages/sqlNEGRO.png",
        logoUrl: "/assets/img/hard_skills/languages/sql-negro-fij.png",
        link: "https://en.wikipedia.org/wiki/SQL",
        tabs: ["Software Development", "Databases"],
       
        level: 2,
    },

    // --- DATA SCIENCE LIBRARIES ---
    {
        name: "Pandas",
        imageUrl: "/assets/img/hard_skills/dataCiencia/pannegro.png",
        logoUrl: "/assets/img/hard_skills/dataCiencia/pandas.webp",
        link: "https://pandas.pydata.org/",
        tabs: ["Data Science"],
        level: 1,
    },
    {
        name: "Matplotlib",
        imageUrl: "/assets/img/hard_skills/dataCiencia/matnegro.png",
        logoUrl: "/assets/img/hard_skills/dataCiencia/matplotlib.webp",
        link: "https://matplotlib.org/",
        tabs: ["Data Science"],
        level: 1,
    },
    {
        name: "Numpy",
        imageUrl: "/assets/img/hard_skills/dataCiencia/numnegro.png",
        logoUrl: "/assets/img/hard_skills/dataCiencia/numpyNegro.png",
        link: "https://numpy.org/",
        tabs: ["Data Science"],
        level: 1,
    },
    {
        name: "Scikit-learn",
        imageUrl: "/assets/img/hard_skills/dataCiencia/scinegro.png",
        logoUrl: "/assets/img/hard_skills/dataCiencia/scikit-learn.webp",
        link: "https://scikit-learn.org/",
        tabs: ["Data Science"],
        level: 1,
    },

    // --- DATABASES ---
    {    
        name: "MySql",
        imageUrl: "/assets/img/hard_skills/database/myNEGRO.png",
        logoUrl: "/assets/img/hard_skills/database/msql-NEGRO.png",
        link: "https://mariadb.org/",
        tabs: ["Databases"],
        level: 2,
    },
    {
        name: "PostgreSQL",
        imageUrl: "/assets/img/hard_skills/database/postNEGRO.png",
        logoUrl: "/assets/img/hard_skills/database/postgresql.webp",
        link: "https://www.postgresql.org/",
        tabs: ["Databases"],
        level: 2,
    },
    {
        name: "MongoDB",
        imageUrl: "/assets/img/hard_skills/database/mongnegro.png",
        logoUrl: "/assets/img/hard_skills/database/mongodb.webp",
        link: "https://www.mongodb.com/",
        tabs: ["Databases"],
        level: 2,
    },

    // --- WEB FRAMEWORKS & LIBRARIES ---
    {
        name: "Django",
        imageUrl: "/assets/img/hard_skills/web/djangNEGRO.png",
        logoUrl: "/assets/img/hard_skills/web/django-icono.png",
        link: "https://www.djangoproject.com/",
        tabs: ["Web"],
        level: 2,
    },
    {
        name: "NodeJS",
        imageUrl: "/assets/img/hard_skills/web/nodNEGRO.png",
        logoUrl: "/assets/img/hard_skills/web/nodejs.webp",
        link: "https://nodejs.org/",
        tabs: ["Web"],
        level: 2,
    },
    {
        name: "ReactJS",
        imageUrl: "/assets/img/hard_skills/web/reacNEGRO.png",
        logoUrl: "/assets/img/hard_skills/web/re.png",
        link: "https://en.reactjs.org/",
        tabs: ["Web"],
        level: 2,
    },

    // --- TOOLS ---
    {
        name: "Git",
        imageUrl: "/assets/img/hard_skills/tools/gitNEGRO.png",
        logoUrl: "/assets/img/hard_skills/tools/git.webp",
        link: "https://git-scm.com/",
        tabs: ["Tools"],
        level: 2,
    },
    {
        name: "Docker",
        imageUrl: "/assets/img/hard_skills/tools/docNEGRO.png",
        logoUrl: "/assets/img/hard_skills/tools/docker.webp",
        link: "https://www.docker.com/",
        tabs: ["Tools"],
        level: 1,
    },
    {
        name: "Ubuntu",
        imageUrl: "/assets/img/hard_skills/tools/ubuNEGRO.png",
        logoUrl: "/assets/img/hard_skills/tools/ubuntu.webp",
        link: "https://ubuntu.com/",
        tabs: ["Tools"],
    },
    {
        name: "Windows",
        imageUrl: "/assets/img/hard_skills/tools/winnegro.png",
        logoUrl: "/assets/img/hard_skills/tools/windows.webp",
        link: "https://www.microsoft.com/en-us/windows",
        tabs: ["Tools"],
    },
];

export default hardSkillData;