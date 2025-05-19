import { model, Schema } from "mongoose";
import mongoose from "mongoose";
mongoose.connect(
  "mongodb+srv://kirattechnologies:50NPKUYAiLjfPWGH@cluster0.nuud5.mongodb.net/"
);

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("Users", UserSchema);

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  UserId: { type: mongoose.Types.ObjectId, ref: "Users", require: true },
});
export const ContentModel = model("Content", ContentSchema);
