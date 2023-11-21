import {MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import {useState } from "react";



const SearchFormBox =({
  categories,
  search,
 


})=>{

    const [term,setTerm]=useState('')
  
  
    const handleChange=(e)=>{
      setTerm(e.target.value)
    }

  

    const onSubmit = (e) => {
      e.preventDefault();
      try {
        console.log("Submitting form with term:", term);
        setTimeout(() => window.location.href=('/search/'+term), 0.2);
       
        setTerm('');
      } catch (error) {
        console.error("Error during redirection:", error);
      }
    };
    

   


  return(
      <div className='px-[3px] '>

        <form onSubmit={(e)=>onSubmit(e)}  className="text-base  font-medium text-gray-500 hover:text-gray-900">
      
            <div className="mt-1 flex bg-white border-b-2 border-neutral-200">

                  
              {/*INPUT */}
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <input
              id="search"
              name="search"
              value={term}
              onChange={(e)=>{handleChange(e)}}
              type="search"
              className="focus:ring-0 focus:border-neutral-500 border-none block w-full pl-2 sm:text-sm "
              placeholder="Que buscas hoy?"
              />
              </div>
              {/*FIN INPUT */}
                  

            {/*BUTTON */}
            <button
            type="submit"
            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border-none text-sm font-medium  text-gray-700  hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
            <MagnifyingGlassIcon
            className="h-5 w-5 text-neutral-800 " 
            aria-hidden="true" 
            />       
            </button>


            </div>
         
        </form>



   </div>



    )
}



export default SearchFormBox



