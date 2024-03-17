import Image from "next/image";
import * as styles from "./style.css";

const Tostify = ({ content }: { content: string }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <Image width={999} height={999} className={styles.icon} src="/assets/info.png" alt="INFO" />
        <div className={styles.content}>{content}</div>
      </div>
      <div className={styles.sideBar} />
    </div>
  );
};

export default Tostify;
