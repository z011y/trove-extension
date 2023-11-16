import { useState, createContext } from 'react';

export const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  async function signUp(email, password) {
    const res = await fetch('http://10.0.0.139:3001/sign-up', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 500) throw new Error(data.message);
    setSession(data);
  }

  async function signIn(email, password) {
    const res = await fetch('http://10.0.0.139:3001/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 500) throw new Error(data.message);
    setSession(data);
  }

  async function signOut() {
    const res = await fetch('http://10.0.0.139:3001/sign-out');
    if (res.status === 500) throw new Error(data.message);
    setSession(null);
  }

  async function getSession() {
    const res = await fetch('http://10.0.0.139:3001/get-session');
    const data = await res.json();
    if (res.status === 500) throw new Error(data.message);
    setSession(data);
  }

  return (
    <SessionContext.Provider
      value={{ session, signUp, signIn, signOut, getSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}
