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
    {/* 1. Títulos y Metadatos Principales */}
    <title>Portafolio Oficial de Jovamna Medina | Full Stack Developer & Arte Digital</title>
    <meta name="description" content="Portafolio oficial de Jovamna Medina: Full Stack Developer especializada en Django/React y creadora de arte digital con IA + Photoshop." />
    <meta name="keywords" content="Jovamna Medina, Portfolio, Full Stack Developer, Django, React, E-commerce, Arte Digital, IA Generativa, Photoshop, Imágenes Digitales, Diseño Personalizado, Web Development" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://www.jovamnamedina.com/" />
    <meta name="author" content="Jovamna Medina" />
    <meta name="publisher" content="Jovamna Medina" />
    <link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />

    {/* 2. Open Graph */}
    <meta property="og:title" content="Jovamna Medina | Full Stack & Arte Digital con IA" />
    <meta property="og:description" content="Desarrollo e-commerce full stack y creo imágenes digitales únicas con IA + edición en Photoshop. Visita mi tienda: https://muckas-store.com" />
    <meta property="og:url" content="https://www.jovamnamedina.com/" />
    <meta property="og:image" content="https://www.jovamna.medina/twitter.png"/>
    <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
    <meta property="og:type" content="website" />

    {/* 3. Twitter Cards */}
    <meta name="twitter:title" content="Jovamna Medina | Full Stack + Arte Digital IA" />
    <meta name="twitter:description" content="Full Stack Dev que crea su propio e-commerce y vende arte digital hecho con IA + Photoshop. Tienda: https://muckas-store.com" />
    <meta name="twitter:image" content="https://www.jovamna.medina/twitter.png" />
    <meta name="twitter:card" content="summary_large_image" />

    {/* 4. JSON-LD Schema.org */}
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Jovamna Medina",
          "url": "https://www.jovamnamedina.com",
          "sameAs": [
            "https://www.linkedin.com/in/jovamna",
            "https://x.com/FullStackmed",
            "https://www.instagram.com/muckas.ai/"
          ],
          "jobTitle": "Full Stack Developer & Digital Artist",
          "worksFor": {
            "@type": "Organization",
            "name": "Jovamna Medina Projects"
          }
        }
      `}
    </script>
  </Helmet>

     {/*RUTAS DEL PROJECTO */}

      <Provider store={store}>
        <Router>

        <div>
        {/*showLogo ? <Logo /> :   */   }
  



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




  
      </div>
       
        </Router>
      </Provider>


      </HelmetProvider>
 
  );
}

export default App;

