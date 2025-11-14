import Home from './containers/pages/Home';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import Error404 from './containers/errors/Error404';
import MyProject from './containers/pages/myproject/MyProject';
import ProjectPost from './containers/pages/myproject/ProjectPost';
import Blog from './containers/pages/blog/Blog';
import BlogPost from './containers/pages/blog/BlogPost';
import BlogCategory from './containers/pages/blog/posts-por-category/BlogCategory';
import Search from './containers/pages/blog/search/Search'
import PoliticaCookies from './containers/pages/PoliticaCookies'
import Signup from './containers/auth/Signup';
import Login from './containers/auth/Login';
import Dashboard from './containers/auth/Dashboard';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import "./styles/index.css";
import jova from "./assets/img/logo/jova.png";
import { useEffect, useState } from 'react';
import Logo from './containers/inicio/Logo';



function App() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000); // Ajusta el tiempo en milisegundos a la cantidad de tiempo que desees mostrar el logo

    return () => clearTimeout(timer);
  }, []);

  return (

    <HelmetProvider>

       <Helmet>
        <title> Portafolio Developer FullStack, Blog | Jovamna Medina</title>
        <meta name="description" content="Portafolo Developer FullStack, software, Creacion de Páginas Webs, Apis, Diseño Web." />
        <meta name="keywords" content='Portafolo Developer FullStack, software, creacion de paginas webs, apis.' />
        <meta name="robots" content='all' />
        <link rel="canonical" href="https://www.jovamnamedina.com/" />
        <meta name="author" content='Jovamna Medina' />
        <meta name="publisher" content='Jovamna Medina' />

        <link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />

        {/* Social Media Tags */}
        <meta property="og:title" content='J.M. | Portafolio, Blog' />
        <meta property="og:description" content='Portafolio Developer FullStack, software, Creacion de Páginas Webs, Apis, Diseño Web.' />
        <meta property="og:url" content="https://www.jovamnamedina.com/" />
        <meta property="og:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />

        <meta name="twitter:title" content='J.M. | Portafolio, Blog' />
        <meta
            name="twitter:description"
            content='Portafolio Developer FullStack, software, Creacion de Páginas Webs, Apis, Diseño Web.'
        />
        <meta name="twitter:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    



     {/*RUTAS DEL PROJECTO */}

      <Provider store={store}>
        <Router>

        <div>
        {showLogo ? <Logo /> : 
  



        <Routes>
             {/* Error Display */}
        <Route path="*" element={<Error404 />} />
          {/* Authentication*/}
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/profile' element={<Dashboard/>}/>
        
        {/* Home Display */}
        <Route path="/" element={<Home/>}/>
        <Route path="/myproject" element={<MyProject />} />
        <Route path="/myproject/project/:slug" element={<ProjectPost />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/search/:term" element={<Search />} />
        
        <Route path="/blog/post/:slug" element={<BlogPost/>} />
       
        <Route path="/categories/:categorySlug" element={<BlogCategory/>} />
        {/*<Route path="/blog/categories/:categorySlug" element={<BlogCategory/>} />*/}
   
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        {/*NO HAY RUTA PARA LAS CATEGORIAS, NO ES NECESARIO */}
         {/*LAS CATEGORIA ESTAN COMO CONPONENTE DENTRO DEL BLOG */}
        </Routes>




       }
      </div>
       
        </Router>
      </Provider>


      </HelmetProvider>
 
  );
}

export default App;

