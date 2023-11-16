import { AuthResponse, AuthError, Session } from '@supabase/supabase-js';
import { db } from '../app';

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  return await db.auth.signUp({ email, password });
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  console.log(email, password);
  return await db.auth.signInWithPassword({ email, password });
}

export async function signOut(): Promise<AuthError | null> {
  const { error } = await db.auth.signOut();
  return error;
}

export async function getSession() {
  return await db.auth.getSession();
}
