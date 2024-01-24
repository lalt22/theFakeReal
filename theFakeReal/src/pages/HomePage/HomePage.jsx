import ProductList from "../../containers/ProductList/ProductList";
import {useState, useEffect, useContext} from "react";
import { RefreshContext } from "../../context/RefreshContextProvider";
import { getAllProducts } from "../../../services/products";
import styles from "./HomePage.module.scss";

const HomePage = () => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const {refresh} = useContext(RefreshContext);

    useEffect(() => {
        setLoading(true);
        getAllProducts().then((res) => {
            setLoading(false);
            setProducts(res);
        });
    }, [refresh]);


    return (
        <main className={styles.home_page}>
            <h1>View Collection</h1>
            {!loading && products && <ProductList products={products}/>}
        </main>
    )
}

export default HomePage;