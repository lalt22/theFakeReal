import ProductList from "../../containers/ProductList/ProductList";
import {useState, useEffect, useContext} from "react";
import { RefreshContext } from "../../context/RefreshContextProvider";
import { getAllProducts } from "../../../services/products";
import styles from "./HomePage.module.scss";
import Carousel from "../../components/Carousel/Carousel";
import { ProductContext } from "../../context/ProductsContextProvider";
const HomePage = () => {
    // const [products, setProducts] = useState(null);
    // const {refresh} = useContext(RefreshContext);
    const {products} = useContext(ProductContext);

    

    // useEffect(() => {
    //     setLoading(true);
    //     getAllProducts().then((res) => {
    //         setLoading(false);
    //         setProducts(res);
    //     });
    // }, [refresh]);


    return (
        <main className={styles.home_page}>
            <h1>View Collection</h1>
            {products && <Carousel products={products}/>}
        </main>
    )
}

export default HomePage;