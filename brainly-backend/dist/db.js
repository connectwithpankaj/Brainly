"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
mongoose_2.default.connect("mongodb+srv://kirattechnologies:50NPKUYAiLjfPWGH@cluster0.nuud5.mongodb.net/");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: String,
});
exports.UserModel = (0, mongoose_1.model)("Users", UserSchema);
const ContentSchema = new mongoose_1.Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose_2.default.Types.ObjectId, ref: "Tag" }],
    UserId: { type: mongoose_2.default.Types.ObjectId, ref: "Users", require: true },
});
exports.ContentModel = (0, mongoose_1.model)("Content", ContentSchema);
