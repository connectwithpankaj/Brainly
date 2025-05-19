// import { Message } from './../node_modules/typescript/lib/typescript.d';
import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db";
import { JWT_SECRET } from "./config";
import { UserMiddleware } from "./middleware";

const app = express();
app.use(express.json());

app.post("/api/vi/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    await UserModel.create({ username, password });
    res.json({ message: "You have successfully signed up!" });
  } catch (err) {
    res.status(500).json({ error: "User already Exists", details: err });
  }
});

app.post("/api/vi/signin", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await UserModel.findOne({ username, password });

  if (existingUser) {
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials",
    });
  }
});

app.post("/api/vi/content", UserMiddleware, async (req, res) => {
  const { link, type } = req.body;
  await ContentModel.create({
    link,
    type,
    //@ts-ignore
    UserId: req.UserId,
    tags: [],
  });
  res.json({
    message: "Content Added",
  });
});
app.get("/api/vi/content", UserMiddleware, async (req, res) => {
  //@ts-ignore
  const UserId = req.UserId;
  const content = await ContentModel.find({
    UserId: UserId,
  }).populate("UserId");
  res.json({
    content,
  });
});

app.delete("/api/vi/content",UserMiddleware, async (req, res) => {
  const contentId  = req.body.contentId;
  await ContentModel.deleteMany({
    contentId,
    //@ts-ignore
    UserId : req.UserId
  });
  res.json({
    Message : "Content Deleted"
  })
});

// app.post("/api/vi/signin", (req, res) => {});

app.listen(3000);
