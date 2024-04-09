import useModal from "@/hooks/useModal";
import { PartyIcon } from "@/assets";
import { useCreateCoinWalletMutation } from "@/services/coin/coin.mutation";
import * as styles from "../(modal)/style.css";

const CreateCoinAccount = () => {
  const { closeModal } = useModal();
  const { mutate } = useCreateCoinWalletMutation();

  const handleConfirm = () => {
    mutate();
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <PartyIcon />
        </div>
        <div className={styles.contentBox}>
          <div className={styles.content}>
            지금 바로 부마코인을 시작해보세요!
            <br />
            기본지원금 1000만원을 드려요 😎
          </div>
        </div>
        <div className={styles.line} />
        <div className={styles.buttonBox}>
          <button className={styles.cancelBtn} onClick={closeModal}>
            취소
          </button>
          <button className={styles.confirmBtn} onClick={handleConfirm}>
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCoinAccount;
