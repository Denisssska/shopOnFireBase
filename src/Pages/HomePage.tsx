import React, {useState} from 'react';
import {Navigate} from "react-router-dom";
import {Button, Container, Grid, TextField} from "@mui/material";
import {collection} from "firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {addItemInCollection, auth, db, getItemInCollection, updateItemInCollection} from "../firebase";

export const HomePage = React.memo(() => {
    const [value, setValue] = useState('')
    const [messages, loading] = useCollectionData(collection(db, 'котлы'))
    const [user] = useAuthState(auth)

    const sendMessage = async () => {
        try {
            await addItemInCollection("san", user?.email, "users")
            await getMessage()
        } catch (e) {
            console.log(e)
        }

    }
    const getMessage = async () => {
        try {
            const result = await getItemInCollection("котлы");
            // console.log(result)
        } catch (e) {
            console.log(e)
        }
    }

    const updateMessage = async () => {
        try {
            const res = await updateItemInCollection("1Jh6W6EDAZ3rajpq19S5", "valodik", "users")
            console.log(res)

        } catch (e) {
            console.log(e)
        }
    }
    return user ? (
        <Container>
            <Grid container style={{height: window.innerHeight - 50}}
                  alignItems={"center"} justifyContent={"center"}>

                <div style={{width: "80%", height: '70vh', border: '1px solid gray', overflowY: 'auto'}}>

                </div>
                <Grid container direction="row" alignItems="flex-end" style={{width: '80%'}}>
                    <TextField onChange={e => setValue(e.currentTarget.value)} value={value} fullWidth maxRows={2}
                               variant='outlined'/>
                    <Button onClick={sendMessage} variant="outlined">send</Button>
                    <Button onClick={getMessage} variant="outlined">get</Button>
                    <Button onClick={updateMessage} variant="outlined">update</Button>
                </Grid>

            </Grid>
        </Container>
    ) : (
        <Navigate to="/login"/>
    );
});

