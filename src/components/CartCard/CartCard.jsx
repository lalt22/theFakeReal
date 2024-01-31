import { useContext, useEffect } from "react";
import styles from "./CartCard.module.scss";
import { RefreshContext } from "../../context/RefreshContextProvider";
import { addToCart, removeFromCart } from "../../../services/products";
import {Link} from "react-router-dom";


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
            <Link to={`/products/${id}`}><img src={image}/></Link>
        </div>
        <div>
            <h2>{brand}</h2>
            <h4>{name}</h4>
            <div className={styles.cart_modifiers}>
                <button className={styles.visibleBtn} onClick={handleRemove}>-</button>
                <p>{numInCart} in Cart</p>
                <button className={stock > 0 ? styles.visibleBtn : styles.hiddenBtn} onClick={handleAdd}>+</button>
            </div>

            <h4>A${(numInCart * price).toFixed(2)}</h4>
        </div>
    </article>
}

export default CartCard;