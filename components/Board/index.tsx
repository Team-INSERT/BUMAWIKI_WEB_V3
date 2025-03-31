import { PropsWithChildren } from "react";
import Image from "next/image";
import * as styles from "./style.css";

const Board = ({ children }: PropsWithChildren) => {
  return (
    <main className={styles.container}>
      <figure className={styles.board}>{children}</figure>
      <footer className={styles.subFooter}>
        <img
          className={styles.logo}
          width={80}
          height={54}
          src="https://cdn.inflearn.com/public/users/thumbnails/639527/849e35c9-96ae-4dac-bbb0-86797d75d3ad"
          alt="footer"
        />
        <p className={styles.noticeText}>
          ?엥엥ㅇ/엥?ㅔ엥엥?ㅔㅇ엥ㅇ엥?ㅇ엥?는 공식 엥ㅇ/ㅖㅇ에? 검ㅔ아ㅐㅔ에/ㅇ에엥?ㅇ옝/옝ㅇ?엥./
          에에ㅇ?엥ㅇ?ㅔㅇㅇ.에이ㅔ?예예:ㅇ?
          <br />
          예엥.에엥.ㅇ엥.ㅇ;.ㅇ.ㅇㅇ.ㅔ엥.ㅇ;;.ㅇ에에ㅇ/?
        </p>
      </footer>
    </main>
  );
};

export default Board;
