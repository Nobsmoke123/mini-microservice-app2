const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

const posts = {};

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/posts", async (req, res) => {
  const postId = randomBytes(4).toString("hex");

  const { title } = req.body;

  posts[postId] = {
    id: postId,
    title,
  };

  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: posts[postId],
  });

  res.status(201).send(posts[postId]);
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log("Event received:", event);
  res.status(200).send({ status: "OK" });
});

app.listen(4000, () => {
  console.log("Receive traffic from the outside world.");
  console.log(`Server is running on port 4000`);
});
