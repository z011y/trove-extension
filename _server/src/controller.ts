import express, { Request, Response } from 'express';
import { getSession, signIn, signOut, signUp } from './service/user';
import {
  addProduct,
  editProduct,
  deleteProduct,
  getAIShortenedName,
  getProducts,
  getProductsForCollection,
} from './service/product';
import {
  addToCollection,
  getCollections,
  addCollection,
  deleteCollection,
} from './service/collection';

export const router = express.Router();

router.post('/sign-up', async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await signUp(req.body.email, req.body.password);
  if (error) res.status(500).json({ message: error.message });
  else res.json(data);
});

router.post('/sign-in', async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await signIn(req.body.email, req.body.password);
  if (error) res.status(500).json({ message: error.message });
  else res.json(data);
});

router.get('/sign-out', async (req: Request, res: Response): Promise<void> => {
  const error = await signOut();
  if (error) res.status(500).json({ message: error.message });
  else res.json({ success: true });
});

router.get(
  '/get-session',
  async (req: Request, res: Response): Promise<void> => {
    const { data, error } = await getSession();
    if (error) res.status(500).json({ message: error.message });
    else res.json(data);
  }
);

router.post(
  '/get-ai-shortened-name',
  async (req: Request, res: Response): Promise<void> => {
    const { choices } = await getAIShortenedName(req.body.name);
    res.json({ name: choices[0].message.content });
  }
);

router.get(
  '/get-products',
  async (req: Request, res: Response): Promise<void> => {
    const { data, error } = await getProducts();
    if (error) res.status(500).json({ message: error.message });
    else res.json(data);
  }
);

router.get(
  '/get-products-for-collection/:collectionId',
  async (req: Request, res: Response): Promise<void> => {
    const { data, error } = await getProductsForCollection(
      req.params.collectionId
    );
    if (error) res.status(500).json({ message: error.message });
    else res.json(data);
  }
);

router.post(
  '/add-product',
  async (req: Request, res: Response): Promise<void> => {
    const { data, error } = await addProduct(req.body.product, req.body.userId);
    if (error) res.status(500).json({ message: error.message });
    else res.json(data);
  }
);

router.post(
  '/edit-product',
  async (req: Request, res: Response): Promise<void> => {
    const { data, error } = await editProduct(req.body.product);
    if (error) res.status(500).json({ message: error.message });
    else res.json(data);
  }
);

router.post(
  '/delete-product/:productId',
  async (req: Request, res: Response): Promise<void> => {
    const error = await deleteProduct(Number(req.params.productId));
    if (error) res.status(500).json({ message: error.message });
    else res.json({ success: true });
  }
);

router.get(
  '/get-collections',
  async (req: Request, res: Response): Promise<void> => {
    const { data, error } = await getCollections();
    if (error) res.status(500).json({ message: error.message });
    else res.json(data);
  }
);

router.post(
  '/add-to-collection',
  async (req: Request, res: Response): Promise<void> => {
    const { data, error } = await addToCollection(
      req.body.productId,
      req.body.collectionId
    );
    if (error) res.status(500).json({ message: error.message });
    else res.json(data);
  }
);

router.post(
  '/add-collection',
  async (req: Request, res: Response): Promise<void> => {
    const { data, error } = await addCollection(req.body.collection);
    if (error) res.status(500).json({ message: error.message });
    else res.json(data);
  }
);

router.post(
  '/edit-collection',
  async (req: Request, res: Response): Promise<void> => {
    const { data, error } = await editProduct(req.body.collection);
    if (error) res.status(500).json({ message: error.message });
    else res.json(data);
  }
);

router.post(
  '/delete-collection/:collectionId',
  async (req: Request, res: Response): Promise<void> => {
    const error = await deleteCollection(Number(req.params.collectionId));
    if (error) res.status(500).json({ message: error.message });
    else res.status(200).json({ success: true });
  }
);
