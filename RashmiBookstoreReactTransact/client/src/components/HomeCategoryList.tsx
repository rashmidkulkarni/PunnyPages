import '../assets/css/HomeCategoryList.css';
// // import {categoryList, categoryImages} from '../types';
// import "../assets/css/AppHeader.css"
import {CategoryItem} from "../types";
//
//
// /*const categoryImageFileName = (category) => {
//   let name = category.name.toLowerCase();
//   name = name.replace(/ /g, "-");
//   name = name.replace(/'/g, "");
//   return `${name}.jpg`;
// };*/
//
//
import {categoryImages} from "../types";
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";

function HomeCategoryList(){
    const categories = useContext<CategoryItem[]>(Category);

    return(

  <ul className ="home-list">
      {categories.map((category) => (
          <li className="home-list-li">
    <img src={categoryImages[category.name.toLowerCase()]}
         alt="book.title"
    />
              <div className="home-list-div"> {category.name} </div>
          </li>
      ))}


  </ul>

)
}
export default HomeCategoryList;
