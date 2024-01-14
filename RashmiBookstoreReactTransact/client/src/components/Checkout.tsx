// // import { Link } from 'react-router-dom';
// // import { ShoppingCartItem } from '../types';
// // import React from 'react';
// // import Cart from "./Cart";
//
// // const Checkout: React.FC<{  }> = ({ cart }) => {
// //     return (
// //         <div>
// //             <h1>Checkout Page for Punny Pages</h1>
// //             <p>Thank you!</p>
// //             <Link to="/cart">Back to Cart</Link>
// //         </div>
// //     )
// // }
// // export default Cart;
// import React from 'react';
//
// const Checkout = () => {
//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' ,overflow: 'hidden'}}>
//         {/* Your checkout page content goes here */}
//             <h2>Checkout here!</h2>
//             {/* Add other checkout page content */}
//         </div>
//     );
// };
//
// export default Checkout;
import "../assets/css/Checkout.css"
//import { isCreditCard, isMobilePhone, isvalidEmail } from '../utils';
import {BookItem, CustomerForm, months, OrderDetails, ShoppingCartItem, years} from "../types";
import {CartStore} from "../contexts/CartContext";
import {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {OrderDetail} from "../contexts/OrderDetailContext";
import cart from "./Cart";



// type checkoutStatus = '' | 'pending' | 'error' | 'ok';


function Checkout() {
    const orderContext = useContext(OrderDetail);
    // const {dispatch} = useContext(OrderDetail);
    const bookImageFileName = (book: BookItem) => {
        let name = book.title.toLowerCase();
        name = name.replace(/ /g, "-");
        name = name.replace(/'/g, "");
        return `${name}.gif`;
    };




    /*
     * This will be used by the month and year expiration of a credit card
     *  NOTE: For example yearFrom(0) == <current_year>
    */
    function yearFrom(index: number) {
        return new Date().getFullYear() + index;
    }

    const [cart, setCart] = useState<ShoppingCartItem[]>([]);
    const [cartChanged, setCartChanged] = useState(false); // New state to track cart changes
    const {dispatch} = useContext(CartStore);
    const navigate = useNavigate();

    useEffect(() => {
        const getCartFromLocalStorage = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );
        setCart(getCartFromLocalStorage);
        setCartChanged(false);
    }, [cartChanged]);

    const updateQuantity = (index: number, quantityDelta: number) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity === 0) {
            return
        }
        if (quantityDelta < 0) {
            dispatch({
                type: CartTypes.REMOVE,
                item: updatedCart[index].book,
                id: updatedCart[index].id,
            });
        } else if (quantityDelta > 0) {
            dispatch({
                type: CartTypes.ADD,
                item: updatedCart[index].book,
                id: updatedCart[index].id,
            });
        }

        updatedCart[index].quantity = updatedCart[index].quantity + quantityDelta;
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartChanged(true);
    };


    const getSubtotal = () => {
        let totalCost = 0;
        cart.forEach(item => {
            totalCost += item.quantity * item.book.price;
        });
        if (totalCost === 0) return "";
        return `Subtotal: $${totalCost.toFixed(2)}`;
    };

    const getItemCounts = () => {
        let totalItems = 0
        cart.forEach(item => {
            totalItems += item.quantity;

        });
        // if (totalItems === 0) return "There are no items in your cart";
        // if (totalItems === 1) return "(1)";
        return ` (${totalItems})`;
    };
    const totalWithTax = () => {
        let tax = 10;
        let totalCost = 0;
        cart.forEach(item => {
            totalCost += item.quantity * item.book.price;
        });
        totalCost += tax;
        return `Total Amount after tax: $${totalCost.toFixed(2)}`;
    };


    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ccNumberError, setccNumberError] = useState("");
    const [ccExpiryMonthError, setccExpiryMonth] = useState(0);
    const [ccExpiryYearError, setccExpiryYear] = useState(0);

    // TO DO error states for the rest of the input elements

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        ccNumber: "",
        ccExpiryMonth: 1,
        ccExpiryYear: yearFrom(0)
    });

    const [checkoutStatus, setCheckoutStatus] = useState("");

    const US_MOBILE_PHONE_PATTERN =
        /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/;

    function isMobilePhone(input: string): boolean {
        return US_MOBILE_PHONE_PATTERN.test(input);
    }

    const EMAIL_Pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

    function isvalidEmail(input: string): boolean {
        return EMAIL_Pattern.test(input);
    }

    const creditCard =
        /^(?:4[0-9]{12}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14}|^(81[0-9]{14,17}))$/;

    /* eslint-enable max-len */
    function isCreditCard(str: string) {
        const sanitized = str.replace(/[- ]+/g, "");

        if (!creditCard.test(sanitized)) {
            return false;
        }

        let sum = 0;
        let digit;
        let tmpNum;
        let shouldDouble;

        for (let i = sanitized.length - 1; i >= 0; i--) {
            digit = sanitized.substring(i, i + 1);
            tmpNum = parseInt(digit, 10);

            if (shouldDouble) {
                tmpNum *= 2;

                if (tmpNum >= 10) {
                    sum += (tmpNum % 10) + 1;
                } else {
                    sum += tmpNum;
                }
            } else {
                sum += tmpNum;
            }

            shouldDouble = !shouldDouble;
        }

        return !!(sum % 10 === 0 ? sanitized : false);
    }

    function isValidForm() {
        if (formData.name.length < 4 || formData.name.length > 45) {
            return false;
        }

        if (formData.address.length < 4 || formData.address.length > 45) {
            return false;
        }

        if (!isMobilePhone(formData.phone)) {
            return false;
        }

        if (!isvalidEmail(formData.email)) {
            return false;
        }

        if (!isCreditCard(formData.ccNumber)) {
            return false;
        }

        return true;
    }


    // TO DO placeOrder function comes here. Needed for project 9 (not 8)

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

        const {name, value} = event.target;

        switch (name) {
            case 'name':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (value.length < 4 || value.length > 45) {
                    setNameError("Name must be at least 4 characters long!");
                } else {
                    setNameError("");
                }
                break;
            case 'address':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (value.length < 4 || value.length > 45) {
                    setAddressError("Address must be at least 4 characters long!");
                } else {
                    setAddressError("");
                }
                break;
            case 'phone':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (!isMobilePhone(value)) {
                    setPhoneError("Enter a valid phone number");
                } else {
                    setPhoneError("");
                }

                break;
            case 'email':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (!isvalidEmail(value)) {
                    setEmailError("Enter a valid email id");
                } else {
                    setEmailError("");
                }

                break;
            case 'ccNumber':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if (!isCreditCard(value)) {
                    setccNumberError("Enter valid credit card number");
                } else {
                    setccNumberError("");
                }

                break;
            case 'ccExpiryMonth':
                setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value, 10)}));
                break;
            case 'ccExpiryYear':
                setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value, 10)}));
                break;
            default:
                break;
        }
    }

    async function submitOrder(event: FormEvent) {
        event.preventDefault();
        console.log("Submit order");
        const isFormCorrect = isValidForm();
        console.log(isFormCorrect);
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            })
            if (orders) {
                setCheckoutStatus("OK");
                navigate('/confirmation');
            } else {
                console.log("Error placing order");
            }
        }

        const setOrders = await placeOrder({...formData, phone: formData.phone.replace(/[^\d]/g, ''), ccNumber: formData.ccNumber.replace(/[^\d]/g, '')});

        orderContext.dispatch({type: "UPDATE", payload: setOrders});
    }

    function isButtonLoading() {
        // return true;
        return checkoutStatus!=="" && checkoutStatus!=="ERROR";
    }



    // function isButtonLoading() {
    //     // return true;
    //     return checkoutStatus!=="" && checkoutStatus!=="ERROR";
    // }

    const placeOrder =  async (customerForm: CustomerForm) =>  {

        const order = { customerForm: customerForm, cart:{itemArray:cart} };

        const orders = JSON.stringify(order);
        console.log(orders);     //you can uncomment this to see the orders JSON on the console
        const url = 'api/orders';
        const orderDetails: OrderDetails = await axios.post(url, orders,
            {headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                dispatch({type: CartTypes.CLEAR});
                return response.data;
            })
            .catch((error)=>console.log(error));
        console.log("order details: ", orderDetails);
        return orderDetails;
    }


    const currentYear = new Date().getFullYear();

    return (

        <section className="checkout-cart-table-view">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    gap: '5em'
                }}>

                <button
                    type="button"
                    className="checkout-button"
                    onClick={() => navigate(`/categories/${localStorage.getItem('lastVisitedCategory')}`)}
                >
                    Continue Shopping
                </button>
                {/*<span className = "itemCountClass">{getItemCounts()}</span>*/}
                {/*<span className = "itemCountSubTotalClass">{getSubtotal()}</span>*/}

            </div>
            <div className="checkout-page-body" style={{minHeight:'100vh'}}>
                {cart.length === 0 &&
                    <div>
                        <p>Your cart is empty. Add some books to proceed.</p>
                    </div>
                }
                {cart.length !== 0 &&
                    <div>
                        <div>
                            <div>
                                <form
                                    className="checkout-form"
                                    onSubmit={(event) => submitOrder(event)}
                                    method="post"
                                >
                                    <div>
                                        <label htmlFor="fname">Name</label>
                                        <input
                                            type="text"
                                            size={10}
                                            name="name"
                                            id="fname"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <> {nameError && <div className="error"> {nameError}</div>}</>
                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            size={10}
                                            name="address"
                                            id="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <> {addressError && <div className="error"> {addressError}</div>}</>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="text"
                                            size={10}
                                            name="phone"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <> {phoneError && <div className="error"> {phoneError}</div>}</>
                                    <div>
                                        <label htmlFor="email">Email-ID</label>
                                        <input
                                            type="text"
                                            size={10}
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <> {emailError && <div className="error"> {emailError}</div>}</>

                                    <div>
                                        <label htmlFor="ccNumber">Credit Card Number</label>
                                        <input
                                            type="text"
                                            size={10}
                                            name="ccNumber"
                                            id="ccNumber"
                                            value={formData.ccNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <> {ccNumberError && <div className="error"> {ccNumberError}</div>}</>
                                    {/*  TO DO add the form elements for phone, address, email, and Credit card*/}
                                    {/* Together with the error display*/}
                                    <section className='expiry' style={{display: 'flex', flexDirection: 'row',gap: "2em"}}>
                                        <label htmlFor="ccExpiryMonth">Exp Month</label>
                                        <select
                                            style={{ color: 'black' }}
                                            name="ccExpiryMonth"
                                            value={formData.ccExpiryMonth}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            {months.map((month, i) => (
                                                <option key={i} value={i + 1}>
                                                    {month}
                                                </option>
                                            ))}
                                        </select>
                                        <label htmlFor="ccExpiryYear">Exp Year</label>
                                        <select
                                            style={{ color: 'black' }}
                                            name="ccExpiryYear"
                                            value={formData.ccExpiryYear}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            {years.map((year, i) => (
                                                <option key={i} value={currentYear + i}>
                                                    {currentYear + i}
                                                </option>
                                            ))}
                                        </select>
                                    </section>

                                </form>
                            </div>


                        </div>

                        <div>
                            {/*This displays the information about the items in the cart*/}
                            <ul className="checkout-cart-info">
                                {
                                    cart?.map((item, i) => (
                                        <div key={`sep-${i}`} className="checkout-cart-book-item">
                                            <div className="cart-book-image">
                                                <img
                                                    className="cart2"
                                                    src={require("../assets/images/site/" +
                                                        bookImageFileName(item.book))}
                                                    alt={item.book.title}
                                                    width="90%"
                                                    height="100%"
                                                />

                                            </div>
                                            <div className="checkout-cart-book-info">
                                                <div className="checkout-cart-book-title">{item.book.title}</div>

                                                <div className="checkout-cart-book-subtotal">
                                                    {/*TO DO the total cost of this specific book displayed here*/}
                                                    <p>${item.quantity * item.book.price}</p>
                                                </div>
                                                <div className="checkout-cart-book-quantity">
                                                    <button className="checkout-icon-button" onClick={() =>
                                                        updateQuantity(i, 1)
                                                    }>
                                                        <i className="fas fa-plus-circle"><FontAwesomeIcon
                                                            icon={faPlusCircle}/></i>
                                                    </button>
                                                    <button className="checkout-num-button">{item.quantity}</button>
                                                    <button className="dec-button"
                                                            onClick={() =>
                                                                updateQuantity(i, -1)
                                                            }>
                                                        <i className="fas fa-minus-circle"><FontAwesomeIcon
                                                            icon={faMinusCircle}/></i>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                            </ul>
                            <div className="checkout-box">
                                <div className="total-cost">
                                    <strong></strong> {getSubtotal()}
                                    <div className="tax">
                                        <strong>Tax:</strong> $10.00
                                    </div>
                                    <div>
                                        <strong>Total items in the cart</strong> {getItemCounts()}
                                    </div>
                                    <div className="totalWithTax" style = {{color:"#092BA0"}}>
                                        {totalWithTax()}
                                    </div>
                                    <button onClick={submitOrder} style={{ display: isButtonLoading()? 'none' : 'block' }} className="checkout-button-CTA">
                                        Checkout
                                    </button>
                                </div>

                            </div>
                        </div>
                        <div>
                            {/*The following code displays different string based on the */}
                            {/*value of the checkoutStatus*/}
                            {/*Note the ternary operator*/}
                            {
                                checkoutStatus !== '' ?
                                    <>
                                        <section className="checkoutStatusBox">
                                            {(checkoutStatus === 'ERROR') ?
                                                <div>
                                                    Error: Please fix the problems above and try again.
                                                </div> : (checkoutStatus === 'PENDING' ?
                                                    <div>
                                                        Processing...
                                                    </div> : (checkoutStatus === 'OK' ?
                                                        <div>
                                                            Order placed...
                                                        </div> :
                                                        <div>
                                                            An unexpected error occurred, please try again.
                                                        </div>))}
                                        </section>
                                    </>
                                    : <></>}
                        </div>
                    </div>

                }


            </div>
        </section>

    );
}


export default Checkout;
