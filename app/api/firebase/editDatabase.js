import { collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";

const { firebaseapp } = require("./firebase");

export const db = getFirestore(firebaseapp);

export const AddTask = (userId, task, taskId) => {
    setDoc(doc(db, userId, taskId), {
        task: task
    });
}
export const getAllTasks = (userId) => {
    const colRef = collection(db, userId);
    return getDocs(colRef)
}

export const deleteTaskDatabase = (userId, taskId)=>{
    deleteDoc(doc(db, userId, taskId));
}
