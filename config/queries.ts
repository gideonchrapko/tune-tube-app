import { getFirebaseApp } from "@/app/auth/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export const fetchSounds = async () => {
  const db = getFirestore(getFirebaseApp());
  console.log(db, "db");
  const collectionRef = collection(db, "sounds");
  console.log(collectionRef, "collectionRef");
  const snapshot = await getDocs(collectionRef);
  console.log(snapshot, "snapshot");
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(data, "data");

  return data;
};
