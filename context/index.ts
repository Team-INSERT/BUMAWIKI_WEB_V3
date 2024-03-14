import { ContributeDocsType } from "@/types/contributeDocs.interface";
import { atom } from "jotai";

export const userContext = atom({
  id: 0,
  email: "",
  nickName: "",
  authority: "",
  contributeDocs: [] as Array<ContributeDocsType>,
  isLogin: false,
});
