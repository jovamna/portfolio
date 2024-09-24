

import { SkillTab } from "./ModelMenu";

export type Level = 1 | 2 | 3; // "initiated" | "intermediate" | "expert";

export default interface SkillOrLanguage {
    name: string;
    link: string;
    //color: string;
    logoUrl: string;
    imageUrl: string;
    tabs: SkillTab[];
    level?: Level;  // Propiedad opcional
}


//=> la flecha se asume como si fuera return
export const getOnlySkillsOrLanguages = (skillsOrLanguages: (SkillOrLanguage | undefined)[]) =>
  skillsOrLanguages.filter(Boolean) as SkillOrLanguage[];


//=> la flecha se asume como si fuera return
export const getOnlySkillsOrLanguagesByKey = (keys: string[], map: {[id: string]: SkillOrLanguage}) =>
  keys.map(key => map[key]).filter(Boolean) as SkillOrLanguage[];
