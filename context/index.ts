import ModalState from "@/types/modal.interface";
import { ContributeDocsType } from "@/types/contributeDocs.interface";
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
});
