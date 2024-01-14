import "../assets/css/CartTable.css"
import {BookItem} from "../types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {useContext, useEffect, useState} from 'react'
import {ShoppingCartItem} from "../types";
import {CartStore} from "../contexts/CartContext";
import {AppActions, CartTypes} from "../reducers/CartReducer";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


const bookImageFileName = (book: BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.gif`;
};


function CartTable() {
    const [cart, setCart] = useState<ShoppingCartItem[]>([]);
    const [cartChanged, setCartChanged] = useState(false); // New state to track cart changes
    const {dispatch} = useContext(CartStore);
    const navigate = useNavigate();

    const clearCart = () => {
        dispatch({type: 'CLEAR'});
    };

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


    const clearCartBooks = () => {
        // Clear local storage directly
        localStorage.removeItem("cart");
        // Update the state to reflect the change (optional)
        setCart([]);
    };

    const getItemCounts = () => {
        let totalItems = 0
        cart.forEach(item => {
            totalItems += item.quantity
        });

        if (totalItems === 0) return "There are no items in your cart";
        if (totalItems === 1) return "There is 1 item in your cart. Continue shopping to add more";
        return `There are ${totalItems} items in your cart`;
    };

    const getSubtotal = () => {
        let totalCost = 0
        cart.forEach(item => {
            totalCost += item.quantity * item.book.price;
        });
        if (totalCost === 0) return "";
        return `Subtotal: $${totalCost.toFixed(2)}`;
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden'}}>

            {/* Flex container for buttons */}
            <div
                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', gap: '5em'}}>

                <button
                    type="button"
                    className="checkout-button"
                    style={{marginRight: '2em'}}
                    onClick={() => navigate(`/categories/${localStorage.getItem('lastVisitedCategory')}`)} >
                    Continue Shopping
                </button>
                <span className="itemCountClass">{getItemCounts()}</span>
                <span className="itemCountSubTotalClass">{getSubtotal()}</span>

            </div>

            <div style={{flex: 1}}>

                <div className="cart-table">
                    {cart.length === 0 ? (
                        <p>Your cart is empty. Add some books to proceed.</p>
                    ) : (
                        <>

                            <ul className="cart2">
                                <li className="table-heading">
                                    <div className="heading-book">Book</div>
                                    <div
                                        className="heading-price">Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quantity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                    <div className="heading-subtotal">Amount</div>
                                </li>
                                {/* TODO : You need to iterate through the cart and display book image, */}
                                {/*        Book Title, unit price/quantity and total price for each item in the cart*/}
                                {/*        Note that the following simply display hardcoded data*/}


                                {cart.map((cartItem, i) => (
                                    <ul key={i}>
                                        <li key={cartItem.id}>
                                            <div className="cart-book-image">
                                                <img
                                                    className="cart2"
                                                    src={require("../assets/images/site/" +
                                                        bookImageFileName(cartItem.book))}
                                                    alt={cartItem.book.title}
                                                />

                                            </div>
                                            <div className="cart-book-title">{cartItem.book.title}</div>

                                            <div className="cart-book-price">
                                                ${cartItem.book.price.toFixed(2)}
                                            </div>
                                            <div className="cart-book-quantity">
                                                <button
                                                    className="icon-button inc-button"
                                                    onClick={() =>
                                                        updateQuantity(i, 1)
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faPlusCircle}/>
                                                </button>
                                                <span className="quantity">{cartItem.quantity}</span>&nbsp;
                                                <button className="icon-button dec-button"
                                                        onClick={() =>
                                                            updateQuantity(i, -1)
                                                        }
                                                >
                                                    <FontAwesomeIcon icon={faMinusCircle}/>
                                                </button>
                                            </div>
                                            <div className="cart-book-subtotal">
                                                ${(cartItem.book.price * cartItem.quantity).toFixed(2)}
                                            </div>
                                        </li>
                                        <li key={`sep-${i}`} className="line-sep list"></li>
                                    </ul>
                                ))}

                                {/* Proceed to Checkout Button */}
                                <Link to="/checkout" className="checkout-button-CTA"
                                      style={{marginRight: '2em', textDecoration: 'none'}}>
                                    Proceed to Checkout
                                </Link>
                            </ul>
                        </>

                    )}
                </div>
                <div>
                    <button
                        type="button"
                        className="checkout-button-tertiary-button"
                        style={{marginRight: '2em'}}
                        onClick={() => {
                            clearCart();
                            clearCartBooks();
                            // Additional logic if needed
                        }}
                    >
                        Clear Cart
                    </button>
                </div>
            </div>

        </div>
    );
}

export default CartTable;

