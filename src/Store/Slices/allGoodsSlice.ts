import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {InitialStateType} from "./goodsInBadgeSlice";
import {getItemInCollection} from "../../firebase";

export const addGoodsTC = createAsyncThunk('allGoods/addGoodsTC', async (arg, thunkAPI) => {
    try {
        const res = await getItemInCollection('котлы')
        thunkAPI.dispatch(addAllGoods(res))
        // thunkAPI.dispatch(addAllGoods([{'1':'1'}]))
    }

    catch (e) {
        console.log(e)
    }
})
export const changeInBadgeTC = createAsyncThunk('allGoods/changeInBadgeTC', async (good: InitialStateType, thunkAPI) => {
    try {
        return await thunkAPI.dispatch(changeInBadge(good))
    } catch (e) {
        console.log(e)
    }
})
export const removeAllGoodsTC = createAsyncThunk('allGoods/removeAllGoodsTC', async (arg, thunkAPI) => {
    try {
        await thunkAPI.dispatch(removeAllGoodsState())
    } catch (e) {
        console.log(e)
    }
})
const initialState = [] as Array<InitialStateType>

const allGoodsSlice = createSlice({
    name: 'allGoods',
    initialState,
    reducers: {
        addAllGoods(state, action) {
           // console.log(action.payload)
            // state = action.payload
             state.push(...action.payload)
        },
        changeInBadge(state, action) {
            const index = state.findIndex(item => item.id === action.payload.id)
            if (index > -1) {
                state[index] = {...state[index], ...action.payload}
            }
        },
        removeAllGoodsState(state) {
            state = []
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(changeInBadgeTC.fulfilled, (state, action) => {
    //         const index = state.findIndex(item =>action.payload && item.id === action.payload.id)
    //         if (index > -1) {
    //             state[index] = {...state[index], ...action.payload}
    //         }
    //     })
    // }
})
export const {addAllGoods, removeAllGoodsState, changeInBadge} = allGoodsSlice.actions;
export default allGoodsSlice.reducer

