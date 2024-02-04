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

export const getProductById = async (id) => {
    const docRef = doc(db, "products", id);
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
    const q = query(collection(db, "products"), where("numInCart", ">", 0))

    const querySnapshot = await getDocs(q);
    const dataToReturn = querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        }
    })

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
    console.log(docSnap.data().price);

    await setDoc(toCartRef, {
        merge: true,
        id: id,
        numInCart: docSnap.data().numInCart,
        price: docSnap.data().price * docSnap.data().numInCart,
    });
}


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