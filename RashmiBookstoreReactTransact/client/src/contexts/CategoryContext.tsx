import {createContext, ReactNode} from "react";
import {CategoryItem} from "../types";
import {useEffect, useState} from "react";
import axios from "axios";


// @ts-ignore
export const Category = createContext<CategoryItem[] | []>([]);   // creates a context called Category
Category.displayName = 'CategoryContext';

function CategoryContext ({ children }:{children: ReactNode})  {
    const [categories, setCategories]  = useState([]);
    useEffect(() => {
        axios.get('/RashmiBookstoreReactTransact/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);

    return (
        <Category.Provider value ={categories}>{children}</Category.Provider>
    );
}
export default CategoryContext;