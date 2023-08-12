import { useState, useEffect } from 'react';
import { SignOut } from '@phosphor-icons/react';
import { AsyncButton } from '../components/AsyncButton';

export function Account({ setIsAuthenticated }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  async function logout() {
    setIsLogoutLoading(true);
    await fetch('http://localhost:8000/logout');
    setIsAuthenticated(false);
    setIsLogoutLoading(false);
  }

  async function getUserData() {
    const res = await fetch('http://localhost:8000/get-user-info');
    const data = await res.json();
    setUserData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div id="content" className="p stack">
        <h3>{userData?.email}</h3>
        <h4>{`Created at: ${new Date(userData?.createdAt).toDateString()}`}</h4>
        <AsyncButton
          text="Logout"
          icon={<SignOut size="18" weight="duotone" />}
          action={logout}
          isLoading={isLogoutLoading}
        />
      </div>
    </>
  );
}
