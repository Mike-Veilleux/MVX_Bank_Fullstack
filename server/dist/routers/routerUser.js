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
exports.routerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ENUMs_1 = require("../interfaces/ENUMs");
const IUser_1 = require("../interfaces/IUser");
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
exports.routerUser = express_1.default.Router();
exports.routerUser.post("/login-local", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const user = yield IUser_1.User.findOne({
        email: email,
    });
    if (user === undefined || user === null) {
        res.status(204).send();
    }
    else {
        bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password, (err, result) => {
            if (result === true) {
                const userID = user._id;
                const token = jsonwebtoken_1.default.sign({ value: userID }, process.env.SESSION_TOKEN_SECRET);
                res
                    .cookie("mvx_jwt", token, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    maxAge: 9 * 60 * 60 * 1000, // hours x minutes x seconds x milliseconds
                })
                    .send(user);
            }
            else {
                res.status(204).send();
            }
        });
    }
}));
exports.routerUser.post("/login-google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const googleID = req.body.googleID;
    const user = yield IUser_1.User.findOne({
        email: email,
        googleID: googleID,
    });
    if (user === undefined || user === null) {
        res.status(204).send();
    }
    else {
        const userID = user._id;
        const token = jsonwebtoken_1.default.sign({ value: userID }, process.env.SESSION_TOKEN_SECRET);
        res
            .cookie("mvx_jwt", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 9 * 60 * 60 * 1000, // hours x minutes x seconds x milliseconds
        })
            .send(user);
    }
}));
exports.routerUser.post("/login-type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield IUser_1.User.findOne({ email: email });
    let userType = null;
    if (user === null) {
        userType = ENUMs_1.IUserType.NONE;
    }
    else if (user.password !== "") {
        userType = ENUMs_1.IUserType.LOCAL;
    }
    else if (user.googleID !== "") {
        userType = ENUMs_1.IUserType.GOOGLE;
    }
    res.send(JSON.stringify(userType));
}));
exports.routerUser.post("/logout", (req, res) => {
    const token = jsonwebtoken_1.default.sign({ value: "Expired" }, process.env.SESSION_TOKEN_SECRET);
    res
        .cookie("mvx_jwt", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 0,
    })
        .send({});
});
exports.routerUser.post("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body.user;
    const matchingUser = yield IUser_1.User.findOne({ email: newUser.email });
    if (!matchingUser) {
        const result = new IUser_1.User(newUser);
        result.save((err, newUser) => {
            if (err)
                return console.log(err);
            res.status(201).send(newUser);
        });
    }
    else {
        res.status(205).send("Email already exist!");
    }
}));
