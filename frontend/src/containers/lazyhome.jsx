import React, { useEffect, useState, lazy, Suspense } from 'react';
import "../../styles/index.css";
import error from '../../assets/img/error.jpg';

// Carga perezosa de componentes
const Greeting = lazy(() => import('../../components/home/Greeting'));
const About = lazy(() => import('../../components/home/About'));
const Project = lazy(() => import('../../components/home/Project'));
const Skill = lazy(() => import('../../components/home/Skill'));
const Cv = lazy(() => import('../../components/home/Cv'));
const Contact = lazy(() => import('../../components/home/Contact'));
const Navbar = lazy(() => import("../../components/navigation/Navbar"));
const Footer = lazy(() => import("../../components/navigation/Footer"));
const CookieConsent = lazy(() => import('../../components/cookies/CookieConsent'));
const ChatBot = lazy(() => import('../../components/chatbot/ChatBot'));

function Home() {
  const components = [
    { component: <Navbar />, isNavbar: true },
    { component: <Greeting />, isNavbar: false },
    { component: <About />, isNavbar: false },
    { component: <Skill />, isNavbar: false },
    { component: <Project />, isNavbar: false },
    { component: <Cv />, isNavbar: false },
    { component: <Contact />, isNavbar: false },
    { component: <Footer />, isNavbar: false },
    { component: <CookieConsent />, isNavbar: false },
  ];

  const [visibleComponents, setVisibleComponents] = useState([]);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentComponentIndex < components.length) {
        setVisibleComponents((prev) => [
          ...prev,
          { component: components[currentComponentIndex].component, isNavbar: components[currentComponentIndex].isNavbar },
        ]);
        setCurrentComponentIndex((prev) => prev + 1);

        if (currentComponentIndex > 0) {
          const element = document.getElementById(`component-${currentComponentIndex}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [components, currentComponentIndex]);

  return (
    <>
      <div className="wrapper">
        {visibleComponents.map((item, index) => (
          <div key={index} id={`component-${index}`} className={item.isNavbar ? '' : 'fade-in'}>
            <Suspense fallback={<div>Loading...</div>}>
              {item.component}
            </Suspense>
          </div>
        ))}
        <Suspense fallback={<div>Loading ChatBot...</div>}>
          <ChatBot />
        </Suspense>
      </div>
    </>
  );
}

export default Home;



