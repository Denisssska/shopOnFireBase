import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {changeInBadgeTC} from "./allGoodsSlice";


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

export const addGoodsInBadgeTC = createAsyncThunk('goods/addGoodsInBadgeTC', async (good: InitialStateType, thunkAPI) => {
    try {
        await thunkAPI.dispatch(addGoodsInBadge({...good,inBadge:true}))
        await thunkAPI.dispatch(changeInBadgeTC(true))
    } catch (e) {
        console.log(e)
    }
})
export const removeGoodsFromBadgeTC = createAsyncThunk('goods/removeGoodsFromBadgeTC', async (arg:{id:string}, thunkAPI) => {
    try {
        await thunkAPI.dispatch(removeGoodFromBadge({id:arg.id}))
        await thunkAPI.dispatch(changeInBadgeTC(false))
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
export const {addGoodsInBadge, removeGoodFromBadge, removeStateInBadge} = goodsInBadgeSlice.actions;
export default goodsInBadgeSlice.reducer

