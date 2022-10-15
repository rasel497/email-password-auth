import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Main.css'


const Main = () => {
    return (
        <div>
            <nav className='nav-link'>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;