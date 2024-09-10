"use client";

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { config } from "./base";

export const clientConfig = {
  apiKey: config.firebase.apiKey!,
  authDomain: config.firebase.authDomain!,
  projectId: config.firebase.projectId!,
  storageBucket: config.firebase.storageBucket!,
  messagingSenderId: config.firebase.messagingSenderId!,
  appId: config.firebase.apiKey!,
  measurementId: config.firebase.measurementId!,
};

const firebaseApp = initializeApp(clientConfig);
const db = getFirestore(firebaseApp);

export { db, firebaseApp };
