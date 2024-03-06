"use client";

import "./globals.css";
import AppProvider from "@/provider";
import Header from "@/components/Header";
import { container } from "./layout.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          <div className={container}>{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
