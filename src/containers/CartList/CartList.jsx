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
                        prod_id={product.prod_id}
                        image={product.image}
                        brand={product.brand}
                        price={product.price}
                        stock={product.stock}
                        name={product.name}
                        numInCart={product.numInCart}
                        size={product.size}
                    />
                    )
                })}
        </section>
    )
}

export default CartList;