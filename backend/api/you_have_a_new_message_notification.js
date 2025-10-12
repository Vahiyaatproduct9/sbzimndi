import sbs from "../libs/createAuth.js";
import WebSocket from "ws";
import {
  addInNotificationTable,
  postNotification,
} from "./manageNotification.js";
export default (clients) => {
  console.log("Running function to check for new Message.");
  sbs
    .channel("changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages" },
      async (payload) => {
        console.log(payload);
        const client = clients.get(payload.new.sender_id);
        if (client && client.readyState === WebSocket.OPEN) {
          if (payload.new && payload.eventType === "INSERT") {
            console.log("sending thru websocket:", payload.new);
            client.send(
              JSON.stringify({
                success: true,
                data: payload.new,
                error: null,
                message: null,
              })
            );
          }
        } else {
          const { data, error } = await sbs
            .from("conversations")
            .select(
              `id, buyer_id, seller_id,
            conversations_buyer_id_fkey(id, full_name, fcm_token),
            conversations_seller_id_fkey(id, full_name, fcm_token)
            `
            )
            .eq("id", payload.new.conversation_id)
            .single();
          // console.log("conversations data: ", data, error);
          if (!error) {
            let reciever;
            if (payload.new.sender_id === data.conversations_buyer_id_fkey.id)
              reciever = data.conversations_seller_id_fkey;
            else reciever = data.conversations_buyer_id_fkey;
            const notification = {
              title: `${reciever.full_name} has messaged you.`,
              body: `${payload.new.body}`,
              data: { conversation_id: payload.new.conversation_id },
            };
            await postNotification({
              fcm_token: reciever.fcm_token,
              notification,
            });
            await addInNotificationTable({
              user_id: reciever.id,
              notification,
            });
          }
        }
      }
    )
    .subscribe();
};
