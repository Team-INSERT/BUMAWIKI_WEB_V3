import React from "react";
import { useAtom } from "jotai";
import ModalState from "../type/ModalState.type";
import modalContext from "../context/modal.context";

const useModal = () => {
  const [modal, setModal] = useAtom(modalContext);

  const openModal = React.useCallback(
    ({ component }: ModalState) => {
      setModal({ component });
    },
    [setModal],
  );

  const closeModal = React.useCallback(() => {
    setModal({ component: null });
  }, [setModal]);

  return { openModal, closeModal };
};

export default useModal;
