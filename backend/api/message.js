import getUserfromAccessToken from "../functions/getUserfromAccessToken.js";
import sbs from "../libs/createAuth.js";
function M() {
  return {
    createCoversation: async function ({
      id_1, //(optional) The sender's Id who starts the conversation.
      id_2, // The receiver's Id
      access_token, // (optional) either you provide id_1 or access_token
      iambuyer, // whether sender is a buyer or a seller
    }) {
      async function check_if_a_conversation_already_exists({
        buyer_id,
        seller_id,
      }) {
        return await sbs
          .from("conversations")
          .select("id")
          .eq("buyer_id", buyer_id)
          .eq("seller_id", seller_id)
          .single();
      }
      async function create_a_new_conversation({ buyer_id, seller_id }) {
        return await sbs
          .from("conversations")
          .insert({ buyer_id, seller_id }) // must be an array
          .select()
          .single();
      }
      try {
        async function runFunction({ buyer_id, seller_id }) {
          const { data: checkIfExists, error: checkError } =
            await check_if_a_conversation_already_exists({
              buyer_id,
              seller_id,
            });
          if (checkIfExists && !checkError) {
            return {
              success: true,
              conversation_id: checkIfExists.id,
              error: checkError,
              message: checkError ? checkError.message : null,
            };
          }
          const { data, error } = await create_a_new_conversation({
            buyer_id,
            seller_id,
          });
          if (error || !data) {
            return {
              success: false,
              conversation_id: null,
              error,
              message: error.message,
            };
          }
          return {
            success: true,
            conversation_id: data.id,
            error: null,
            message: null,
          };
        }
        if (id_1) {
          const buyer_id = iambuyer ? id_1 : id_2;
          const seller_id = iambuyer ? id_2 : id_1;
          return await runFunction({ buyer_id, seller_id });
        }
        if (access_token) {
          const { success, id, error } = await getUserfromAccessToken(
            access_token
          );
          if (success) {
            const buyer_id = iambuyer ? id : id_2;
            const seller_id = iambuyer ? id_2 : id;
            return await runFunction({ buyer_id, seller_id });
          } else
            return {
              success: false,
              conversation_id: null,
              error,
              message: "Couldn't get user from Access Token.",
            };
        } else {
          const error_message = "user_id or access_token both not provided.";
          console.log(error_message);
          return {
            success: false,
            error: error_message,
            message: error_message,
            conversation_id: null,
          };
        }
      } catch (e) {
        console.log("Try & Catch Error. ", e);
        return { success: true, conversation_id: null, error: e, message: e };
      }
    },
    sendMessage: async function sendMessage({
      conversation_id,
      sender_id,
      body,
    }) {
      try {
        const { data, error } = await sbs
          .from("messages")
          .insert({
            conversation_id,
            sender_id,
            body,
          })
          .select()
          .single();
        if (!error && data) {
          return { success: true, data, error, message: null };
        } else {
          return { success: false, data: null, error, message: error.message };
        }
      } catch (e) {
        console.log("Try and catch error", e);
        return { success: false, data: null, error: e, message: e };
      }
    },
    getContactList: async function ({ access_token, user_id }) {
      try {
        async function runFunction(user_id) {
          const { data, error } = await sbs
            .from("conversations")
            .select("*")
            .or(`buyer_id.eq.${user_id},seller_id.eq.${user_id}`);
          console.log("contact list : ", data, error);
          if (!error)
            return { success: true, data, error, message: error.message };
          else return { success: false, data, error };
        }
        if (user_id) {
          return await runFunction(user_id);
        } else if (access_token) {
          const { success, id, error } = await getUserfromAccessToken(
            access_token
          );
          if (success) {
            return await runFunction(id);
          } else
            return {
              success: false,
              data: null,
              error,
              message: "Access Token Invalid",
            };
        } else
          return {
            success: false,
            data: null,
            error: null,
            message: "No user_id not Access Token provided.",
          };
      } catch (e) {
        return { success: false, data: null, error: e, message: e };
      }
    },
  };
}

const message = M();
export default message;
