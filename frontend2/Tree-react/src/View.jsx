import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import personLight from './img/person-light.png';
import logoutLight from './img/logout-light.png';
import btn from './img/btn.png';

const View = () => {

    const navigate = useNavigate();

    const goToWrite = () => navigate("/write-impression");

    return (
        <div className='pageView'>
            <div>
                <inline><img className='shortcuts' alt='logout' src={logoutLight} /><img className='shortcuts' alt='person' src={personLight} /></inline>
                <img className='btnL' alt='btn' src={btn}
                onClick={goToWrite} />
                <img className='btnR' alt='btn' src={btn} />
                
            </div>
        </div>

    )
}

export default View;