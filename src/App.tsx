import React from 'react';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./Pages/HomePage";
import {LoginPage} from "./Pages/LoginPage";
import {RegisterPage} from "./Pages/RegisterPage";
import {NavBar} from "./components/NavBar";
import {PublicPage} from "./Pages/PublicPage";
import {BadgePage} from "./Pages/BadgePage";

function App() {

    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/badge" element={<BadgePage/>}/>
                <Route path="/public" element={<PublicPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>

        </div>
    );
}

export default App;
