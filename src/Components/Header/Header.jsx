import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import search from '../../Assets/svg/search.svg'
import burger from '../../Assets/svg/burgger.svg'



const getHeaderText = (pathname) => {
    switch (pathname) {
        case '/home':
            return 'Home';
        case '/task':
            return 'Task';
        default:
            return 'Page Not Found';
    }
};

const Header = ({ onSidebarToggle }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const headerText = getHeaderText(location.pathname);





    useEffect(() => {
        const handleClose = () => {
            setIsOpen(false);
        };
    }, []);

    return (
        <div className="header  p-4 bg-[#F5F7FA] border-b ">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 h-6">
                    <button className="text-gray-500" onClick={onSidebarToggle}>
                        <img src={burger} alt="Menu" />
                    </button>
                    <p className="heading-N">{headerText}</p>
                </div>
                <div className="relative ">
                    <input
                        type="text"
                        placeholder="Search here"
                        className="w-[218px] h-[37px] pl-10 border-2 rounded-md bg-[#F5F7FA]"
                    />
                    <img
                        src={search}
                        alt="Search"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
