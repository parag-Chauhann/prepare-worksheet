import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../FireBase/firebase';
import logo from "./Logo1.png";
import "./Navbar.css";

function Navbar() {
    const MenuData = [
        {
            title: "Home",
            url: "#",
            cName: "nav-links",
            icon: "fa-solid fa-house"
        },
        {
            title: "Instructions",
            url: "#",
            cName: "nav-links",
            icon: "fa-solid fa-circle-info",
        },
        {
            title: "Contact Us",
            url: "https://www.thesafetymaster.com/contact-us/",
            cName: "nav-links",
            icon: "fa-solid fa-id-badge",
        },
        {
            title: "About Us",
            url: "https://www.thesafetymaster.com/about-us/",
            cName: "nav-links",
            icon: "fa-solid fa-building",
        },
    ];

    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setClicked(!clicked)
    };

    const handleLogout = async () => {
        await signOut(auth);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login");
    };

    return (
        <>
            <nav className='NavbarItems'>
                <Link to="https://www.thesafetymaster.com/"><img className='Navbar-logo' src={logo} alt='logo' /></Link>
                <div className='menu-icons'>
                    <img onClick={handleClick} className='nav-sideMenu' alt="" src={clicked ? "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-round-256.png" : "https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png"} />
                </div>
                <ul className={clicked ? 'nav-menu active' : "nav-menu"}>
                    {MenuData.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>
                                    <img className={item.icon} src={item.url} alt="" />
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;
