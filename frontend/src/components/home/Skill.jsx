
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

    <div  className='skill h-[100%] w-[100%] py-8 flex items-center justify-center'>

   {/*bg-neutral-600 */}
       <div className="skill-tres  flex flex-col isolate  mx-auto isolate shadow-2xl  sm:rounded-3xl m-flex-columns  justify-between  items-center w-[95%]  ">
 
      
                 {/*H1 VA CON CSS  .skills-page h1 */}
                 <h1 className='kaushan underline underline-offset-8 lg:text-5xl text-4xl font-bold text-center tracking-tight text-black sm:text-4xl  md:text-center mb-[20px]'>
                 Skills
                 </h1>
      
      

          <div className="skill-dos flex flew-row  rounded-3xl sm:rounded-3xl  justify-between  justify-center items-center  w-[98%] mb[65px]  py-2">
       
         
             <SkillsPage className="skills-page-movil"/>
             <SkillCard />


          </div>
     






          <div className="top-center-skill flex flex-col justifiy-center mx-auto items-center w-full h-[40px]">
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
