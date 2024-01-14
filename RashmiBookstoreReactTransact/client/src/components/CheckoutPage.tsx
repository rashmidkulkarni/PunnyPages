import Checkout from "./Checkout";
import {BookItem} from "../types";

function CheckoutPage() {

    return (
        <div style={{backgroundColor:'beige'}}>
            {/*<h1 style = {{fontFamily : "comic-sans",margin:'0'}}>Cart Page</h1>*/}
            <Checkout></Checkout>
        </div>
    )
}

export default CheckoutPage;