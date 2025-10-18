import express, { json } from "express";
import cors from "cors";
import message from "./api/message.js";
import verifyWithOTP from "./api/verifyWithOTP.js";
import signup from "./api/signup.js";
import getProfile from "./api/getProfile.js";
import addPost from "./api/addpost.js";
import multer from "multer";
import signin from "./api/signin.js";
import extendToken from "./api/extendToken.js";
import { read_items } from "./api/readitems.js";
import search from "./api/search.js";
import updateProfile from "./api/updateProfile.js";
import getItem from "./api/getItem.js";
import payment from "./api/payment.js";
import verifyPayment from "./api/verifyPayment.js";
import { Readable } from "stream";
import feedback from './api/feedback.js'
import signOut from "./api/signOut.js";
import updateFcn from "./api/updateFcn.js";
import { WebSocketServer } from "ws";
import someone_bought_your_item_notification from "./api/someone_bought_your_item_notification.js";
import {
  deleteNotification,
  getNotification,
} from "./api/manageNotification.js";
import listOrders from "./api/listOrders.js";
import cart from "./api/listCartItems.js";
import you_have_a_new_message_notification from "./api/you_have_a_new_message_notification.js";
// import conversations from "./endponts/conversations.js";
const port = 8080;
const app = express();
app.use(json());
(async () => await someone_bought_your_item_notification())();
const upload = multer({ storage: multer.memoryStorage() });
const uploadFiles = upload.fields([
  { name: "aadhar_front", maxCount: 1 },
  { name: "personal_pan", maxCount: 1 },
  { name: "bank_proof", maxCount: 1 },
]);
const wss = new WebSocketServer({ port: 9000 });
const clients = new Map();

wss.on("connection", (ws, req) => {
  const params = new URLSearchParams(req.url.replace("/?", ""));
  const conversation_id = params.get("conversation_id");
  if (!conversation_id) {
    ws.close();
    console.log("Connection closed: no conversation_id");
    return;
  }

  if (!clients.has(conversation_id)) clients.set(conversation_id, new Set());
  const group = clients.get(conversation_id);
  group.add(ws);

  console.log(`${conversation_id} connected.`);

  ws.on("close", () => {
    const group = clients.get(conversation_id);
    if (group) {
      group.delete(ws);
      if (group.size === 0) clients.delete(conversation_id);
    }
    console.log(`${conversation_id} disconnected.`);
  });
});
you_have_a_new_message_notification(clients);

app.get("/", (_, res) => {
  res.send("Hello World!");
});
app.post("/profile", async (req, res) => {
  const { access_token, fcm_token, user_id } = await req.body;
  const response = await getProfile({ access_token, fcm_token, user_id });
  res.json(response);
});
app.get("/getpost", async (req, res) => {
  const { id } = req.query;
  const response = await getItem(id);
  res.json(response);
});

app.post("/signup", uploadFiles, async (req, res) => {
  const info = await req.body;
  const {
    name,
    email,
    fullName,
    upiId,
    password,
    phone,
    location: { lat, long, acc },
    ifsc,
    accountNumber,
    pan,
    verified,
    fcm_token,
  } = JSON.parse(info.info);
  console.log(info);
  const aadharFront = req.files["aadhar_front"]
    ? req.files["aadhar_front"][0]
    : null;
  const personalPan = req.files["personal_pan"]
    ? req.files["personal_pan"][0]
    : null;
  const bankProoof = req.files["bank_proof"]
    ? req.files["bank_proof"][0]
    : null;
  // console.log(aadharFront.size, personalPan.size, bankProoof.size);
  const buffertoStream = (buffer) => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  };
  const data = await signup({
    verified,
    name,
    email,
    fullName,
    upiId,
    password,
    fcm_token,
    phone,
    location: {
      lat,
      long,
      acc,
    },
    ifsc: verified ? ifsc : null,
    accountNumber: verified ? accountNumber : null,
    pan: verified ? pan : null,
    aadhar_front:
      verified && aadharFront.buffer
        ? buffertoStream(aadharFront.buffer)
        : null,
    personal_pan:
      verified && personalPan.buffer
        ? buffertoStream(personalPan.buffer)
        : null,
    bank_proof:
      verified && bankProoof.buffer ? buffertoStream(bankProoof.buffer) : null,
  });
  if (data.success === true) {
    console.log(name, "signed up");
  } else {
    console.log(data);
    console.log("Failed to create new user for ", name);
  }
  res.json(data);
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password, fcm_token } = req.body;
    const response = await signin({ email, password });
    if (response.access_token) {
      await updateFcn({ access_token: response.access_token, fcm_token });
    }
    res.json(response);
  } catch (e) {
    console.log("try catch error -> ", e);
    res.json({ success: false, message: "Internal Server Error!" });
  }
});

