import { db } from "@/config/firebase.config";
import { UserFirebase, FirebaseToken } from "@/types/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function createUser(user: UserFirebase, existingUser: any) {
  if (user) {
    const id = user?.uid;
    const postRef = doc(db as any, "users", id as string);
    const snap = await getDoc(postRef);
    const data = snap.data();

    const current = {
      ...(data && data),
      ...(existingUser && existingUser),
      displayName: user?.displayName || "",
      email: user?.email,
      id: user.uid,
      uid: user.uid,
    };

    try {
      const docRef = doc(db as any, "users", id as string);
      await setDoc(docRef, current, { merge: true });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }
}

export async function getLogin(idTokenResult: FirebaseToken) {
  try {
    await fetch("/api/login", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idTokenResult.token}`,
      },
    });
  } catch (error) {
    return { error: "something went wrong with the login" };
  }
}
