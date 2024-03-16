"use client";

import { useAtomValue } from "jotai";
import { modalContext } from "@/context/index";

const Modal = () => {
  const modal = useAtomValue(modalContext);

  return <>{modal.component}</>;
};

export default Modal;
