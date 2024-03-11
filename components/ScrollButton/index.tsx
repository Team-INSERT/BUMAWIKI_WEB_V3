"use client";

import { ArrowIcon } from "@/assets";
import * as styles from "./style.css";

const ScrollButton = () => {
  const scrollToTop = () => window.scroll({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scroll({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });

  return (
    <div className={styles.scrollButtonWrap}>
      <button
        className={styles.scrollButton}
        onClick={scrollToTop}
        aria-label="최상단으로 올라가기"
      >
        <ArrowIcon
          direction="up"
          width={25}
          height={11}
          viewBox="0 0 28 18"
          fill="white"
        />
      </button>
      <button
        className={styles.scrollButton}
        onClick={scrollToBottom}
        aria-label="최하단으로 내려가기"
      >
        <ArrowIcon
          direction="down"
          width={25}
          height={11}
          viewBox="0 0 28 18"
          fill="white"
        />
      </button>
    </div>
  );
};

export default ScrollButton;
