import React, {useState} from 'react';
import {Button} from "@mui/material";

type FormProps = {
    title: string
    handleClick: (email: string, password: string) => void
}
export const Form: React.FC<FormProps> = ({title, handleClick}) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    return (
        <div>
            {/*<input type="email" placeholder='email' value={email}*/}
            {/*       onChange={(e) => setEmail(e.currentTarget.value)}/>*/}
            {/*<input type="password" placeholder='password' value={pass}*/}
            {/*       onChange={(e) => setPass(e.currentTarget.value)}/>*/}
            <div><Button onClick={() => handleClick(email, pass)} variant={"outlined"}>{title}</Button></div>
        </div>
    );
};

