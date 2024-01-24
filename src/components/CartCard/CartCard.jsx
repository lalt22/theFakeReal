import styles from "./CartCard.module.scss";

const CartCard = ({
image="",
brand="",
name="",
id,
stock,
numInCart,
price}) => {
    const handleAdd = (e) => {

    }
    const handleRemove = (e) => {

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