app.post("/verify", async (req, res) => {
  const { email, token } = await req.body;
  console.log(req.body);
  const response = await verifyWithOTP({ email, token });
  if (response) {
    res.json(response);
  } else {
    const data = { status: "400" };
    res.status(400).send(data);
  }
  console.log(response);
});

app.post("/extendToken", async (req, res) => {
  const { refresh_token } = req.body;
  const { data, error } = await extendToken(refresh_token);
  if (data.session) {
    return res.json({
      status: 200,
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      success: true,
    });
  } else
    return res.json({
      status: error ? error.status : 400,
      ...error,
      success: false,
    });
});

app.post("/search", async (req, res) => {
  console.log("Search function running...");
  const { latitude, longitude, query } = req.body;
  const result = await search({ latitude, longitude, query });
  res.json(result);
});

app.post("/getItems", async (req, res) => {
  const { latitude, longitude } = req.body;
  const response = await read_items({ latitude, longitude });
  console.log("Provided location goes", latitude, longitude);
  res.json(response);
});

app.post("/addpost", upload.single("photo"), async (req, res) => {
  const info = JSON.parse(req.body.info);
  const photo = req.file;
  if (!photo) return res.status(400).json({ error: "No file uploaded" });
  const { itemError, imgError } = await addPost({ photo, info });
  if (!imgError && !itemError) {
    res.json({ status: 200 });
  } else res.json({ status: imgError.status || 400 });
});

app.post("/updateprofile", upload.single("photo"), async (req, res) => {
  console.log("update profile api running...");
  const info = JSON.parse(req.body.info);
  const photo = req.file;
  const response = await updateProfile({ info, photo });
  res.json(response);
});

// Razorpay integration

app.post("/initiate-payment", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const response = await payment({ id });
  res.json(response);
});

app.post("/verify-payment", async (req, res) => {
  const { result, access_token } = await req.body;
  console.log({ result, access_token });
  const response = await verifyPayment({ result, access_token });
  res.json(response);
});

app.post("/get-notification", async (req, res) => {
  const { access_token, user_id } = req.body;
  const response = await getNotification({ access_token, user_id });
  res.json(response);
});

app.post("/delete-notification", async (req, res) => {
  const { access_token, notification_id } = req.body;
  const response = await deleteNotification({ access_token, notification_id });
  res.json(response);
});

app.post("/update-fcm", async (req, res) => {
  const { access_token, fcm_token } = req.body;
  console.log("rumning update-fcm from index");
  const response = await updateFcn({ access_token, fcm_token });
  res.json(response);
});

// LIST ORDERS HERE ...

app.post("/get-orders", async (req, res) => {
  const { access_token } = req.body;
  if (access_token && access_token.length > 0)
    console.log("access token recieved.");
  else console.log("no access token");
  const response = await listOrders(access_token);
  res.json(response);
});

// ENDS...
//list cart items
app.post("/cart/list", async (req, res) => {
  const { user_id, access_token } = req.body;
  const response = await cart({ access_token, user_id }).list();
  res.json(response);
});
// Conversations section...

app.post("/conversation/create", async (req, res) => {
  const { access_token, user_id: id_1, reciever_id: id_2, iambuyer } = req.body;
  const response = await message.createCoversation({
    access_token,
    id_2,
    id_1,
    iambuyer,
  });
  res.json(response);
});
app.get("/conversation", async (_, res) => {
  res.send("Conversations");
});
app.post("/conversation/send", async (req, res) => {
  const { conversation_id, user_id, access_token, message: body } = req.body;
  const response = await message.sendMessage({
    conversation_id,
    sender_id: user_id,
    access_token,
    body,
  });
  res.json(response);
});

app.post("/conversation/list", async (req, res) => {
  const { access_token, user_id } = req.body;
  console.log("running list conversations: ", access_token, user_id);
  const response = await message.getContactList({ access_token, user_id });
  res.json(response);
});
app.post("/conversation/get", async (req, res) => {
  console.log("getting chat logs");
  const { conversation_id, last_message_at: created_at } = req.body;
  const response = await message.fetchChatLogs({
    conversation_id,
    created_at: created_at ? created_at : null,
  });
  res.json(response);
});
// Feedback section
app.post('/feedback', async (req, res) => {
  const { access_token, body, stars } = req.body;
  const response = await feedback({ access_token, body, stars })
  res.json(response)
})
app.post("/signOut", async (req, res) => {
  const { access_token } = req.body;
  const response = await signOut(access_token);
  res.json(response);
});

app.listen(port, () => {
  console.log("Listening on Port: ", port);
});
