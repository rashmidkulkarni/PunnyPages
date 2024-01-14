// import {ShoppingCartItem, BookItem, OrderDetails} from "../types";
// import {Dispatch, ReducerAction} from "react";
// const storageKey = "orderDetails"
// const storedData = localStorage.getItem(storageKey)
// export const initialState = storedData ? JSON.parse(storedData) : [];
//
// // const initialState = {
// //     orderDetails: {},
// // };
//
// export const OrderDetailsTypes = {
//     UPDATE:'UPDATE',
//     CLEAR:'CLEAR'
// };
//
// export type AppActions = {
//     orderId:number;
//     type: 'UPDATE'  | 'CLEAR';
//     item: OrderDetails;
// }
// export const orderDetailReducer = (state:OrderDetails[], action:AppActions) => {
//     switch(action.type) {
//         case OrderDetailsTypes.UPDATE:
//             return [
//                 ...state,
//                 {orderId: action.orderId,customer: action.item, order: action.item,lineItems: action.item,books:action.item}
//             ];
//
//
//
//
//         case OrderDetailsTypes.CLEAR:
//             // Clear the whole cleared orderDetails
//             return [
//                 []
//             ];
//
//
//         default:
//             throw new Error(`Invalid action type ${action.type}`);
//
//     }
//
// };

import { OrderDetails } from "../types";
import {defaultOrderDetails} from "../contexts/OrderDetailContext";

export const OrderTypes = {
    UPDATE: 'UPDATE',
    CLEAR: 'CLEAR'
}

type OrderAction =
    | { type: 'UPDATE'; payload: OrderDetails }
    | { type: 'CLEAR'; };

export const orderDetailsReducer = (state: OrderDetails, action: OrderAction): OrderDetails => {
    switch (action.type) {
        case OrderTypes.UPDATE:
            if ("payload" in action) {
                return action.payload;
            }

            throw new Error("Did not find the order details to update");

        case OrderTypes.CLEAR:
            return defaultOrderDetails;

        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
}
