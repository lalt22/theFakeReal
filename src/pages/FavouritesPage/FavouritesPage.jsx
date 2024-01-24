import {useContext, useEffect, useState} from "react";
import ProductList from "../../containers/ProductList/ProductList";
import { getFavouritedProducts } from "../../../services/products";
import { RefreshContext } from "../../context/RefreshContextProvider";
import styles from "./FavouritesPage.module.scss";

const FavouritesPage = () => {
    const {refresh} = useContext(RefreshContext);
    const [favourites, setFavourites] = useState(null);


    console.log("HERE");
    useEffect(() => {
        getFavouritedProducts().then((res) => setFavourites(res));
    }, [refresh]);

    useEffect(() => {
        console.log(favourites, "favouritespage");
    }, [favourites])

    return (
        <main>
            {favourites && <div className={styles.favourites_container}>
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