import { ReactNode, useCallback } from "react";
import { useSetAtom } from "jotai";
import { modalContext } from "@/context/index";

const useModal = () => {
  const setModal = useSetAtom(modalContext);

  const openModal = useCallback(
    ({ component }: { component: ReactNode }) => setModal({ component }),
    [setModal],
  );

  const closeModal = useCallback(() => {
    setModal({ component: null });
  }, [setModal]);

  return { openModal, closeModal };
};

export default useModal;
