import { useState, useContext } from 'react';
import { Link } from 'wouter';
import { SessionContext } from '../context/session';

export function SignUp() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { signUp } = useContext(SessionContext);

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="stack w-full h-full p-4 bg-[#f5f2ff] justify-center">
      <div className="flex items-center self-center -ml-1 pb-4">
        <img className="h-8" src="trove.png" alt="logo" />
        <h1 className="mt-2 -ml-1 tracking-[-3.75px] text-4xl text-[#20134b]">
          Trove
        </h1>
      </div>
      <input type="email" onChange={onEmailChange} placeholder="Your Email" />
      <input
        type="password"
        onChange={onPasswordChange}
        placeholder="Your Password"
      />
      <button onClick={() => signUp(email, password)}>sign up</button>
      <span className="text-center">
        Already have an account? <Link href="/login">Login</Link>
      </span>
    </div>
  );
}
