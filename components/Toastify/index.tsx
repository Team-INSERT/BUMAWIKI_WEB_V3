import InfoIcon from "@/assets/infoIcon";
import * as styles from "./style.css";

interface Props {
  content: string;
}

const Tostify = ({ content }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <InfoIcon />
        <div className={styles.content}>{content}</div>
      </div>
      <div className={styles.sideBar} />
    </div>
  );
};

export default Tostify;
