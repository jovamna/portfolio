import { BiRss } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BiChevronsUp } from "react-icons/bi";




function Cv() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (
    <div  className='curriculum h-[100%] w-[100%] flex  py-8 flex justify-center items-center'>
       <div className="cv overflow-hidden bg-neutral-600 sm:rounded-3xl max-w-[94.7%] mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8">

           <div className="px-4 py-2 sm:px-6">
          <h3 className="text-xl font-medium  text-white">Infomacion Curricular</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-200">Detalles Personales</p>
           </div>



     
          <div className=" mb-[20px]">

             <div className="bg-white pt-[12px] ">
          <div className="bg-gray-50 px-4 mt-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 bg-neutral-200">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bg-neutral-200">Jovamna Medina</dd>
          </div>

          <div className="bg-gray-50  px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 bg-neutral-200">Application for</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bg-neutral-200">Backend Developer</dd>
          </div>

          <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 bg-neutral-200">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bg-neutral-200">jocoderina@gmail.com</dd>
          </div>

          <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 bg-neutral-200">Salary expectation</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bg-neutral-200">Según convenio</dd>
          </div>

          <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 bg-neutral-200">About</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bg-neutral-200">
            💎 I am passionate about Full Stack development in Python with Django Rest Framework and javascript, I have basic notions in react, redux
            <br/>

            🌱 I’m currently learning React
            <br/>


            👯 I’m looking to collaborate on I would like to share with developers in python and javascript


            </dd>
          </div>

             </div>


             {/*ULTIMA PARTE */}
             <div className="bg-white px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 pb-[18px] rounded-bl-3xl rounded-br-2xl ">
          <dt className="text-sm font-medium text-gray-500 bg-neutral-200">Attachments</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bg-neutral-200">

              <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <BiRss className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <span className="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                  </div>

                  <div className="ml-4 flex-shrink-0">
                  <Link to="/files/myfile.pdf" target="_blank" download>Download</Link>
                    {/*<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                   </a>*/}
                  </div>
                </li>



                <li className="flex items-center justify-between pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <BiRss className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <span className="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                  <Link to="/files/myfile.pdf" target="_blank" download>Download</Link>
                    {/*<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                  </a>*/}
                  </div>
                </li>


              </ul>
          </dd>
             </div>
             {/*FIN ULTIMA PARTE */}

          </div>





          <div className="top-center-cv  flex flex-col mx-auto items-center justifiy-end h-[40px]">
           <button className="semicirculo"
           onClick={handleScrollToTop}
           >
            <BiChevronsUp className="icon-centre mx-auto text-3xl text-neutral-600 text-center"/>
          </button>
          </div>

        
       </div>

     
   
   
    </div>






  







  )
}

export default Cv