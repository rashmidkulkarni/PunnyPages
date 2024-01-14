import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import CategoryNav from "./components/CategoryNav";
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
// import './types';
import {CategoryItem} from "./types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import {Category} from "./contexts/CategoryContext";
import Cart from "./components/Cart"
import CheckoutPage from "./components/Checkout"
import Confirmation from "./components/Confirmation"
import ConfirmationPage from "./components/ConfirmationPage";


function App() {
    // @ts-ignore
    const categories = useContext<CategoryItem[]>(Category);
    const lastVisitedCategory = localStorage.getItem("lastVisitedCategory")
    useEffect(() => {
        if (!lastVisitedCategory)
            localStorage.setItem('lastVisitedCategory', categories.length > 0 ? categories[0].name : 'Biography and Autobiography')
    }, [categories, lastVisitedCategory]);



    // const [categories, setCategories]  = useState([]);
    // useEffect(() => {
    //     axios.get('/RashmiBookstoreReactState/api/categories')
    //         .then((result) => setCategories(result.data ))
    //         .catch(console.error);
    // }, []);
    // axios.get('http://localhost:8080/RashmiBookstoreReactFetch/api/categories')
    //     .then((response) => console.log(response))
    //     .catch(console.error);
  return (
      <Router basename = {"RashmiBookstoreReactTransact"}>
        <AppHeader/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoryBookList/>} >
              <Route path = ":id" element={<CategoryBookList/>} />
          </Route>
            <Route path="/Cart" element={<Cart/>} />
            <Route path="/Checkout" element={<CheckoutPage/>} />
            <Route path="/Confirmation" element={<Confirmation/>} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>

        <AppFooter/>

      </Router>
  );
}

export default App;

