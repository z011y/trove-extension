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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./service/user");
const product_1 = require("./service/product");
const collection_1 = require("./service/collection");
exports.router = express_1.default.Router();
exports.router.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield (0, user_1.signUp)(req.body.email, req.body.password);
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json(data);
}));
exports.router.post('/sign-in', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield (0, user_1.signIn)(req.body.email, req.body.password);
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json(data);
}));
exports.router.get('/sign-out', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = yield (0, user_1.signOut)();
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json({ success: true });
}));
exports.router.get('/get-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield (0, user_1.getSession)();
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json(data);
}));
exports.router.post('/get-ai-shortened-name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { choices } = yield (0, product_1.getAIShortenedName)(req.body.name);
    res.json({ name: choices[0].message.content });
}));
exports.router.get('/get-products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield (0, product_1.getProducts)();
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json(data);
}));
exports.router.get('/get-products-for-collection/:collectionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield (0, product_1.getProductsForCollection)(req.params.collectionId);
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json(data);
}));
exports.router.post('/add-product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield (0, product_1.addProduct)(req.body.product, req.body.userId);
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json(data);
}));
exports.router.post('/edit-product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield (0, product_1.editProduct)(req.body.product);
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json(data);
}));
exports.router.post('/delete-product/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = yield (0, product_1.deleteProduct)(Number(req.params.productId));
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json({ success: true });
}));
exports.router.get('/get-collections', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield (0, collection_1.getCollections)();
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json(data);
}));
exports.router.post('/add-to-collection', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield (0, collection_1.addToCollection)(req.body.productId, req.body.collectionId);
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json(data);
}));
exports.router.post('/add-collection', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield (0, collection_1.addCollection)(req.body.collection);
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json(data);
}));
exports.router.post('/edit-collection', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield (0, product_1.editProduct)(req.body.collection);
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json(data);
}));
exports.router.post('/delete-collection/:collectionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = yield (0, collection_1.deleteCollection)(Number(req.params.collectionId));
    if (error)
        res.status(500).json({ message: error.message });
    else
        res.json({ success: true });
}));
