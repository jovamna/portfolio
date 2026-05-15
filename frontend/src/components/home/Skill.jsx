
import SkillCard from "../homeSkill/SkillCard";
import SkillsPage from "../homeSkill/SkillsPage";
//import "../../assets/styles/index.css";
import { BiChevronsUp } from "react-icons/bi";



export default function Skill() {

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
 

  return (

    <div  className='skill 
    h-[100%] w-[100%]  
    flex items-center justify-center 
    py-4 md:py-[30px] lg:py-[40px] 2xl:py-[40px]'>

        {/*bg-neutral-600 */}
        <div className="skill-tres  
        flex flex-col isolate  mx-auto isolate m-flex-columns  
        justify-between  items-center lg:w-[100%]  w-[100%] h-[100%] max-w-[95%] mx-auto">

              

 
                 {/*H1 VA CON CSS  .skills-page h1 */}
                 <h1 className='kaushan 
                 underline underline-offset-8 
                 lg:text-5xl text-4xl font-bold text-center tracking-tight 
                 text-black sm:text-4xl  md:text-center
                  mb-[30px] lg:mb-[40px] 2xl:mb-[40px]'>
                 Skills
                 </h1>
      
                 <div className="flex lg:flex-row 
                 lg:w-[100%] w-[100%] 2xl:w-[100%] 2xl:h-[100%] xl:h-[100%]
                 flex-col justify-between  lg:justify-between
                  justify-center items-center py-4">
                   <SkillsPage className="skills-page-movil"/>
                   <SkillCard />
                 </div>
     





           {/**BOTON ARRIBA */}
          <div className="top-center-skill 
          flex flex-col justifiy-center mx-auto items-center 
          mt-[30px] md:mt-[40px] lg:mt-[40px] 2xl-mt-[50px]">
            <button className="semicirculo"
            onClick={handleScrollToTop}  
            >
           <BiChevronsUp className="icon-centre mx-auto text-3xl text-neutral-600 text-center"/>
           </button>
          </div>

       

       </div>
   
  
    </div>
   
  );
}
