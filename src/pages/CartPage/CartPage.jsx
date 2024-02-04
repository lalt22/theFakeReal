import {useState, useContext, useEffect} from "react";
import { getPriceOfCart, getProductsInCart } from "../../../services/products";
import CartList from "../../containers/CartList/CartList"
import { RefreshContext } from "../../context/RefreshContextProvider";
import StripeContainer from "../../stripe/StripeContainer";
import styles from "./CartPage.module.scss"

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

    return (
    <main>
        {productsInCart && 
        <div className={styles.page_wrapper}>
            <div className={styles.cart_wrapper}>
                    <CartList products={productsInCart} />
                {productsInCart.length == 0 && 
                    <h2>Cart is Empty</h2>
                }
                
            </div>
        {productsInCart.length > 0 && 
            <div className={styles.payment_div}>
                <h3>Total: A${priceOfCart} </h3>
                <StripeContainer priceOfCart={priceOfCart}/>
            </div>
        }
        </div>
        }


        
        
    </main>
    )
}

export default CartPage;