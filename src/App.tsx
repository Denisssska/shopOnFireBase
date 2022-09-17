import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./Pages/HomePage";
import {LoginPage} from "./Pages/LoginPage";
import {RegisterPage} from "./Pages/RegisterPage";
import {NavBar} from "./components/NavBar";
import {PublicPage} from "./Pages/PublicPage";
import {BadgePage} from "./Pages/BadgePage";
import {addGoodsTC} from "./Store/Slices/allGoodsSlice";
import {useAppDispatch} from "./Hooks/Hooks";
import {addGoodsInBadgeTC, InitialStateType} from "./Store/Slices/goodsInBadgeSlice";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
       // localStorage.clear()
        dispatch(addGoodsTC())
        const allFromLocSt = localStorage.getItem('goodsInBadge');
        if (allFromLocSt) {
            const res = JSON.parse(allFromLocSt)
            res.map((item: InitialStateType)=>dispatch(addGoodsInBadgeTC(item)))

        }
    }, [])

    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/" element={<PublicPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/badge" element={<BadgePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
