import admin from 'firebase-admin'; // Import the firebase-admin module
import serviceAccount from './firebase.config.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;