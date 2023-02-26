import React from 'react';
import {Link} from "react-router-dom";
import {isEmpty} from 'lodash';
import useContainer from "./hook";
import './style.scss';

const Home = () => {
    const { screenList, addScreenVisible, setAddScreenVisible, addInputValue, onChangeInputValue, saveNewScreen } = useContainer();

    return (
        <div className='home-page'>
            <div className='main-content'>
                {!isEmpty(screenList) && screenList.map(item => (
                    <Link to={`/screen/${item.id}`} key={item.id} className='language-card'>
                        <h3 className='title'>{item.name}</h3>
                        <p className='type'>{item.id}</p>
                    </Link>
                ))}
                <div className='language-card'>
                    {addScreenVisible ?
                        <div className='add-screen-content' onClick={() => setAddScreenVisible(false)}>
                            <p className='title'>+ Add screen</p>
                        </div>
                        :
                        <div className='add-screen-form'>
                            <input value={addInputValue} onChange={onChangeInputValue}/>
                            <div className='buttons'>
                                <button onClick={saveNewScreen}>Save</button>
                                <button onClick={() => setAddScreenVisible(true)}>Cansel</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;