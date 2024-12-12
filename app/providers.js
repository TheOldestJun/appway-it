'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login } from '@/store/reducers/authSlice';
import jwt from 'jsonwebtoken';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(login({ token: token }));
      const user = jwt.decode(token);
      router.push(`/${user.role.code}`);
    }
  });
  return <>{children}</>;
};

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
