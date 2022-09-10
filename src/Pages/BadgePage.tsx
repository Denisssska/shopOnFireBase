import React from 'react';
import {NavLink} from "react-router-dom";
import WestIcon from '@mui/icons-material/West';
import {BasicTable} from "../components/BasicTable";
import {useGoodsFromBadge} from "../Hooks/useGoodsFromBadge";

export const BadgePage = React.memo(() => {
    const rows = useGoodsFromBadge()
    return (
        <div>
            <NavLink style={{textDecoration: 'none'}} to='/public'>
                <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}><WestIcon/><h3
                    style={{marginLeft: '10px'}}>Back to shop</h3></div>
            </NavLink>
            {rows.length?<BasicTable/>:<h1>Корзина пуста</h1>}
        </div>
    );
});

