import {useState, useContext, useEffect} from "react";
import { getPriceOfCart, getProductsInCart } from "../../../services/products";
import CartList from "../../containers/CartList/CartList"
import { RefreshContext } from "../../context/RefreshContextProvider";
import StripeContainer from "../../stripe/StripeContainer";

const CartPage = () => {
    const [productsInCart, setProductsInCart] = useState(null);
    const [priceOfCart, setPriceOfCart] = useState(0);
    const {refresh} = useContext(RefreshContext);


    useEffect(() => {
        getProductsInCart().then((res) => {
            setProductsInCart(res);
        })
        getPriceOfCart().then((res) => {
            setPriceOfCart(res);
        });     
    }, [refresh])

    useEffect(() => {
        console.log("Price of cart", priceOfCart)
    }, [priceOfCart])

    return <main>
        {productsInCart && 
        <div>
            <div>
                <CartList products={productsInCart} />
            </div>
            <h2>Total: A${priceOfCart} </h2>
            <div className="payment_div">
                {/* <StripeContainer priceOfCart={priceOfCart}/> */}
            </div>
        </div>
           
        }
    </main>
}

export default CartPage;