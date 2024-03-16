"use client";

import { useAtomValue } from "jotai";
import modalContext from "../context/modal.context";

const Modal = () => {
  const modal = useAtomValue(modalContext);

  return <div>{modal.component}</div>;
};

export default Modal;
