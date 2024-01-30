import {useState, useContext, useEffect} from "react";
import { getProductsInCart } from "../../../services/products";
import CartList from "../../containers/CartList/CartList"
import { RefreshContext } from "../../context/RefreshContextProvider";
import CheckoutForm, { stripePromise } from "../../stripe/StripePayment";
import { Elements } from "@stripe/react-stripe-js";

const CartPage = () => {
    const [productsInCart, setProductsInCart] = useState(null);

    const {refresh} = useContext(RefreshContext);

    const options = {
        clientSecret: "{{CLIENT_SECRET}}",
    }

    useEffect(() => {
        getProductsInCart().then((res) => {
            setProductsInCart(res);
        })
    }, [refresh])

    return <main>
        {productsInCart && 
        <div>
            <div>
                <CartList products={productsInCart} />
            </div>
            <div className="payment_div">
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
           
        }
    </main>
}

export default CartPage;