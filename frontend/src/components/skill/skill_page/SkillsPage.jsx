import { Tab, TabPanel } from '../tabs/buttonDinamico';
import { skillsTabData } from '../modelUno/MenuSkillUno';
import  hardSkillData  from  "../dataDos/languageDataTres";
import { ImageIcon } from '../icons/index';
import styled from 'styled-components';




/*color: var(--color); */
/*gap: 10px;*/
/*CONTAINER DE LOS ICONOS */
const SkillItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2px;
  text-align: center;
  backgroundColor:"yellow"


  & > img {
    transform: scale(0.9);
    transition: all 250ms ease;
  }

  &:hover {
    filter: none !important;

    & > img {
      transform: scale(1);
    }
  }
`;

const SkillsPage = () => {
    return <>

      <div className="skills-page-movil w-[74%] h-[30rem]  mx-auto  sm:py-6 shadow-2xl sm:rounded-3xl bg-neutral-500 mr-2"
      >

           {/*H1 VA CON CSS  .skills-page h1 */}
           <h1 className='underline underline-offset-8 font-mono text-5xl font-bold text-center tracking-tight text-white sm:text-4xl  md:text-center mb-[20px]'>
           Skills
           </h1>


       
          {/*CONTAINER GENERAL DEl MENU Y LOS ICONOS  */}
          {/*TabPanel es el menu */}
          <Tab>

         {skillsTabData.map((tabTitle, tabIndex) => {
         return <TabPanel  
         title={tabTitle} 
         key={tabIndex}> {/*PAGINA buttonDinamico tab__content container de los iconos*/}

                  {/*ICONOS */}
                <div className='tab__content grid grid-cols-4 w-[100%] grid-gap-3.3 '>
                  {/*lA URL DE LAS IMAGENES ESTAN EN SKILLDATA DE LA CARPETA DATA */}
                  {/*ImagenIcon ICONOS DE REACT, DJANGO NODE, GITHUB ETC */}
                  {/*SkillItem ES EL ESTILO DE LOS ICONOS DOCKER, GITHUB, DJANGO, RECAT, ETC */}
                  {hardSkillData.filter(value => {return value.tabs.includes(tabTitle)
                   }).map((skill, skillIndex) => {
                      return  <SkillItem  
                              key={skillIndex} 
                              href={skill.link} 
                              target="_blank" 
                              rel="noreferrer" 
                              title={skill.name}
                              >
                                   <ImageIcon 
                                   height={40} 
                                   src={skill.logoUrl} 
                                   alt={`${skill.name} icon`} 
                                   />
                                   <ImageIcon 
                                   height={28} 
                                   src={skill.imageUrl} 
                                   alt={`${skill.name} icon`} 
                                   />

                                   <span className='mb-6'>
                                   {/*{skill.name}&nbsp;*/}
                                   <sup>{skill.level}</sup>
                                   </span>


                              </SkillItem>
                      })
                      }


                 </div>

                  </TabPanel>
              })}


              
    </Tab>

    </div>  

           
    
    </>
   
};

export default SkillsPage;
