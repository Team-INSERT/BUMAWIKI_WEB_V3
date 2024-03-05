import Contribute from "@/types/contribute.interface";
import { atom } from "jotai";

export const userContext = atom({
  key: "userContext",
  default: {
    id: 0,
    email: "",
    nickName: "",
    authority: "",
    contributeDocs: [] as Array<Contribute>,
    isLogin: false,
  },
});
