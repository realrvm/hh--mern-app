import { createContext, ReactNode, useState } from 'react';
import axios from 'axios';

type User = {
  id: string;
  name: string;
  password: string;
  birthday: string;
  email: string;
  gender: string;
  img: string;
};

type ContextType = {
  user: User | null;
};

type Props = {
  children: ReactNode;
};

const Context = createContext<ContextType | null>(null);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  return <Context.Provider value={{ user }}>{children}</Context.Provider>;
}
