import "./globals.css";
import Header from "@/components/Header";
import Board from "@/components/Board";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Popular from "@/components/Popular";
import Recommend from "@/components/Recommend";
import Modal from "@/components/(modal)/Modal";
import { FC, PropsWithChildren, ReactNode } from "react";
import ScrollButton from "@/components/ScrollButton";
import { generateOpenGraph } from "@/utils";
import "react-toastify/dist/ReactToastify.css";
import * as styles from "./layout.css";
import Providers from "./providers";

export const metadata = generateOpenGraph({
  title: "역사의 고서",
  description: "우리의 손으로 써내려 나가는 역사의 고서, 부마위키",
});

const Main: FC<PropsWithChildren> = ({ children }) => (
  <main className={styles.container}>
    <Board>{children}</Board>
    {/** side components */}
    <aside className={styles.aside}>
      <Popular />
      <Recommend />
      <Aside />
      <ScrollButton />
    </aside>
  </main>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Modal />
          <Header />
          <Main>{children}</Main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
