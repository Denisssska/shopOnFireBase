import {ChangeEvent, useState} from "react";
import {InitialStateType, updateGoodInBadgeTC} from "../Store/Slices/goodsInBadgeSlice";
import {useAppDispatch, useAppSelector} from "../Hooks/Hooks";
import {Button, ButtonGroup, TextField} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type PropsType = {
    row: InitialStateType
}
export const ChangePrice: React.FC<PropsType> = ({row}) => {

    const dispatch = useAppDispatch()
    const [number, setNumber] = useState(1)
    const allGoods = useAppSelector(state => state.allGoods)
    const changeNumber = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNumber(+e.currentTarget.value)
    }
    const changeHandler = (row: InitialStateType, newNumber: number) => {
        setNumber(newNumber)
        let startPrice;
        if (allGoods) {
            startPrice = allGoods.find(item => item.id === row.id)
        }
        startPrice && dispatch(updateGoodInBadgeTC({...row, price: startPrice.price * newNumber}))
    }
    return (
        <ButtonGroup sx={{justifyContent: 'center'}} variant='outlined'
                     aria-label="outlined button group">
            <Button component='div' disabled={number === 10}
                    onClick={() => changeHandler(row, number + 1)}><AddIcon/></Button>
            <TextField sx={{width: '20%', alignItems: 'center'}}
                       value={number < 1 || number > 10 ? 1 : number}
                       onChange={changeNumber}/>
            <Button component='div' disabled={number <= 1}
                    onClick={() => changeHandler(row, number - 1)}><RemoveIcon/></Button>
        </ButtonGroup>
    )
}
