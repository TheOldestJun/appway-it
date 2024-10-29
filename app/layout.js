import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Система подачі заявок",
  description: "Система подачі заявок на ДП Ферротранс",
  icons: {
    icon: "/img/icons/favicon.png",
    apple: "/img/icons/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" suppressHydrationWarning >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
