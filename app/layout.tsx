import "./globals.css";
import Header from "@/components/Header";
import Board from "@/components/Board";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import ScrollButton from "@/components/ScrollButton";
import { container } from "./layout.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <div className={container}>
            <Board>{children}</Board>
            <Aside />
            <ScrollButton />
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
