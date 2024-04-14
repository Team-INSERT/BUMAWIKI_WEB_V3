"use client";

import Accordion from "@/components/Accordion";
import { FC } from "react";
import { tagRemover } from "@/utils";
import { useDate } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import Container from "@/components/Container";
import { CLASSIFY } from "@/record";
import * as styles from "./style.css";

const DocsList: FC<{ classify: string }> = ({ classify }) => {
  const { formatDate } = useDate();
  const { data: docsList } = useSuspenseQuery(docsQuery.list(classify));
  const docsType = classify.toUpperCase();

  return (
    <Container title={CLASSIFY[docsType]} docsType={docsType}>
      {docsList.keys.map((key: string) => (
        <Accordion title={`${key}년 ${CLASSIFY[docsType]}`} key={key}>
          {docsList.data[key].map((docs) => (
            <Link href={`/docs/${docs.title}`} key={docs.id} className={styles.container}>
              <div className={styles.docs}>
                <hgroup className={styles.titleBox}>
                  <h1 className={styles.title}>{docs.title}</h1>
                  <span className={styles.lastModifiedAt}>
                    최근 수정일 ·&nbsp;
                    {formatDate(docs.lastModifiedAt)}
                  </span>
                </hgroup>
                <p className={styles.simpleContents}>{tagRemover(docs.simpleContents)} ...</p>
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
