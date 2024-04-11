import Link from "next/link";
import { GithubIcon } from "@/assets";
import * as styles from "./style.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <Link href="https://github.com/Team-INSERT" target="_blank" rel="noreferrer">
        <GithubIcon />
      </Link>
      <p className={styles.information}>
        buma.wiki | bumawiki@gmail.com | BSSM | TEAM OG | PROJECT BUMAWIKI
      </p>
      <p className={styles.information}>1393, Garak-daero, Gangseo-gu, Busan, Republic of Korea</p>
    </footer>
  );
};

export default Footer;
