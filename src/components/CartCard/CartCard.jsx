import { useContext, useEffect } from "react";
import styles from "./CartCard.module.scss";
import { RefreshContext } from "../../context/RefreshContextProvider";
import { addToCart, addVariantSizeToCart, removeFromCart, removeVariantSizeFromCart, unsubscribe } from "../../../services/products";
import {Link} from "react-router-dom";


const CartCard = ({
image="",
brand="",
name="",
prod_id,
id,
stock,
numInCart,
size,
price}) => {

    const {refresh, setRefresh} = useContext(RefreshContext);
    console.log(size, "SIZE");

 
    const handleAdd = (e) => {
        if (stock > 0) {
            if (!size) {
                addToCart(id).then(() => {
                    setRefresh(refresh + 1);
                })
            }
            else {
                addVariantSizeToCart(prod_id, id).then(() => setRefresh(refresh + 1));
            }

        } 
    }
    const handleRemove = (e) => {
        if (numInCart > 0) {
            if (!size) {
                removeFromCart(id).then(() => {setRefresh(refresh + 1);})
            }
            else {
                console.log("REMOVING VAR " + id + " OF " + prod_id);
                removeVariantSizeFromCart(prod_id, id).then(() => setRefresh(refresh + 1));
            }
            
        }
    }
    return (
        <article>
            <Link to={`/products/${prod_id}`} className={styles.img_link}><img src={image} /></Link>
            <div className={styles.info}>
                {size && <h4>Size: {size}</h4>}
                <div className={styles.cart_modifiers}>
                    <button className={styles.visibleBtn} onClick={handleRemove}>-</button>
                    <p>{numInCart} in Cart</p>
                    <button className={stock > 0 ? styles.visibleBtn : styles.hiddenBtn} onClick={handleAdd}>+</button>
                </div>

                <h4>A${(price).toFixed(2)}</h4>
            </div>
        </article>
    )
}

export default CartCard;