import './globals.css';
import dynamic from 'next/dynamic';

const CursorEffect = dynamic(
  () => import('@/components/CursorEffect/CursorEffect'),
  { ssr: false }
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CursorEffect />
        {children}
      </body>
    </html>
  );
}
