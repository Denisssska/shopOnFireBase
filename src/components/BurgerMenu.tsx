import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react";
import {NavLink} from "react-router-dom";
import {auth} from "../firebase";
import MenuIcon from '@mui/icons-material/Menu';

export const BurgerMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = async () => {
        await auth.signOut();
    };
    return (
        <div>
            <Button
                color='warning'
                variant='text'
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}><NavLink to='/home'>AdminPage</NavLink></MenuItem>
                <MenuItem onClick={handleClose}><NavLink to='/'>PublicPage</NavLink></MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
