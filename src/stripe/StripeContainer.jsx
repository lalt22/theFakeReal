import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useState } from "react";

const PUBLIC_KEY = "pk_test_51Od78dGBhpJ9iyQ9VZnxsz2Q8aPOKU3vEjKlnIEEkBZEAoyJKoTbgYUVKgSFsHEaPgkGoN003ZtBELKgJO2CdMB900o3tZHsLz";



const StripeContainer = ({priceOfCart}) => {
    const [stripeTestPromise, setStripeTestPromise] = useState(() => loadStripe(PUBLIC_KEY));
    return (
        <div>
            <Elements stripe={stripeTestPromise}>
              <PaymentForm priceOfCart={priceOfCart}/>
            </Elements>
        </div>
    )
}

export default StripeContainer