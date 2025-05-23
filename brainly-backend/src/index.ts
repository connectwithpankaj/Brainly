// import { Message } from './../node_modules/typescript/lib/typescript.d';
import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_SECRET } from "./config";
import { UserMiddleware } from "./middleware";
import { random } from "./utils";

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
    userId: req.userId,
    tags: [],
  });
  res.json({
    message: "Content Added",
  });
});
app.get("/api/vi/content", UserMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId");
  res.json({
    content,
  });
});

app.delete("/api/vi/content", UserMiddleware, async (req, res) => {
  const contentId = req.body.contentId;
  await ContentModel.deleteMany({
    contentId,
    //@ts-ignore
    userId: req.userId,
  });
  res.json({
    Message: "Content Deleted",
  });
});

app.post("/api/vi/brain/share", UserMiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    const hash = random(10); 
    await LinkModel.create({
      //@ts-ignore
      userId: req.userId,
      hash,
    });

    res.json({
      hash, 
      message: "Sharable link created",
    });
  } else {
    await LinkModel.deleteOne({
      //@ts-ignore
      userId: req.userId,
    });
  }
  res.json({

    message: "Sharable link removed",
  });
});

app.get("/api/vi/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash,
  });
  if (!link) {
    res.status(411).json({
      message: "Sorry Incorrect Input",
    });
    return;
  }

  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });
  res.json({
    username: user?.username,
    content: content,
  });
});

app.listen(3000);
