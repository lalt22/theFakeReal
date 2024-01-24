import { useContext, useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Favourite.module.scss";
import { FavouritesContext } from "../../context/FavouritesContextProvider";
const Favourite = ({id}) => {
    const [favourited, setFavourited] = useState(false);
    const [isActive, setIsActive] = useState(false)
    const {favourites, setFavourites} = useContext(FavouritesContext);

    console.log(id, "id");

    const toggleFavourite = (e) => {
        setFavourited(!favourited);
        setFavourites([id, ...favourites]);
    }

    const toggleColorOn =(e) => {
        setIsActive(true);
    }
    
    const toggleColorOff = (e) => {
        setIsActive(false);
    }

    useEffect(() => {
        console.log(favourites, "favourites");
        console.log("Added to favourites. Now have " + favourites.length);
    }, [favourites])

    return (
        <FontAwesomeIcon 
                    icon={favourited ? ["fas", "heart"] : ["far", "heart"]} 
                    id={styles.favourite} 
                    className={[isActive ? styles.hovered : styles.unhovered, 
                        favourited ? styles.favourited : styles.unfavourited].join(" ")}
                    onClick={toggleFavourite}
                    onMouseEnter={toggleColorOn}
                    onMouseLeave={toggleColorOff}
        />
    )
}

export default Favourite;