import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import { addToCart, getProductById, removeFromCart, unsubscribe } from "../../../services/products";
import styles from "./ProductPage.module.scss";
import { ProductContext } from "../../context/ProductsContextProvider";
import ProductList from "../../containers/ProductList/ProductList";
import { RefreshContext } from "../../context/RefreshContextProvider";

const ProductPage = () => {
    const pathVars = useParams();
    const id = pathVars.id;

    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const {products} = useContext(ProductContext);
    const {refresh, setRefresh} = useContext(RefreshContext);
    



    useEffect(() => {
        setLoading(true);
        getProductById(id)
            .then((res) => setProduct(res))
            .catch((e) => setError(e))
            .finally(() => setLoading(false));
        setProduct(unsubscribe(id))
    }, [refresh])

    

    const handleClickAdd = (e) => {
        if (product.stock > 0) {
            addToCart(id).then(() => {
                setRefresh(refresh + 1);
            })
        } 
    }

    const handleClickRemove = (e) => {
        if (product.numInCart > 0) {
            removeFromCart(id).then(() => {setRefresh(refresh + 1);})
        }
       
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
                            {product.stock > 0 && <button onClick={handleClickAdd}>Add To Cart</button>}
                            {product.numInCart > 0 && <button onClick={handleClickRemove}>Remove From Cart</button>}
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