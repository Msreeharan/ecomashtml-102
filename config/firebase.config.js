import admin from 'firebase-admin';
import { readFileSync } from "fs";
const serviceAccount = JSON.parse(
    readFileSync(new URL("../config/firebase.config.json", import.meta.url))
  );
  
  
    // Initialize Firebase app
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
            
        });
}
    
export const db = admin.firestore();

export default admin