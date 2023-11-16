export interface Collection {
  id: number;
  created_at?: Date;
  name: string;
  description: string;
  total: number;
  user_id?: string;
}

export interface Product {
  id: number;
  created_at?: Date;
  name: string;
  image_urls: string[];
  price: number;
  url: string;
  last_viewed?: Date;
  brand: string;
  description: string;
  is_available?: boolean;
  logo_url?: string;
  user_id?: string;
  collection_id?: string;
}

export interface CollectionProduct {
  collection_iid: Collection['id'];
  product_id: Product['id'];
}
