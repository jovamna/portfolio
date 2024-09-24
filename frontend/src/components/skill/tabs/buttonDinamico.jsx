
import React, { useEffect, useState} from "react";
import {useMotionValue, useTransform } from "framer-motion";




export const TabPanel = (props) => {
    return <div>{props.children}</div>
};


export const Tab = (props) => {
    
    const [activeTab, setActiveTab] = useState(props.active || 0);
    const [tabsData, setTabsData] = useState([]);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);


    useEffect(() => {
        let data = [];
        console.log(props.children)
        console.log(data)
        React.Children.forEach(props.children, (element) => {
            if(!React.isValidElement(element)) return;

            const {props: {title, children}} = element;
            data.push({ title, children });
        });

        setTabsData(data);
        console.log("tabsData:", tabsData); // Verifica los datos en la consola
    }, [props.children]);





    return (
        <div className="container-general-tab w-[100%]  px-2 rounded-b-3xl" style={props.tabStyle}>
           {/*CONTAINER DEl MENU TAB*/}
           {/*IMPORTANTE PARA EL SCROLL EN MOVILES overflow-x-auto flex flex-row*/}
          <ul className="tab-menu tab__list flex flex-row h-[92px]" >
            {tabsData.map((value, index) => {
              const style = index === activeTab ? "selected" : "";
              console.log("Index:", index, "Active Tab:", activeTab, "Style:", style);
              return (
                <li
                  key={index}
                   //CON EL CAMBIO AL HACER CLIK CAMBIA DE COLOR EL MENU ACTIVO ESTILOS EN CSS
                  className={`tab__list-item ${style} ${index === activeTab ? "bg-black" : "bg-white"} h-[58px] w-[100%] flex items-center mr-[2px]`}
                  onClick={() => setActiveTab(index)}
                  style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
                >
                  {/*MENU DE SKILLS: SOFTW DEVELOP, WEB, DATAB, TOOLS */}
                  {/* CON EL CAMBIO AL HACER CLIK CAMBIA DE COLOR EL MENU ACTIVO**/}
              

                      <button 
                      style={{ color: index === activeTab ? "#FFFFFF" : "#000000" }} 
                      className="tab-button">
                       {value.title}
                      </button>
                </li>
              );
            })}
          </ul>

          <div className="tab__content " style={props.contentTabStyle}>
            {tabsData[activeTab] && tabsData[activeTab].children}
          </div>

         

         


















        </div>
























      );
    };