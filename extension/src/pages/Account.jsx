import { useState, useContext } from 'react';
import { SignOut } from '@phosphor-icons/react';
import { SessionContext } from '../context/session';
import { ButtonAsync } from '../components/ButtonAsync';

export function Account() {
  const [isSignOutLoading, setIsSignOutLoading] = useState(false);
  const { session, signOut, getSession } = useContext(SessionContext);

  async function signOutAndRefreshSession() {
    setIsSignOutLoading(true);
    await signOut();
    await getSession();
    setIsSignOutLoading(false);
  }

  return (
    <>
      <div id="content" className="p-4 stack">
        <h3>{session?.user.email}</h3>
        <h4>{`Created at: ${new Date(session?.user.createdAt).toDateString()}`}</h4>
        <ButtonAsync
          text="Logout"
          icon={<SignOut size="18" weight="duotone" />}
          action={signOutAndRefreshSession}
          isLoading={isSignOutLoading}
        />
      </div>
    </>
  );
}
