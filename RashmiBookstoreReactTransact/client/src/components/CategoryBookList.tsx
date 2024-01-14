import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import "../assets/css/AppHeader.css"
import {BookItem, CategoryItem} from "../types";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Category} from "../contexts/CategoryContext";


function CategoryBookList() {
    const {id} = useParams();
    const[book, setBook] = useState([]);

    useEffect(() => {
        axios.get(`/RashmiBookstoreReactTransact/api/categories/name/${id}/books`)
            .then((result) => setBook(result.data ))
            .catch(console.error);
    }, [id]);
  return (
      <><CategoryNav/>
          <ul key={"book-lists-key"} className="book-lists">
              {book.map((book:BookItem, i) => (
                  <CategoryBookListItem key={i}  bookId={book.bookId} isPublic={book.isPublic} price={book.price} title={book.title} author={book.author} categoryId={book.categoryId}/>))}
          </ul>
      </>
  )
}

export default CategoryBookList;
