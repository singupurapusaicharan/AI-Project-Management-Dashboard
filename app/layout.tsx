import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { StarsBackground } from '@/components/layout/stars-background';

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Ensures text remains visible during font load
  preload: true
});

export const metadata: Metadata = {
  title: 'AI Dashboard',
  description: 'Advanced AI Project Management Dashboard',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} radiant-background min-h-screen text-white antialiased`}>
        <StarsBackground />
        {children}
        <Toaster />
      </body>
    </html>
  );
}