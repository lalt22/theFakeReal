import {useState, useContext, useEffect} from "react";
import { getProductsInCart } from "../../../services/products";
import ProductList from "../../containers/ProductList/ProductList";
import { RefreshContext } from "../../context/RefreshContextProvider";

const CartPage = () => {
    const [productsInCart, setProductsInCart] = useState(null);

    const {refresh} = useContext(RefreshContext);

    useEffect(() => {
        getProductsInCart().then((res) => {
            setProductsInCart(res);
        })
    }, [refresh])

    return <main>
        {productsInCart && <div>
            <ProductList products={productsInCart} />
            </div>}
    </main>
}

export default CartPage;