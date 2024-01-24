import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductList.module.scss";

const ProductList = ({products}) => {
    return (
        <section className={styles.product_list}>
            {products && 
                products.map((product) => {
                    return (
                        <ProductCard
                        key={product.id}
                        image={product.image}
                        brand={product.brand}
                        category={product.category}
                        materials={product.materials}
                        name={product.name}
                        id={product.id}
                        stock={product.stock}
                        />
                    )
                })}
        </section>
    )
}

export default ProductList;