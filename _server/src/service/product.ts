import {
  PostgrestError,
  PostgrestSingleResponse,
  User,
} from '@supabase/supabase-js';
import OpenAI from 'openai';
import { Collection, Product } from '../model';
import { db } from '../app';

const OPENAI_KEY: string = process.env.OPENAI_KEY ?? '';
const openai = new OpenAI({ apiKey: OPENAI_KEY });

export async function getAIShortenedName(productName: Product['name']) {
  const completion = await openai.chat.completions.create({
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
}

export async function getProducts(): Promise<
  PostgrestSingleResponse<Product[]>
> {
  return await db.from('product').select(`
      id,
      name,
      price,
      description,
      brand,
      image_urls,
      url,
      collection_product!inner(collection_id)
    `);
}

export async function getProductsForCollection(collectionId: string) {
  return await db
    .from('product')
    .select(
      `
      id,
      name,
      price,
      description,
      brand,
      image_urls,
      url,
      collection_product!inner(*)
    `
    )
    .eq('collection_product.collection_id', collectionId);
}

export async function addProduct(
  product: Product,
  userId: User['id']
): Promise<PostgrestSingleResponse<Product[]>> {
  return await db
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
}

export async function editProduct(
  product: Product
): Promise<PostgrestSingleResponse<Product[]>> {
  return await db
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
}

export async function deleteProduct(
  productId: Product['id']
): Promise<PostgrestError | void> {
  const collectionProducts = await db
    .from('collection_product')
    .delete()
    .eq('product_id', productId);
  const products = await db.from('product').delete().eq('id', productId);
  if (collectionProducts.error) return collectionProducts.error;
  if (products.error) return products.error;
}
