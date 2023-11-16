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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = exports.signOut = exports.signIn = exports.signUp = void 0;
const app_1 = require("../app");
function signUp(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield app_1.db.auth.signUp({ email, password });
    });
}
exports.signUp = signUp;
function signIn(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(email, password);
        return yield app_1.db.auth.signInWithPassword({ email, password });
    });
}
exports.signIn = signIn;
function signOut() {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = yield app_1.db.auth.signOut();
        return error;
    });
}
exports.signOut = signOut;
function getSession() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield app_1.db.auth.getSession();
    });
}
exports.getSession = getSession;
