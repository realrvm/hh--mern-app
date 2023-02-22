import { createContext, ReactNode, useContext, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type User = {
  name: string;
  password: string;
  birthday: string;
  email: string;
  gender: string;
  img: string;
};

export type ContextType = {
  user: User | null;
  signup: UseMutationResult<AxiosResponse, unknown, User>;
};

type Props = {
  children: ReactNode;
};

const Context = createContext<ContextType | null>(null);
const baseURL = import.meta.env.VITE_BASE_URL;

export function useAuth() {
  return useContext(Context);
}

export function AuthProvider({ children }: Props) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const signup = useMutation({
    mutationFn: (user: User) => {
      return axios.post(`${baseURL}/signup`, user);
    },
    onSuccess: () => {
      navigate('/login');
    },
    onError(error: AxiosError) {
      if (error.response && typeof error.response.data === 'string')
        setError(error.response.data);
    },
  });
  return (
    <Context.Provider value={{ user, signup }}>{children}</Context.Provider>
  );
}
