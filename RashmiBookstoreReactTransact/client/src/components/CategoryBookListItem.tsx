import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";
import "../assets/css/AppHeader.css"
import { faBook } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CartStore} from "../contexts/CartContext";
import {useContext} from "react";
import {CartTypes} from "../reducers/CartReducer";

const bookImageFileName =  (book:BookItem) => {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};

function CategoryBookListItem(props:BookItem) {
    const  {dispatch} = useContext(CartStore);
    const addBookToCart = () => {
        dispatch({ type: CartTypes.ADD, item:props, id: props.bookId });
    };

return (
    <div className = "outer-div">
        <section
            className="category-books"
            style={{
                width: '400px',
                marginRight : '50px'
            }}
        >
        <section className="first-row">
         <div>
        <div className='image'>
            <img src={require('../assets/images/site/' + bookImageFileName(props))}
                 alt="book.title"
                 width="150px"
                 height="200px"
            />
        </div>
             <div>
              <div>
            <h3 style={{position: 'relative', fontFamily: 'Battambang',fontSize: '18px',color:'#0958A0',bottom:'220px',left:'160px',padding:'2px'}}>{props.title }</h3>
            <p style={{position:'relative',fontSize: '15px',fontFamily :'Optima,sans-serif',bottom:'220px',left:'160px',right:'5px',padding:'2px',color:'#0958A0'}}>{ props.author }</p>
                  <p style={{position:'relative',fontSize: '15px',fontFamily:'Battambang',bottom:'230px',left:'160px',padding:'2px',color:'#0958A0'}}><strong style={{ fontSize: '20px' }}>
                      ${String(props.price.toFixed(1)).split('.')[0]}
                  </strong>.{String(props.price.toFixed(1)).split('.')[1]}</p>


            <button className="add-to-cart-button" style={{position:'relative',left:'160px',bottom:'210px'}} onClick={addBookToCart}>Add to Cart</button>{/*<!-- <i class="fa-solid fa-cart-shopping" style=color:white;position:relative;left:1px;right:500px></i> -->*/}
                  {props.title === 'Leonardo Da Vinci' || props.title === 'Benjamin Franklin' || props.title ==='The Hobbit' || props.title === 'Book of Animals' || props.title === 'Soul Boom' || props.title === 'Shunya' || props.title === 'Eight Detectives' || props.title === 'Hyde' || props.title === 'Full Tilt' || props.title === 'Spirit Run' || props.title === 'Self Aware' || props.title === 'Tell Me an Ending'? (
                      <div>
                          <button className="read-now" style={{
                              position: 'relative',
                              bottom: '300px',
                              left: '20px',
                              padding: '5px',
                              width: '110px',
                              cursor: 'pointer',
                              fontWeight: 'normal', // Set the default font weight
                              transition: 'background-color 0.3s',
                          }}
                                  onMouseEnter={(e) => {
                                      const target = e.target as HTMLButtonElement;
                                      target.style.backgroundColor = '#4682B4';
                                  }}
                                  onMouseLeave={(e) => {
                                      const target = e.target as HTMLButtonElement;
                                      target.style.backgroundColor = '#7CB5E9'; // Reset the font weight on mouse leave
                                  }}> read now </button>
                          <FontAwesomeIcon icon={faBook} style={{ position: 'relative', bottom: '297px', right:'5px',padding: '1px',color:'white'}} />
                      </div>
                  ) : null}
              </div>
    </div>
    </div>

         </section>
    </section>

    </div>


)
}
export default CategoryBookListItem;
