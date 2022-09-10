import React from 'react';
import {NavLink} from "react-router-dom";
import {SignUp} from "../components/SignUp";

export const RegisterPage = React.memo(() => {
    return (
        <div>
            <h1>Registration</h1>
            <SignUp/>
            <p>Already have account? <NavLink to='/login'>Sign in</NavLink></p>
        </div>
    );
});

