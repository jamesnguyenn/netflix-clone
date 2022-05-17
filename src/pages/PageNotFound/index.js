import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import './PageNotFound.css';

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className="pageNotFound">
            <Nav></Nav>
            <div className="pageNotFound__body">
                <h3>Oops, Page not found! Something went wrong...</h3>
                <button onClick={() => navigate('/')}>Back to Homepage</button>
            </div>
        </div>
    );
}

export default PageNotFound;
