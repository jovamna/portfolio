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
    name: 'Blog',
    description: 'Articulos sobre los avances en tecnología',
    href: '/blog',
    icon: MdArticle,
  },
  {
    name: 'Cálculo del IRPF',
    description: 'Herramienta útil para calcular el irpf.',
    href: '/calcula-irpf',
    icon: MdArticle,
  },
  {
    name: 'F.T.Hosteleria',
    description: ' Diseñado para ayudar a digitalizar la gestión de pequeños negocios de hostelería de forma gratuita.',
    href: '/hosteleria-ficha-tecnica',
    icon: MdArticle,
  },
  {
    name: 'Escandallo',
    description: ' Diseñado para ayudar a digitalizar la gestión de pequeños negocios de hostelería de forma gratuita.',
    href: '/escandallo',
    icon: MdArticle,
  },
  {
    name: 'Tarifa-Luz',
    description: 'Calcula el precio de tu tarifa de Luz.',
    href: '/tarifa-luz',
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
                <Link 
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

            </Link>

            </li>
           
            ))}
           </ul>
      
           </div>

            )
    }










  


  //CODIGO PARA LOS ICONOS DE USUARIOS ACTIVOSDASHBOARD Y LOGOUT
  const authLinks = (
  <Menu>
      <div className='w-[90%] lg:w-[100%] flex flex-row h-[2rem] items-center '>
   
      <Menu.Button className="hola-button flex flex-row justify-around justify-center items-center focus:outline-none w-[100%] h-[1.6rem]">
           <span className='hola  inline-block  text-neutral-950 font-semibold hover:text-gray-600 font-sans text-xs'>
            Hola {user && user.first_name}
            </span> <span className="hola-bola newsletter-animation  inset-0 flex text-black  ml-[4px] mt-[4px] text-[0.5rem] text-center">
            ⚪
            </span> 
      </Menu.Button>
  


   
      <Menu.Items 
      className="origin-top-right 
      absolute right-0 
      w-56 rounded-md shadow-lg 
      bg-white ring-1 ring-black 
      ring-opacity-5 focus:outline-none">

        <div className="">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/profile"
                className={classNames(
                  active ? 'bg-gray-500 text-white' : 'text-zinc-600 font-semibold',
                  'block text-sm'
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
                    'block w-full text-left px-2 py-2 text-sm'
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

    <div className='flex items-center justify-end md:w-[100%] lg:w-[100%] w-[100%] h-[40px] lg:h-[56px]'>

         <div className='inline-flex  items-center justify-end  w-[30%] md:w-[30%] lg:w-[30%] lg:h-[56px] h-[40px]'>
            <Link to="/login">
            <img className="text-black hover:text-gray-500 w-[26px] h-[24px] "
            src={loginUser}
            alt="login"
           
            />
            </Link>
        </div>

        <div className='inline-flex items-center justify-end w-[70%] md-w-[70%] lg:w-[60%] h-[40px] lg:h-[56px] '>
              <p className=' hover:text-gray-500 lg:text-sm sm:text-xs text-xs text-black font-semibold'>
            <Link to="/login" className="">
          
              Inicia sesion 
            
           </Link>
             </p>
        </div>
          
    </div>

  </Fragment>
)




 





    
  return (
   
     <>
    <div className="z-index fixed 
    w-full md:w-full lg:w-full xl:w-[100%] 
    lg:h-[60px] opacity-95 bg-white">

       {/*POPOVER PRINCIPAL */}
       <Popover className=" 
       lg:h-[60px] sm:h-[60px] md:h-[60px] 
       lg:w-[100%] xl:h-[60px] h-[48px]">


        {/* 1 CONTAINER PRINCIPAL 1 DEL NAVBAR DEL PC Y  MENU MOVIL ESCONDIDO*/}
           <div className="flex flex-row items-center justify-center md:flex mx-auto
          w-[100%] lg:w-[95%] xl:-[100%] 2xl:-[100%]
          h-[48px]  sm:h-[60px]  md:h-[60px] lg:h-[60px] 
           max-w-[95%] mx-auto">

             
               {/*LOGO DEL NAV DE NAVEGACION ORDENADORY MOVIL */}
               <div className="inline-flex 
               justify-start 
               w-[38%] lg:w-[15%] 
               h-[48px] md:h-[60px] sm:h-[60px] lg:h-[60px]">
               
               <span className="sr-only">Portafolio Jovamna Medina</span>
               <NavLink  className="focus:outline-none focus:ring-0 focus-visible:outline-none"
               to= "/">
               <img className="image-logo w-full h-full md:h-full md:w-full lg:h-[60px] object-contain"
               src={logo}
               alt="logo"
           
               />
               </NavLink>
               </div>
               {/*FIN LOGO DEL MENU DE NAVEGACION*/}  
             
  
                    {/*MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL */}
                    {/*ICONO QUE SE VE SOLO EN MOVIL Y ESTA DENTRO DEL CONTAINER DEL PC. -my-2 -mr-2 rounded-md*/}
                    <div className=" lg:hidden xl:hidden 2xl:hidden 
                      h-[48px] sm:h-[60px]  md:h-[60px]  
                      flex flex-row w-[62%] 
                      justify-center items-center md:space-x-20">
                        {/*LOGIN Y LOGOUT LOGIN Y LOGOUT */} 

                       <div className="inline-flex py-2 md:py-2 w-[60%] h-[48px] sm:h-[60px] md:h-[60px] md:w-[30%]">
                         {
                        isAuthenticated ? authLinks:guestLinks
                         }
            
                       </div>
               
                      {/*FIN LOGIN Y LOGOUT LOGIN Y LOGOUT */}   

                      {/**BLOQUE DE LUPA Y BIHOME DESLIZANTE */}
                     <Popover.Button className="icon-search-bihome 
                     flex flex-row justify-end  items-center 
                     hover:bg-gray-100 hover:text-gray-500 md:h-[60px] sm:h-[60px]
                     focus:outline-none h-[2.5em] w-[40%] md-w-[20%]">
                     <span className="sr-only">Open menu</span>


                     {/*BOTON LUPA DEL BUSCADOR */}
                    <div className=" inline-flex w-[60%] md:h-[60px] sm:h-[60px] md-[30%] justify-center items-center">
                        <MagnifyingGlassIcon className="icon-search 
                         h-[20px] w-[20px]  
                         text-zinc-800 
                         hover:text-gray-400" aria-hidden="true" />

                     </div>
                     {/* FIN BUSCADOR */}






                 <div className="w-[40%] md:w-[10%] inline-flex md:h-[60px] sm:h-[60px] justify-center items-center">
                   <BiHome className={classNames(
                        open ? 'text-zinc-800' : 'text-zinc-600',
                        'h-[22px] w-[22px] group-hover:text-gray-500  icon-bihome'
                      )}
                      aria-hidden="true"/>

                 </div>
                
                


               </Popover.Button>


                    </div>
                    {/*FIN MOVIL MENU MOVIL MOVIL MOVIL MOVIL MOVIL MOVIL */}



              {/*CONTAINER DEL MENU PANTALLA GRANDE DONDE ESTA HOME, MYPROJECTS Y BLOG */}
              {/*IMPORTANTE ml-44 PARA MOVER A LADO DERECHO EN MENU */}
              <Popover.Group as="nav" 
              className="hidden lg:flex items-center justify-between 
              w-[79%] h-full lg:h-[60px] 
              lg:block lg:w-[85%]">


                

                      {/**SEGUNDO BLOQUE AQUI ESTA EL PROBLEMA QUE ESTE DIV SE QUEDA ABAJO DEL DIV GENERAL*/}
                      {/** <div className="inline-flex lg:w-[70%] lg:h-[60px] bg-teal-400">*/}
                 <div className="flex items-center h-full lg:w-[65%]">
         
                  <NavLink to= "/" className="nav-item hover:bg-neutral-100 
                  hover:text-violet-700 border-b-2 border-transparent 
                  hover:border-violet-700 inline-block 
                  px-3 h-[2rem] text-black font-semibold
                  lg:text-sm">
                  Home
                  </NavLink>

                

                  <NavLink to= "/blog" className="nav-item  
                  text-black font-semibold hover:bg-neutral-100 
                  hover:text-violet-700 border-b-2 border-transparent 
                  hover:border-violet-700 inline-block px-3 h-[2rem]
                  lg:text-sm">
                  <span className="ml-6 "
                  >Blog
                  </span>
                  </NavLink>

                   <NavLink to= "/calcula-irpf" className="nav-item  
                   text-black font-semibold hover:bg-neutral-100 
                   hover:text-violet-700 border-b-2 border-transparent 
                   hover:border-violet-700 inline-block px-3 h-[2rem]
                   lg:text-sm">
                  <span className="ml-6">
                    Calculo-IRPF
                  </span>
                  </NavLink>

                     <NavLink to= "/hosteleria-ficha-tecnica" className="nav-item  
                   text-black font-semibold hover:bg-neutral-100 
                   hover:text-violet-700 border-b-2 border-transparent 
                   hover:border-violet-700 inline-block px-3 h-[2rem]
                   lg:text-sm">
                  <span className="ml-6 "
                  >F.T.Hosteleria
                  </span>
                  </NavLink>


                   <NavLink to= "/escandallo" className="nav-item  
                   text-black font-semibold hover:bg-neutral-100 
                   hover:text-violet-700 border-b-2 border-transparent 
                   hover:border-violet-700 inline-block px-3 h-[2rem]
                   lg:text-sm">
                  <span className="ml-6 "
                  >Escandallo
                  </span>
                  </NavLink>

                  <NavLink to= "/tarifa-luz" className="nav-item text-black 
                  font-semibold hover:bg-neutral-100 hover:text-violet-700 
                  border-b-2 border-transparent hover:border-violet-700 
                  inline-block px-3 h-[2rem]
                  lg:text-sm">
                  <span className="ml-6">
                    Tarifa-Luz
                  </span>
                  </NavLink>
                  
                 </div>
                 

                {/**TERCER BLOQUE ULTIMO E PARTES BUSCADOR USUARIO BIHOME*/}
                <div className="flex justify-center items-center lg:w-[35%] h-full">
             
                 {/* BUSCADOR */}
                 <div  className='inline-flex  lg:w-[50%] flex justify-center items-center lg:h-[56px]'>
                <button
                onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                 }}
                className="text-base font-medium text-black hover:text-gray-900"
                >
                {isSearchOpen ? (
                <FiX className="h-5 w-5 ml-10text-blackhover:text-gray-400" aria-hidden="true" />
                 ) : (
                <MagnifyingGlassIcon className="h-5 w-5 ml-10 text-black hover:text-gray-700" aria-hidden="true" />
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
               <div className="lg:w-[45%] lg:h-[60px] inline-flex items-center">
                  {
                isAuthenticated ? authLinks:guestLinks
                }


               </div>
              
              

            
                 {/*AQUI ESTABA EL ICONO QUE MOSTRABA EL NABVAR ERA REDUNDANTE ICONO DEL BLOG EN PANTALLA GRANDE*/}
               
                 {/* FIN MENU BLOG ICONO EN PANTALLA GRANDE*/}

                </div>

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

           <Popover.Panel className="absolute top-[0px] w-screen 
           max-w-md right-0 transform translate-x-1/24 
           px-2 sm:px-0 z-50 bg-white md:h-[100vh] h-[100vh]">
              {/* <Popover.Panel focus className="bg-white absolute inset-x-0 top-0 px-0 origin-top-right py-2 transform transition md:hidden">*/}
              {/*CONTAINER2 GENERAL DEL MENU ESCONDIDO */}
              <div className="">


                 {/* CONTAINER GENERAL DEL LOGO SEARCH Y MENU HIDDEN  COLUMN DE OPCIONES MYPROJECT,BLOG*/}
                 <div className="pb-8 ">


                        {/*1 CONTAINER DEL LOGO DELETE 100% */}
                        <div className="flex w-[100%] md:w-[100%] items-center px-4">
                           {/*ICONO LOGO DEL MENU HIDDEN */}
                           <div className="w-[78%] md:w-[80%]">
                            <img 
                            className="h-8 w-auto"
                            src={logo}
                            alt="logo"
                            width={150}
                            height={50}
                            />
                           </div>

                         {/*DELETE X DEL LADO CONTRARIO A LOGO */}
                         <div className="w-[22%] md:w-[20%]">
                          <Popover.Button className="inline-flex items-center mt-2 
                          justify-center  p-2 text-gray-400 hover:bg-gray-100 
                          hover:text-gray-500 focus:outline-none focus:ring-0 
                          focus:ring-inset ">
                          <span className="sr-only">Close menu</span>
                          {/*ICONO  HOME DEL MENU HIDDEN */}
                          <span className='text-neutral-900 text-xl  hover:text-orange-500'> 
                            X
                          </span>
                          </Popover.Button>
                         </div>



                         </div>

                           {/*2 CONTAINER SEARCH 100%*/}
                           <div className='w-[94%] mx-auto justify-center px-2 py-2 border-b border-neutral-500 bg-white'>
                           { window.location.pathname==='/search/:term'?<>
                           </>
                           :
                           <SearchFormBox className=""  />}  
                           </div>
              
                          {/*3 NAVEGACION BLOG ESCANDALLO HOME ETC  100%*/}
                          <div className="relative grid gap-6 p-6 sm:gap-12 sm:p-8 bg-white">
                         {solutions.map((item) => (
                          <Link
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
                         </Link>
                          ))}
                         </div>
                         {/* FIN MENU DESLIZANTE */}
                           {/* 3 FIN CONTAINER DEL MOVIL DE LA NAVEGACION y SEARCH*/}







                        {/*FUNCTION  POSTS DE BLOG DEL MENU OCULTO*/}
                        {/*MENU HIDDEN EN PANTALLA GRANDE  RECIENTES POSTS DE PROJECTS */}    
                        {/* USE EL COMPONENTE BLOG-LIST E HICE UNA FUNCTION DE RENDERIZADO ARRIBA DE TODO*/}
                        <div className="w-[100%] mx-auto text-sm bg-white">
                              {blog_list ? (
                              <>
                             {renderBlogList(blog_list)} {/* Llama a la función para renderizar la lista */}
                              </>
                              ) : (
                              <LoadingCard />
                              )}
                              {/* ENLACE A LA PAGINA DE TODOS LOS POSTS DE GITHUB */}
                              <div className="pb-4 px-4">
                                <Link to="/blog" className="text-sm font-medium text-indigo-600  hover:text-orange-500">
                                  Ver todos los posts
                                  <span aria-hidden="true"> &rarr;</span>
                                  </Link>
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









  //{/*<Popover className="inline-flex  lg:w-[10%] flex justify-end items-center lg:h-[56px]">
         //         {({ open }) => (
          //        <>

           //          <Popover.Button
           //          className={classNames(
           //          open ? 'text-gray-900' : 'text-gray-500',
           //          'group inline-flex items-center hover:bg-gray-100 focus:outline-none '
             //        )}
             //        >


             
             //          {/*ICONO IGLESIAS EN MENU PANTALLA GRANDE ICONO DEL BLOG */}
                    // <HiOutlineLibrary
               //       className={classNames(open ? 'text-black' : 'text-black',
               //      'h-6 w-6 hover:text-gray-400 '
                //     )}
                //     aria-hidden="true" 
                //     />
                //     </Popover.Button>



                     {/*CONTAINER DEL MENU HIDDEN DE LA PANTALLA PC */}

                //    <Transition
                //    as={Fragment}
                //    enter="transition ease-out duration-200"
                //    enterFrom="opacity-0 translate-y-1"
                //    enterTo="opacity-100 translate-y-0"
                //    leave="transition ease-in duration-150"
                //    leaveFrom="opacity-100 translate-y-0"
                //    leaveTo="opacity-0 translate-y-1"
                //    >


                //       <Popover.Panel className="absolute top-[32px] w-screen bg-white  max-w-md right-0 transform translate-x-1/12 px-2 sm:px-0">
                //         <div className="overflow-hidden  [10rem] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">

                //            {/* MENU ESCONDIDO PANTALLA GRANDE, HOME, MYPROJECTS*/}
                 //           <div className="relative grid sm:gap-12 p-8">
                 //           {solutions.map((item) => (
                 //           <Link
                 //           key={item.name}
                 //           to={item.href} // 💡 Cambiamos 'href' por 'to'
                  //          className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 border-b border-gray-100 transition-colors duration-200"
                  //          >
                    //        {/* 💡 Cambiado text-white por text-neutral-700 para que el icono SE VEA */}
                   //         <item.icon className="h-6 w-6 flex-shrink-0 text-neutral-700 mt-0.5" aria-hidden="true" />
          
                  //          <div className="ml-4">
                  //          <p className="text-base font-semibold text-gray-900">{item.name}</p>
                  //          <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.description}</p>
                  //          </div>
                  //         </Link>
                  //          ))}
                  //          </div>
                   //         {/* FIN MENU ESCONDIDO PANTALLA GRANDE, HOME, MYPROJECTS*/}





                     //         {/*MENU HIDDEN EN PANTALLA GRANDE  RECIENTES POSTS DE PROJECTS */}    
                      //        {/* USE EL COMPONENTE BLOG-LIST E HICE UNA FUNCTION DE RENDERIZADO ARRIBA DE TODO*/}
                      //        <div className="white px-4 ">
                      //        {blog_list ? (
                       //       <>
                       //       {renderBlogList(blog_list)} {/* Llama a la función para renderizar la lista */}
                        //      </>
                      //        ) : (
                      //        <LoadingCard />
                       //       )}
                       //       {/* ENLACE A LA PAGINA DE TODOS LOS POSTS DE GITHUB */}
                       //       <div className="text-sm pb-4 px-4">
                       //         <a href="/blog" className="font-medium text-indigo-600 hover:text-indigo-500">
                        //          Ver todos los posts
                        //          <span aria-hidden="true"> &rarr;</span>
                        //          </a>
                        //          </div>
                        //      </div> 
                        //      {/* FIN MENU ESCONDIDO PANTALLA GRANDE RECIENTES POSTS DE PROJECTS */}






                //         </div>
                 //      </Popover.Panel>
                 //   </Transition>
                //  </>
                //  )}
               //  </Popover>*/}