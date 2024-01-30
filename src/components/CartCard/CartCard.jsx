import { useContext, useEffect } from "react";
import styles from "./CartCard.module.scss";
import { RefreshContext } from "../../context/RefreshContextProvider";
import { addToCart, removeFromCart } from "../../../services/products";

const CartCard = ({
image="",
brand="",
name="",
id,
stock,
numInCart,
price}) => {

    const {refresh, setRefresh} = useContext(RefreshContext);
    console.log("Card for " + id);
 
    const handleAdd = (e) => {
        if (stock > 0) {
            addToCart(id).then(() => {
                setRefresh(refresh + 1);
            })

        } 
    }
    const handleRemove = (e) => {
        if (numInCart > 0) {
            removeFromCart(id).then(() => {setRefresh(refresh + 1);})
        }
    }
    return <article>
        <div>
            <img src={image}/>
        </div>
        <div>
            <h2>{brand}</h2>
            <h4>{name}</h4>
            <div className={styles.cart_modifiers}>
                <button onClick={handleRemove}>-</button>
                <p>{numInCart} in Cart</p>
                <button onClick={handleAdd}>+</button>
            </div>

            <h4>Total Price: A${numInCart * price}</h4>
        </div>
    </article>
}

export default CartCard;