import { SkillTab } from "./MenuSkillUno";

export type Level = 1 | 2 | 3; // "initiated" | "intermediate" | "expert";

export default interface SkillOrLanguage {
    name: string;
    link: string;
    color:string;
    logoUrl: string;
    imageUrl: string;
    tabs: SkillTab[];
    level: Level;
}

export const getOnlySkillsOrLanguages = (skillsOrLanguages: (SkillOrLanguage | undefined)[]) => {
    return skillsOrLanguages.filter(item => item) as SkillOrLanguage[];
};

export const getOnlySkillsOrLanguagesByKey = (keys: string[], map: {[id: string]: SkillOrLanguage}) => {
    const skillsOrLanguages: (SkillOrLanguage | undefined)[] = [];
    keys.forEach(key => {
        skillsOrLanguages.push(map[key]);
    })
    return skillsOrLanguages.filter(item => item) as SkillOrLanguage[];
};

