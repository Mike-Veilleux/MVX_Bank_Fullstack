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
const DAL_1 = require("../DAL/MongoDB/DAL");
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
exports.routerUser = express_1.default.Router();
exports.routerUser.post("/login-type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginType = yield (0, DAL_1.User_GetLoginType)(req.body.email);
    res.send(JSON.stringify(loginType));
}));
exports.routerUser.post("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield (0, DAL_1.User_CreateNew)(req.body.newUser);
    //remove sensitive data - not needed in front end
    if (typeof newUser === "object") {
        newUser.password = "";
        newUser.googleID = "";
    }
    res.send(newUser);
}));
exports.routerUser.post("/login-local", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const localUser = yield (0, DAL_1.User_GetLocalCredentials)(req.body.email);
    if (localUser === undefined || localUser === null) {
        res.status(204).send();
    }
    else {
        bcrypt_1.default.compare(req.body.password, localUser === null || localUser === void 0 ? void 0 : localUser.password, (err, result) => {
            if (result === true) {
                const userID = localUser._id;
                const token = jsonwebtoken_1.default.sign({ value: userID }, process.env.SESSION_TOKEN_SECRET);
                localUser.password = "";
                res
                    .cookie("mvx_jwt", token, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    maxAge: 9 * 60 * 60 * 1000, // hours x minutes x seconds x milliseconds
                })
                    .send(localUser);
            }
            else {
                res.status(204).send();
            }
        });
    }
}));
exports.routerUser.post("/login-google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const googleUser = yield (0, DAL_1.User_GetGoogleCredentials)(req.body.email);
    console.log("API - googleCredentials: ", googleUser === null || googleUser === void 0 ? void 0 : googleUser.googleID);
    if (googleUser === null) {
        res.status(204).send();
    }
    else {
        bcrypt_1.default.compare(req.body.googleID, googleUser.googleID, (err, result) => {
            if (result === true) {
                const userID = googleUser._id;
                const token = jsonwebtoken_1.default.sign({ value: userID }, process.env.SESSION_TOKEN_SECRET);
                googleUser.googleID = "";
                res
                    .cookie("mvx_jwt", token, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    maxAge: 9 * 60 * 60 * 1000, // hours x minutes x seconds x milliseconds
                })
                    .send(googleUser);
            }
            else {
                res.status(204).send();
            }
        });
    }
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
