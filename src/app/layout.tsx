import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NyxPortal — One place. Every relationship. Total clarity.",
  description:
    "NyxPortal is a white-label client portal that gives your customers a single, branded place to log in and see everything relevant to your relationship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        {children}
      </body>
    </html>
  );
}
