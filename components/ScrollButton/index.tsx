"use client";

import { ArrowIcon } from "@/assets";
import { theme } from "@/styles";
import * as styles from "./style.css";

const ScrollButton = () => {
  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };
  const scrollToBottom = () => {
    const { scrollHeight } = document.documentElement;
    window.scroll({ top: scrollHeight, behavior: "smooth" });
  };

  return (
    <figure className={styles.container}>
      <button
        className={styles.scrollButton}
        onClick={scrollToTop}
        aria-label="최상단으로 올라가기"
      >
        <ArrowIcon direction="up" {...config} />
      </button>
      <button
        className={styles.scrollButton}
        onClick={scrollToBottom}
        aria-label="최하단으로 내려가기"
      >
        <ArrowIcon direction="down" {...config} />
      </button>
    </figure>
  );
};

const config = {
  width: 25,
  height: 11,
  viewBox: "0 0 28 18",
  fill: theme.white,
};

export default ScrollButton;
