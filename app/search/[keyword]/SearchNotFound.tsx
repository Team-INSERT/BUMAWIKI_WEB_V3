import Container from "@/components/Container";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./style.css";

const SearchNotFound: FC<{ keyword: string }> = ({ keyword }) => {
  return (
    <Container title={`검색결과#${decodeURI(keyword)}`} docsType="검색 결과">
      <h1 className={styles.searchTitle}>검색 결과가 없습니다.</h1>
      <Link href="/create" className={styles.searchCreateLink}>
        직접 문서를 생성해보세요
      </Link>
    </Container>
  );
};

export default SearchNotFound;
