import { SkillTab } from "./ModelMenu";

export type Level = 1 | 2 | 3; // "initiated" | "intermediate" | "expert";

export default interface Language {
    name: string;
    link: string;
    color: string;
    logoUrl: string;
    imageUrl: string; // O cambia el nombre según prefieras (por ejemplo, logoUrl)
    tabs: SkillTab[];
    level: Level;
}


export const getOnlyLanguages = (languages: (Language | undefined)[]) => {
    return languages.filter(Boolean) as Language[];
};


export const getOnlyLanguagesByKey = (keys: string[], map: {[id: string]: Language}) => {
    const languages = keys.map(key => map[key]);
    return languages.filter(Boolean) as Language[];
};



