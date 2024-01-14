import '../assets/css/CategoryNav.css'
// import '../assets/css/global.css'
import "../assets/css/AppHeader.css"
import {useParams} from "react-router-dom";
import {CategoryItem} from "../types";
import { Link } from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Category} from "../contexts/CategoryContext";

// function CategoryNav() {
//   return (
//     // <div className="navigation-bar-container">
//     //     <nav className="navbar">
//     //     {
//     //         categoryList.map((category) => (
//     //         <li className="navigation-list">
//     //         {category.name}
//     //         </li>
//     //         ))}
//     //     </nav>
//     //
//     //
//     // </div>
//       <div className="navigation-bar-container">
//           <ul className="nav-list">
//               {categoryList.map((category, index) => (
//                   <li key={index}>
//                       <Link to="/" {category.name} </Link>
//                   </li>
//               )}
//           </ul>
//       </div>
//
// )
// }
function CategoryNav() {
    const categories = useContext<CategoryItem[]>(Category);
    const{id} = useParams();
    // const[selectedId, isActive] = useState([]);
    // useEffect(() => {
    //     axios.get(`/RashmiBookstoreReactState/api/categories/name/${id}/books`)
    //         .then((result) => isActive(result.data ))
    //         .catch(console.error);
    // }, [id]);

    return (
        <div className="navigation-bar-container">
            <ul className="navigation-list">
                {categories.map((category, index) => (
                    <li key={index} style={category.name === id ? { textDecoration: "none", color: "#fff", backgroundColor: "#CE4375", padding: "9px 18px", borderRadius: "5px", fontWeight: "bold", transition: "background-color 0.3s" } : {}}>
                        <Link to={"/categories/" + category.name}
                              onClick={() => localStorage.setItem("lastVisitedCategory", category.name)}
                        >{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
  //     <div>
  //     <nav className="navigation-bar-container">
  //       <ul className="nav-list">
  //
  //               <section className="navigation-bar-container">
  //                   <nav className="navbar">
  //                       <ul className="navigation-list">
  //                           <li className="selected-button"><a href="#">Biography & Autobiography</a></li>
  //                           <li><a href="#">Children's Books</a></li>
  //                           <li><a href="#">Spirituality</a></li>
  //                           <li><a href="#">Crime</a></li>
  //                           <li><a href="#">Adventure</a></li>
  //                           <li><a href="#">Sci-fi</a></li>
  //                       </ul>
  //                   </nav>
  //               </section>
  //
  //
  //     {/*{categoryList.map((category) => (*/}
  //
  //     {/*    <li className="unselected-button">*/}
  //     {/*      {category.name}*/}
  //     {/*    </li>*/}
  //
  //
  //
  //
  //
  //
  //
  //   </ul>
  // </nav>
  //     </div>


export default CategoryNav;

