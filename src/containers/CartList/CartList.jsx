import { useContext } from "react";
import CartCard from "../../components/CartCard/CartCard"
import styles from "./CartList.module.scss";

const CartList = ({products}) => {
    return (
        <section className={styles.card_section}>
            {products && 
                products.map((product) => {
                    return (
                        <CartCard 
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        brand={product.brand}
                        price={product.price}
                        stock={product.stock}
                        name={product.name}
                        numInCart={product.numInCart}
                    />
                    )
                })}
        </section>
    )
}

export default CartList;