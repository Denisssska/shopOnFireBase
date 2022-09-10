import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {AppDispatch, StateAppType} from "../Store/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StateAppType> = useSelector;