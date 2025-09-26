import express, { json } from "express";
import cors from "cors";
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
const port = 8080;
const app = express();
app.use(json());

const upload = multer({ storage: multer.memoryStorage() });
const uploadFiles = upload.fields([
  { name: "aadhar_front", maxCount: 1 },
  { name: "personal_pan", maxCount: 1 },
  { name: "bank_proof", maxCount: 1 },
]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/profile", async (req, res) => {
  const { access_token } = await req.body;
  if (access_token) {
    const response = await getProfile({ access_token });
    res.status(response.status).json(response);
  }
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
    const { email, password } = req.body;
    const { data, error } = await signin({ email, password });
    console.log(data.session.access_token, error);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (data.session) {
      return res.status(200).json({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
    }
    // fallback if no error but no session
    return res.status(400).json({ error: "Login failed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
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
    });
  } else
    return res.json({
      status: error ? error.status : 400,
      ...error,
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
  const { data, error } = await read_items({ latitude, longitude });
  console.log(data.slice(1, 3), error);
  console.log("Provided location goes", latitude, longitude);
  if (error || !data)
    res.status(error.code).json({
      data: error,
      status: error.code,
    });
  else
    res.status(200).json({
      data: data,
      status: 200,
    });
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
  const { infoError } = await updateProfile({ info, photo });
  if (!infoError) return res.json({ updated: true });
  res.json({ updated: false });
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

app.listen(port, () => {
  console.log("Listening on Port: ", port);
});
