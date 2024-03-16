import { atom } from "jotai";
import ModalState from "../type/ModalState.type";

const modalContext = atom<ModalState>({
  component: null,
});

export default modalContext;
