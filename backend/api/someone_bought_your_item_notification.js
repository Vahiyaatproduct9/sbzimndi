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
          const { success, id } = await addInNotificationTable({
            user_id: newRow.user_id,
            notification,
          });
          await postNotification({
            user_id: newRow.user_id,
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
