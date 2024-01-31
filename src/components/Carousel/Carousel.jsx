import {useState} from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Carousel.module.scss";

const Carousel = ({products}) => {
    const [activeCardIndex, setActiveCardIndex] = useState(0);

    const nextCard = () => {
        setActiveCardIndex((prevCardIndex) => prevCardIndex ===  products.length - 1 ? 0 : prevCardIndex + 1);
    }

    const prevCard =() => {
        setActiveCardIndex((prevCardIndex) => prevCardIndex === 0 ? products.length - 1 : prevCardIndex - 1);
    }

    const toStart = () => {
        setActiveCardIndex(0);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.carousel}>
                <button onClick={prevCard} className={[styles.carousel_button, styles.carousel_button__prev].join(" ")}>&lt;</button>
                <ProductCard  key={products[activeCardIndex].id}
                            image={products[activeCardIndex].image}
                            brand={products[activeCardIndex].brand}
                            category={products[activeCardIndex].category}
                            materials={products[activeCardIndex].materials}
                            name={products[activeCardIndex].name}
                            id={products[activeCardIndex].id}
                            price={products[activeCardIndex].price}
                            stock={products[activeCardIndex].stock}
                />
                <button onClick={nextCard} className={[styles.carousel_button, styles.carousel_button__next].join(" ")}>&gt;</button>
                
            </div>
            <button onClick={toStart} className={styles.carousel_button}>Go To Start</button>
        </div>

    )
}

export default Carousel;