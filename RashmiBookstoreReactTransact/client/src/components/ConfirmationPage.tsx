// You can use the following Css file
// .confirmationView {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     margin: 1em auto;
// }
// ul {
//     text-align: left;
// }
// ul > li {
//     margin: 1em;
// }


//import '../assets/css/Confirmation.css'
import ConfirmationTable from "./ConfirmationTable";
import {useContext, useEffect, useState} from "react";
import {OrderDetail} from "../contexts/OrderDetailContext";
import {ShoppingCartItem,OrderDetails} from "../types";
// import {OrderDetail} from "../Contexts/OrderDetailContext";
import "../assets/css/ConfirmationPage.css"


function ConfirmationPage()
{
    const { orderDetails } = useContext(OrderDetail);

    const orderDate =  () => {
        let date = new Date(orderDetails.order.dateCreated);
        return ( date.toLocaleString());
    };
    const ccExpDate =  (): Date =>{
        return new Date(orderDetails.customer.ccExpDate);
    };
    function getTotalBooks(): number {
        let total = 0;
        for (const lineItem of orderDetails.lineItems) {
            total += lineItem.quantity;
        }
        return total;
    }

    function getBookQuantity(bookId: number): number {
        const lineItemd = orderDetails.lineItems.find(item => item.bookId === bookId);
        return lineItemd ? lineItemd.quantity : 0;
    }

    const calculatePerBookCost = (bookId: number) => {
        const lineItemd = orderDetails.lineItems.find((item) => item.bookId === bookId);
        const book = orderDetails.books.find((book) => book.bookId === bookId);

        if (lineItemd && book) {
            return (lineItemd.quantity * book.price).toFixed(2).toString();
        }

        return "N/A";
    };

    // const getSubtotal = () => {
    //     let totalCost = 0
    //     orderDetails.lineItems.forEach(item => {
    //         totalCost += item.quantity * item.book.price;
    //     });
    //     if (totalCost === 0) return "";
    //     return `Subtotal: $${totalCost.toFixed(2)}`;
    // };
    const getSubtotal = () => {
        let totalCost = 0;

        // Assuming lineItems and books are arrays in your orderDetails
        orderDetails.lineItems.forEach(item => {
            const matchingBook = orderDetails.books.find(book => book.bookId === item.bookId);

            // Assuming each book has a price property
            if (matchingBook) {
                totalCost += item.quantity * matchingBook.price;
            }
        });

        if (totalCost === 0) return "";
        return `Subtotal: $${totalCost.toFixed(2)}`;
    };

    const totalWithTax = () => {
        let tax = 10;
        let totalCost = 0;
        orderDetails.lineItems.forEach(item => {
            const matchingBook = orderDetails.books.find(book => book.bookId === item.bookId);

            // Assuming each book has a price property
            if (matchingBook) {
                totalCost += item.quantity * matchingBook.price;
            }
        });
        totalCost += tax;
        return `Total Amount after tax: $${totalCost.toFixed(2)}`;
    };
    function creditCardDisplay() {
        // Convert timestamp to a Date object
        const providedDate = new Date(orderDetails.customer.ccExpDate);

        // Extract month and year from the date
        const month = providedDate.getMonth() + 1; // Add 1 since months are zero-based
        const year = providedDate.getFullYear();

        // Format the date as MM-YYYY
        const newDate = `${month.toString().padStart(2, '0')}-${year}`;


        const newCardNumber = `**** **** **** ${orderDetails.customer.ccNumber.slice(-4)}`;

        // Combine the formatted card number and date
        return `${newCardNumber} (${newDate})`;
    }


    return(

        <div className="confirmationView">
            <ul>
                <li>Confirmation #: {orderDetails.order.confirmationNumber}</li>
                <li>{orderDate()}</li>
            </ul>
            <ConfirmationTable />
            <ul>
                <li className="customerName"><b>Name:</b> { orderDetails?.customer?.customerName}</li>
                <li className="customerAddress"><b>Address:</b> { orderDetails?.customer?.address }</li>
                <li className="customerEmail"><b>Email:</b> { orderDetails?.customer?.email }</li>
                <li className="customerPhone"><b>Phone:</b> {orderDetails.customer?.phone}</li>
                <li className="customerCC"><b>Credit Card:</b> {creditCardDisplay()}</li>
            </ul>
            <div id="customerInfo"></div>
            <div className="checkout-box">
                <div className="total-cost">
                    <strong></strong> {getSubtotal()}
                </div>
                    <div className="tax">
                        <strong>Surcharge:</strong> $10.00
                    </div>
                    <div className="total-items" style={{color:"#092BA0"}}>
                        <strong>Total items</strong> {getTotalBooks()}
                    </div>
                    <div className="totalWithTax" style={{color:"#092BA0"}}>
                        <strong>{totalWithTax()}</strong>
                    </div>
                    {/*<button onClick={submitOrder} className="checkout-button-CTA">*/}
                    {/*    Checkout*/}
                    {/*</button>*/}
                </div>

            </div>


    )
}
export default ConfirmationPage;