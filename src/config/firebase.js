import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,updatePassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, getDocs, query, where } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDTRqYUOlxH6ZA1z-12kBlIsNfcMgloKwk",
    authDomain: "final-hackathone.firebaseapp.com",
    projectId: "final-hackathone",
    storageBucket: "final-hackathone.appspot.com",
    messagingSenderId: "1068010074207",
    appId: "1:1068010074207:web:db331b1f46ee23b7d52bea",
    measurementId: "G-8DB5MXZ7GD"
});

const auth = getAuth();
const db = getFirestore();

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,

    db,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where,
    updatePassword
};