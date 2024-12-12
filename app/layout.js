import localFont from 'next/font/local';
import './globals.css';
import Providers from './providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'Система подачі заявок',
  description: 'Система подачі заявок на ДП Ферротранс',
  icons: {
    icon: '/img/icons/favicon.png',
    apple: '/img/icons/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
