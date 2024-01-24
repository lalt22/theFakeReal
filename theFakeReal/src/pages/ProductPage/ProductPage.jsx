import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import { getProductById } from "../../../services/products";
import styles from "./ProductPage.module.scss";
import Carousel from "../../components/Carousel/Carousel";
import { ProductContext } from "../../context/ProductsContextProvider";
import ProductList from "../../containers/ProductList/ProductList";

const ProductPage = () => {
    const pathVars = useParams();
    const id = pathVars.id;

    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const {products} = useContext(ProductContext);

    useEffect(() => {
        setLoading(true);
        getProductById(id)
            .then((res) => setProduct(res))
            .catch((e) => setError(e))
            .finally(() => setLoading(false));
    }, [id])

    const handleClick = (e) => {

    }

    return (
        <main>
            {loading && <p>Loading...</p>}
            {!loading && product && (
                <div className={styles.page}>
                    <div className={styles.listing}>
                        <div className={styles.image_div}>
                            <img src={product.image} />
                        </div>

                        <div className={styles.info_div}>
                            <h1>{product.brand}</h1>
                            <h3>{product.name}</h3>
                            <p>Composition: {product.materials}</p>
                            <h4>{product.stock > 0 ? product.stock + " In Stock": "Out of Stock"}</h4>
                            <button onClick={handleClick}>Add To Cart</button>
                        </div>
                    </div>
                    
                    <div className={styles.more_products}>
                        <h1>See More Products</h1>
                        <ProductList products={products.filter((product) => product.id != id).slice(0,4)}/>
                    </div>
                </div>
            )}
        </main>
    )
}
export default ProductPage;