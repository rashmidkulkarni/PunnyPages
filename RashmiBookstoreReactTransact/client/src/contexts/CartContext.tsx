import {createContext, Dispatch, ReactNode, useEffect, useReducer} from "react";
import { AppActions, cartReducer,initialState } from "../reducers/CartReducer";
import { ShoppingCartItem} from "../types";
const storageKey = 'cart';

const initialCartState:ShoppingCartItem[] =  []
console.log("initial state=",initialState)
export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';

interface CartContextProps{
    children:ReactNode;
}

function CartContext({ children }: CartContextProps) {
    const [cart, dispatch] = useReducer(
        cartReducer as (state: ShoppingCartItem[], action: AppActions) => ShoppingCartItem[],
        initialState
    );
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartStore.Provider value={{ cart, dispatch }}>
            {children}
        </CartStore.Provider>
    );
}


export default CartContext;