import { ReactNode, useCallback } from "react";
import { useSetAtom } from "jotai";
import { modalContext } from "@/context/index";
import Confirm from "@/components/(modal)/Confirm";

const useModal = () => {
  const setModal = useSetAtom(modalContext);

  const openModal = useCallback(
    ({ component }: { component: ReactNode }) => setModal({ component, visible: true }),
    [setModal],
  );

  const openConfirm = useCallback(
    (option: { icon?: ReactNode; content: string; onConfirm: () => void }) => {
      openModal({
        component: <Confirm {...option} />,
      });
    },
    [setModal],
  );

  const closeModal = useCallback(() => {
    setModal({ component: null, visible: false });
  }, [setModal]);

  return { openModal, openConfirm, closeModal };
};

export default useModal;
