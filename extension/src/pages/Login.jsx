import { useState } from 'react';
import { Link } from 'wouter';
import { SignIn } from '@phosphor-icons/react';
import { AsyncButton } from '../components/AsyncButton';

export function Login({ setIsAuthenticated, fetchData }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  async function submitLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    const data = JSON.stringify({
      email,
      password,
    });

    await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    });

    fetchData();
    setIsAuthenticated(true);
    setIsLoading(false);
  }

  return (
    <div
      className="stack w-full h-full p"
      style={{
        backgroundColor: '#F5F2FF',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'center',
          marginLeft: '-4px',
          paddingBottom: '16px',
        }}
      >
        <img style={{ height: '2rem' }} src="trove.png" alt="logo" />
        <h1
          style={{
            marginTop: '6px',
            marginLeft: '-4px',
            letterSpacing: '-3.75px',
            fontSize: '2.5rem',
            color: '#20134B',
          }}
        >
          Trove
        </h1>
      </div>
      <form class="stack" onSubmit={submitLogin}>
        <input type="email" onChange={onEmailChange} placeholder="Your Email" />
        <input
          type="password"
          onChange={onPasswordChange}
          placeholder="Your Password"
        />
        <AsyncButton
          text="login"
          icon={<SignIn size="18" weight="duotone" />}
          isLoading={isLoading}
        />
      </form>
      <span style={{ textAlign: 'center' }}>
        Don't have an account? <Link href="/sign-up">Sign up</Link>
      </span>
    </div>
  );
}
