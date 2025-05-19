"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Message } from './../node_modules/typescript/lib/typescript.d';
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/vi/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        yield db_1.UserModel.create({ username, password });
        res.json({ message: "You have successfully signed up!" });
    }
    catch (err) {
        res.status(500).json({ error: "User already Exists", details: err });
    }
}));
app.post("/api/vi/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const existingUser = yield db_1.UserModel.findOne({ username, password });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, config_1.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({
            token,
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect Credentials",
        });
    }
}));
app.post("/api/vi/content", middleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type } = req.body;
    yield db_1.ContentModel.create({
        link,
        type,
        //@ts-ignore
        UserId: req.UserId,
        tags: [],
    });
    res.json({
        message: "Content Added",
    });
}));
app.get("/api/vi/content", middleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const UserId = req.UserId;
    const content = yield db_1.ContentModel.find({
        UserId: UserId,
    }).populate("UserId");
    res.json({
        content,
    });
}));
app.delete("/api/vi/content", middleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        UserId: req.UserId
    });
    res.json({
        Message: "Content Deleted"
    });
}));
// app.post("/api/vi/signin", (req, res) => {});
app.listen(3000);
