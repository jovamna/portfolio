import { LinkedinIcon } from './svgIcon';
import { TwitterIcon } from './svgIcon';
import { GithubIcon } from './svgIcon';
import { DribbleIcon } from './svgIcon';
import "../../styles/index.css";
import SubscribeForm from './../subscribe/Subscribe.jsx';




const props = {
  // Tus props específicas aquí, por ejemplo:
  width: '24',
  height: '24',
};

const navigation = {
  main: [
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/' },
    { name: 'Contacto', href: '/' },
    { name: 'Privacy', href: '/politica-cookies' },
  ],
  social: [
    { name: 'Linkedin', href: 'https://www.linkedin.com/in/jovamna-medina/', icon: <LinkedinIcon /> },
    { name: 'Twitter', href: 'https://x.com/FullStackmed', icon: <TwitterIcon /> },
    { name: 'GitHub', href: 'https://github.com/jovamna', icon: <GithubIcon /> },
  ],
};
function Footer() {
    return (
      <footer className="w-full  bottom-0 p-4  bg-black opacity-95 ">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

         <div className="flex flex-col max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
         {/* <div className="xl:grid xl:grid-cols-3 xl:gap-8">*/}

          
          {/*CONTAINER SUSCRIPTION*/}
          
             {/* <SubscribeForm className="footer-suscribe"/>*/}
         
          {/*FIN CONTAINER SUSCRIPTION*/}

          {/*GRID CENTRADO */}
          <div className="flex justify-center items-center">



           {/*CONTAINER GRID DE TODAS LAS CAJAS SEPARACION ENTRE CAJAS xl:col-span-8*/}
          {/* NAVEGACIÓN EN UNA SOLA LÍNEA LIMPIA */}
        <nav className="my-8 flex flex-wrap justify-center gap-x-8 gap-y-4" aria-label="Footer">
          {navigation.main.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>
           {/*FIN CONTAINER GRID DE TODAS LAS CAJAS SEPARACION ENTRE CAJA*/}





          </div>



         {/* </div>*/}











         {/*PIE DEL FOOTER*/}
       <div className="footer-pie flex flex-col items-center 
        border-t border-gray-200  
        md:flex md:items-center md:justify-between">

             <div className="movil-footer-social flex mt-6">    
                 <ul className="movil-footer-social-ul flex flex-row ">
                {navigation.social.map((item) => (
                <li className="flex h-6 w-6 ml-8" key={item.name} >
                <a  href={item.href} className="movil-footer-social-a text-base h-6 w-6 text-white hover:text-gray-500 ">
                  {/*<span className="text-base h-6 w-6">{item.name}</span>*/}
                  {item.icon }
                 {/* <item.icon className="h-6 w-6" aria-hidden="true" />*/}
                </a>
                </li>
              ))}
              </ul>
            </div>

             
            <div className="movil-footer-pie mt-4 lg:py-2 flex items-center justify-center">   
              <p className="movil-footer-pie-p  text-sm text-gray-400 md:mt-0 md:order-1 text-center">
              &copy; 2026 Portfolio Jovamna Medina , Inc. All rights reserved.
             </p>
            </div>
      </div>
       {/*FIN PIE DEL FOOTER*/}



          
        </div>
      </footer>
    )
  }

 export default Footer