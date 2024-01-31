import { AfterpayClearpayMessageElement, CardElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { emptyCart } from "../../services/products";
import { RefreshContext } from "../context/RefreshContextProvider";
import styles from "./PaymentForm.module.scss";

const PaymentForm = ({ priceOfCart }) => {
    const [success, setSuccess] = useState(false);
    const {refresh, setRefresh} = useContext(RefreshContext);
    const stripe = useStripe();
    const elements = useElements();
    console.log("Paying " + priceOfCart);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
       })

       if(!error) {
            try {
                const {id} = paymentMethod;
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: 100 * priceOfCart,
                    id
                })
                if (response.data.success) {
                    console.log("Successful payment of A$" + priceOfCart);
                    setSuccess(true);
                    emptyCart();
                    setRefresh(refresh + 1);
                    setClientSecret(response.data.client_secret);
                }
            
            } catch(error) {
                console.log("error", error);
            }
        }
        else {
            console.log("Error:", error.message);
        }

    }

    return (
        <>
            {!success ?
            <form onSubmit={handleSubmit}>
                <fieldset className={styles.input}>
                        <CardElement />
                </fieldset>
                <button>Pay Now</button>
            </form>
            :
            <div>
                <h2>You just made a purchase of {priceOfCart}!</h2>
            </div>
        }
        </>
    )
}

export default PaymentForm;