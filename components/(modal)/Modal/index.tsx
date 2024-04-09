"use client";

import { useAtomValue } from "jotai";
import { modalContext } from "@/context/index";
import { background } from "../style.css";

const Modal = () => {
  const { component, visible } = useAtomValue(modalContext);

  if (visible) return <section className={background}>{component}</section>;
};

export default Modal;
