import React, { useState } from 'react'
import './LayOut.css'
import Header from '../Components/Header/Header'
import SidebarComponent from '../Components/Sidebar/Sidebar'


const BaseLayout = ({ children }) => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(prevState => !prevState);
    };
    return (
        <div className="baselayout-container light-bg-H ">
            <div className="sidebar-main light-bg-L">
                <SidebarComponent isCollapsed={isSidebarCollapsed} />
            </div>
            <div className="header-dasboard main_container" style={{ width: "100%" }}>
                <Header onSidebarToggle={toggleSidebar} />
                <div className="dashboard bg-admin">
                    <div className="container-fluid main_container">
                        <div className="row ">
                            <div className="col-lg-12 col-sm-12">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BaseLayout
