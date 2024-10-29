"use client";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from 'react-hot-toast';


export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
        <Toaster />
      </div>
    </>
  );
};