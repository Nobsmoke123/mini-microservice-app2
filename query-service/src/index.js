const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const event = req.body;

  console.log("Event received:", event);

  if (event.type === "PostCreated") {
    const { id, title } = event.data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  } else if (event.type === "CommentCreated") {
    const { id, content, postId } = event.data;
    const post = posts[postId];

    if (post) {
      post.comments.push({
        id,
        content,
      });
    }
  }
  console.log("The posts are:", posts);
  console.log("Event received:", event);
  res.status(200).send({ status: "OK" });
});

app.listen(4002, () => {
  console.log("Query service is running on port 4002");
});
