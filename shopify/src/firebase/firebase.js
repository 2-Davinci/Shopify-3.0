import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
export const firebaseConfig = {
  apiKey: "AIzaSyDc1ggguIIWd88164N2bOSrohaS8AMD1Kk",
  authDomain: "eshop-6b2af.firebaseapp.com",
  projectId: "eshop-6b2af",
  storageBucket: "eshop-6b2af.appspot.com",
  messagingSenderId: "670780523183",
  appId: "1:670780523183:web:79212eee88028fa86b4a5a",
  measurementId: "G-9VJ84TGQTF",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
