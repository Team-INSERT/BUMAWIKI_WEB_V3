import { DocsListItem } from "./docsListItem.interface";

export interface DocsListType {
  data: Record<string, Array<DocsListItem>>;
  keys: Array<string>;
}
