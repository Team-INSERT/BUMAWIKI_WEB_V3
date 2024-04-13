export default interface DocsItemType {
  id: number;
  title: string;
  enroll?: number;
  contents: string;
  docsType: string;
  view: number;
  lastModifiedAt: Date;
  thumbsUpsCounts: number;
  youLikeThis: boolean;
  contributors: Array<{
    id: number;
    nickName: string;
  }>;
}
