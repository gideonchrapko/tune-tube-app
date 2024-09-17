import { getAuth } from "firebase-admin/auth";
import { getFirebaseAdminApp } from "@/app/firebase";
import { getFirestore } from "firebase-admin/firestore";

export async function updateCustomClaimsAddress(uid: any, address: any) {
  const auth = getAuth();

  try {
    const user = await auth.getUser(uid);
    const currentClaims = user.customClaims || {};
    let updatedClaims = { ...currentClaims };
    updatedClaims = {
      ...updatedClaims,
      address: address,
    };
    await auth.setCustomUserClaims(uid, updatedClaims);

    console.log("Custom claims address updated successfully");
  } catch (error) {
    console.error("Error updating custom claims address:", error);
  }
}

export async function updateAddressDB(uid: any, address: string) {
  const db = getFirestore(getFirebaseAdminApp());

  try {
    const userRef = db.collection("users").doc(uid);
    userRef.update({
      address,
    });

    console.log("updated firebase database succesfully");
  } catch (error) {
    console.error("Error updating firebase database", error);
  }
}
