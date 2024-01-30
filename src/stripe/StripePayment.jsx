import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

export const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutForm = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement></PaymentElement>
            <button>Submit</button>
        </form>
    )
}

export default CheckoutForm;