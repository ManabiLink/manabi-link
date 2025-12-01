import '@/styles/globals.css';
import Nav from './components/Nav';

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head />
      <body className="font-sans bg-gray-50">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
