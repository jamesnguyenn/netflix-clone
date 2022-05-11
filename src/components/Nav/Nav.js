import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';
function Nav() {
    const [show, handleShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', handleScrollNav);
        return () => {
            window.removeEventListener('scroll', handleScrollNav);
        };
    }, []);

    const handleScrollNav = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    const backToTop = useCallback(() => {
        document.documentElement.scrollTop = 0;
        navigate('/');
    }, [navigate]);

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <img
                className="nav__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
                onClick={backToTop}
            />
            <img
                className="nav__avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="Avatar"
                onClick={() => {
                    navigate('/profile');
                }}
            />
        </div>
    );
}

export default Nav;
