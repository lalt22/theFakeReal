import {Link} from "react-router-dom";
import {useState, useContext} from "react";
import { RefreshContext } from "../../context/RefreshContextProvider";
import styles from "./ProductCard.module.scss"
const ProductCard = ({
    image="",
    brand="",
    category="",
    materials="",
    name="",
    id,
    stock=""
}) => {
    return (
        <article className={styles.card}>
            <img src={image} />
            <h2>{brand}</h2>
            <h4>{name}</h4>
            <p>Stock: {stock}</p>
            <Link to={`/products/${id}`}>More Info</Link>
        </article>
    )
}

export default ProductCard;