
import SkillCard from "../../components/skill/skillcard/SkillCard";
import SkillsPage from "../skill/skill_page/SkillsPage";
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
       <div className="skill-tres bg-neutral-600 flex flex-col isolate  mx-auto isolate shadow-2xl  sm:rounded-3xl m-flex-columns  justify-between  items-center w-[95%]  ">
 
      

          <div className="skill-dos flex flew-row  rounded-3xl sm:rounded-3xl  justify-between  justify-center items-center  w-[98%] mb[65px]  py-2">
          <SkillCard />
         
          <SkillsPage className="skills-page-movil"/>
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
