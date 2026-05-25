import { Popover, Transition } from '@headlessui/react';
import { BiHome} from "react-icons/bi";
import { HiOutlineLibrary } from "react-icons/hi";
import { MdArticle } from "react-icons/md";
import { DiGithubBadge } from "react-icons/di";
import { useState, useEffect, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo/logo.png";
import "../../styles/index.css";
import { connect } from "react-redux"
import { get_blog_list } from "../../redux/actions/blog";
import LoadingCard from "../loaders/LoadingCard"
import { search_blog, search_blog_page } from "../../redux/actions/blog";
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid'  //SEARCH
import SearchFormBox from './SearchFormBox'
//import DOMPurify from "dompurify";
import { FiX } from "react-icons/fi";
import { Link, Events, animateScroll as scroll } from 'react-scroll';



const solutions = [
  {
    name: 'Home',
    description: 'Resume de mi Portafolio.',
    href: '/',
    icon: BiHome,
  },
  {
    name: 'Blog',
    description: 'Articulos sobre los avances en tecnología',
    href: '/blog',
    icon: MdArticle,
  },
  {
    name: 'Escandallo',
    description: ' Diseñado para ayudar a digitalizar la gestión de pequeños negocios de hostelería de forma gratuita.',
    href: '/escandallo',
    icon: MdArticle,
  },

   {
    name: 'MyProjects',
    description: 'Lista de repositorios en Github.',
    href: '/myproject',
    icon: DiGithubBadge ,
  },
  
]








function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}







//DATA PARA CONSEGUIR LISTADO DE POST PROJECTS DE LOS GITHUBS
//SE USARA PARA HACER EL MAPEO DE SOLICTUD DE LOS PORJECT LIST
//ESTO SE USA EN EL MENU ESCODNIDO DE LA PANTALLA GRANDE EN EL ICONO DE BLOG
function BlogListNavbar(data){
  let post = data && data.data
    return (
        <>
            <NavLink 
            to={`/blog/post/${post.slug}`} 
            className="block pb-2 mt-2"
            >
                <p className='truncate text-black text-sm hover:text-black hover:bg-white '>
                 {post.excerpt}
                </p>
                  <p className='text-black hover:bg-gray-500 text-sm  hover:text-orange-500'>leer mas</p>
            </NavLink>   
          </>
       )
    }



