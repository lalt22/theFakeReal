import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import { getProductById } from "../../../services/products";
import { RefreshContext } from "../../context/RefreshContextProvider";
import styles from "./ProductPage.module.scss";

const ProductPage = () => {
    const pathVars = useParams();
    const id = pathVars.id;

    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const {refresh, setRefresh} = useContext(RefreshContext);

    useEffect(() => {
        setLoading(true);
        getProductById(id)
            .then((res) => setProduct(res))
            .catch((e) => setError(e))
            .finally(() => setLoading(false));
    }, [id])

    console.log(product);

    return (
        <main>
            {loading && <p>Loading...</p>}
            {!loading && product && (
                <div className={styles.page}>
                    <h1>{product.brand}</h1>
                    <h3>{product.name}</h3>
                    <img src={product.image} />
                    <p>Composition: {product.materials}</p>
                    <h4>Stock: {product.stock}</h4>
                </div>
            )}
        </main>
    )
}
export default ProductPage;