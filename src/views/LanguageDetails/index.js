import React from 'react';
import {useParams} from "react-router-dom";
import './style.scss';

const LanguageDetails = () => {
    const {id} = useParams();
    return (
        <div className='language-details-page'>
            LanguageDetails {id}
        </div>
    );
};

export default LanguageDetails;