function Navbar({
  get_blog_list, 
  blog_list, 
  search_blog,
  search_blog_page,
  term,
  isAuthenticated,
  user,
  }) {

    useEffect(()=>{
      get_blog_list()
      search_blog(term)
    }, [])





  const [currentRoute, setCurrentRoute] = useState('home'); // Establece el valor inicial en 'home' o en el valor que desees que esté activo por defecto

  useEffect(() => {
    setCurrentRoute(window.location.hash.substr(1)); // Establece la ruta actual basándose en la porción de la URL después del hash (#)
    Events.scrollEvent.register('begin', (to, element) => {
      setCurrentRoute(to);
    });
    return () => {
      Events.scrollEvent.remove('begin');
    };
  }, []);

   const [isSearchOpen, setIsSearchOpen] = useState(false);


// lista de posts
  const renderBlogList = (blog_list) => {
      return (
        <div className="bg-white px-4 w-[100%]">
            <h3 className="text-sm underline underline-offset-4 pt-4 text-black font-extrabold">
              Publicaciones Recientes:
              </h3>
             
            <ul role="list" className="">
                
           
              {blog_list.slice(0, blog_list.length > 2 ? 2 : blog_list.length).map(post => (
                 <li key={post.slug} className="py-2">   
                  <NavLink 
                 to={`/blog/post/${post.slug}`} 
                 className="block"
                 >
  
                 <p className='hover:bg-gray-500 text-sm text-black truncate ..'>
                {post.excerpt && post.excerpt
                .split(' ') // Dividir el texto en palabras NO FUNCIONO
                .slice(0, 20) // Seleccionar las primeras 20 palabras NO FUNCIONO
                .join(' ') // Volver a unir las palabras en un solo texto NO FUNCIONO
                }
               </p>
               {/*console.log(post.excerpt)*/}
               {/*console.log("Valor de post.excerpt:", post.excerpt)*/}
          
            <p className='text-black hover:bg-gray-500 text-sm  hover:text-orange-500'>
              leer mas
              </p>
  
              </NavLink>
  
              </li>
             
              ))}
             </ul>
        
             </div>
  
              )
      }




   



  return (
    <>




     {/* CONTAINER PRINCIPAL 1 DEL NAVBAR DEL PC Y MOVIL  sm:px-6 */}
    <div className="z-index fixed 
    w-full lg:w-[100%] xl:w-[100%]  
    sm:h-[60px] md:h-[60px] bg-white opacity-95">

      {/* CONTAINER GUIA ENGLOBA MENU GRANDE Y MENU MOVIL*/}
      <Popover className=" lg:h-[60px] sm:h-[60px] md:h-[60px] 
       lg:w-[100%] xl:h-[60px] h-[48px] lg:h-[56px] xl:h-[59px] 2xl:h-[80px]">


          
         {/* 1 CONTAINER PRINCIPAL CONTIENE DEL MENU DE PANTLLA INCLUYE SOLO EL BOTON ICONO DEL MENU MOVIL QUE ESTA OCULTO */}
         {/*IMPORTANTE EN EL CSS INDEX PONER LA ALTURA HEIGHT 50  navbar-logo con py-7 EL MENU SE HACE MAS LARGO*/}
          <div className="flex flex-row md:flex 
          w-[100%] lg:w-[95%] xl:w-[100%] 2xl:w-[100%]
          h-[48px]  sm:h-[60px]  md:h-[60px] max-w-[95%]
          mx-auto">



             {/*LOGO DEL nav ORDENADOR Y MOVIL sm:w-20 md:w-24 lg:w-32 */}
             {/*PARA QUE EL ICONO SE CENTRE inline-flex items-center  logo    w-1/4*/}
              <div className="flex justify-start 
               w-[38%] lg:w-[21%] 
               h-[48px] md:h-[60px] sm:h-[60px] lg:h-[60px]">
                 <NavLink to= "/">
                    <img className="image-logo w-full h-full md:h-full md:w-full lg:h-[60px] object-contain"
                    src={logo}
                    alt="logo"
                           
                    />
                </NavLink>
              </div>
             {/*FIN LOGO DEL MENU ORDENADOR Y MOVIL*/} 



        
           {/*ICONO MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL */}
           {/*MOVIL ICONO CASA QUE ABRE EL MENU ESCONDIDO ICONO-1LADO DERECHO*/}
           <div className=" 
           lg:hidden xl:hidden 2xl:hidden 
           h-[48px] md:h-[70px] md:w-[65%] 
           flex flex-row justify-end w-[65%]">
                 


               <Popover.Button className="icon-search-bihome 
               flex flex-row justify-end items-center 
               hover:bg-gray-100 hover:text-gray-500 
               focus:outline-none 
               h-[2.5em] w-[60%]">
               <span className="sr-only">Open menu</span>


                {/*BOTON LUPA DEL BUSCADOR */}
                  <div className=" flex w-[26%]">
                   <MagnifyingGlassIcon className="icon-search 
                   h-[20px] w-[20px] 
                   text-zinc-800 
                   hover:text-gray-400 " aria-hidden="true" />
                 </div>
                {/* FIN BUSCADOR */}

                <div className="w-[26%] flex">
                   <BiHome className={classNames(
                        open ? 'text-zinc-800' : 'text-zinc-600',
                        'h-[22px] w-[22px] group-hover:text-gray-500  icon-bihome'
                      )}
                      aria-hidden="true"/>
                </div>


               </Popover.Button>
           </div>
           {/*FIN MOVIL ICONO CASA QUE ABRE EL MENU ESCONDIDO ICONO-1LADO DERECHO*/}




           {/*MENU PANTALLA GRANDE */}     
           {/*IMPORTANTE ml-44 PARA MOVER A LADO DERECHO EN MENU */}
           <Popover.Group as="nav" className="
           hidden md:hidden
           lg:w-[80%] xl:w-[80%] 2xl:w-[80%]
            lg:flex lg:flex-row justify-between items-center
            justify-center md:flex">

  
          <div className="flex items-center h-full lg:w-[82%] space-x-10">
          

          <Link
           className={`nav-item hover:bg-neutral-100 
            hover:text-violet-700 text-black font-semibold 
            border-b-2 border-transparent hover:border-violet-700  
            h-[100%]  inline-block py-4 ${currentRoute === 'home' ? 'bg-neutral-300 text-white' : ''}`}
           to="home"
           spy={true}
           smooth={true}
           duration={500}
           >
           Home
         </Link>

          

         <Link
           className={`nav-item hover:bg-neutral-100 hover:text-violet-700  text-black  font-semibold border-b-2 border-transparent hover:border-violet-700  h-[100%]  inline-block  py-4 ${currentRoute === 'about' ? 'bg-neutral-300 text-white' : ''}`}
           to="about"
           spy={true}
           smooth={true}
           duration={500}
           >
           About
         </Link>


         <Link
           className={`nav-item hover:bg-neutral-100 hover:text-violet-700  text-black  font-semibold border-b-2 border-transparent hover:border-violet-700  h-[100%]  inline-block py-4 ${currentRoute === 'skill' ? 'bg-neutral-300 text-white' : ''}`}
           to="skill"
           spy={true}
           smooth={true}
           duration={500}
           >
           Skills
         </Link>


       
          
         <Link
           className={`nav-item hover:bg-neutral-100 hover:text-violet-700  text-black  font-semibold border-b-2 border-transparent hover:border-violet-700  h-[100%]  inline-block py-4 ${currentRoute === 'project' ? 'bg-neutral-300 text-white' : ''}`}
           to="project"
           spy={true}
           smooth={true}
           duration={500}
           >
           MyProjects
         </Link>

          {/*<Link className="nav-item hover:bg-neutral-100 hover:text-violet-700 text-white font-semibold border-b-2 border-transparent hover:border-violet-700 inline-block py-4"
           to='curriculum' 
           smooth={true} 
           //offset={-20}
           duration={500}>
            C.V.
          </Link>
                 */}
          
     

   

                        

             {/* BLOG BLOG BLOG BLOG BLOG BLOG BLOG MENU MENU MENU BLOG BLOG BLOG BLOG */}
             <NavLink to= "/blog" className="nav-item hover:bg-neutral-100 hover:text-violet-700  text-black  font-semibold border-b-2 border-transparent hover:border-violet-700 inline-block py-4 ">
             <span className="py-2">Blog</span>
             </NavLink>


             <Link
           className={`nav-item hover:bg-neutral-100 hover:text-violet-700  text-black  font-semibold border-b-2 border-transparent hover:border-violet-700  h-[100%]  inline-block py-4 ${currentRoute === 'contacto' ? 'bg-neutral-300' : ''}`}
           to="contacto"
           spy={true}
           smooth={true}
           duration={500}
           >
           Contacto
         </Link>

        

          </div>





              <div className="flex justify-center items-center lg:w-[15%] h-full">

            {/* BUSCADOR */}
            <div className=' lg:w-[86%]'>
            <button
             onClick={() => {
             setIsSearchOpen(!isSearchOpen);
             }}
            className="text-base font-medium text-white hover:text-gray-900"
             >
            {isSearchOpen ? (
            <FiX className="h-5 w-5 ml-10 text-zinc-500 hover:text-gray-400" aria-hidden="true" />
            ) : (
           <MagnifyingGlassIcon className="h-5 w-5 ml-10 text-zinc-500 hover:text-gray-400" aria-hidden="true" />
            )}
           </button>
           <div
           className={`absolute top-12 w-screen max-w-md right-0 transform translate-x-1/12 sm:px-0 pb-[3.5px] ${
            isSearchOpen ? 'block' : 'hidden'
            }`}
            >
             <div className="">
             {window.location.pathname === '/search/:term' ? (
               <></>
               ) : (
               <SearchFormBox />
                )}
              </div>
             </div>
             </div>            
            {/* FIN BUSCADOR */}




         
             {/* MENU DESLIZANTE*/}
             <Popover className=" lg:w-[14%]">
             {({ open }) => (
              <>

                 <Popover.Button
                 className={classNames(open ? 'text-gray-900' : 'text-white',
                 'group inline-flex  rounded-md  text-base font-medium focus:outline-none focus:ring-0'
                 )}>

                
                 {/*ICONO IGLESIAS EN MENU PANTALLA GRANDE ICONO DEL BLOG */}
                 <HiOutlineLibrary
                 className={classNames(open ? 'text-zinc-500' : 'text-zinc-500',
                 'h-6 w-6 hover:text-gray-400 '
                 )}
                  aria-hidden="true" 
                     />
                 </Popover.Button>



                 {/*MENU HIDDEN DEL PC */}
                 <Transition
                 as={Fragment}
                 enter="transition ease-out duration-200"
                 enterFrom="opacity-0 translate-y-1"
                 enterTo="opacity-100 translate-y-0"
                 leave="transition ease-in duration-150"
                 leaveFrom="opacity-100 translate-y-0"
                 leaveTo="opacity-0 translate-y-1"
                 >
                 <Popover.Panel 
                 className="absolute top-12 w-screen bg-white max-w-md right-0 transform translate-x-1/12 px-2 sm:px-0">
                
                 <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  {/*MENU: HOME, MYPROJECT Y BLOG DEL MENU OCULTO*/}
                  <div className="relative grid sm:gap-12 sm:p-8">
                    {solutions.map((item) => (
                      <NavLink 
                      key={item.name}
                      to={item.href} // 💡 Cambiamos 'href' por 'to'
                      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 
                      border-b border-gray-100 transition-colors duration-200">
                      {/* 💡 Cambiado text-white por text-neutral-700 para que el icono SE VEA */}
                      <item.icon className="h-6 w-6 flex-shrink-0 text-neutral-700 mt-0.5" aria-hidden="true" />
                                   
                      <div className="ml-4">
                      <p className="text-base font-semibold text-gray-900">{item.name}</p>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.description}</p>
                      </div>
                      </ NavLink >
                      ))}
                  </div>
                  {/*FIN DEL HOME, MYPROJECT Y BLOG DEL MENU OCULTO*/}



                   {/*FUNCTION  POSTS DE BLOG DEL MENU OCULTO*/}
                   <div className="bg-white px-4">
                      {
                      blog_list ?
                      <>
                        <div className="px-4">
                        <h3 className="text-sm underline underline-offset-4 pt-4 text-black font-extrabold">
                         Publicaciones Recientes:
                          </h3>
                          <ul role="list" className="">
                            <li className=''>
                              {
                                blog_list.slice(0, blog_list.length > 2 ? 2 : blog_list.length).map(post => (
                                  <BlogListNavbar 
                                  key={post.excerpt} 
                                  data={post} />
                                ))
                            }
                            </li>
                         </ul>
                        </div>
                       </>
                       :
                     <LoadingCard/>   
                     }
                     {/*ULTIMOS POSTS DE GITHUB  DEL MENU OCULTO*/}

                        {/*ENLACE A LA PAGINA DE TODOS LOS POSTS DE GITHUB*/}
                         <div className="text-sm pb-4 px-4">
                          <a href="/blog" className="font-medium text-indigo-600 hover:text-indigo-500">
                          Ver todos los posts
                         <span aria-hidden="true"> &rarr;</span>
                         </a>
                       </div>
                       {/*ULTIMOS ENLACE A LA PAGINA DE TODOS LOS POSTS DE GITHUB*/}
                   </div> 
                    {/*FIN FUNCTION  POSTS DEl blog DEL MENU OCULTO*/}
                 </div>
                 </Popover.Panel>
                 </Transition>
                  {/*FIN MENU HIDDEN DEL PC */}     
              </>
            )}
             </Popover>
             {/* FIN MENU DESLIZANTE BLOG MENU PANTALLA GRANDE TITULO ICONO DEL*/}
             {/* FINAL BLOG BLOG BLOG BLOG BLOG BLOG BLOG MENU MENU MENU BLOG BLOG BLOG BLOG */}
      
      </div>




           </Popover.Group>
         </div>
          {/*FIN SUBCONTAINER PRINCIPAL CONTIENE DEL MENU DE PANTALLA */}

      
      {/* FIN 1 CONTAINER PRINCIPAL 1 NAVBAR DEL PC max-w-7xl  px-6 */}


    


        {/*MOVIL MOVIL MOVIL MOVIL MOVIL */}
        {/*CONTAINER DESPLEGABLE DE LOS ICONOS LUPA BIHOME QUE SE DESPLIEGA  2 MENU DEL MOVIL*/}
        <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        >

           {/*SECTION DEL MENU ESCONDIDO DEL MOVIL */}
           {/*CONTAINER GENERAL DEL MENU ESCONDIDO  navbar-movil-desplegable*/}
           <Popover.Panel className="absolute top-[0px] w-screen 
           max-w-md right-0 transform translate-x-1/24 
           px-2 sm:px-0 z-50 bg-white md:h-[100vh] h-[100vh]">
              {/*CONTAINER2 GENERAL DEL MENU ESCONDIDO */}
              <div className="divide-y-2 divide-gray-50">

                 {/*1 CONTAINER GENERAL DEL LOGO SEARCH Y MENU HIDDEN  COLUMN DE OPCIONES MYPROJECT,BLOG*/}
                 <div className=" pb-8">

                        {/*2 CONTAINER DEL ICONO DEL LOGO Y HOME */}
                        <div className="flex items-center justify-between px-4 ">
                         {/*ICONO LOGO DEL MENU HIDDEN */}
                         <div className="w-[85%] md:w-[80%]">
                         <img 
                         className="h-8 w-auto"
                         src={logo}
                         alt="logo"
                         width={150}
                         height={50}
                       />
                         </div>
                         {/*ICONO DE HOME DEL LADO CONTRARIO A LOGO */}
                           <div className="w-[15%] md:w-[20%]">
                          <Popover.Button className="inline-flex items-center mt-2 justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-inset focus:ring-violet-200">
                          <span className="sr-only">Close menu</span>
                          {/*ICONO  HOME DEL MENU HIDDEN */}
                          <span className='text-neutral-900 text-xl hover:text-orange-500'> 
                            X
                            </span>
                          </Popover.Button>
                         </div>
                        </div>
                           {/*2 FIN CONTAINER DEL ICONO DEL LOGO Y HOME */}


                        {/*CAJA DEL SEARCH */}
                        {  <div className='w-[94%] mx-auto justify-center px-2 py-2 border-b border-neutral-500 '>
                        { window.location.pathname==='/search/:term'?<>
                        </>
                        :
                        <SearchFormBox className=""  />}  
                        </div>}

                        
                        {/*FIN CAJA DEL SEARCH */}

                        {/*3 CONTAINER DEL MOVIL DE LA NAVEGACION y SEARCH*/}
                        <div className="w-[100%] mx-auto px-4 py-8 ">
                      

                           {solutions.map((item) => (
                            <NavLink 
                            key={item.name}
                            to={item.href} // 💡 Cambiamos 'href' por 'to'
                            className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 border-b border-gray-100 transition-colors duration-200"
                            >
                            {/* 💡 Cambiado text-white por text-neutral-700 para que el icono SE VEA */}
                            <item.icon className="h-6 w-6 flex-shrink-0 text-neutral-700 mt-0.5" aria-hidden="true" />
                                     
                            <div className="ml-4">
                            <p className="text-base font-semibold text-gray-900">{item.name}</p>
                            <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.description}</p>
                            </div>
                            </NavLink >
                            ))}
                           </div>
                           {/* 3 FIN CONTAINER DEL MOVIL DE LA NAVEGACION y SEARCH*/}















                             {/*FUNCTION  POSTS DE BLOG DEL MENU OCULTO*/}
                   <div className="w-[100%] py-4 mx-auto bg-white">
                      {blog_list ? (
                              <>
                              {renderBlogList(blog_list)} {/* Llama a la función para renderizar la lista */}
                              </>
                              ) : (
                              <LoadingCard />
                   
                     )}
                     {/*ULTIMOS POSTS DE GITHUB  DEL MENU OCULTO*/}

                        {/*ENLACE A LA PAGINA DE TODOS LOS POSTS DE GITHUB*/}
                        <div className="text-sm pb-4 px-4">
                                <a href="/blog" className="text-sm font-medium hover:text-orange-500 text-indigo-600 ">
                          Ver todos los posts
                         <span aria-hidden="true"> &rarr;</span>
                         </a>
                       </div>
                       {/*ULTIMOS ENLACE A LA PAGINA DE TODOS LOS POSTS DE GITHUB*/}
                   </div> 
                    {/*FIN FUNCTION  POSTS DEl blog DEL MENU OCULTO*/}

                 </div>
                 {/*FIN CONTAINER GENERAL DEL LOGO SEARCH Y MENU HIDDEN  COLUMN DE OPCIONES MYPROJECT,BLOG*/}


                 {/*FINAL NAVEGACION SEGUNDO SEGMENTO HIDDEN DEL MOVIL */}
              </div>
           </Popover.Panel>
           {/*FIN SECTION DEL MENU ESCONDIDO DEL MOVIL */}
           {/*FIN CONTAINER GENERAL DEL MENU ESCONDIDO */}


        </Transition>
        {/*FIN CONTAINER PRINCIPAL 2 DEL NAVBAR DEL PC Y MOVIL*/}






      </Popover>
    </div>





</>

  )
}

const mapStateToProps = state => ({
  blog_list: state.blog.blog_list,
  user: state.Auth.user,
  isAuthenticated: state.Auth.isAuthenticated,
 
})

export default connect(mapStateToProps,{
  get_blog_list,
  search_blog,
 
})(Navbar)














