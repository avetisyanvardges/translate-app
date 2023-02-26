import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./views/Home";
import LanguageDetails from "./views/LanguageDetails";

const App = () => (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/language-details/:id" element={<LanguageDetails/>}/>
    </Routes>
)

export default App;