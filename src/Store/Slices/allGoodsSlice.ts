import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {InitialStateType} from "./goodsInBadgeSlice";

export const addGoodsTC = createAsyncThunk('allGoods/addGoodsTC', async (goods: InitialStateType, thunkAPI) => {
    try {
        await thunkAPI.dispatch(addAllGoods(goods))
    } catch (e) {
        console.log(e)
    }
})
export const changeInBadgeTC = createAsyncThunk('allGoods/changeInBadgeTC', async (good:InitialStateType, thunkAPI) => {
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
            state.push(action.payload)
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

