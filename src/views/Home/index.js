import React from 'react'
import Wrapper from "../Wrapper";
import './style.scss'



// #8e969e
// #1E3045
// fdfeff
// e3f4ff

const Home = () => {
    return (
        <Wrapper>
            <div style={{display:'flex', width: '100%',justifyContent: 'center'}}>
                <h1 style={{color: '#1E3045'}}>Welcome!!</h1>
            </div>
            <div className="home-page" style={{backgroundSize: 'contain'}} />
        </Wrapper>
    )
}

export default Home
