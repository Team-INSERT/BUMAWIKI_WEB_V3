import { ReactNode } from "react";
import useModal from "@/hooks/useModal";
import RoundLogo from "@/assets/RoundLogo";
import * as styles from "../style.css";

interface Props {
  icon?: ReactNode;
  content: string;
  onConfirm: () => void;
}

const Confirm = ({ icon, content, onConfirm }: Props) => {
  const { closeModal } = useModal();
  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div className={styles.container}>
      {<RoundLogo /> || icon}
      <div className={styles.contents}>{content}</div>
      <div className={styles.buttonBox}>
        <button className={styles.button.cancel} onClick={closeModal}>
          취소
        </button>
        <button className={styles.button.confirm} onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Confirm;
