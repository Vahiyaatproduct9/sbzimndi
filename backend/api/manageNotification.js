import getUserfromAccessToken from "../functions/getUserfromAccessToken.js";
import sbs from "../libs/createAuth.js";
import sendNotification from "./sendNotification.js";
export async function postNotification({
  access_token, // Give your Access Token
  fcm_token,
  user_id,
  notification: { title, body, data },
}) {
  try {
    if (fcm_token) {
      const res = await sendNotification({ fcm_token, title, body, data });
      return { ...res, success: true };
    } else if (user_id) {
      const { data: userData, error: userError } = await sbs
        .from("users")
        .select("fcm_token")
        .eq("id", user_id)
        .single();
      if (userError) {
        return { success: false, error: userError, message: userError.message };
      }
      if (!userData || !userData.fcm_token || userData.fcm_token.length === 0) {
        return {
          success: false,
          error: userError,
          message: "No fcm token found.",
        };
      }
      const res = await sendNotification({
        fcm_token: userData.fcm_token,
        title,
        body,
        data,
      });
      return { ...res, success: true };
    } else if (access_token) {
      const { data: authData, error: authError } = await sbs.auth.getUser(
        access_token
      );
      if (authError) {
        console.log("authError: ", authError);
        return { success: false, error: authError, message: authError.message };
      }
      const { data: userData, error: userError } = await sbs
        .from("users")
        .select("fcm_token")
        .eq("id", authData.user.id)
        .single();
      if (userData && userData.fcm_token) {
        const res = await sendNotification({
          fcm_token: userData.fcm_token,
          title,
          data,
          body,
        });
        return { ...res, success: true };
      } else
        return { success: false, error: userError, message: userError.message };
    }
  } catch (err) {
    console.log("U are not a sigma.", err);
    return { error: err, success: false, message: "Internal Server Error." };
  }
}

export async function addInNotificationTable({
  user_id,
  notification: { title, body, data },
}) {
  const { data: notificationData, error: notificationError } = await sbs
    .from("notifications")
    .insert({
      user_id,
      body: {
        title,
        body,
        data,
      },
    })
    .single()
    .select();
  if (!notificationError) {
    console.log("Saved to NOtification Table!");
    return { success: true, id: notificationData ? notificationData.id : null };
  } else {
    console.log("SOme error occured :( -> ", notificationError);
    return { success: false, id: null };
  }
}

export async function getNotification({ user_id, access_token }) {
  const runFunction = async ({ user_id }) => {
    const { data, error } = await sbs
      .from("notifications")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });
    if (!error) {
      return {
        data,
        error,
        success: true,
      };
    } else {
      console.log("some Error occured when fetching notifications 💔");
      return { data, error, success: false };
    }
  };
  try {
    if (user_id) return await runFunction({ user_id });
    else if (access_token) {
      const { success, id } = await getUserfromAccessToken(access_token);
      if (success === true) {
        return await runFunction({ user_id: id });
      } else {
        console.log("Error, you are NOT a sigma.");
        return {
          data: null,
          error: "Couldn't get notifications",
          success: false,
        };
      }
    } else {
      console.log("Nothing provided, returning error.");
      return {
        data: null,
        error: "Couldn't get notifications",
        success: false,
      };
    }
  } catch (e) {
    console.log("Try and catch error..", e);
    return { data: null, error: e, success: false };
  }
}

export async function deleteNotification({
  user_id,
  access_token,
  notification_id,
}) {
  async function runFunction({ user_id, notification_id }) {
    const { error } = await sbs
      .from("notifications")
      .delete()
      .eq("id", notification_id)
      .eq("user_id", user_id);
    if (!error) {
      console.log("Notification Deleted!");
      return { success: true, message: "Deleted Notification.", error };
    } else {
      console.log("Couldn't delete Notification.", error);
      return { error, success: false };
    }
  }
  if (user_id) {
    return await runFunction({ user_id, notification_id });
  } else if (access_token) {
    const { success, id, error } = await getUserfromAccessToken(access_token);
    if (success === true) {
      console.log("notification Error", error);
      return await deleteNotification({ user_id: id, notification_id });
    }
  }
}
