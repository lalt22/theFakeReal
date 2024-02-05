import {useContext, useEffect, useState} from "react";
import ProductList from "../../containers/ProductList/ProductList";
import { getFavouritedProducts } from "../../../services/products";
import { RefreshContext } from "../../context/RefreshContextProvider";
import styles from "./FavouritesPage.module.scss";

const FavouritesPage = () => {
    const {refresh} = useContext(RefreshContext);
    const [favourites, setFavourites] = useState(null);


    useEffect(() => {
        getFavouritedProducts().then((res) => setFavourites(res));
    }, [refresh]);

    useEffect(() => {
        console.log(favourites, "FAVOURITES");
    }, [favourites])

    return (
        <main className={styles.favourites_page}>
            {favourites && <div className={styles.favourites_container}>
                {console.log("MAKING LIST OF FAVOURITES")}
                        <ProductList products={favourites} />
                    </div>
            }
            {favourites && favourites.length == 0 
            && <div className={styles.no_products}>
                    <h1>No Favourited Products</h1>
                </div>}
        </main>
        
    )
}
export default FavouritesPage;