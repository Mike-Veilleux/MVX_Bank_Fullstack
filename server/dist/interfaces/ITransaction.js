"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.transactionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.transactionSchema = new mongoose_1.Schema({
    userName: { type: String },
    sort: { type: String },
    amount: { type: Number },
    date: { type: Date },
});
exports.Transaction = (0, mongoose_1.model)("Transaction", exports.transactionSchema);
