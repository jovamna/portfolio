import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store'; // Asegúrate de tener tu store importado

// Carga perezosa de componentes
const Logo = lazy(() => import('./components/Logo'));
const Error404 = lazy(() => import('./components/Error404'));
const Signup = lazy(() => import('./components/Signup'));
const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Home = lazy(() => import('./components/Home'));
const MyProject = lazy(() => import('./components/MyProject'));
const ProjectPost = lazy(() => import('./components/ProjectPost'));
const Blog = lazy(() => import('./components/Blog'));
const Search = lazy(() => import('./components/Search'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const BlogCategory = lazy(() => import('./components/BlogCategory'));
const PoliticaCookies = lazy(() => import('./components/PoliticaCookies'));

function App() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000);

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
        <meta name="twitter:description" content='Portafolio Developer FullStack, software, Creacion de Páginas Webs, Apis, Diseño Web.' />
        <meta name="twitter:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Provider store={store}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <div>
              {showLogo ? <Logo /> : (
                <Routes>
                  <Route path="*" element={<Error404 />} />
                  <Route exact path='/signup' element={<Signup />} />
                  <Route exact path='/login' element={<Login />} />
                  <Route exact path='/profile' element={<Dashboard />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/myproject" element={<MyProject />} />
                  <Route path="/myproject/project/:slug" element={<ProjectPost />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/search/:term" element={<Search />} />
                  <Route path="/blog/post/:slug" element={<BlogPost />} />
                  <Route path="/categories/:categorySlug" element={<BlogCategory />} />
                  <Route path="/politica-cookies" element={<PoliticaCookies />} />
                </Routes>
              )}
            </div>
          </Suspense>
        </Router>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
