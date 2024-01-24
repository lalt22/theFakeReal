import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    where,
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
        console.log(productIsFavourited, "PRODUCT FAVOURITED?")
        return productIsFavourited;
    }
}
