import {useContext} from "react";
import styles from "./HomePage.module.scss";
import Carousel from "../../components/Carousel/Carousel";
import { ProductContext } from "../../context/ProductsContextProvider";
const HomePage = () => {
    const {products} = useContext(ProductContext);

    return (
        <main className={styles.home_page}>
            <h1>View Collection</h1>
            {products && <Carousel products={products}/>}
        </main>
    )
}

export default HomePage;