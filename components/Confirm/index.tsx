import useModal from "@/hooks/useModal";
import RoundLogo from "@/assets/RoundLogo";
import * as styles from "../Modal/style.css";

interface Props {
  content: string;
  onConfirm: () => void;
}

const Confirm = ({ content, onConfirm }: Props) => {
  const { closeModal } = useModal();
  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <RoundLogo />
        </div>
        <div className={styles.contentBox}>
          <div className={styles.content}>{content}</div>
        </div>
        <div className={styles.line} />
        <div className={styles.buttonBox}>
          <button className={styles.cancelBtn} onClick={closeModal}>
            취소
          </button>
          <button className={styles.confirmBtn} onClick={handleConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
