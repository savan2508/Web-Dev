import express from "express";
import { getMessage, postMessage } from "./controllers/messages.controller.js";
import {
  getFriends,
  getFriend,
  postFriends,
} from "./controllers/friends.controller.js";

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} Response:${delta}ms`);
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/friends", getFriends);

app.post("/friends", postFriends);

app.get("/friends/:friendId", getFriend);

app.get("/messages", getMessage);

app.post("/messages", postMessage);

app.listen(PORT, () => {
  console.log(`Your server is started at ${PORT}`);
});
