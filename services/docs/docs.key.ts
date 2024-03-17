export const DOCS = {
  LIST: (classify: string) => ["docsList", { classify }],
  TITLE: (title: string) => ["docsByTitle", { title }],
  KEYWORD: (keyword: string) => ["docsList", { keyword }],
  LASTMODIFY: ["docsListModified"],
};
