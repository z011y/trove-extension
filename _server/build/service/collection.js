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
exports.deleteCollection = exports.editCollection = exports.addCollection = exports.addToCollection = exports.getCollections = void 0;
const app_1 = require("../app");
function getCollections() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield app_1.db.from('collection').select(`
      id,
      name,
      description,
      total
    `);
    });
}
exports.getCollections = getCollections;
function addToCollection(productId, collectionId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield app_1.db
            .from('collection_item')
            .insert({ product_id: productId, collection_id: collectionId })
            .select();
    });
}
exports.addToCollection = addToCollection;
function addCollection(collection) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield app_1.db
            .from('collection')
            .insert([
            {
                name: collection.name,
                description: collection.description,
                user_id: collection.user_id,
            },
        ])
            .select();
    });
}
exports.addCollection = addCollection;
function editCollection(collection) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield app_1.db
            .from('collection')
            .update({
            name: collection.name,
            description: collection.description,
        })
            .eq('id', collection.id)
            .select();
    });
}
exports.editCollection = editCollection;
function deleteCollection(collectionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const collectionProducts = yield app_1.db
            .from('collection_product')
            .delete()
            .eq('collection_id', collectionId);
        const collections = yield app_1.db
            .from('collection')
            .delete()
            .eq('id', collectionId);
        if (collectionProducts.error)
            return collectionProducts.error;
        if (collections.error)
            return collections.error;
    });
}
exports.deleteCollection = deleteCollection;
