"use client";

import "./globals.css";
import AppProvider from "@/provider";
import Header from "@/components/Header";
import Board from "@/components/Board";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
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
          <div className={container}>
            <Board>{children}</Board>
            <Aside />
          </div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
