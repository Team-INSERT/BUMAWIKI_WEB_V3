import Link from "next/link";
import { GithubIcon } from "@/assets";
import * as styles from "./style.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerLinkBox}>
        <Link href="https://github.com/Team-INSERT" target="_blank" rel="noreferrer">
          <GithubIcon />
        </Link>
      </div>
      <div className={styles.informationBox}>
        <span className={styles.information}>
          buma.wiki | bumawiki@gmail.com | BSSM | TEAM OG | PROJECT BUMAWIKI
        </span>
      </div>
      <div className={styles.informationBox}>
        <span className={styles.information}>
          1393, Garak-daero, Gangseo-gu, Busan, Republic of Korea
        </span>
      </div>
    </div>
  );
};

export default Footer;
