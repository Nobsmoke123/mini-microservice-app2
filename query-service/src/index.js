const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const posts = {};

const handleEvents = (event) => {
  if (event.type === "PostCreated") {
    const { id, title } = event.data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  } else if (event.type === "CommentCreated") {
    const { id, content, postId, status } = event.data;
    const post = posts[postId];

    if (post) {
      post.comments.push({
        id,
        content,
        status,
      });
    }
  } else if (event.type === "CommentUpdated") {
    const { id, content, postId, status } = event.data;
    const post = posts[postId];

    if (post) {
      const comment = post.comments.find((comment) => comment.id === id);
      if (comment) {
        comment.status = status;
        comment.content = content;
      }
    }
  }
};

app.get("/posts", (req, res) => {
  const event = req.body;
  handleEvents(event);
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const event = req.body;

  console.log("Event received:", event);

  res.status(200).send({ status: "OK" });
});

app.listen(4002, async () => {
  console.log("Query service is running on port 4002");

  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    handleEvents(event);
  }
});
