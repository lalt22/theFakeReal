import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    where,
    increment,
    onSnapshot,
    setDoc,
    getAggregateFromServer,
    sum,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";



  

export const getAllProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const dataToReturn = querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        }
    })
    return dataToReturn;
}

export const getVariantSizes = async (id) => {
    const querySnapshot = await getDocs(collection(db, "products", id, "sizes"));
    if (querySnapshot.empty) {
        return null;
    }
    const dataToReturn = querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        }
    })
    console.log(dataToReturn, "data");
    return dataToReturn;
}

export const getProductById = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if(!docSnap.exists()) {
        throw new Error("Product Not Found");
    }
    return {id: docSnap.id, ...docSnap.data()};
}

export const getVariantSizeById = async (id, varId) => {
    const docRef = doc(db, "products", id, "sizes", varId);
    const docSnap = await getDoc(docRef);

    if(!docSnap.exists()) {
        throw new Error("Product Not Found");
    }
    return {id: docSnap.id, ...docSnap.data()};
}

export const getFavouritedProducts = async () => {
    const q = query(collection(db, "products"), where("favourited", "==", true))

    const querySnapshot = await getDocs(q);
    const dataToReturn = querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        }
    })

    return dataToReturn;
}

export const updateFavouritedStatus = async (id, favBool) => {
    try {
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, {
            favourited: favBool,
        })
    } catch (e) {
        throw e;
    }
    
} 

export const isProductFavourited = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if(!docSnap.exists()) {
        throw new Error("Product Not Found");
    }
    else {
        const product = docSnap.data();
        const productIsFavourited  = {
            favourited: product.favourited
        };
        return productIsFavourited;
    }
}

export const getProductsInCart = async () => {
    const q = query(collection(db, "cart"), where("numInCart", ">", 0))

    const querySnapshot = await getDocs(q);
    const dataToReturn = querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        }
    })
    console.log(dataToReturn, "RETURNED CART DATA");
    return dataToReturn;
}

export const addToCart = async (id) => {
    console.log("Adding product: " + id);
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, {
        numInCart: increment(1),
        stock: increment(-1)
    })
    const toCartRef = doc(db, "cart", id);
    
    const docSnap = await getDoc(productRef);
    await setDoc(toCartRef, {
        merge: true,
        prod_id: id,
        image: docSnap.data().image,
        numInCart: docSnap.data().numInCart,
        price: docSnap.data().price * docSnap.data().numInCart,
        stock: docSnap.data().stock
    });
}

export const addVariantSizeToCart = async (prodId, varId) => {
    const varRef = doc(db, "products", prodId, "sizes", varId);
    const prodRef = doc(db, "products", prodId);

    await updateDoc(varRef, {
        numInCart: increment(1),
        stock: increment(-1)
    })

    const toCartRef = doc(db, "cart", varId);
    const prodSnap = await getDoc(prodRef);
    const varSnap = await getDoc(varRef)
    console.log(prodSnap.data(), "DATA");
    await setDoc(toCartRef, {
        merge: true,
        id: varId,
        prod_id: prodId,
        image: prodSnap.data().image,
        numInCart: varSnap.data().numInCart,
        price: prodSnap.data().price * varSnap.data().numInCart,
        size: varSnap.data().size,
        stock: varSnap.data().stock
    })
    
}

// export const unsubscribeVariantSize = (prodId, varId) => {
//     onSnapshot(doc(db, "products", prodId, "sizes", varId), (doc) => {
        
//         const dataToReturn = {
//             id: doc.id,
//             ...doc.data()
//         }
//         console.log(dataToReturn, "datatoReturn");
//         return dataToReturn;
//     })
// }

export const removeFromCart = async (id) => {
    console.log("Removing product: " + id);
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, {
        numInCart: increment(-1),
        stock: increment(1)
    })

    const cartRef = doc(db, "cart", id);
    const docSnap = await getDoc(productRef);
    await updateDoc(cartRef, {
        numInCart: increment(-1),
        price: docSnap.data().price * docSnap.data().numInCart,
    })
}

export const removeVariantSizeFromCart = async (prodId, varId) => {
    const varRef = doc(db, "products", prodId, "sizes", varId);
    const prodRef = doc(db, "products", prodId);
    await updateDoc(varRef, {
        numInCart: increment(-1),
        stock: increment(1)
    })

    const cartRef = doc(db, "cart", varId);
    const varSnap = await getDoc(varRef);
    const prodSnap = await getDoc(prodRef);
    await updateDoc(cartRef, {
        varId: varId,
        numInCart: increment(-1),
        price: prodSnap.data().price * varSnap.data().numInCart
    })
}

export const unsubscribe = (id) => {
    onSnapshot(doc(db, "products", id), (doc) => {
        
        return (doc.data());
    })
}

export const getPriceOfCart = async () => {
    const coll = collection(db, "cart");
    const snapshot = await getAggregateFromServer(coll, {
        totalCost: sum("price")
    })

    return Math.round(snapshot.data().totalCost);
}

export const emptyCart = async () => {
    const querySnapshot = await getDocs(collection(db, "cart"));
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    })

    const productsQuery = query(collection(db, "products"), where("numInCart", ">", 0))
    const productsSnapshot = await getDocs(productsQuery);
    productsSnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
            numInCart: 0
        })
    })

}