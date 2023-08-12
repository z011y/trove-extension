import { useState } from 'react';
import { Link } from 'wouter';

export function SignUp({ getSession }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  async function submitSignUp() {
    const data = JSON.stringify({
      email,
      password,
    });

    await fetch('http://localhost:8000/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    });
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
      <input type="email" onChange={onEmailChange} placeholder="Your Email" />
      <input
        type="password"
        onChange={onPasswordChange}
        placeholder="Your Password"
      />
      <button onClick={submitSignUp}>sign up</button>
      <span style={{ textAlign: 'center' }}>
        Already have an account? <Link href="/login">Login</Link>
      </span>
    </div>
  );
}
