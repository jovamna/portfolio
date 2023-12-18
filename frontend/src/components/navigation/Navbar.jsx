import { Popover, Transition } from '@headlessui/react';
import { BiHome} from "react-icons/bi";
import { HiOutlineLibrary } from "react-icons/hi";
import { MdArticle } from "react-icons/md";
import { DiGithubBadge } from "react-icons/di";
import { useState, useEffect, Fragment } from 'react';
//import { useState } from 'react';
import { NavLink,  Navigate } from "react-router-dom";
import jova from "../../assets/img/logo/jova.png";

import pro from "../../assets/img/logo/pro.png";
import "../../styles/index.css";
import { connect } from "react-redux"
import { get_blog_list } from "../../redux/actions/blog";

import project from "../../redux/reducers/project";
import LoadingCard from "../loaders/LoadingCard"
import { search_blog, search_blog_page } from "../../redux/actions/blog";
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid'  //SEARCH
import SearchFormBox from './SearchFormBox'
import DOMPurify from "dompurify";

import { FiX } from "react-icons/fi";
import { Link, Events, animateScroll as scroll } from 'react-scroll';
//import { Link } from 'react-scroll';


const solutions = [
  {
    name: 'Home',
    description: 'Resume de mi Portafolio.',
    href: '/',
    icon: BiHome,
  },
  {
    name: 'MyProjects',
    description: 'Lista de repositorios en Github.',
    href: '/myproject',
    icon: DiGithubBadge,
  },
  {
    name: 'Blog',
    description: 'Articulos sobre los avances en tecnología',
    href: '/blog',
    icon: MdArticle,
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
            className="block "
            >
                <p className='truncate text-gray-200 text-sm hover:text-black hover:bg-white '>
                " {post.excerpt}" 
                </p>
                <p className='text-gray-100 text-xs hover:text-black hover:bg-white mb-4'>leer mas</p>
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






   



  return (
     //{/* CONTAINER PRINCIPAL 1 DEL NAVBAR DEL PC Y MOVIL  sm:px-6 */}
    <div className="navbar z-index fixed w-full  bg-white opacity-95 mx-auto max-w-7xl px-4 lg:px-8">

      {/* CONTAINER GUIA ENGLOBA MENU GRANDE Y MENU MOVIL*/}
      <Popover className="navbar-menu  bg-white">


   
          
         {/* 1 CONTAINER PRINCIPAL CONTIENE DEL MENU DE PANTLLA INCLUYE SOLO EL BOTON ICONO DEL MENU MOVIL QUE ESTA OCULTO */}
         {/*IMPORTANTE EN EL CSS INDEX PONER LA ALTURA HEIGHT 50 con py-7 EL MENU SE HACE MAS LARGO*/}
         <div className="navbar-logo bg-white flex items-center justify-between md:justify-start w-full h-[3rem]">

         
             {/*LOGO DEL MENU ORDENADOR Y MOVIL sm:w-20 md:w-24 lg:w-32 */}
             {/*PARA QUE EL ICONO SE CENTRE inline-flex items-center w-1/4*/}
             <div className="logo w-[26.7%] h-[3rem] inline-flex">
            <a href="/">
            <img className="w-[160px] h-[52px] mt-[5px]"
            src={pro}
            alt="logo"
            //width={150}
            //height={350}
            />
            </a>
             </div>
             {/*FIN LOGO DEL MENU ORDENADOR Y MOVIL*/} 



        
           {/*ICONO MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL */}
           {/*MOVIL ICONO CASA QUE ABRE EL MENU ESCONDIDO ICONO-1LADO DERECHO*/}
           <div className="menu-movil md:hidden h-[2.5em]  bg-white flex flex-row items-center justify-end w-[65%]">
                 


               <Popover.Button className="icon-search-bihome flex flex-row justify-end items-center hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-inset focus:ring-indigo-500 h-[2.5em] w-[26%] ">
               <span className="sr-only">Open menu</span>


                {/*BOTON LUPA DEL BUSCADOR */}
              
                   <MagnifyingGlassIcon className="icon-search h-[20px] w-[20px] text-zinc-800 hover:text-gray-400 mr-4 " aria-hidden="true" />
                
                {/* FIN BUSCADOR */}

              
                 <BiHome className={classNames(
                        open ? 'text-zinc-800' : 'text-zinc-600',
                        'h-[22px] w-[22px] group-hover:text-gray-500  icon-bihome'
                      )}
                      aria-hidden="true"/>
                


               </Popover.Button>
           </div>
           {/*FIN MOVIL ICONO CASA QUE ABRE EL MENU ESCONDIDO ICONO-1LADO DERECHO*/}








           {/*MENU PANTALLA GRANDE */}     
           {/*IMPORTANTE ml-44 PARA MOVER A LADO DERECHO EN MENU */}
           <Popover.Group as="nav" className="navbar-portfolio-pc hidden h-[3rem] w-[80%]  flex justify-between md:flex">

  

          <Link
           className={`nav-item hover:bg-neutral-100 hover:text-violet-700 text-neutral-600 font-semibold border-b-2 border-transparent hover:border-violet-700  h-[100%]  inline-block px-3 py-4 ${currentRoute === 'home' ? 'bg-neutral-300 text-white' : ''}`}
           to="home"
           spy={true}
           smooth={true}
           duration={500}
           >
           Home
         </Link>

          

         <Link
           className={`nav-item hover:bg-neutral-100 hover:text-violet-700 text-neutral-600 font-semibold border-b-2 border-transparent hover:border-violet-700  h-[100%]  inline-block px-3 py-4 ${currentRoute === 'about' ? 'bg-neutral-300 text-white' : ''}`}
           to="about"
           spy={true}
           smooth={true}
           duration={500}
           >
           About
         </Link>


         <Link
           className={`nav-item hover:bg-neutral-100 hover:text-violet-700 text-neutral-600 font-semibold border-b-2 border-transparent hover:border-violet-700  h-[100%]  inline-block px-3 py-4 ${currentRoute === 'skill' ? 'bg-neutral-300 text-white' : ''}`}
           to="skill"
           spy={true}
           smooth={true}
           duration={500}
           >
           Skills
         </Link>


       
          
         <Link
           className={`nav-item hover:bg-neutral-100 hover:text-violet-700 text-neutral-600 font-semibold border-b-2 border-transparent hover:border-violet-700  h-[100%]  inline-block px-3 py-4 ${currentRoute === 'project' ? 'bg-neutral-300 text-white' : ''}`}
           to="project"
           spy={true}
           smooth={true}
           duration={500}
           >
           MyProjects
         </Link>

          {/*<Link className="nav-item hover:bg-neutral-100 hover:text-violet-700 text-neutral-600 font-semibold border-b-2 border-transparent hover:border-violet-700 inline-block px-3 py-4"
           to='curriculum' 
           smooth={true} 
           //offset={-20}
           duration={500}>
            C.V.
          </Link>
                 */}
          <Link
           className={`nav-item hover:bg-neutral-100 hover:text-violet-700 text-neutral-600 font-semibold border-b-2 border-transparent hover:border-violet-700  h-[100%]  inline-block px-3 py-4 ${currentRoute === 'contacto' ? 'bg-neutral-300' : ''}`}
           to="contacto"
           spy={true}
           smooth={true}
           duration={500}
           >
           Contacto
         </Link>
     

   

                        

             {/* BLOG BLOG BLOG BLOG BLOG BLOG BLOG MENU MENU MENU BLOG BLOG BLOG BLOG */}
             <NavLink to= "/blog" className="nav-item hover:bg-neutral-100 hover:text-violet-700 text-neutral-600 font-semibold border-b-2 border-transparent hover:border-violet-700 inline-block px-3 py-4 ">
             <span className="py-2">Blog</span>
             </NavLink>

        

            {/* BUSCADOR */}
            <div className='flex space-x-10'>
            <button
             onClick={() => {
             setIsSearchOpen(!isSearchOpen);
             }}
            className="text-base font-medium text-gray-500 hover:text-gray-900"
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
             <Popover className="relative flex justify-end">
             {({ open }) => (
              <>

                 <Popover.Button
                 className={classNames(open ? 'text-gray-900' : 'text-gray-500',
                 'group inline-flex items-center rounded-md  text-base font-medium focus:outline-none focus:ring-0'
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
                 className="absolute top-12 w-screen bg-violet-400 max-w-md right-0 transform translate-x-1/12 px-2 sm:px-0">
                
                 <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  {/*MENU: HOME, MYPROJECT Y BLOG DEL MENU OCULTO*/}
                  <div className="relative grid sm:gap-12 sm:p-8">
                         {solutions.map((item) => (
                         <a
                         key={item.name}
                         href={item.href}
                         className="-m-3 flex items-start rounded-lg hover:bg-gray-50"
                         >
                         <item.icon className="h-6 w-6 flex-shrink-0 text-white" aria-hidden="true" />
                         <div className="ml-4">
                            <p className="text-base font-medium text-gray-900">{item.name}</p>
                            <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                         </div>
                        </a>
                         ))}
                  </div>
                  {/*FIN DEL HOME, MYPROJECT Y BLOG DEL MENU OCULTO*/}



                   {/*FUNCTION  POSTS DE BLOG DEL MENU OCULTO*/}
                   <div className="bg-neutral-700 px-4">
                      {
                      blog_list ?
                      <>
                        <div className="mt-4">
                          <h3 className="text-base font-semibold underline underline-offset-4 pt-4 text-gray-400">
                          Recent Posts
                          </h3>
                          <ul role="list" className="mt-2 space-y-4">
                            <li>
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
                        <div className="mt-2 text-sm pb-4">
                                <a href="/blog" className="font-medium text-indigo-600 hover:text-indigo-500">
                          View all posts
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
           {/*CONTAINER GENERAL DEL MENU ESCONDIDO */}
           <Popover.Panel focus className="navbar-movil-desplegable bg-white absolute inset-x-0 top-0 origin-top-right  transform p-2 transition md:hidden">
              {/*CONTAINER2 GENERAL DEL MENU ESCONDIDO */}
              <div className="divide-y-2 divide-gray-50 rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5">

                 {/*1 CONTAINER GENERAL DEL LOGO SEARCH Y MENU HIDDEN  COLUMN DE OPCIONES MYPROJECT,BLOG*/}
                 <div className=" pb-8">

                        {/*2 CONTAINER DEL ICONO DEL LOGO Y HOME */}
                        <div className="flex items-center justify-between  px-4">
                         {/*ICONO LOGO DEL MENU HIDDEN */}
                         <div className=" ">
                         <img 
                         className="h-8 w-auto"
                         src={jova}
                         alt="logo"
                         width={150}
                         height={50}
                       />
                         </div>
                         {/*ICONO DE HOME DEL LADO CONTRARIO A LOGO */}
                         <div className="">
                          <Popover.Button className="inline-flex items-center mt-2 justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-inset focus:ring-violet-200">
                          <span className="sr-only">Close menu</span>
                          {/*ICONO  HOME DEL MENU HIDDEN */}
                          <span className='text-neutral-800 text-lg hover:text-orange-500'> X</span>
                          </Popover.Button>
                         </div>
                         </div>
                           {/*2 FIN CONTAINER DEL ICONO DEL LOGO Y HOME */}


                            {/*CAJA DEL SEARCH */}
                          {  <div className='w-full  justify-center bg-violet-400   px-2 py-8 '>
                           { window.location.pathname==='/search/:term'?<>
                           </>
                           :
                           <SearchFormBox className=""  />}  
                           </div>}

                        
                           {/*FIN CAJA DEL SEARCH */}

                          {/*3 CONTAINER DEL MOVIL DE LA NAVEGACION y SEARCH*/}
                           <div className="w-[95%] mx-auto   pt-6">
                      

                           <nav className="grid gap-y-6">
                           {solutions.map((item) => (
                           <a
                           key={item.name}
                           href={item.href}
                           className="-m-3 flex items-center rounded-md p-3 hover:bg-violet-500 bg-violet-400  border-b border-white"
                           >
                           <item.icon className="h-6 w-6 flex-shrink-0 text-white" aria-hidden="true" />
                           <span className="ml-3 text-sm font-semibold text-stone-900">
                            {item.name} 
                            </span>
                            </a>
                            ))}
                           </nav>
                           </div>
                           {/* 3 FIN CONTAINER DEL MOVIL DE LA NAVEGACION y SEARCH*/}















                             {/*FUNCTION  POSTS DE BLOG DEL MENU OCULTO*/}
                   <div className="bg-neutral-700 px-4">
                      {
                      blog_list ?
                      <>
                        <div className="mt-4">
                          <h3 className="text-sm font-semibold underline underline-offset-4 pt-4 text-gray-400">
                          Publicaciones Recientes:
                          </h3>
                          <ul role="list" className="mt-2 space-y-4">
                            <li className="py-2">
                              {
                                blog_list.slice(0, blog_list.length > 2 ? 2 : blog_list.length).map(post => (
                                  <BlogListNavbar 
                                  key={post.excerpt} 
                                  data={post} 
                                 
                                  />
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
                        <div className="text-sm pb-4">
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




{/*project_list.slice(0,2).map((project)=>(
<ProjectTard data={project}/>*/}












{/*<div className="bg-neutral-700 px-4 ">
     
     {blog_list ?
<>
<div className="mt-4">

<ul role="list" className="mt-2 space-y-4">
{blog_list.slice(0, blog_list.length > 2 ? 2 : blog_list.length).map(post => (
<li key={post.slug}>
<BlogListNavbar data={post} />


<Link to={`/blog/post/${post.slug}`} className="block">
<p className="truncate">{post.excerpt}</p>
<p>leer mas</p>
</Link>
</li>
))}
</ul>
</div>
</>
:
<LoadingCard/>   
}
</div>*/}