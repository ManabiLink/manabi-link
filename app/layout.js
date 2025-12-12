"use client";
import '@/styles/globals.css';
import Nav from './components/Nav';
import LoginPage from './login/page';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register');
  return (
    <html lang="ja">
      <head />
      <body className="font-sans bg-gray-50">
        {!isAuthPage && <Nav />}
        <main>{children}</main>
      </body>
    </html>
  );
}
