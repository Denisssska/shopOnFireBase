import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import {useGoodsFromBadge} from "../Hooks/useGoodsFromBadge";
import {Button, ButtonGroup, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {ChangeEvent, useState} from "react";
import {useAppDispatch} from "../Hooks/Hooks";
import {InitialStateType, removeGoodFromBadge, removeGoodsFromBadgeTC} from "../Store/Slices/goodsInBadgeSlice";

export const BasicTable = React.memo(() => {

    const [number, setNumber] = useState(1)
    const [newPrice, setNewPrice] = useState(0)
    const rows = useGoodsFromBadge()
    const dispatch = useAppDispatch()
    const rowsPrice = rows.map(item => item.price)
    const sum = rowsPrice.reduce((acc, number) => acc + number, 0);
    console.log(rowsPrice)
    // const deleteGoodsFromBadge = (id: string) => {
    //     dispatch(removeGoodsFromBadgeTC({id}))
    // }
    const deleteGoodsFromBadge = (good:InitialStateType) => {
        dispatch(removeGoodsFromBadgeTC(good))
    }
    const changeNumber = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNumber(+e.currentTarget.value)
    }
    const addHandler = (price: number) => {
        setNumber(number + 1)
        setNewPrice(newPrice + price)
    }
    const removeHandler = (price: number) => {
        setNumber(number - 1)
        setNewPrice(newPrice - price)
    }

    return (
        <TableContainer component={Paper} sx={{margin: '0 auto'}}>
            <Table sx={{minWidth: 650, margin: 0, padding: 0}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{padding: 2}}>Тип котла</TableCell>
                        <TableCell sx={{padding: 2}} align="center">Фото</TableCell>
                        <TableCell sx={{padding: 2}} align="center">Модель</TableCell>
                        <TableCell sx={{padding: 2}} align="center">Количество</TableCell>
                        <TableCell sx={{padding: 2}} align="center">Цена</TableCell>
                        <TableCell sx={{padding: 2}} align="center">Итого : {sum}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.type}
                            </TableCell>
                            <TableCell sx={{padding: 2}} align="center"><img src={row.photo} alt="boiler"/></TableCell>
                            <TableCell sx={{padding: 2}} align="center">{row.goodsName}</TableCell>
                            <TableCell sx={{padding: 2}} align="center">
                                <ButtonGroup sx={{justifyContent: 'center'}} variant='outlined'
                                             aria-label="outlined button group">
                                    <Button component={'div'} disabled={number === 10}
                                            onClick={() => addHandler(row.price)}><AddIcon/></Button>
                                    <TextField sx={{width: '20%', alignItems: 'center'}}
                                               value={number < 1 || number > 10 ? 1 : number}
                                               onChange={changeNumber}/>
                                    <Button component={'div'} disabled={number <= 1}
                                            onClick={() => removeHandler(row.price)}><RemoveIcon/></Button>
                                </ButtonGroup>
                            </TableCell>
                            <TableCell sx={{padding: 2}}
                                       align="center">{row.price + newPrice}</TableCell>
                            <TableCell sx={{padding: 2}} align="center">
                                <Button
                                    onClick={() => deleteGoodsFromBadge(row)} variant='outlined'>Удалить</Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});
