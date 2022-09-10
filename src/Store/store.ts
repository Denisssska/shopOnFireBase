import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import goodsInBadgeSlice from "./Slices/goodsInBadgeSlice";
import allGoodsSlice from "./Slices/allGoodsSlice";

export type StateAppType = ReturnType<typeof reducersBox>;
const reducersBox = combineReducers({
    goodsInBadge: goodsInBadgeSlice,
    allGoods:allGoodsSlice
})
const store = configureStore({
    reducer: reducersBox,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type AppDispatch = typeof store.dispatch;

export default store;
