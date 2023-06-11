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
exports.routerAccount = void 0;
const express_1 = __importDefault(require("express"));
const IAccount_1 = require("../interfaces/IAccount");
exports.routerAccount = express_1.default.Router();
exports.routerAccount.post("/get-by-id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const accountType = req.body.accountType;
    const account = yield IAccount_1.Account.findOne({
        ownersID: id,
        accountType: accountType,
    });
    if (account === null || account === undefined) {
        res.status(204);
    }
    else {
        res.send(account);
    }
}));
exports.routerAccount.post("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccount = req.body.account;
    if (newAccount) {
        const result = new IAccount_1.Account(newAccount);
        result.save((err, nAcc) => {
            if (err)
                return console.log(err);
            res.status(201).send(nAcc);
        });
    }
    else {
        res.status(404).send("Request Failed!");
    }
}));
exports.routerAccount.post("/update-balance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const accountType = req.body.accountType;
    const amount = parseInt(req.body.amount);
    const account = yield IAccount_1.Account.findOneAndUpdate({
        ownersID: id,
        accountType: accountType,
    }, { $inc: { balance: amount } }, { new: true }).exec();
    if (account === null || account === undefined) {
        res.status(204);
    }
    else {
        res.send(account);
    }
}));
exports.routerAccount.post("/add-transaction", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const transaction = req.body.newTransaction;
    const account = yield IAccount_1.Account.findByIdAndUpdate(id, { $push: { history: { $each: [transaction] } } }, { new: true }).exec();
    if (account === null || account === undefined) {
        res.status(204);
    }
    else {
        res.send(account);
    }
}));
