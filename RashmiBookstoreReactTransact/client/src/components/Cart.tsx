import CartTable from "./CartTable";
import {BookItem} from "../types";

function Cart() {

    return (
        <div style={{backgroundColor:'beige'}}>
            {/*<h1 style = {{fontFamily : "comic-sans",margin:'0'}}>Cart Page</h1>*/}
            <CartTable></CartTable>
        </div>
            )
        }

    export default Cart;