'use client';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';

import { login } from '@/store/reducers/authSlice';
import { store } from '@/store/store';

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
