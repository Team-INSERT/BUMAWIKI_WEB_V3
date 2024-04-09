import { ReactNode, useCallback } from "react";
import { useSetAtom } from "jotai";
import { modalContext } from "@/context/index";
import Alert from "@/components/Alert";
import Confirm from "@/components/Confirm";

const useModal = () => {
  const setModal = useSetAtom(modalContext);

  const openModal = useCallback(
    ({ component }: { component: ReactNode }) => setModal({ component }),
    [setModal],
  );

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

  const closeModal = useCallback(() => {
    setModal({ component: null });
  }, [setModal]);

  return { openModal, openAlert, openConfirm, closeModal };
};

export default useModal;
