import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useSessionStorage } from 'hooks/useSessionStorage';

import type { SelectedFile } from 'types';

type User = {
  name: string;
  password: string;
  birthday: string;
  email: string;
  gender: string;
  img: string;
  uid?: string;
};

export type ContextType = {
  user: User | null;
  signup: UseMutationResult<AxiosResponse, unknown, User>;
  login: UseMutationResult<
    { email: string; name: string },
    unknown,
    Pick<User, 'password' | 'email'>
  >;
  getUsers: UseMutationResult<AxiosResponse, unknown, void>;
  peoples: User[];
  upload: UseMutationResult<AxiosResponse, unknown, any>;
  setUser: Dispatch<any>;
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
  const [user, setUser] = useSessionStorage<User>('user');
  const [peoples, setPeoples] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const upload = useMutation({
    mutationFn: (file: Blob) => {
      const formData = new FormData();
      formData.append('file', file);

      return axios.post(`${baseURL}/upload`, formData);
    },
  });

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

  const login = useMutation({
    mutationFn: (id: Pick<User, 'password' | 'email'>) => {
      return axios.post(`${baseURL}/login`, id).then((res) => res.data);
    },
    onSuccess(data) {
      const { createdAt, updatedAt, password, ...user } = data;
      setUser(user);
    },
    onError(error: AxiosError) {
      if (error.response && typeof error.response.data === 'string')
        setError(error.response.data);
    },
  });

  const getUsers = useMutation({
    mutationFn: () => {
      return axios.get(`${baseURL}/people`);
    },
    onSuccess(data) {
      const { data: values } = data;
      setPeoples(values);
    },
    onError(error: AxiosError) {
      if (error.response && typeof error.response.data === 'string')
        setError(error.response.data);
    },
  });

  return (
    <Context.Provider
      value={{ user, signup, login, getUsers, peoples, upload, setUser }}
    >
      {children}
    </Context.Provider>
  );
}
