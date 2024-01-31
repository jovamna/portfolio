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
    blog: [
      { name: 'Marketing', href: 'https://www.foodingemotions.com' },
      { name: 'Analytics', href: '#' },
     
    ],
    
    about: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
     
    ],
    legal: [
  
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
    ],
    social: [
      {
        name: 'Linkedin',
        href: '#',
        icon: <LinkedinIcon />,
      },
     
      {
        name: 'Twitter',
        href: '#',
        icon: <TwitterIcon />,
      },
      {
        name: 'GitHub',
        href: '#',
        icon: <GithubIcon />,
      },
      {
        name: 'Dribbble',
        href: '#',
        icon: <DribbleIcon />,
      },
    ],
  }
  
function Footer() {
    return (
      <footer className="movil-footer bg-neutral-700 min-h-full opacity-95 items-center content-center mt-8">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

         <div className="flex flex-col max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
         {/* <div className="xl:grid xl:grid-cols-3 xl:gap-8">*/}

          
          {/*CONTAINER SUSCRIPTION*/}
          
              <SubscribeForm className="footer-suscribe"/>
         
          {/*FIN CONTAINER SUSCRIPTION*/}

          {/*GRID CENTRADO */}
          <div className="flex justify-center items-center">



           {/*CONTAINER GRID DE TODAS LAS CAJAS SEPARACION ENTRE CAJAS xl:col-span-8*/}
            <div className="movil-footer-tres-menus w-[60%] grid grid-cols-3 gap-16 xl:col-span-16 content-center mt-8 mb-8">

              {/*PRIMERA    CAJA*/}
                <div className=" movil-footer-tres-menus-uno px-8">
                   <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
                    Blog
                    </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.blog.map((item) => (
                      <li key={item.name}>
                        <a 
                        href={item.href} 
                        className="text-sm text-white hover:text-gray-400">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              {/*FIN  PRIMERA  CAJA*/}

              {/*SEGUNDA CAJA  padding izq y derechg px-8*/}     
                <div className="movil-footer-tres-menus-uno  md:mt-0  px-8">
                  <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase">About me</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.about.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm text-white hover:text-gray-400">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
            {/*FIN SEGUNDA CAJA*/}
         

              {/*CONTAINER DE LA TERCERA CAJA padding izq y derech px-8*/}
              <div className="movil-footer-tres-menus-uno md:grid px-8">
                  <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm text-white hover:text-gray-400">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
              </div>
              {/*FIN CONTAINER DE LA TERCERA CAJA*/}


           </div>
           {/*FIN CONTAINER GRID DE TODAS LAS CAJAS SEPARACION ENTRE CAJA*/}





          </div>



         {/* </div>*/}











         {/*PIE DEL FOOTER*/}
       <div className="footer-pie flex flex-col flex-item-center  border-t border-gray-200  md:flex md:items-center md:justify-between">

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

             
            <div className="movil-footer-pie mt-4 lg:py-2">   
              <p className="movil-footer-pie-p  text-sm text-gray-400 md:mt-0 md:order-1">
              &copy; 2023 Portfolio Jovamna Medina , Inc. All rights reserved.
             </p>
            </div>
      </div>
       {/*FIN PIE DEL FOOTER*/}



          
        </div>
      </footer>
    )
  }

 export default Footer