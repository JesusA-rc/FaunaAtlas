import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type User } from '../models';

interface AccountContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccount = () =>
{
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};

export const AccountProvider = ({ children }: { children: ReactNode }) => 
{
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) 
    {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: User) => 
  {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => 
  {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AccountContext.Provider value={{ user, login, logout }}>
      {children}
    </AccountContext.Provider>
  );
};
