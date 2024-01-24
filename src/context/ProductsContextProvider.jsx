import { createContext, useState, useEffect, useContext } from "react";
import { RefreshContext } from "./RefreshContextProvider";
import { getAllProducts } from "../../services/products";

export const ProductContext = createContext(null);

const ProductContextProvider = ({children}) => {
    const [products, setProducts] = useState(null);
    const {refresh} = useContext(RefreshContext);


       useEffect(() => {
        getAllProducts().then((res) => {
            setProducts(res);
        });
    }, [refresh]);

    // console.log(products, "products");

    return (
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    )

}
export default ProductContextProvider;