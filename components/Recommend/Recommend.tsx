"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import Link from "next/link";
import * as styles from "./style.css";

const generateRandomList = (max: number) => {
  return Array.from({ length: 3 }, () => Math.round(Math.random() * (max - 1)));
};

const Recommend = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const containerStatus = isListOpen ? "open" : "close";

  const { data: students, isSuccess: isStudentSuccess } = useQuery(docsQuery.list("student"));
  const { data: accidents, isSuccess: isAccidentSuccess } = useQuery(docsQuery.list("accident"));

  if (!isStudentSuccess) return null;
  if (!isAccidentSuccess) return null;

  const randomStudentList = students?.keys.flatMap((key) => students.data[key]);
  const randomAccidentList = accidents?.keys.flatMap((key) => accidents.data[key]);

  const handlePopularListMouseHover = () => {
    setIsListOpen((prev) => !prev);
  };

  return (
    <aside
      onMouseEnter={handlePopularListMouseHover}
      onMouseLeave={handlePopularListMouseHover}
      className={styles.container[containerStatus]}
    >
      <header className={styles.titleBox}>추천 문서</header>
      <ul className={styles.docsList}>
        {generateRandomList(randomStudentList.length).map((recommend) => (
          <Link
            href={`/docs/${randomStudentList[recommend].title}`}
            className={styles.docsListItem[containerStatus]}
            key={randomStudentList[recommend].title}
          >
            <span className={styles.docsName}>{randomStudentList[recommend].title}</span>
          </Link>
        ))}
        {generateRandomList(randomAccidentList.length).map((recommend) => (
          <Link
            href={`/docs/${randomAccidentList[recommend].title}`}
            className={styles.docsListItem[containerStatus]}
            key={randomAccidentList[recommend].title}
          >
            <span className={styles.docsName}>{randomAccidentList[recommend].title}</span>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default Recommend;
