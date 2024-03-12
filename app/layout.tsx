import "./globals.css";
import Header from "@/components/Header";
import Board from "@/components/Board";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Popular from "@/components/Popular";
import * as styles from "./layout.css";
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
          <div className={styles.container}>
            <Board>{children}</Board>
            <div className={styles.asideBox}>
              <Popular />
              <Aside />
            </div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
