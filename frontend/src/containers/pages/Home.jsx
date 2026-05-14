
import Greeting from '../../components/home/Greeting';
import About from '../../components/home/About';
import Project from '../../components/home/Project';
import Skill from '../../components/home/Skill';

import Cv from '../../components/home/Cv';
import Contact from '../../components/home/Contact';

import Top from "../../components/topbutton/Top";
import ChatBot from  '../../components/chatbot/ChatBot';
import Navbar from "../../components/navigation/Navbar";
import Footer from "../../components/navigation/Footer";
import CookieConsent from '../../components/cookies/CookieConsent';
import "../../styles/index.css";
import error from '../../assets/img/error.jpg';
import { useEffect, useState } from 'react';





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




  useEffect(() => {
  document.title = "Jovamna Medina | Full Stack Developer";
  
  let metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = "Bienvenido al Portfolio de Jovamna Medina, donde el desarrollo web y el arte digital se encuentran.";
  }
}, []);






  return (
    <>
      <div className="wrapper ">

   

          
          {visibleComponents.map((item, index) => (
          <div 
            key={index} 
            id={`component-${index}`} 
            // Aquí 'flex p-2' siempre se aplica, y lo demás depende de la condición
            //className={`flex p-2 ${item.isNavbar ? 'bg-blue-500' : 'bg-red-500 fade-in'}`}
            className={` ${item.isNavbar ? '' : 'fade-in'}`}>
            {item.component}
          </div>
          ))}
        <ChatBot />


 







      </div>
    </>
  );
}

export default Home;