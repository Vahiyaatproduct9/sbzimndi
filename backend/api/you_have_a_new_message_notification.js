import sbs from "../libs/createAuth.js";
import WebSocket from "ws";
import {
  addInNotificationTable,
  postNotification,
} from "./manageNotification.js";
// export default (clients) => {
//   console.log("Running function to check for new Message.");
//   sbs
//     .channel("changes")
//     .on(
//       "postgres_changes",
//       { event: "*", schema: "public", table: "messages" },
//       async (payload) => {
//         console.log(payload);
//         const client = clients.get(payload.new.conversation_id);
//         if (client && client.readyState === WebSocket.OPEN) {
//           if (payload.new) {
//             console.log("sending thru websocket:", payload.new);
//             client.send(
//               JSON.stringify({
//                 success: true,
//                 data: payload.new,
//                 error: null,
//                 message: null,
//               })
//             );
//           }
//         } else {
//           const { data, error } = await sbs
//             .from("conversations")
//             .select(
//               `id, buyer_id, seller_id,
//             conversations_buyer_id_fkey(id, full_name, fcm_token),
//             conversations_seller_id_fkey(id, full_name, fcm_token)
//             `
//             )
//             .eq("id", payload.new.conversation_id)
//             .single();
//           // console.log("conversations data: ", data, error);
//           if (!error) {
//             let reciever;
//             if (payload.new.sender_id === data.conversations_buyer_id_fkey.id)
//               reciever = data.conversations_seller_id_fkey;
//             else reciever = data.conversations_buyer_id_fkey;
//             const notification = {
//               title: `${reciever.full_name} has messaged you.`,
//               body: `${payload.new.body}`,
//               data: { conversation_id: payload.new.conversation_id },
//             };
//             await postNotification({
//               fcm_token: reciever.fcm_token,
//               notification,
//             });
//             await addInNotificationTable({
//               user_id: reciever.id,
//               notification,
//             });
//           }
//         }
//       }
//     )
//     .subscribe();
// };
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
              conversations_buyer_id_fkey(id, full_name, fcm_token),
              conversations_seller_id_fkey(id, full_name, fcm_token)`
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
