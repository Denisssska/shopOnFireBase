import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {updateStateTC} from "./allGoodsSlice";


export type InitialStateType = {
    compressionChamber: string
    contursNumber: string
    depth: number
    goodsName: string
    photo: string
    power: number
    price: number
    squareHeating: number
    type: string
    typeOfFuel: string
    id: string
    inBadge: boolean
}
let mass: InitialStateType[] = [];
export const addGoodsInBadgeTC = createAsyncThunk('goods/addGoodsInBadgeTC', async (good: InitialStateType, thunkAPI) => {
    try {
        await thunkAPI.dispatch(addGoodsInBadge({...good, inBadge: true}))
        await thunkAPI.dispatch(updateStateTC(good))
        mass.push(good)
        const all = JSON.stringify(mass)
        localStorage.setItem('goodsInBadge', all)
        //localStorage.clear();
    } catch (e) {
        console.log(e)
    }
})
export const updateGoodInBadgeTC = createAsyncThunk('goods/updateGoodInBadgeTC', async (arg: InitialStateType, thunkAPI) => {
    try {
        await thunkAPI.dispatch(updateGoodInBadge(arg))
    } catch (e) {
        console.log(e)
    }
})
export const removeGoodsFromBadgeTC = createAsyncThunk('goods/removeGoodsFromBadgeTC', async (good: InitialStateType, thunkAPI) => {
    try {
        await thunkAPI.dispatch(removeGoodFromBadge(good))
        await thunkAPI.dispatch(updateStateTC({...good, inBadge: false}))
        localStorage.setItem('goodsInBadge',JSON.stringify(mass.filter(item =>item.id !==good.id)))
    } catch (e) {
        console.log(e)
    }
})
const initialState = [] as Array<InitialStateType>

const goodsInBadgeSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        addGoodsInBadge(state, action) {
            state.push(action.payload)
        },
        updateGoodInBadge(state, action) {
            const index = state.findIndex(item => item.id === action.payload.id)
            if (index > -1) {
                state[index] = {...state[index], ...action.payload}
            }
        },
        removeGoodFromBadge(state, action) {
            const index = state.findIndex(item => action.payload && item.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        removeStateInBadge(state) {
            state = []
        }
    }
})
export const {addGoodsInBadge, removeGoodFromBadge, updateGoodInBadge, removeStateInBadge} = goodsInBadgeSlice.actions;
export default goodsInBadgeSlice.reducer

