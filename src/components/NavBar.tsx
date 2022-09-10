import React from 'react';
import {AppBar, Avatar, Button, Grid, Toolbar} from "@mui/material";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";

import {BurgerMenu} from "./BurgerMenu";
import {CustomBadge} from "./Badge";

export const NavBar = React.memo(() => {
    const [user] = useAuthState(auth)
    return (
        <AppBar color={"secondary"} position={"static"}>
            <Toolbar>
                {user ? <><Grid container justifyContent='flex-start'><BurgerMenu/></Grid>
                    <Grid container justifyContent='flex-end'>
                        <CustomBadge/>
                        {user.photoURL ?
                            <Avatar src={user.photoURL} alt={'admin'}/> : <Avatar/>}
                    </Grid></> : <></>}
            </Toolbar>
        </AppBar>
    );
});