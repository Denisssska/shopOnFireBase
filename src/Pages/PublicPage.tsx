import React, {useCallback, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {Navigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, getItemInCollection} from "../firebase";
import {Button} from "@mui/material";
import {addGoodsInBadgeTC, InitialStateType} from "../Store/Slices/goodsInBadgeSlice";
import {useAppDispatch, useAppSelector} from "../Hooks/Hooks";
import {useGoodsFromBadge} from "../Hooks/useGoodsFromBadge";
import {addGoodsTC} from "../Store/Slices/allGoodsSlice";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export const PublicPage = React.memo(() => {


    const good = useGoodsFromBadge();
    //console.log(good)
    const allGoods = useAppSelector(state => state.allGoods) as Array<InitialStateType>
    const [user] = useAuthState(auth)
    const dispatch = useAppDispatch()

    const addInBadge = useCallback((good: InitialStateType) => {
        dispatch(addGoodsInBadgeTC({...good,inBadge:true}))

    }, [])
    // console.log(goodsFromBadge)
    console.log(allGoods)

    return user ? (
        <Box>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}
                  style={{margin: '2% auto', width: '90%'}}>
                {allGoods && allGoods.map((item, index) => (<Grid key={index} item xs={6}>
                    <Item>
                        <img src={item.photo} alt="boiler"/>
                        <h2>{item.goodsName}</h2>
                        <div>Тип : {item.type}</div>
                        <div>Кол-во контуров : {item.contursNumber}</div>
                        <div>Камера сгорания : {item.compressionChamber}</div>
                        <div>Вид топлива : {item.typeOfFuel}</div>
                        <div>Тепловая мощность : {item.power} кВт</div>
                        <div> Площадь обогрева{item.squareHeating} м<sup>2</sup></div>
                        <div>Глубина : {item.depth} см</div>
                        <h2>Цена : {item.price} р</h2>
                        {!item.inBadge ?
                            <Button onClick={() => addInBadge(item)} variant="outlined">В
                                корзину</Button> :
                            <Button variant="outlined">В корзине</Button>}
                    </Item>

                </Grid>))}
            </Grid>
        </Box>
    ) : (<Navigate to="/login"/>);

});

