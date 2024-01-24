import {
    collection,
    doc,
    getDoc,
    getDocs,
    deleteDoc,
    addDoc,
    updateDoc,
    increment,
    onSnapshot,
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