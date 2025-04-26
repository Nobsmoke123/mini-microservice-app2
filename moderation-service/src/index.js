const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log("Event received:", event);
  if (event.type === "CommentCreated") {
    const { content } = event.data;
    const status = content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: event.data.id,
        postId: event.data.postId,
        status,
        content,
      },
    });
  }
});

app.listen(4003, () => {
  console.log("Moderation service is running on port 4003");
});
