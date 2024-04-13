import { DocsListItemType } from ".";

export default interface DocsListType {
  data: Record<string, Array<DocsListItemType>>;
  keys: Array<string>;
}
