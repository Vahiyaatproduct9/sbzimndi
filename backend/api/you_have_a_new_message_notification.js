import sbs from "../libs/createAuth.js";
import WebSocket from "ws";
import {
  addInNotificationTable,
  postNotification,
} from "./manageNotification.js";
export default (clients) => {
  console.log("Listening for new messages...");

  sbs
    .channel("message_changes")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      async (payload) => {
        const group = clients.get(payload.new.conversation_id);

        if (group && group.size > 0) {
          for (const client of group) {
            if (client.readyState === WebSocket.OPEN) {
              console.log("Sending thru WebSocket:", payload.new);
              client.send(
                JSON.stringify({
                  success: true,
                  data: payload.new,
                  error: null,
                  message: null,
                })
              );
            }
          }
        } else {
          const { data, error } = await sbs
            .from("conversations")
            .select(
              `id, buyer_id, seller_id,
              conversations_buyer_id_fkey(id, full_name, fcm_token, notification_on),
              conversations_seller_id_fkey(id, full_name, fcm_token, notification_on)`
            )
            .eq("id", payload.new.conversation_id)
            .single();

          if (!error) {
            const sender_id = payload.new.sender_id;
            const receiver =
              sender_id === data.conversations_buyer_id_fkey.id
                ? data.conversations_seller_id_fkey
                : data.conversations_buyer_id_fkey;

            const notification = {
              title: `${receiver.full_name} has messaged you.`,
              body: payload.new.body,
              data: { conversation_id: payload.new.conversation_id },
            };

            if (receiver.notification_on)
              await postNotification({
                fcm_token: receiver.fcm_token,
                notification,
              });
            await addInNotificationTable({
              user_id: receiver.id,
              notification,
            });
          }
        }
      }
    )
    .subscribe();
};
