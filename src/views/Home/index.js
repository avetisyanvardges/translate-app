import React from 'react';
import {Link} from "react-router-dom";
import './style.scss';

const languages = [
    {
        id: 'en',
        name: 'English',
    },
    {
        id: 'hy',
        name: 'Armenian',
    },
    {
        id: 'ru',
        name: 'Russian',
    },
    {
        id: 'ge',
        name: 'Georgian',
    },
]

const Home = () => {
    return (
        <div className='home-page'>
            <div className='main-content'>
                {languages.map(item => (
                    <Link to={`/language-details/${item.id}`} key={item.id} className='language-card'>
                        <h3 className='title'>{item.name}</h3>
                        <p className='type'>{item.id}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;