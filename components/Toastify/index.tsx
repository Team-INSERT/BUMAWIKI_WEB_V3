import Image from "next/image";
import * as styles from "./style.css";

const Toastify = ({ content }: { content: string }) => {
  return (
    <figure className={styles.container}>
      <Image width={24} height={24} src="/assets/info.png" alt="INFO" className={styles.icon} />
      <figcaption className={styles.content}>{content}</figcaption>
    </figure>
  );
};

export default Toastify;
