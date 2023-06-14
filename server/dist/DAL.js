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
exports.User_CreateNew = exports.AddTransactionToAccount = exports.UpdateAccountBalance = exports.GetAccountByOwnerIdAndType = exports.AddNewAccount = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const IAccount_1 = require("./interfaces/IAccount");
const IUser_1 = require("./interfaces/IUser");
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect(process.env.DB_CONNECTION_STRING);
const db = mongoose_1.default.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log(`Connected to MongoDB`));
function AddNewAccount(_account) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbModel = new IAccount_1.Account(_account);
        let newAccount = null;
        dbModel.save((err, nAcc) => {
            if (err)
                return console.log(err);
            newAccount = nAcc;
        });
        return newAccount;
    });
}
exports.AddNewAccount = AddNewAccount;
function GetAccountByOwnerIdAndType(_ownersID, _accountType) {
    return __awaiter(this, void 0, void 0, function* () {
        const account = yield IAccount_1.Account.findOne({
            ownersID: _ownersID,
            accountType: _accountType,
        });
        return account;
    });
}
exports.GetAccountByOwnerIdAndType = GetAccountByOwnerIdAndType;
function UpdateAccountBalance(_ownersID, _accountType, _amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedAccount = yield IAccount_1.Account.findOneAndUpdate({
            ownersID: _ownersID,
            accountType: _accountType,
        }, { $inc: { balance: _amount } }, { new: true }).exec();
        return updatedAccount;
    });
}
exports.UpdateAccountBalance = UpdateAccountBalance;
function AddTransactionToAccount(_accountID, _transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedAccount = yield IAccount_1.Account.findByIdAndUpdate(_accountID, { $push: { history: { $each: [_transaction] } } }, { new: true }).exec();
        return updatedAccount;
    });
}
exports.AddTransactionToAccount = AddTransactionToAccount;
function User_CreateNew(_newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const matchingUser = yield IUser_1.User.findOne({
            email: _newUser.email,
        });
        let newUser = null;
        if (!matchingUser) {
            const dbModel = new IUser_1.User(_newUser);
            dbModel.save((err, nUser) => {
                if (err)
                    return console.log(err);
                newUser = nUser;
            });
        }
        else {
            newUser = null;
        }
        return newUser;
    });
}
exports.User_CreateNew = User_CreateNew;
