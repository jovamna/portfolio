import Language, {Level} from "./ModelLanguagesUno";

//MENU DEL SEGMENTO DE SKILLS
export const skillsTabData = [
    "Software Development",
    "Web",
    "Databases",
    "Data Science",
    "Tools",
   
] as const;


export type SkillTab = typeof skillsTabData[number];

interface Skill {
    name: string;
    link: string;
    logoUrl: string;
    imageUrl: string; // O cambia el nombre según prefieras (por ejemplo, logoUrl)
    tabs: SkillTab[];
    level?: Level;
};

export type SkillOrLanguage = Skill | Language;
