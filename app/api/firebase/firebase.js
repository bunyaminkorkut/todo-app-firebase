import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDPgCEv-AixCyelm_QsaPmNwbTVHhSXqzw",
  authDomain: "todo-app-e1709.firebaseapp.com",
  projectId: "todo-app-e1709",
  storageBucket: "todo-app-e1709.appspot.com",
  messagingSenderId: "1007581775338",
  appId: "1:1007581775338:web:b970c327d0d2bcd24ade93",
  measurementId: "G-ZF8K64G1H1"
};

export const firebaseapp = initializeApp(firebaseConfig);
