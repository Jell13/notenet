import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {Toaster} from 'sonner'
import "./globals.css";
import ConvexClientProvider from "@providers/ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteNet",
  description: "Note taking app with NextJs 14, Convex, ClerkJs, and TipTap Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ConvexClientProvider>
          <Toaster/>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
