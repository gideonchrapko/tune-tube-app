"use client";

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { config } from "./base";

export const clientConfig = {
  //   apiKey: config.firebase.apiKey!,
  //   authDomain: config.firebase.authDomain,
  //   projectId: config.firebase.projectId,
  apiKey: "AIzaSyDq9_rvf9Y6b1PHxbpMXbv1i5dnipyIEXM",
  authDomain: "tune-tube-app-next.firebaseapp.com",
  projectId: "tune-tube-app-next",
  storageBucket: "tune-tube-app-next.appspot.com",
  messagingSenderId: "844049654810",
  appId: "1:844049654810:web:900a015143207059969da3",
  measurementId: "G-QM1TQW2BGN",
};

const firebaseApp = initializeApp(clientConfig);
const db = getFirestore(firebaseApp);

export { db, firebaseApp };
