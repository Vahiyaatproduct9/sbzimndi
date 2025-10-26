import sbs from "../libs/createAuth.js";
import {
  addInNotificationTable,
  postNotification,
} from "./manageNotification.js";
export default async () => {
  console.log("running channel");
  sbs
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "items",
      },
      async (payload) => {
        const oldRow = payload.old;
        const newRow = payload.new;
        console.log("payload --> ", payload);
        if (newRow && newRow.user_id) {
          const notification = {
            title: "GOOD NEWS!",
            body: "Your Item was Sold!!",
            data: {
              code: "bought_item",
              oldRow,
              newRow,
            },
          };
          const { data } = await sbs
            .from("users")
            .select("fcm_token, notfication_on")
            .eq("id", newRow.user_id)
            .single();
          const { success, id } = await addInNotificationTable({
            user_id: newRow.user_id,
            notification,
          });
          if (data?.notfication_on)
            await postNotification({
              fcm_token: data?.fcm_token,
              notification: {
                ...notification,
                data: {
                  ...notification.data,
                  notification_id: success === true ? id : "NA",
                },
              },
            });
        }
      }
    )
    .subscribe();
};
