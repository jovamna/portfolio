import { BiHome } from "react-icons/bi";
import { HiOutlineLibrary } from "react-icons/hi";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { MdArticle } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { DiGithubBadge } from "react-icons/di";
import { Menu ,Popover, Transition } from '@headlessui/react'
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid'  //SEARCH
import { load_user, logout} from '../../redux/actions/auth/auth';
import { useDispatch } from 'react-redux';
import "../../styles/index.css";

//PARA HACER LA FUNCTION DE LISTAR DOS POSTS EN EL MENU OCULTO
import { useEffect, useState, Fragment } from 'react';
import { connect } from "react-redux"
import { get_blog_list } from "../../redux/actions/blog";
import DOMPurify from "dompurify";

import SearchFormBox from './SearchFormBox'
import Alert from '../../components/Alert'
import { search_blog, search_blog_page } from "../../redux/actions/blog";
import { useParams } from "react-router-dom";
import LoadingCard from "../loaders/LoadingCard";//usado en return--renderBlogList
import jova from "../../assets/img/logo/jova.png";
import logo from "../../assets/img/logo/logo.png";
import loginUser from "../../assets/img/users/loginUser.png";




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
    icon: DiGithubBadge ,
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



function NavbarProject({
  isAuthenticated,
  user,
  logout,
  get_blog_list, 
  blog_list,

  
}) {
  //console.log('isAuthenticated:', isAuthenticated);
  //const navigate = useNavigate(); // Utiliza useNavigate para acceder al método navigate

  const params = useParams()
  const term = params.term

  useEffect(()=>{
    get_blog_list()
    search_blog(term)
  }, [])

  //const location = useLocation()

  
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
      // Despacha la acción de logout /FUNTIONI REDUX ACTION) para realizar el cierre de sesión
      dispatch(logout());
      console.log(dispatch(logout()))
  
      // Redirige al usuario a la página de inicio u otra página después del logout
      navigate('/blog'); 
  };
  


  //DASHBOARD Y LOGOUT
  const authLinks = (
  <Menu>
      <div className='user-activo w-[13%] flex flex-row justify-around px-3 h-[2rem]'>
   
      <Menu.Button className="hola-button flex flex-row justify-around justify-center items-center focus:outline-none w-[100%] h-[1.6rem]">
           <span className='hola w-[70%] inline-block  text-neutral-950 font-semibold hover:text-gray-600 font-sans text-xs'>
            Hola {user && user.first_name}
            </span> <span className="hola-bola newsletter-animation  inset-0 flex text-black  ml-[2px] mt-[4px] text-[0.5rem] text-center">
            ⚪
            </span> 
      </Menu.Button>
  


   
      <Menu.Items 
      className="origin-top-right absolute right-0 mt-[32.6px] w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/profile"
                className={classNames(
                  active ? 'bg-gray-500 text-white' : 'text-zinc-600 font-semibold',
                  'block px-4 py-2 text-sm'
                )}
              >
                Profile
              </Link>
            )}
          </Menu.Item>
                
          {/*FORM DE LOGOUT */}
          <form method="POST" action="/blog">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    console.log('Logout button clicked'); // Agrega un console.log aquí
                    handleLogout();
                  }}
                  className={classNames(
                    active ? 'bg-gray-500 text-white' : 'text-zinc-600 font-semibold',
                    'block w-full text-left px-4 py-2 text-sm'
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </form>
        </div>





      </Menu.Items>
      </div>
  </Menu>
)




//INICIAR SESION O REGISTRARSE
const guestLinks = (
  <Fragment>

    <div className='container-movil-login-registro w-[12.7%] flex flex-row justify-around h-[1.8rem]'>
         <div className=' '>
            <Link to="/login">
            <img className="hover:text-gray-500"
            src={loginUser}
            alt="login"
            width={20}
            height={10}
            />
            </Link>
            </div>
            <div className=' '>
            <Link to="/login" className="nav-item hover:text-gray-500 lg:text-sm sm:text-xs text-neutral-600 font-semibold">
              <p className=''>
              Inicia sesion 
              </p>
           </Link>
           </div>
          
    </div>

  </Fragment>
)




  // lista de posts
  const renderBlogList = (blog_list) => {
    return (
      <div className="mt-4 bg-black w-[100%] px-4">
          <h3 className="text-sm underline underline-offset-4 pt-4   text-white">
            Publicaciones Recientes:
            </h3>
           
          <ul role="list" className="">
              
         
            {blog_list.slice(0, blog_list.length > 2 ? 2 : blog_list.length).map(post => (
               <li key={post.slug} className="py-2">   
                <Link 
               to={`/blog/post/${post.slug}`} 
               className="block"
               >

               <p  className='hover:bg-gray-500 text-sm text-white truncate ..'>
              {post.excerpt && post.excerpt
              .split(' ') // Dividir el texto en palabras NO FUNCIONO
              .slice(0, 20) // Seleccionar las primeras 20 palabras NO FUNCIONO
              .join(' ') // Volver a unir las palabras en un solo texto NO FUNCIONO
              }
             </p>
             {/*console.log(post.excerpt)*/}
             {/*console.log("Valor de post.excerpt:", post.excerpt)*/}
        
          <p className='text-white hover:bg-gray-500   hover:text-orange-500'>
            leer mas
            </p>

            </Link>

            </li>
           
            ))}
           </ul>
      
           </div>

            )
    }





  return (
   
    <>
   <div className="navbar-project-movil z-index fixed w-full bg-white opacity-95 mx-auto max-w-7xl px-4 lg:px-8 ">
      {/*POPOVER PRINCIPAL */}
      <Popover className="navbar-project-movil-popover ">


        {/* 1 CONTAINER PRINCIPAL 1 DEL NAVBAR DEL PC Y  MENU MOVIL ESCONDIDO*/}
           <div className="navbar-logo flex items-center justify-between md:justify-start w-full h-[3em]">




               {/*PARA QUE EL ICONO SE CENTRE inline-flex items-center */}
               {/*LOGO DEL MENU DE NAVEGACION ORDENADORY MOVIL */}
               <div className="flex logo w-[26.7%] h-[2.5em]">
               
               <span className="sr-only">Portafolio Jovamna Medina</span>
               <NavLink to= "/">
              <img className="image-logo lg:h-[65px] flex"
               src={logo}
               alt="logo"
               //width={150}
               //height={350}
               />
               </NavLink>
               </div>
               {/*FIN LOGO DEL MENU DE NAVEGACION*/}  
             
  
 
        {/*MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL */}
        {/*ICONO QUE SE VE SOLO EN MOVIL Y ESTA DENTRO DEL CONTAINER DEL PC. -my-2 -mr-2 rounded-md*/}
        <div className="menu-movil md:hidden h-[2.5em] flex flex-row items-center justify-end w-[65%]">
                {/*LOGIN Y LOGOUT LOGIN Y LOGOUT */} 
         
               {
               isAuthenticated ? authLinks:guestLinks
               }
              
                {/*FIN LOGIN Y LOGOUT LOGIN Y LOGOUT */}   


               <Popover.Button className=" icon-search-bihome flex flex-row justify-end items-center hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-inset focus:ring-indigo-500 h-[2.5em] w-[26%] ">
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
        {/*FIN MOVIL MENU MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL */}







              {/*CONTAINER DEL MENU PANTALLA GRANDE DONDE ESTA HOME, MYPROJECTS Y BLOG */}
              {/*IMPORTANTE ml-44 PARA MOVER A LADO DERECHO EN MENU */}
              <Popover.Group as="nav" className="hidden justify-between w-4/5  h-[3rem] md:flex py-4">
         
                  <NavLink to= "/" className="nav-item hover:bg-neutral-100 hover:text-violet-700 border-b-2 border-transparent hover:border-violet-700 inline-block px-3 h-[2rem] text-neutral-600 font-semibold">
                  Home
                  </NavLink>

                

                  <NavLink to= "/blog" className="nav-item  text-neutral-600 font-semibold hover:bg-neutral-100 hover:text-violet-700 border-b-2 border-transparent hover:border-violet-700 inline-block px-3 h-[2rem]">
                  <span className="ml-6 "
                  >Blog
                  </span>
                  </NavLink>

                 


              
             
            {/* BUSCADOR */}
            <div  className='flex space-x-10  h-[2rem] pb-6'>
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
              className={`absolute z-20 top-16 right-[280px] w-[750px] max-w-md right-0 transform translate-x-1/12 sm:px-0 pb-[3.5px] ${
              isSearchOpen ? 'block' : 'hidden'
               }`}
               >

              <SearchFormBox />
             </div>

                 </div>
                 {/* FIN BUSCADOR */}


            
                {/* LOGIN INICIAR SESION */}
           
                {
                isAuthenticated ? authLinks:guestLinks
                }
              

            
                 {/*ICONO DEL BLOG EN PANTALLA GRANDE*/}
                 {/* BLOG BLOG CON MENU DESLIZANTE rounded-md */}
                 <Popover className="relative flex justify-end items-center">
                  {({ open }) => (
                  <>

                     <Popover.Button
                     className={classNames(
                     open ? 'text-gray-900' : 'text-gray-500',
                     'group inline-flex items-center hover:bg-gray-100 focus:outline-none '
                     )}
                     >


                       {/*ICONO DEL MENU BLOG IMPORTATE PARA QUE EL BIHOME NO ESTE AL LIMITE mr-[1px*/}
                       {/*ICONO IGLESIAS EN MENU PANTALLA GRANDE ICONO DEL BLOG */}
                     <HiOutlineLibrary
                      className={classNames(open ? 'text-zinc-500' : 'text-zinc-500',
                     'h-6 w-6 hover:text-gray-400 '
                     )}
                     aria-hidden="true" 
                     />
                     </Popover.Button>



                     {/*CONTAINER DEL MENU HIDDEN DE LA PANTALLA PC */}

                    <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                    >


                       <Popover.Panel className="absolute top-12 w-screen bg-violet-400  max-w-md right-0 transform translate-x-1/12 px-2 sm:px-0">
                         <div className="overflow-hidden  [10rem] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">

                            {/* MENU ESCONDIDO PANTALLA GRANDE, HOME, MYPROJECTS*/}
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
                            {/* FIN MENU ESCONDIDO PANTALLA GRANDE, HOME, MYPROJECTS*/}





                              {/*MENU HIDDEN EN PANTALLA GRANDE  RECIENTES POSTS DE PROJECTS */}    
                              {/* USE EL COMPONENTE BLOG-LIST E HICE UNA FUNCTION DE RENDERIZADO ARRIBA DE TODO*/}
                              <div className="bg-neutral-700 px-4 ">
                              {blog_list ? (
                              <>
                              {renderBlogList(blog_list)} {/* Llama a la función para renderizar la lista */}
                              </>
                              ) : (
                              <LoadingCard />
                              )}
                              {/* ENLACE A LA PAGINA DE TODOS LOS POSTS DE GITHUB */}
                              <div className="text-sm pb-4">
                                <a href="/blog" className="font-medium text-indigo-600 hover:text-indigo-500">
                                  View all posts
                                  <span aria-hidden="true"> &rarr;</span>
                                  </a>
                                  </div>
                              </div> 
                              {/* FIN MENU ESCONDIDO PANTALLA GRANDE RECIENTES POSTS DE PROJECTS */}






                         </div>
                       </Popover.Panel>
                    </Transition>
                  </>
                  )}
                 </Popover>
                 {/* FIN MENU BLOG ICONO EN PANTALLA GRANDE*/}



              </Popover.Group>


             {/*PONER NAVEGACION */}

          </div>
     
        {/* FIN CONTAINER PRINCIPAL 1 DEL NAVBAR DEL PC Y MOVIL*/}






















        {/* 2 CONTAINER PRINCIPAL 2 MENU DEL MOVIL*/}
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
           <Popover.Panel focus className="bg-white absolute inset-x-0 top-0 px-0 origin-top-right   transform p-2 transition md:hidden">
              {/*CONTAINER2 GENERAL DEL MENU ESCONDIDO */}
              <div className="divide-y-2 divide-gray-50 rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5">


                 {/*1 CONTAINER GENERAL DEL LOGO SEARCH Y MENU HIDDEN  COLUMN DE OPCIONES MYPROJECT,BLOG*/}
                 <div className=" 0 pb-8">


                        {/*2 CONTAINER DEL ICONO DEL LOGO Y HOME */}
                        <div className="flex items-center justify-between  px-4">
                         {/*ICONO LOGO DEL MENU HIDDEN */}
                         <div className=" ">
                         <img 
                         className="h-8 w-auto"
                         src={logo}
                         alt="logo"
                         width={150}
                         height={50}
                       />
                         </div>

                         {/*ICONO DE HOME DEL LADO CONTRARIO A LOGO */}
                         <div className="">
                          <Popover.Button className="inline-flex items-center mt-2 justify-center  p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-inset ">
                          <span className="sr-only">Close menu</span>
                          {/*ICONO  HOME DEL MENU HIDDEN */}
                          <span className='text-neutral-800 text-lg hover:text-orange-500'> X</span>
                         
                         
                          </Popover.Button>
                         </div>
                         </div>
                           {/*2 FIN CONTAINER DEL ICONO DEL LOGO Y HOME */}



              


                           <div className='w-[94%] mx-auto justify-center px-2 py-8 border-b border-neutral-500 bg-black'>
                           { window.location.pathname==='/search/:term'?<>
                           </>
                           :
                           <SearchFormBox className=""  />}  
                           </div>
               















                           

                          {/*3 CONTAINER DEL MOVIL DE LA NAVEGACION y SEARCH*/}
                           <div className="w-[88%] mx-auto   pt-6">
                      

                           <nav className="grid gap-y-6  ">
                           {solutions.map((item) => (
                           <a
                           key={item.name}
                           href={item.href}
                           className="-m-3 flex items-center p-3 border-b border-neutral-500 bg-black hover:bg-gray-500"
                           >
                           <item.icon className="h-6 w-6 flex-shrink-0 text-white hover:text-orange-500 " aria-hidden="true" />
                           <span className="ml-3 text-sm font-semibold text-white hover:text-orange-500">
                            {item.name} 
                            </span>
                            </a>
                            ))}
                           </nav>
                           </div>
                           {/* 3 FIN CONTAINER DEL MOVIL DE LA NAVEGACION y SEARCH*/}







                             {/*FUNCTION  POSTS DE BLOG DEL MENU OCULTO*/}
                       {/*MENU HIDDEN EN PANTALLA GRANDE  RECIENTES POSTS DE PROJECTS */}    
                              {/* USE EL COMPONENTE BLOG-LIST E HICE UNA FUNCTION DE RENDERIZADO ARRIBA DE TODO*/}
                              <div className="w-[94%] mx-auto  text-sm">
                              {blog_list ? (
                              <>
                              {renderBlogList(blog_list)} {/* Llama a la función para renderizar la lista */}
                              </>
                              ) : (
                              <LoadingCard />
                              )}
                              {/* ENLACE A LA PAGINA DE TODOS LOS POSTS DE GITHUB */}
                              <div className="pb-4 bg-black px-4">
                                <a href="/blog" className="text-sm font-medium text-yellow-400 hover:text-orange-500">
                                  Ver todos los posts
                                  <span aria-hidden="true"> &rarr;</span>
                                  </a>
                                  </div>
                              </div> 
                              {/* FIN MENU ESCONDIDO PANTALLA GRANDE RECIENTES POSTS DE PROJECTS */}


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
      {/*FIN POPOVER PRINCIPAL */}


   </div>


<Alert/>
 </>
  )
}


const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  loading:state.Auth.loading,
  blog_list: state.blog.blog_list,
})

export default connect(mapStateToProps,{
  logout,
  get_blog_list,
  load_user,
})(NavbarProject)