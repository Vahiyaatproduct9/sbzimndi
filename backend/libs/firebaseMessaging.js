import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import admin from "firebase-admin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
export default async function sendNotification({ token, title, body, data }) {
  const message = {
    token,
    notification: {
      title,
      body,
    },
    data,
  };
  try {
    const response = await admin.messaging().send(message);
    console.log("NOtification sent!", response);
    return { response, success: true };
  } catch (e) {
    console.log("notification error ->", e);
    return { success: false, response: null };
  }
}
