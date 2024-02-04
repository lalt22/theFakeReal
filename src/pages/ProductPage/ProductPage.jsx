import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import { addToCart, addVariantSizeToCart, getProductById, getVariantSizeById, getVariantSizes, removeFromCart, removeVariantSizeFromCart, unsubscribe } from "../../../services/products";
import styles from "./ProductPage.module.scss";
import { ProductContext } from "../../context/ProductsContextProvider";
import ProductList from "../../containers/ProductList/ProductList";
import { RefreshContext } from "../../context/RefreshContextProvider";

const ProductPage = () => {
    const pathVars = useParams();
    const id = pathVars.id;

    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const {products} = useContext(ProductContext);
    const {refresh, setRefresh} = useContext(RefreshContext);

    //VARIANT CART STUFF
    const [variants, setVariants] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
 
    useEffect(() => {
        setLoading(true);
        getProductById(id)
            .then((res) => setProduct(res))
            .catch((e) => setError(e))
            .finally(() => setLoading(false));
        setProduct(unsubscribe(id))
        getVariantSizes(id).then((res) => setVariants(res));

       if (selectedVariant) {
            getVariantSizeById(id, selectedVariant.id).then((res) => {setSelectedVariant(res)});
            setSelectedVariant(unsubscribe(id, selectedVariant.id));
       }
       
    }, [refresh])
    
    useEffect(() => {
        if (!variants) {
            setSelectedVariant(null);
        }
    }, [variants])

    const handleClickVariant = (variant) => {
        setSelectedVariant(variant);
        setRefresh(refresh + 1);
    }

    const handleClickAdd = (e) => {
        if (product.stock > 0) {
            addToCart(id).then(() => {
                setRefresh(refresh + 1);
            })
        } 
    }

    const handleClickAddVariant = () => {
        if (selectedVariant.stock > 0) {
            addVariantSizeToCart(id, selectedVariant.id).then(() => setRefresh(refresh+1))
        }
    }

    const handleClickRemove = (e) => {
        if (product.numInCart > 0) {
            removeFromCart(id).then(() => {setRefresh(refresh + 1);})
        }
    }

    const handleClickRemoveVariant = () => {
        if(selectedVariant.numInCart > 0) {
            removeVariantSizeFromCart(id, selectedVariant.id).then(() => setRefresh(refresh+1));
        }
    }

    const handleVariants = () => {
        getVariantSizes(id).then((res) => setVariants(res));
    }


    const getRandomCards = () => {
        let cardIndexes = [];
        let randProducts = [];
        while(cardIndexes.length < 4) {
            let randIndex = Math.floor(Math.random()*products.length);
    
            if (products[randIndex].id == id || cardIndexes.includes(randIndex)) {
                continue;
            }
            cardIndexes.push(randIndex);
        }

        for (let i = 0; i < cardIndexes.length; i++) {
            randProducts.push(products[cardIndexes[i]]);
        }
        return randProducts;
    }

    const extraProducts = getRandomCards();
    let sortedVariants = [];
    if (variants) {
        sortedVariants = variants.sort(function(a, b) {return a.size.localeCompare(b.size, undefined, {numeric:true})});
    }

    return (
        <main>
            {loading && <p>Loading...</p>}
            {!loading && product && (
                
                <div className={styles.page}>
                    <div className={styles.listing}>
                        <div className={styles.image_div}>
                            <img src={product.image} />
                        </div>

                        <div className={styles.info_div}>
                            <h1>{product.brand}</h1>
                            <h3>{product.name}</h3>
                            <p>Composition: {product.materials}</p>
                            {/*STOCK IF NO VARIANTS */}
                            {!variants &&
                                <div>
                                    <h4>{product.stock > 0 ? product.stock + " In Stock": "Out of Stock"}</h4>
                                    <div className={styles.button_div}>
                                        {product.stock > 0 && <button onClick={handleClickAdd}>Add To Cart</button>}
                                        {product.numInCart > 0 && <button onClick={handleClickRemove}>Remove From Cart</button>}
                                    </div> 
                                </div>
                            }
                            
                            {/*HANDLE STOCK DIFFERENTLY IF VARIANTS EXIST*/ }
                            {selectedVariant &&
                            <div>
                                <h4>{selectedVariant.stock > 0 ? selectedVariant.stock + " In Stock": "Out of Stock"}</h4>
                                <div className={styles.button_div}>
                                    {selectedVariant.stock > 0 && <button onClick={handleClickAddVariant}>Add To Cart</button>}
                                    {selectedVariant.numInCart > 0 && <button onClick={handleClickRemoveVariant}>Remove From Cart</button>}
                                </div> 
                            </div>
                            }
                            <div className={styles.variants}>
                                {/* <h5>Select a size: </h5> */}
                                {variants && sortedVariants.map((variant) => {
                                    
                                    return (
                                        <a className={[selectedVariant && variant.id == selectedVariant.id ? styles.selected : styles.unselected,  styles.variant_link].join(" ")} onClick={() => handleClickVariant(variant)} key={variant.id}> 
                                            <h5>{variant.size}</h5>
                                        </a>

                                    )
                                })}
                            </div>
                        </div>
                        
                    </div>
                    
                    
                    <div className={styles.more_products}>
                        <h1>See More Products</h1>
                        <ProductList extraProducts={extraProducts}/>
                    </div>
                </div>
            )}
        </main>
    )
}
export default ProductPage;