import {useContext, useState} from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Carousel.module.scss";
import WidthContextProvider, { WidthContext } from "../../context/MobileContext";

const Carousel = ({products}) => {
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const {width} = useContext(WidthContext);

    const isxSmallMobile = width <= 600;

    const nextCard = () => {
        setActiveCardIndex((prevCardIndex) => prevCardIndex ===  products.length - 1 ? 0 : prevCardIndex + 1);
    }

    const prevCard =() => {
        setActiveCardIndex((prevCardIndex) => prevCardIndex === 0 ? products.length - 1 : prevCardIndex - 1);
    }

    const toStart = () => {
        setActiveCardIndex(0);
    }

    const toEnd = () => {
        setActiveCardIndex(products.length-1);
    }


    const productCard =  <ProductCard  key={products[activeCardIndex].id}
                            image={products[activeCardIndex].image}
                            brand={products[activeCardIndex].brand}
                            category={products[activeCardIndex].category}
                            materials={products[activeCardIndex].materials}
                            name={products[activeCardIndex].name}
                            id={products[activeCardIndex].id}
                            price={products[activeCardIndex].price}
                            stock={products[activeCardIndex].stock}
                            size={products[activeCardIndex].size}
                            hasVariants={products[activeCardIndex].hasVariants}
                        />

    return (
        <div className={styles.wrapper}>
            <div className={styles.carousel}>
                {!isxSmallMobile && 
                    <div className={styles.not_mobile}>
                        <div className={[styles.buttons_div, styles.left_btns].join(" ")}>
                            <button onClick={prevCard} className={[styles.carousel_button, styles.carousel_button__prev].join(" ")}>&lt;</button>
                            <button onClick={toStart} className={styles.carousel_button}>Start</button>
                            
                        </div>
                        {productCard}
                        <div className={[styles.buttons_div, styles.right_btns].join(" ")}>
                            <button onClick={nextCard} className={[styles.carousel_button, styles.carousel_button__next].join(" ")}>&gt;</button>
                            <button onClick={toEnd} className={styles.carousel_button}>End</button>
                        </div>
                    </div>
                    }
                {isxSmallMobile &&
                    <div className={styles.mobile}>
                        {productCard}

                        <div className={styles.row_btns}>
                            <div className={[styles.buttons_div, styles.left_btns].join(" ")}>
                                <button onClick={prevCard} className={[styles.carousel_button, styles.carousel_button__prev].join(" ")}>&lt;</button>
                                
                            </div>
                            <div className={[styles.buttons_div, styles.right_btns].join(" ")}>
                                <button onClick={nextCard} className={[styles.carousel_button, styles.carousel_button__next].join(" ")}>&gt;</button>
                            </div>
                        </div>
                        
                    </div>    
                }
                    
                
            </div>
        </div>

    )
}

export default Carousel;