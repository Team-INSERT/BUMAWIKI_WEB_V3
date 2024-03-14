import { ContributeDocsType } from "./contributeDocs.interface";

export interface UserType {
  id: number;
  nickName: string;
  authority: string;
  email: string;
  isLogin: boolean;
  contributeDocs: Array<ContributeDocsType>;
}
