import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductList.module.scss";

const ProductList = ({extraProducts}) => {
    return (
        <section className={styles.product_list}>
            {extraProducts && 
                extraProducts.map((product) => {
                    return (
                        <ProductCard
                        key={product.id}
                        image={product.image}
                        brand={product.brand}
                        category={product.category}
                        materials={product.materials}
                        name={product.name}
                        id={product.id}
                        price={product.price}
                        stock={product.stock}
                        />
                    )
                })}
        </section>
    )
}

export default ProductList;