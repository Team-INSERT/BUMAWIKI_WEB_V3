import { PropsWithChildren } from "react";
import Image from "next/image";
import * as styles from "./style.css";

const Board = ({ children }: PropsWithChildren) => {
  return (
    <main className={styles.container}>
      <figure className={styles.board}>{children}</figure>
      <footer className={styles.subFooter}>
        <Image
          className={styles.logo}
          width={80}
          height={54}
          src="/assets/logoBlack.png"
          alt="footer"
        />
        <p className={styles.noticeText}>
          부마위키는 공식 역사서 및 백과사전이 아니며 검증되지 않았거나, 편향적이거나, 잘못된 서술이
          있을 수 있습니다.
          <br />
          질문이나 특정 사항에 대해 언제든지 문의주실 수 있습니다.
        </p>
      </footer>
    </main>
  );
};

export default Board;
