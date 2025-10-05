import sendNotification from "../libs/firebaseMessaging.js";

export default async ({ fcm_token, title, body, data }) => {
  if (fcm_token) {
    return await sendNotification({
      token: fcm_token,
      title: title ? title : "New Update ",
      body: body ? body : "We're not sure what the update is 🥀",
      data: data ? data : { foo: "bar" },
    });
  }
};
