import React from 'react';
import {NavLink} from "react-router-dom";
import {Login} from "../components/Login";
import {Box, Container, Grid} from "@mui/material";

export const LoginPage = React.memo(() => {
    return (
        <Container>
            <Grid container style={{height: window.innerHeight - 50}}
                  alignItems={"center"} justifyContent={"center"}>
                <Grid container style={{width: 400, background: "lightgray"}}
                      direction={"column"} alignItems={"center"}>
                    <Box p={5}>
                        <Login/>
                        <p>Or <NavLink to="/register">Sign out</NavLink></p>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
});

