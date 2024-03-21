import "./globals.css";
import Header from "@/components/Header";
import Board from "@/components/Board";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Popular from "@/components/Popular";
import Modal from "@/components/(modal)";
import { ToastContainer } from "react-toastify";
import ScrollButton from "@/components/ScrollButton";
import { generateOpenGraph } from "@/utils";
import "react-toastify/dist/ReactToastify.css";
import * as styles from "./layout.css";
import Providers from "./providers";

export const metadata = generateOpenGraph({
  title: "역사의 고서",
  description: "우리의 손으로 써내려 나가는 역사의 고서, 부마위키",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ToastContainer
            autoClose={3000}
            hideProgressBar
            closeOnClick
            pauseOnHover
            closeButton={false}
            className="toastify"
          />
          <Modal />
          <Header />
          <div className={styles.container}>
            <Board>{children}</Board>
            <div className={styles.asideBox}>
              <Popular />
              <Aside />
              <ScrollButton />
            </div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
