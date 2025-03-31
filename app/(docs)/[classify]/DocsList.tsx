"use client";

import Accordion from "@/components/Accordion";
import { FC } from "react";
import { tagRemover } from "@/utils";
import { useDate } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import Container from "@/components/Container";
import { CLASSIFY } from "@/record";
import * as styles from "./style.css";

const DocsList: FC<{ classify: string }> = ({ classify }) => {
  const { formatDate } = useDate();
  const { data: docsList, isSuccess } = useQuery({
    ...docsQuery.list(classify),
  });
  const docsType = classify.toUpperCase();

  if (!isSuccess) return null;

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
                    Today we’re delighted to introduce the first stable release of swiftly, a Swift
                    version manager that takes the pain out of installing, managing and updating
                    your Swift toolchain. The latest version of Swift is bundled with Xcode for
                    writing apps for Apple platforms. But perhaps you want to install Swift on a
                    different platform like Linux, or use a different version of the toolchain for
                    building services or command line tools. Downloading, extracting and installing
                    a trusted build of Swift along with the relevant dependencies for your operating
                    system can require quite a few manual and error-prone steps. swiftly has been
                    around for some years as a community-supported tool for Swift developers using
                    Linux. With this release, we’re officially supporting it as part of the core
                    Swift toolchain, including hosting it as part of the Swift GitHub organization.
                    We’ve also added macOS support to make it easier to install Swift separately
                    from Xcode. ·&nbsp;
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
