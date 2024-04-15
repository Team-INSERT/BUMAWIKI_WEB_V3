import Accordion from "@/components/Accordion";
import { ContributeDocsType } from "@/types";
import Link from "next/link";

import { useDate } from "@/hooks";
import * as styles from "./style.css";

const ContritbuteDocsList = ({ contributes }: { contributes: Array<ContributeDocsType> }) => {
  const { formatDate } = useDate();
  return (
    <Accordion title="기여한 문서">
      {contributes.map((contribute) => (
        <Link
          href={`/docs/${contribute.title}`}
          key={contribute.versionDocsId}
          className={styles.contributeBox}
        >
          {contribute.title}#{contribute.versionDocsId}
          <time className={styles.modifiedAt}>{formatDate(contribute.createTime)}</time>
        </Link>
      ))}
    </Accordion>
  );
};

export default ContritbuteDocsList;
