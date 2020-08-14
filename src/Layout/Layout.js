import React from 'react';
import NavBar from './Navbar/Navbar';
import './Layout.css';

const Layout = (props) => {
    return (
        <div>
            <NavBar />
            <main className="Content">
                {props.children}
            </main>
        </div>
    )
}

export default Layout;