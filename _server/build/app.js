"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const supabase_js_1 = require("@supabase/supabase-js");
const controller_1 = require("./controller");
require("dotenv/config");
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3001';
const SUPABASE_KEY = (_b = process.env.SUPABASE_KEY) !== null && _b !== void 0 ? _b : '';
exports.app = (0, express_1.default)();
exports.db = (0, supabase_js_1.createClient)('https://blgqnqffsrffdnkqkfjd.supabase.co', SUPABASE_KEY);
exports.app.use(express_1.default.json());
exports.app.use(controller_1.router);
exports.app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
