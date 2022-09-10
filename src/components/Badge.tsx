import * as React from 'react';
import Badge, {BadgeProps} from '@mui/material/Badge';
import {styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {NavLink} from "react-router-dom";
import {useGoodsFromBadge} from "../Hooks/useGoodsFromBadge";

const StyledBadge = styled(Badge)<BadgeProps>(({theme}) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export const CustomBadge = React.memo(() => {
    const goods = useGoodsFromBadge()
    return (
        <NavLink style={{color:'inherit',textDecoration:'none'}} to='/badge'><IconButton aria-label="cart" sx={{marginRight: 2}}>
            <StyledBadge badgeContent={goods.length} color="secondary">
                <ShoppingCartIcon/>
            </StyledBadge>
        </IconButton></NavLink>
    );
});
