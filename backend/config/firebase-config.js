// ⚠️ use the below comented code only if you are using on local
// import admin from "firebase-admin"; // <-- Fix: Import as default
// import firebaseAdminConfig from './firebaseAdminConfig.json' with { type: 'json' };

// const serviceAccount = firebaseAdminConfig;

// // Initialize Firebase Admin
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

//  export default admin; // Export initialized instanceon 

// // ⚠️ below comented code is for rendering on server
// import { initializeApp, cert } from "firebase-admin/app";
// import fs from "fs";

// // Read Firebase credentials from Render's secret file path
// const firebaseConfigPath = "/etc/secrets/firebaseAdminConfig.json";

// if (!fs.existsSync(firebaseConfigPath)) {
//     console.error("Firebase config file not found!");
//     process.exit(1);
// }

// const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf8"));

// const firebaseAdmin = initializeApp({
//     credential: cert(firebaseConfig)
// });

// console.log("Firebase initialized successfully");

// export default firebaseAdmin;




