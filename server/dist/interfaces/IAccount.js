"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.accountSchema = void 0;
const mongoose_1 = require("mongoose");
const ITransaction_1 = require("./ITransaction");
exports.accountSchema = new mongoose_1.Schema({
    ownersID: [{ type: String }],
    accountType: { type: String },
    balance: { type: Number },
    history: [ITransaction_1.transactionSchema],
});
exports.Account = (0, mongoose_1.model)("Account", exports.accountSchema);
