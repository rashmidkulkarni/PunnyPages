// import {createContext, Dispatch, ReactNode, useEffect, useReducer} from "react";
// import { AppActions, orderDetailReducer,initialState } from "../reducers/OrderReducer";
// import { OrderDetails } from "../types";
// const storageKey = 'orderDetails';
//
// const initialOrderDetailsState:OrderDetails[] =  []
// console.log("initial state=",initialState)
// export const OrderDetail = createContext<{
//     orderDetails: OrderDetails[];
//     dispatch: Dispatch<any>;
// }>({
//     orderDetails: initialState,
//     dispatch: () => null
// });
//
// OrderDetail.displayName = 'OrderDetailsContext';
//
// interface OrderDetailsContextProps{
//     children:ReactNode;
// }
//
// function OrderDetailsContext({ children }: OrderDetailsContextProps) {
//     const [orderDetails, dispatch] = useReducer(
//         orderDetailReducer as (state: OrderDetails[], action: AppActions) => OrderDetails[],
//         initialState
//     );
//     useEffect(() => {
//         localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
//     }, [orderDetails]);
//
//     return (
//         <OrderDetail.Provider value={{ orderDetails, dispatch }}>
//             {children}
//         </OrderDetail.Provider>
//     );
// }
//
//
// export default OrderDetailsContext;
import React, {createContext, Dispatch, useReducer} from "react";
import { OrderDetails } from "../types";
import { orderDetailsReducer } from "../reducers/OrderReducer";

type Action =
    | { type: 'UPDATE', payload: OrderDetails }
    | { type: 'CLEAR' };

export const defaultOrderDetails: OrderDetails = {
    order: {
        orderId: 0,
        amount: 0,
        dateCreated: Date.now(),
        confirmationNumber: 0,
        customerId: 0,
    },
    customer: {
        customerName: '',
        address: '',
        phone: '',
        email: '',
        ccNumber: '',
        ccExpDate: Date.now()
    },
    books: [],
    lineItems: []
};

const initialState: OrderDetails = defaultOrderDetails;

interface OrderDetailsContextProps {
    orderDetails: OrderDetails;
    dispatch: Dispatch<Action>;
}

const defaultContextValue: OrderDetailsContextProps = {
    orderDetails: initialState,
    dispatch: () => {}
}

export const OrderDetail = createContext<OrderDetailsContextProps>(defaultContextValue);
OrderDetail.displayName = 'OrderDetailContext';

interface OrderDetailProviderProps {
    children: React.ReactNode;
}

function OrderDetailContext({ children }: OrderDetailProviderProps) {
    const [state, dispatch] = useReducer(orderDetailsReducer, initialState);

    return (
        <OrderDetail.Provider value={{ orderDetails: state, dispatch }}>{children}</OrderDetail.Provider>
    );
}

export default OrderDetailContext;