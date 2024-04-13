import { ContributeDocsType } from ".";

export default interface UserType {
  id: number;
  nickName: string;
  authority: string;
  name: string;
  email: string;
  isLogin: boolean;
  contributeDocs: Array<ContributeDocsType>;
}
