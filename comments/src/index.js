const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const { type } = require("os");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const { id } = req.params;

  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: id,
      status: "pending",
    },
  });
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log("Event received:", event);

  if (event.type === "CommentModerated") {
    const { id, postId, status, content } = event.data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    commentsByPostId[postId] = comments;

    axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }

  res.status(200).send({ status: "OK" });
});

app.listen(4001, () => {
  console.log(`Server is running on port 4001`);
});
