"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store/store";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login } from "@/store/reducers/authSlice";
import jwt from 'jsonwebtoken'

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
  })
  return <>{children}</>;
}


export default function Providers({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }


  return (
    <Provider store={storeRef.current}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
    );
}