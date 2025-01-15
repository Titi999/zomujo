import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/app/storeProvider';
import { Toaster } from '@/components/ui/toaster';
import { JSX } from 'react';

const inter = Inter({
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: 'Zomujo',
  description:
    'A secure healthcare platform to boost patient engagement and improve overall healthcare delivery',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
