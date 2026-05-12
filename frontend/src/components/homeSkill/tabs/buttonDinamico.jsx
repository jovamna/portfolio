import React, { useEffect, useState, useRef } from "react";

export const TabPanel = (props) => {
    return <div>{props.children}</div>;
};

export const Tab = (props) => {
    const [activeTab, setActiveTab] = useState(props.active || 0);
    const [tabsData, setTabsData] = useState([]);
    const tabListRef = useRef(null);

    // Efecto 3D con mouse (similar al anterior)
    const handleMouseMove = (e) => {
        if (!tabListRef.current) return;

        const items = tabListRef.current.querySelectorAll('.tab__list-item');
        
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const rotateX = (mouseY / rect.height) * -12;
            const rotateY = (mouseX / rect.width) * 18;

            item.style.transform = `
                perspective(1200px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(8px)
            `;
        });
    };

    const handleMouseLeave = () => {
        if (!tabListRef.current) return;
        
        const items = tabListRef.current.querySelectorAll('.tab__list-item');
        items.forEach(item => {
            item.style.transform = `
                perspective(1200px) 
                rotateX(0deg) 
                rotateY(0deg) 
                translateZ(0px)
            `;
        });
    };

    useEffect(() => {
        let data = [];

        React.Children.forEach(props.children, (element) => {
            if (!React.isValidElement(element)) return;
            const { props: { title, children } } = element;
            data.push({ title, children });
        });

        setTabsData(data);
    }, [props.children]);

    return (
        <div 
            className="container-general-tab w-[100%] px-2 rounded-b-3xl" 
            style={props.tabStyle}
        >
            {/* MENU DE TABS */}
            <ul 
                ref={tabListRef}
                className="tab-menu tab__list flex flex-row h-[92px] overflow-x-auto"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {tabsData.map((value, index) => {
                    const isActive = index === activeTab;

                    return (
                        <li
                            key={index}
                            className={`tab__list-item ${isActive ? "selected underline underline-offset-8 decoration-4" : "bg-white"} 
                                       h-[58px] w-[100%] flex items-center mr-[2px] transition-all duration-200`}
                            onClick={() => setActiveTab(index)}
                        >
                            <button 
                                style={{ color: isActive ? "#000000" : "#000000" }} 
                                className="tab-button w-full h-full font-medium"
                            >
                                {value.title}
                            </button>
                        </li>
                    );
                })}
            </ul>

            {/* CONTENIDO */}
            <div className="tab__content" style={props.contentTabStyle}>
                {tabsData[activeTab] && tabsData[activeTab].children}
            </div>
        </div>
    );
};


