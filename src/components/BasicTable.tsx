import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import {useGoodsFromBadge} from "../Hooks/useGoodsFromBadge";
import {Button} from "@mui/material";
import {useAppDispatch} from "../Hooks/Hooks";
import {InitialStateType, removeGoodsFromBadgeTC, removeStateInBadgeTC} from "../Store/Slices/goodsInBadgeSlice";
import {ChangePrice} from "./ChangeHandler";
import {useCallback, useState} from "react";

export const BasicTable = React.memo(() => {
    const rows = useGoodsFromBadge()
    const dispatch = useAppDispatch()
    const rowsPrice = rows.map(item => item.price)
    const sum = rowsPrice.reduce((acc, num) => acc + num, 0);
const [empty,setEmpty]=useState(false)
    const deleteGoodsFromBadge = useCallback((good: InitialStateType) => {
        dispatch(removeGoodsFromBadgeTC(good))
    }, [])
    const sendGoodsFromBadge = () => {
        //dispatch(removeStateInBadgeTC())
        setEmpty(true)
        localStorage.removeItem('goodsInBadge')
    }
    //console.log(rows)
    return (
        <>
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
                                <TableCell sx={{padding: 2}} align="center"><img src={row.photo}
                                                                                 alt="boiler"/></TableCell>
                                <TableCell sx={{padding: 2}} align="center">{row.goodsName}</TableCell>
                                <TableCell sx={{padding: 2}} align="center">
                                    <ChangePrice row={row}/>
                                </TableCell>
                                <TableCell sx={{padding: 2}}
                                           align="center">{row.price}</TableCell>
                                <TableCell sx={{padding: 2}} align="center">
                                    <Button onClick={() => deleteGoodsFromBadge(row)}
                                            variant='outlined'>Удалить</Button>
                                </TableCell>

                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!empty?<Button onClick={() => sendGoodsFromBadge()} component={'div'}
                                   style={{display: 'flex', alignItems: "center"}} variant='contained'>Отправить
                    заказ</Button> :
                <Button color={'success'} component={'div'} style={{display: 'flex', alignItems: "center"}}
                        variant='contained'>Заказ отправлен</Button>}
        </>
    );
});
