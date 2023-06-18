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
exports.User_GetLocalCredentials = exports.User_GetGoogleCredentials = exports.User_GetLoginType = exports.User_CreateNew = exports.Account_AddTransaction = exports.Account_UpdateBalance = exports.Account_GetByOwnerIdAndType = exports.Account_CreateNew = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const ENUMs_1 = require("../../interfaces/ENUMs");
const AccountModel_1 = require("./AccountModel");
const UserModel_1 = require("./UserModel");
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect(process.env.DB_CONNECTION_STRING);
const db = mongoose_1.default.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log(`Connected to MongoDB`));
function Account_CreateNew(_account) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbModel = new AccountModel_1.Account(_account);
        let newAccount = yield dbModel.save();
        return newAccount;
    });
}
exports.Account_CreateNew = Account_CreateNew;
function Account_GetByOwnerIdAndType(_ownersID, _accountType) {
    return __awaiter(this, void 0, void 0, function* () {
        const account = yield AccountModel_1.Account.findOne({
            ownersID: _ownersID,
            accountType: _accountType,
        });
        return account;
    });
}
exports.Account_GetByOwnerIdAndType = Account_GetByOwnerIdAndType;
function Account_UpdateBalance(_ownersID, _accountType, _amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedAccount = yield AccountModel_1.Account.findOneAndUpdate({
            ownersID: _ownersID,
            accountType: _accountType,
        }, { $inc: { balance: _amount } }, { new: true }).exec();
        return updatedAccount;
    });
}
exports.Account_UpdateBalance = Account_UpdateBalance;
function Account_AddTransaction(_accountID, _transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedAccount = yield AccountModel_1.Account.findByIdAndUpdate(_accountID, { $push: { history: { $each: [_transaction] } } }, { new: true }).exec();
        return updatedAccount;
    });
}
exports.Account_AddTransaction = Account_AddTransaction;
function User_CreateNew(_newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const matchingUser = yield UserModel_1.User.findOne({
            email: _newUser.email,
        });
        if (matchingUser === null) {
            const dbModel = new UserModel_1.User(_newUser);
            const newUser = yield dbModel.save();
            return newUser;
        }
        else {
            return null;
        }
    });
}
exports.User_CreateNew = User_CreateNew;
function User_GetLoginType(_email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield UserModel_1.User.findOne({ email: _email });
        let loginType = null;
        if (user === null) {
            loginType = ENUMs_1.IUserType.NONE;
        }
        else if (user.password !== "") {
            loginType = ENUMs_1.IUserType.LOCAL;
        }
        else if (user.googleID !== "") {
            loginType = ENUMs_1.IUserType.GOOGLE;
        }
        return loginType;
    });
}
exports.User_GetLoginType = User_GetLoginType;
function User_GetGoogleCredentials(_email, _googleID) {
    return __awaiter(this, void 0, void 0, function* () {
        const googleCredential = yield UserModel_1.User.findOne({
            email: _email,
            googleID: _googleID,
        });
        console.log(googleCredential);
        return googleCredential;
    });
}
exports.User_GetGoogleCredentials = User_GetGoogleCredentials;
function User_GetLocalCredentials(_email) {
    return __awaiter(this, void 0, void 0, function* () {
        const localCredential = yield UserModel_1.User.findOne({
            email: _email,
        });
        return localCredential;
    });
}
exports.User_GetLocalCredentials = User_GetLocalCredentials;
