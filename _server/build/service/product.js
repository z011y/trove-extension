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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.editProduct = exports.addProduct = exports.getProductsForCollection = exports.getProducts = exports.getAIShortenedName = void 0;
const openai_1 = __importDefault(require("openai"));
const app_1 = require("../app");
const OPENAI_KEY = (_a = process.env.OPENAI_KEY) !== null && _a !== void 0 ? _a : '';
const openai = new openai_1.default({ apiKey: OPENAI_KEY });
function getAIShortenedName(productName) {
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                {
                    role: 'user',
                    content: `Shorten the name of this product: "Nike Court Vision Low Next Nature Men's Shoes. Nike.com". The result shouldn't include punctuation, a brand name, or a description of the item.`,
                },
                { role: 'assistant', content: 'Court Vision Low Next Nature' },
                {
                    role: 'user',
                    content: `Shorten the name of this product: "${productName}". The result shouldn't include punctuation, a brand name, or a description of the item.`,
                },
            ],
        });
        console.log(completion);
        return completion;
    });
}
exports.getAIShortenedName = getAIShortenedName;
function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield app_1.db.from('product').select(`
      id,
      name,
      price,
      description,
      brand,
      image_urls,
      url,
      collection_product!inner(collection_id)
    `);
    });
}
exports.getProducts = getProducts;
function getProductsForCollection(collectionId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield app_1.db
            .from('product')
            .select(`
      id,
      name,
      price,
      description,
      brand,
      image_urls,
      url,
      collection_product!inner(*)
    `)
            .eq('collection_product.collection_id', collectionId);
    });
}
exports.getProductsForCollection = getProductsForCollection;
function addProduct(product, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield app_1.db
            .from('product')
            .insert([
            {
                name: product.name,
                image_urls: product.image_urls,
                price: product.price,
                url: product.url,
                brand: product.brand,
                description: product.description,
                is_available: product.is_available,
                user_id: userId,
            },
        ])
            .single();
    });
}
exports.addProduct = addProduct;
function editProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield app_1.db
            .from('product')
            .update([
            {
                name: product.name,
                image_urls: product.image_urls,
                price: Number(product.price),
                url: product.url,
                brand: product.brand,
                description: product.description,
                is_available: product.is_available,
            },
        ])
            .eq('id', product.id)
            .select();
    });
}
exports.editProduct = editProduct;
function deleteProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const collectionProducts = yield app_1.db
            .from('collection_product')
            .delete()
            .eq('product_id', productId);
        const products = yield app_1.db.from('product').delete().eq('id', productId);
        if (collectionProducts.error)
            return collectionProducts.error;
        if (products.error)
            return products.error;
    });
}
exports.deleteProduct = deleteProduct;
