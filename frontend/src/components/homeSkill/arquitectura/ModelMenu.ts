// --- TODO EN UN SOLO ARCHIVO DE MODELOS ---

export const skillsTabData = [
    "Software Development",
    "Web",
    "Databases",
    "Data Science",
    "Tools",
] as const;

export type SkillTab = typeof skillsTabData[number];

export type Level = 1 | 2 | 3;

export default interface SkillOrLanguage {
    name: string;
    link: string;
    logoUrl: string;
    imageUrl: string;
    tabs: SkillTab[];
    level?: Level;
    color?: string; // Lo ponemos opcional para que sirva para ambos
}

// Funciones de ayuda (Helpers)
export const getOnlySkillsByKey = (keys: string[], map: {[id: string]: SkillOrLanguage}) => {
    return keys.map(key => map[key]).filter(Boolean) as SkillOrLanguage[];
};