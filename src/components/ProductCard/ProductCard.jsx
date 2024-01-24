import {Link} from "react-router-dom";
import styles from "./ProductCard.module.scss"
import { useState, useContext, useEffect } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { isProductFavourited, updateFavouritedStatus } from "../../../services/products";
import { RefreshContext } from "../../context/RefreshContextProvider";


const ProductCard = ({
    image="",
    brand="",
    name="",
    id,
    stock="",
    price=""
}) => {
    const [isActive, setIsActive] = useState(false)
    const [isFavourited, setIsFavourited] = useState(false);
    const {refresh, setRefresh} = useContext(RefreshContext);


    const toggleFavourite = (e) => {
        updateFavouritedStatus(id, !isFavourited).then(() => setRefresh(refresh + 1))
    }

    const toggleColorOn = (e) => {
        setIsActive(true);
    }
    
    const toggleColorOff = (e) => {
        setIsActive(false);
    }

    useEffect (() => {
        isProductFavourited(id).then((res) => setIsFavourited(res.favourited))

    }, [refresh])

    return (
        <article className={styles.card}>
            <div className={styles.img_holder}>
                <FontAwesomeIcon 
                        icon={isFavourited ? ["fas", "heart"] : ["far", "heart"]} 
                        id={styles.favourite} 
                        className={[isActive ? styles.hovered : styles.unhovered, 
                            isFavourited ? styles.favourited : styles.unfavourited].join(" ")}
                        onClick={toggleFavourite}
                        onMouseEnter={toggleColorOn}
                        onMouseLeave={toggleColorOff}
                />
            <img src={image} />     
            </div>

            <div className={styles.info_div}>
                <h2>{brand}</h2>
                <h4>{name}</h4>
                <p>Stock: {stock}</p>
                <h4>A${price}</h4>
                <div className={styles.more_info_link}>
                    <Link to={`/products/${id}`}>More Info</Link>
                </div>
                
            </div>
            
        </article>
    )
}

export default ProductCard;