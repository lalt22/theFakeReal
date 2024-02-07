import {useContext} from "react";
import styles from "./HomePage.module.scss";
import Carousel from "../../components/Carousel/Carousel";
import { ProductContext } from "../../context/ProductsContextProvider";
import ProductList from "../../containers/ProductList/ProductList";
const HomePage = () => {
    const {products} = useContext(ProductContext);

    return (
        <main className={styles.home_page}>
            <div className={styles.banners_div}>
                <img src="https://assets.therealreal.com/prismic/the-realreal/e2ebcb12-5e8d-4557-b068-25a58dbaaf07_D-Newtosale.jpg?auto=compress,format&width=1920" className={styles.banner}/>
                <img src="https://assets.therealreal.com/prismic/the-realreal/278d129e-3cc2-4b30-832f-3b1f814a4c14_D-NA.jpg?auto=compress,format&width=1920" className={styles.banner} />
            </div>
            
            <h1>Browse</h1>
            {products && <Carousel products={products}/>}

            <h1>View Collection</h1>
            {products && <ProductList products={products} />}
        </main>
    )
}

export default HomePage;