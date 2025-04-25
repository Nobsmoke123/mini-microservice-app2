const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const event = req.body;

  if (event.type === "PostCreated") {
    const { id, title } = event.data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  } else if (event.type === "CommentCreated") {
    const { id, content, postId } = event.data;
    const posts = posts[postId];

    if (posts) {
      posts.comments.push({
        id,
        content,
      });
    }
  }

  console.log("Event received:", event);
  res.status(200).send({ status: "OK" });
});

app.listen(4002, () => {
  console.log("Query service is running on port 4002");
});
