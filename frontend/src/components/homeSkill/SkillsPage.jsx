import React from 'react';
import { Tab, TabPanel } from './tabs/buttonDinamico';
import { skillsTabData } from './arquitectura/ModelMenu';
import hardSkillData from "./data/data";





const SkillsPage = () => {
  return (
    <div className="skills-page-movil w-full h-auto mx-auto sm:py-6 sm:rounded-3xl mr-2">
      <Tab>
        {skillsTabData.map((tabTitle, tabIndex) => (
          <TabPanel title={tabTitle} key={tabIndex}>
            
            {/* Grid de iconos */}
            <div className='tab__content grid grid-cols-4 w-full gap-4'>
              
              {hardSkillData
                .filter(value => value.tabs.includes(tabTitle))
                .map((skill, skillIndex) => (
                  
                  /* Sustituimos SkillItem por un simple enlace <a> con clases de Tailwind */
                  <a
                    key={skillIndex}
                    href={skill.link}
                    target="_blank"
                    rel="noreferrer"
                    title={skill.name}
                    className="group  flex flex-col items-center gap-[2px] text-center bg-yellow-400/10 transition-all duration-250"
                  >
                    {/* Efecto Scale: Usamos la clase 'group-hover' para que la imagen escale cuando pases el mouse por el enlace */}
                    <img 
                      className="transform lg:w-[80px] w-[60px] scale-90 group-hover:scale-100 transition-transform duration-250"
                    
                      src={skill.logoUrl} 
                      alt={`${skill.name} icon`} 
                    />
                    
                    <img
                      className="lg:w-[100px] w-[80px]"
                      src={skill.imageUrl} 
                      alt={`${skill.name} icon`} 
                    />

                    <span className="mb-6 text-black">
                      <sup>{skill.level}</sup>
                    </span>
                  </a>
                ))}
            </div>
          </TabPanel>
        ))}
      </Tab>
    </div>
  );
};

export default SkillsPage;