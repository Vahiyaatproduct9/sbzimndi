import sbs from "../libs/createAuth.js";
export default async () => {
  console.log("Running function to check for new Message.");
  sbs
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      async (payload) => {
        const oldRow = payload.old;
        const newRow = payload.new;
        console.log("New Message: ", payload);
      }
    )
    .subscribe();
};
