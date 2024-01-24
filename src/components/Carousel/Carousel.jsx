import {useState} from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Carousel.scss";

const Carousel = ({products}) => {
    const [activeCardIndex, setActiveCardIndex] = useState(0);

    const nextCard = () => {
        setActiveCardIndex((prevCardIndex) => prevCardIndex ===  products.length - 1 ? 0 : prevCardIndex + 1);
    }

    const prevCard =() => {
        setActiveCardIndex((prevCardIndex) => prevCardIndex === 0 ? products.length - 1 : prevCardIndex - 1);
    }

    return (
        <div className="carousel">
            <button onClick={prevCard} className="carousel_button carousel_button--prev">&lt;</button>
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
            <button onClick={nextCard} className="carousel_button carousel_button--next">&gt;</button>

        </div>
    )
}

export default Carousel;