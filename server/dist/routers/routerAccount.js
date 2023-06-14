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
const DAL_1 = require("../DAL");
exports.routerAccount = express_1.default.Router();
exports.routerAccount.post("/add-new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccount = yield (0, DAL_1.AddNewAccount)(req.body.account);
    res.send(newAccount);
}));
exports.routerAccount.post("/getBy-ownerId-and-type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield (0, DAL_1.GetAccountByOwnerIdAndType)(req.body.ownersID, req.body.accountType);
    res.send(account);
}));
exports.routerAccount.patch("/update-balance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedAccount = yield (0, DAL_1.UpdateAccountBalance)(req.body.ownersID, req.body.accountType, parseInt(req.body.amount));
    res.send(updatedAccount);
}));
exports.routerAccount.patch("/add-transaction", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedAccount = yield (0, DAL_1.AddTransactionToAccount)(req.body.accountID, req.body.newTransaction);
    res.send(updatedAccount);
}));
