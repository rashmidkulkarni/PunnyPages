import {ShoppingCartItem, BookItem} from "../types";
import {Dispatch, ReducerAction} from "react";
const storageKey = "cart"
const storedData = localStorage.getItem(storageKey)
export const initialState = storedData ? JSON.parse(storedData) : [];



export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR'
};

export type AppActions = {
    id:number;
    type: 'ADD' | 'REMOVE'  | 'CLEAR';
    item: BookItem;
}
export const cartReducer = (state:ShoppingCartItem[], action:AppActions) => {
    switch(action.type) {
        case CartTypes.ADD:
             const existing = state.find((cartItem) => cartItem.id === action.id);
             if (existing) {
                // If it exists, increment the quantity
                return state.map((cartItem) => {
                    if (cartItem.id === action.id) {
                        return {...cartItem, quantity: cartItem.quantity + 1};
                    } else {
                        return cartItem;
                    }
                });

            } else {
                // If it doesn't exist, add a new item to the cart
                return [
                    ...state,
                    {id: action.id, book: action.item, quantity: 1},
                ];
            }
        case CartTypes.REMOVE:
            // Find the item to remove
            const itemToRemove = state.find((cartItem) => cartItem.id === action.id);
            console.log("Item to remove: " + itemToRemove?.book.title)
            console.log("Item to remove quantity: " + itemToRemove?.quantity)

            if (itemToRemove) {
                // If the item exists, decrement the quantity
                if (itemToRemove.quantity > 1) {
                    console.log('Reducing the quantity')
                    return state.map((cartItem) =>
                        cartItem.id === action.id
                            ? {...cartItem, quantity: cartItem.quantity - 1}
                            : cartItem
                    );
                } else  {
                    console.log('Removing the item')
                    // If the quantity is 1, remove the item from the cart
                    const tempState = state.filter((cartItem) => cartItem.id !== action.id);
                    tempState.forEach((item) => {
                        console.log('State after removal title:' + item.book.title);
                        console.log('State after removal quantity:' + item.quantity);
                    });
                    return tempState;

                }
            }
            // If the item doesn't exist, return the original state
            return state;

        case CartTypes.CLEAR:
            // Clear the whole cart
            return [];

    default:
        throw new Error(`Invalid action type ${action.type}`);

    }

};
