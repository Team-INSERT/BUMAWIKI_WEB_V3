"use client";

import { useAtomValue } from "jotai";
import { modalContext } from "@/context/index";
import { background } from "./style.css";

const Modal = () => {
  const modal = useAtomValue(modalContext);

  return <div className={background}>{modal.component}</div>;
};

export default Modal;
