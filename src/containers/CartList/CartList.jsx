import { useContext } from "react";
import CartCard from "../../components/CartCard/CartCard"


const CartList = ({products}) => {
    return (
        <section>
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