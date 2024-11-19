import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import home from '../../Assets/svg/Home.svg';
import usermanage from '../../Assets/svg/usermanage.svg';
import logouticon from '../../Assets/svg/logout.svg';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from '../../Utils/Element';
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Action";


const sidebarOptions = [
    { name: "Home", link: "/home", icon: home },
    { name: "All Blogs", link: "/task", icon: usermanage },
];

const Sidebar = ({ isCollapsed }) => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {

        const currentPath = location.pathname;
        const index = sidebarOptions.findIndex(option => option.link === currentPath);
        if (index !== -1) {
            setActiveIndex(index);
        }
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/logout`);

            if (response.data.success) {
                dispatch(logout());
                navigation("/");
                console.log("Logout successfully");
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className={`w-${isCollapsed ? '16' : '64'} h-screen bg-white shadow-lg transition-width duration-300`}>
            <div className="sidebar-header flex ml-5 items-center">
                <h1 className=" text-xl font-bold">Blogs Area</h1>
            </div>
            <hr className="w-full" />
            <div className="ml-2 mt-4">
                <ul>
                    {sidebarOptions.map((option, index) => (
                        <Link
                            key={index}
                            to={option.link}
                            className={`mb-2 flex items-center p-2 cursor-pointer border-r-4 ${activeIndex === index ? 'border-blue-600 bg-[#F5F7FA] Rectangle-1' : 'border-transparent'
                                }`}
                        >
                            <div className={`w-${isCollapsed ? '12' : '13'} sidebaricon`}>
                                <img src={option.icon} alt={`${option.name} icon`} className="mr-4" />
                                {isCollapsed && (
                                    <span className="tooltip">{option.name}</span>
                                )}
                            </div>
                            {!isCollapsed && (
                                <span className={`${activeIndex === index ? 'body-S font-semibold' : 'body-S '}`}>
                                    {option.name}
                                </span>
                            )}
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="absolute bottom-6 ml-2">
                <ul>
                    <li className="flex items-center p-2 sidebaricon" onClick={handleLogout}>
                        <img src={logouticon} alt="Logout icon" className="mr-4 cursor-pointer" height={17} width={15} />
                        {isCollapsed && (
                            <span className="tooltip">Logout</span>
                        )}
                        {!isCollapsed && (
                            <a href="#" className="body-S ">Logout</a>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
