import { PostgrestSingleResponse } from '@supabase/postgrest-js';
import { Collection, Product, CollectionProduct } from '../model';
import { db } from '../app';

export async function getCollections(): Promise<
  PostgrestSingleResponse<Collection[]>
> {
  const { data, error } = await db.auth.getSession();
  return await db
    .from('collection')
    .select(
      `
      id,
      name,
      description,
      total
    `
    )
    .eq('user_id', data.session?.user.id);
}

export async function addToCollection(
  productId: Product['id'],
  collectionId: Collection['id']
): Promise<PostgrestSingleResponse<CollectionProduct[]>> {
  return await db
    .from('collection_item')
    .insert({ product_id: productId, collection_id: collectionId })
    .select();
}

export async function addCollection(
  collection: Collection
): Promise<PostgrestSingleResponse<Collection[]>> {
  const { data, error } = await db.auth.getSession();
  return await db
    .from('collection')
    .insert([
      {
        name: collection?.name,
        description: collection?.description,
        user_id: data.session?.user.id,
      },
    ])
    .select();
}

export async function editCollection(collection: Collection) {
  return await db
    .from('collection')
    .update({
      name: collection.name,
      description: collection.description,
    })
    .eq('id', collection.id)
    .select();
}

export async function deleteCollection(collectionId: Collection['id']) {
  const collectionProducts = await db
    .from('collection_product')
    .delete()
    .eq('collection_id', collectionId);
  const collections = await db
    .from('collection')
    .delete()
    .eq('id', collectionId);
  return collectionProducts.error ?? collections.error;
}
