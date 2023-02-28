import React from 'react';
import useContainer from "./hook";
import "./style.scss";
import {Menu} from "antd";

const Wrapper = ({children}) => {
    const {
        menuItems, addScreenVisible, setAddScreenVisible, addInputValue, onChangeInputValue, saveNewScreen, pathname
    } = useContainer();

    return (
        <div className='wrapper'>
            <div className='menu-bar'>
                <div className='logo'>
                    <h2 className='left'>Work more </h2><h2 className='right'>efficiently</h2>
                </div>
                <Menu selectedKeys={[pathname]} className="popover-dropdown" theme='light' mode='inline' items={menuItems}/>
                <div className='add-screen'>
                    {addScreenVisible ?
                        <div onClick={() => setAddScreenVisible(false)}>+ Add Screen</div> :
                        <div className='add-form'>
                            <input value={addInputValue} onChange={onChangeInputValue} className='input'/>
                            <div className='buttons'>
                                <button onClick={saveNewScreen}>Save</button>
                                <button onClick={() => setAddScreenVisible(true)}>Cansel</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='content'>{children}</div>
        </div>
    );
};

export default Wrapper;