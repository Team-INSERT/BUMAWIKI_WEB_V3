"use client";

import useModal from "@/hooks/useModal";
import RoundLogo from "@/assets/RoundLogo";
import * as styles from "../Modal/style.css";

const Alert = ({ content }: { content: string }) => {
  const { closeModal } = useModal();

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <RoundLogo />
        </div>
        <div className={styles.contentBox}>
          <div className={styles.content}>{content}</div>
        </div>
        <div className={styles.line} />
        <div className={styles.buttonBox}>
          <div />
          <button className={styles.confirmBtn} onClick={closeModal}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
