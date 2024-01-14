import '../assets/css/AppHeader.css';
import '../assets/css/AppFooter.css';
import'../assets/css/HeaderDropdown.css';//using headerdropdown.css for categories button etc.
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import '../App.tsx';
import {CategoryItem} from "../types";
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";
import {CartStore} from "../contexts/CartContext";
// import {categoryList} from "../types";

function AppHeader(){
    const categories = useContext<CategoryItem[]>(Category);
    const  {cart} = useContext(CartStore);
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

return(
    <div>
    <header>
    <section className="bookstore-logo">
      <Link to="/" style = {{margin:'0',padding:'0'}}>
        <img
          src={require('../assets/images/site/Punny_Pages-removebg-preview.png')}
          alt="Another Bookstore Logo"
          width="120px"
          height="120px"
        />
      </Link>
        <Link to = '/' style = {{textDecoration:'none',color :'white',display:'inline-block',margin:'0',padding:'0'}}>
        <h1 className="text-logo">PunnyPages</h1>
        </Link>
    </section>
      <section className = "nav-container">
          <section className = "hello-logout">
              <p>Hello Rashmi, Welcome Back!</p>
              <button className="logout-button">Logout</button>
          </section>
      <section className = "categories-searchbar">
          <div className="dropdown">
              <button className="categories-button">Categories</button>
              <FontAwesomeIcon icon={ faCaretDown } style={{color:'#B4D47E',position:'relative',right:'109px',top:'1px'}}/>
              <div className="dropdown-content">
                      {categories.map((category, index) => (
                          <li key={index} style={{ listStyleType: 'none' }}>
                              <Link to={"/categories/" + category.name}
                                    onClick={() => localStorage.setItem("lastVisitedCategory", category.name)}
                              >{category.name}
                              </Link>
                          </li>
                      ))}
              </div>
          </div>
          <form action="category.html">
              <input type="text" className="search-bar" placeholder="  Start your search here!"style={{fontFamily:'Battambang'}}/>
              <FontAwesomeIcon icon={faSearch} style={{position:'relative',right:'26px',top: '1px', color:'green'}}/>
          </form>
          {/*<Link to="/cart" style={{ listStyleType: 'none' }}>*/}
          {/*<FontAwesomeIcon icon={faShoppingCart} style={{position:'relative',right:'2px',top: '15px', color: 'white', fontSize: '25px'}}/>*/}
          <Link to="/Cart">
              <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ position: 'relative', right: '2px', top: '15px', color: 'white', fontSize: '25px' }}
              />
          </Link>
          {/*<div className="cart-item-count" style={{position:'relative',right:'35px',top: '1px'}}>{cartQuantity}</div>*/}
          {/*</Link>*/}
          <Link to="/Cart" style={{ textDecoration: 'none' }}>
          <div className="cart-item-count" style={{ position: 'relative', right: '35px',bottom: '4px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'whitesmoke', color: 'green', textAlign: 'center', lineHeight: '24px', fontWeight: 'bold' }}>
              {cartQuantity}
          </div>
          </Link>

      </section>
      </section>
  </header>


    </div>
)
}
export default AppHeader;

