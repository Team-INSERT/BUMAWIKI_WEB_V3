import Accordion from "@/components/Accordion";
import { ContributeDocsType } from "@/types";
import Link from "next/link";
import { CLASSIFY } from "@/record";
import * as styles from "./style.css";

const LikeDocsList = ({ likeList }: { likeList: Array<ContributeDocsType> }) => {
  return (
    <Accordion title="좋아요 누른 문서">
      {likeList.map((docs) => (
        <Link
          href={`/docs/${docs.title}`}
          key={docs.versionDocsId}
          className={styles.contributeBox}
        >
          <hgroup className={styles.hgroup}>
            <h1 className={styles.docsTitle}>
              {docs.title} ({CLASSIFY[docs.docsType]})
            </h1>
          </hgroup>
        </Link>
      ))}
    </Accordion>
  );
};

export default LikeDocsList;
