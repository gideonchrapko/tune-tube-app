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
  } catch (error) {
    console.error("Error updating firebase database", error);
  }
}

export async function updateCustomClaimsDOB(uid: any, dob: any) {
  const auth = getAuth();
  try {
    const user = await auth.getUser(uid);
    const currentClaims = user.customClaims || {};
    let updatedClaims = { ...currentClaims };
    updatedClaims = {
      ...updatedClaims,
      dob: dob,
    };
    await auth.setCustomUserClaims(uid, updatedClaims);
  } catch (error) {
    console.error("Error updating custom claims address:", error);
  }
}

export async function updateDOBDB(uid: any, dob: string) {
  const db = getFirestore(getFirebaseAdminApp());
  try {
    const userRef = db.collection("users").doc(uid);
    userRef.update({
      dob,
    });
  } catch (error) {
    console.error("Error updating firebase database", error);
  }
}

export async function updateCustomClaimsPayment(uid: any, payment: any) {
  const auth = getAuth();
  try {
    const user = await auth.getUser(uid);
    const currentClaims = user.customClaims || {};
    let updatedClaims = { ...currentClaims };
    updatedClaims = {
      ...updatedClaims,
      payment: payment,
    };
    await auth.setCustomUserClaims(uid, updatedClaims);
  } catch (error) {
    console.error("Error updating custom claims address:", error);
  }
}

export async function updatePaymentDB(uid: any, payment: string) {
  const db = getFirestore(getFirebaseAdminApp());
  try {
    const userRef = db.collection("users").doc(uid);
    userRef.update({
      payment,
    });
  } catch (error) {
    console.error("Error updating firebase database", error);
  }
}
