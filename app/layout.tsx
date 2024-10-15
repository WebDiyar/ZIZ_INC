import { ReactNode } from 'react';
import { Metadata } from 'next';
import ReduxProvider from '@/components/ReduxProvider';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Online Store',
  description: 'A simple product catalog',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
