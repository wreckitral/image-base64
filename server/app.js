const express = require("express");
const app = express();
const connect = require("./database/conn");
const cors = require("cors");
const Post = require("./models/Post");
const PORT = process.env.PORT || 4040;

app.use(express.json({ limit: '35mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

app.get("/", (req, res) => {
  try {
    Post.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(408).json({ error });
      });
  } catch (error) {
    res.json({ error });
  }
});

app.post("/upload", async (req, res) => {
  try {
    const body = req.body;
    const newImage = await Post.create(body);
    newImage.save();
    return res.status(201).json({ msg: "new image uploaded" });
  } catch (error) {
    return res.status(409).json({ msg: error.message });
  }
});

connect()
  .then(() => {
    try {
      app.listen(PORT || 4040, () => {
        console.log(`Listening on port ${PORT}`);
      });
    } catch (error) {
      console.log("Cant connect to server");
    }
  })
  .catch((err) => {
    console.log("Database is not connected");
  });
