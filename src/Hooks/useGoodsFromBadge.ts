import {useAppSelector} from "./Hooks";

export const useGoodsFromBadge = () => {
    const good = useAppSelector(state => state.goodsInBadge);
    return good
}