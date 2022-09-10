import React from 'react';
import {Form} from "./Form";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {Navigate} from "react-router-dom";
import {auth} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";


export const Login = () => {
    // getRedirectResult(auth)  получить токен OAuth провайдера Google
    const [user] = useAuthState(auth)

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };


    // const handleClick = (email: string, password: string) => {
    //     //signInWithRedirect(auth, provider)  //войти в систему путем перенаправления на страницу входа
    //     signInWithPopup(auth, provider) //с помощью всплывающего окна
    //         .then((result) => {
    //             if (result) {
    //                 const credential = GoogleAuthProvider.credentialFromResult(result);
    //                 const token = credential && credential.accessToken;
    //                 const email = result.user.email;
    //                 const id = result.user.uid;
    //                 if (typeof result.user.displayName === "string") {
    //                     localStorage.setItem("name", result.user.displayName)
    //                 }
    //                 if (typeof result.user.email === "string") {
    //                     localStorage.setItem("email", result.user.email)
    //                 }
    //                 localStorage.setItem("password", password)
    //
    //                 dispatch(setUser({email, id, token}));
    //                 navigate("/")
    //             }
    //
    //         }).catch((error) => {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.customData.email;
    //         // The AuthCredential type that was used.
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //     });
    // }
    if (user) {
        return <Navigate to={'/public'}/>
    }

    return <Form title="Login" handleClick={signInWithGoogle}/>


};

