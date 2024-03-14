import Accordion from "@/components/Accordion";
import { useDocs } from "@/hooks/useDocs";
import { DocsListType } from "@/types/docsList.interface";
import React from "react";
import { dateText } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import * as styles from "./style.css";

interface DocsListProps {
  docsList: DocsListType;
}

const DocsList = ({ docsList }: DocsListProps) => {
  const { getAccordionTitle } = useDocs();

  return (
    <div>
      {docsList.keys.map((key: string) => (
        <Accordion title={getAccordionTitle(key)} key={key}>
          {docsList.data[key].map((docs) => (
            <Link href={`/docs/${docs.title}`} key={docs.id} className={styles.container}>
              <div className={styles.docs}>
                <hgroup className={styles.titleBox}>
                  <h1 className={styles.title}>{docs.title}</h1>
                  <span className={styles.lastModifiedAt}>
                    최근 수정일 ·&nbsp;
                    {dateText(docs.lastModifiedAt)}
                  </span>
                </hgroup>
                <p className={styles.simpleContents}>
                  {docs.simpleContents.replace(/<[^>]+>/g, " ")} ...
                </p>
              </div>
              {docs.thumbnail && (
                <Image
                  width={170}
                  height={90}
                  src={docs.thumbnail}
                  className={styles.thumbnail}
                  alt="thumbnail"
                />
              )}
            </Link>
          ))}
        </Accordion>
      ))}
    </div>
  );
};

export default DocsList;
