import Alert from "@/components/Alert";
import Confirm from "@/components/Confirm";
import useModal from "./useModal";

export const useAlert = () => {
  const { openModal } = useModal();

  const openAlert = (content: string) => {
    openModal({
      component: <Alert content={content} />,
    });
  };

  const openConfirm = (option: { content: string; onConfirm: () => void }) => {
    openModal({
      component: <Confirm {...option} />,
    });
  };

  return { openAlert, openConfirm };
};
