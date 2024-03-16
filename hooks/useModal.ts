import React, { ReactNode } from "react";
import { useAtom } from "jotai";
import { modalContext } from "@/context/index";

const useModal = () => {
  const [modal, setModal] = useAtom(modalContext);

  const openModal = React.useCallback(
    ({ component }: { component: ReactNode }) => setModal({ component }),
    [setModal],
  );

  const closeModal = React.useCallback(() => {
    setModal({ component: null });
  }, [setModal]);

  return { openModal, closeModal };
};

export default useModal;
