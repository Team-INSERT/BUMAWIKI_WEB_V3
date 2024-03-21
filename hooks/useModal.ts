import React, { ReactNode } from "react";
import { useSetAtom } from "jotai";
import { modalContext } from "@/context/index";

const useModal = () => {
  const setModal = useSetAtom(modalContext);

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
