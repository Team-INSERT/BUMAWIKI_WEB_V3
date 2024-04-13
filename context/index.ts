import { ContributeDocsType, ModalState } from "@/types";
import { atom } from "jotai";

export const userContext = atom({
  id: 0,
  email: "",
  nickName: "",
  name: "",
  authority: "",
  contributeDocs: [] as Array<ContributeDocsType>,
  isLogin: false,
});

export const modalContext = atom<ModalState>({
  component: null,
  visible: false,
});
