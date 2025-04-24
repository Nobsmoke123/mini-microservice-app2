const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

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

app.post("/posts", (req, res) => {
  const postId = randomBytes(4).toString("hex");

  const { title } = req.body;

  posts[postId] = {
    id: postId,
    title,
  };

  res.status(201).send(posts[postId]);
});

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
