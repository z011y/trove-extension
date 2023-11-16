import express, { Application } from "express";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { router } from './controller';
import 'dotenv/config';

const PORT: string = process.env.PORT ?? '3001';
const SUPABASE_KEY: string = process.env.SUPABASE_KEY ?? '';

export const app: Application = express();
export const db: SupabaseClient = createClient('https://blgqnqffsrffdnkqkfjd.supabase.co', SUPABASE_KEY);

app.use(express.json());
app.use(router);

app.listen(PORT, (): void => {
  console.log(`Server is listening on port: ${PORT}`);
})
