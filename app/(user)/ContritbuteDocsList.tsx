import Accordion from "@/components/Accordion";
import { ContributeDocsType } from "@/types/contributeDocs.interface";
import Link from "next/link";
import React from "react";
import { dateText } from "@/utils";
import * as styles from "./style.css";

const ContritbuteDocsList = ({ contributes }: { contributes: Array<ContributeDocsType> }) => {
  return (
    <Accordion title="기여한 문서">
      {contributes.map((contribute) => (
        <Link
          href={`/docs/${contribute.title}`}
          key={contribute.versionDocsId}
          className={styles.contributeBox}
        >
          <hgroup className={styles.hgroup}>
            <h1 className={styles.docsTitle}>
              {contribute.title}#{contribute.versionDocsId}
            </h1>
            <span className={styles.modifiedAt}>{dateText(contribute.createTime)}</span>
          </hgroup>
        </Link>
      ))}
    </Accordion>
  );
};

export default ContritbuteDocsList;
