import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Provider from './provider';
import ConvexClientProvider from './ConvexClientProvider';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: 'OneClick',
  icons: {
    icon: '/OneClick.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-hidden">
        <ConvexClientProvider>
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
