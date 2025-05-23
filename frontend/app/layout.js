import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Provider from './provider';
import ConvexClientProvider from './ConvexClientProvider';

export const metadata = {
  title: 'OneClick',
  // description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-hidden">
        <ConvexClientProvider>
          <Provider>{children}</Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
