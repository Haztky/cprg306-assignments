import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

async function getItems(userId) {
    try {
        const itemsRef = collection(db, 'users', userId, 'items');
        const itemsSnapshot = await getDocs(itemsRef);
        const items = [];
        itemsSnapshot.forEach(doc => {
            items.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return items;
    } catch (error) {
        console.error("Error retrieving items: ", error);
        throw error;
    }
}

async function addItem(userId, item) {
    try {
        const itemsRef = collection(db, 'users', userId, 'items');
        const newItemRef = await addDoc(itemsRef, item);
        return newItemRef.id;
    } catch (error) {
        console.error("Error adding item: ", error);
        throw error;
    }
}

export { getItems, addItem };
