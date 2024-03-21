"use client";

import Accordion from "@/components/Accordion";
import { useDocs } from "@/hooks/useDocs";
import React, { FC } from "react";
import { contentsCleaner, dateText } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import Container from "@/components/Container";
import * as styles from "./style.css";

const DocsList: FC<{ classify: string }> = ({ classify }) => {
  const { getAccordionTitle, translateClassify } = useDocs();
  const { data: docsList } = useSuspenseQuery(docsQuery.list(classify));

  return (
    <Container title={translateClassify(classify)} docsType={classify}>
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
                <p className={styles.simpleContents}>{contentsCleaner(docs.simpleContents)} ...</p>
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
    </Container>
  );
};

export default DocsList;
