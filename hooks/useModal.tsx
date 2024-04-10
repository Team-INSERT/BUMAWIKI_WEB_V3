import { ReactNode, useCallback } from "react";
import { useSetAtom } from "jotai";
import { modalContext } from "@/context/index";
import Confirm from "@/components/(modal)/Confirm";
import { toast } from "react-toastify";
import Toastify from "@/components/Toastify";

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

  const openToast = useCallback(
    (content: string) => toast(<Toastify content={content} />),
    [setModal],
  );

  const closeModal = useCallback(() => {
    setModal({ component: null, visible: false });
  }, [setModal]);

  return { openModal, openConfirm, openToast, closeModal };
};

export default useModal;
