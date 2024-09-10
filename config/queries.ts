import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

export const fetchSounds = async () => {
  const soundsCollection = collection(db, "sounds");
  const soundsSnapshot = await getDocs(soundsCollection);
  return soundsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
