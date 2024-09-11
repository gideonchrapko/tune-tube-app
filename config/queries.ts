import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

export const fetchSounds = async () => {
  const collectionRef = collection(db, "sounds");
  const snapshot = await getDocs(collectionRef);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
};
