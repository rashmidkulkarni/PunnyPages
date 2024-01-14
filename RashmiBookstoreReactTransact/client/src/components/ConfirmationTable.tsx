//you Can use the following css file
//
//     .confirmation_table {
//     border: 1px black solid;
//     width: fit-content;
//     margin-top: 1em;
//     margin-bottom: 1em;
// }
//
// .confirmation_td {
//     display: table-cell;
//     padding: 0.5em 0.5em;
//     background-color: white;
//     vertical-align: middle;
// }
//
// .confirmation_tr:nth-child(even) > td {
//     background-color: lightgray;
// }
//
// .confirmation_td:nth-child(1) {
//     text-align: left;
// }
//
// .confirmation_td:nth-child(2) {
//     text-align: center;
// }
//
// .confirmation_td:nth-child(3) {
//     text-align: right;
// }
//
// .checkout-text {
//     margin-top: 40px;
//     margin-left: 50px;
//     margin-bottom:20px;
// }
// .checkout-view {
//     dsiplay: flex;
//     flex-direction: column;
//     border: 1px solid black;
//     border-radius: 10px;
// }

//import '../assets/css/ConfirmationTable.css'

// import { asDollarsAndCents } from "../utils";

import { BookItem, OrderDetails } from '../types'

import {OrderDetail} from "../contexts/OrderDetailContext";
import {useContext} from "react";
import "../assets/css/ConfirmationTable.css"

function ConfirmationTable() {
    const { orderDetails} = useContext(OrderDetail);

// A helper function - optional to use
    const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
        return orderDetails.books[index];
    };
    function getBookQuantity(bookId: number): number {
        const lineItem = orderDetails.lineItems.find(item => item.bookId === bookId);
        return lineItem ? lineItem.quantity : 0;
    };

    const calculatePerBookCost = (bookId: number) => {
        const lineItem = orderDetails.lineItems.find((item) => item.bookId === bookId);
        const book = orderDetails.books.find((book) => book.bookId === bookId);

        if (lineItem && book) {
            return (lineItem.quantity * book.price).toFixed(2).toString();
        }
    };

        return (
        <table className="confirmation_table">
            <thead className="table-heading">
            <tr className="confirmation_tr">
                <th className="Name">Name</th>
                {/*<th className="confirmation_td">Book ID</th>*/}
                <th className="Quantity">Quantity</th>
                <th className = "book-total">Total Price</th>
            </tr>
            </thead>
            <tbody>
            {
                orderDetails.books?.map((book, i) => (


                    <tr className="table-contents" key={i}     >
                        <td className="title">
                            {book.title}
                        </td>
                        {/*<td className = "confirmation_td">{book.bookId}</td>*/}
                        <td className = "per-book-quantity">{getBookQuantity(book.bookId)}</td>
                        <td className = "per-book-cost"> ${calculatePerBookCost(book.bookId)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )}

export default ConfirmationTable;
