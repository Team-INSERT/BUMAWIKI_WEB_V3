import Accordion from "@/components/Accordion";
import { ContributeDocsType } from "@/types";
import Link from "next/link";
import { CLASSIFY } from "@/record";
import * as styles from "./style.css";

const LikeDocsList = ({ likeList }: { likeList: Array<ContributeDocsType> }) => {
  return (
    <Accordion title="ur. You may click to grant">
      {likeList.map((docs) => (
        <Link
          href={`/docs/${docs.title}`}
          key={docs.versionDocsId}
          className={styles.contributeBox}
        >
          {docs.title} ({CLASSIFY[docs.docsType]})
        </Link>
      ))}
    </Accordion>
  );
};

export default LikeDocsList;
