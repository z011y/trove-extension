import { useState, useContext } from 'react';
import { Link } from 'wouter';
import { SignIn as SignInIcon } from '@phosphor-icons/react';
import { SessionContext } from '../context/session';
import { ButtonAsync } from '../components/ButtonAsync';

export function SignIn() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useContext(SessionContext);

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  async function submitSignIn(e) {
    e.preventDefault();
    setIsLoading(true);
    signIn(email, password);
    setIsLoading(false);
  }

  return (
    <div className="stack w-full h-full p-4 bg-[#f5f2ff] justify-center">
      <div className="flex items-center self-center -ml-1 pb-4">
        <img className="h-8" src="trove.png" alt="logo" />
        <h1 className="mt-2 -ml-1 tracking-[-3.75px] text-4xl text-[#20134b]">
          Trove
        </h1>
      </div>
      <form class="stack" onSubmit={submitSignIn}>
        <input type="email" onChange={onEmailChange} placeholder="Your Email" />
        <input
          type="password"
          onChange={onPasswordChange}
          placeholder="Your Password"
        />
        <ButtonAsync
          text="login"
          icon={<SignInIcon size="18" weight="duotone" />}
          isLoading={isLoading}
        />
      </form>
      <span className="text-center">
        Don't have an account? <Link href="/sign-up">Sign up</Link>
      </span>
    </div>
  );
}
