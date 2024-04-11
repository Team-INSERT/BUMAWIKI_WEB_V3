"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  AccidentIcon,
  ClubIcon,
  FrameIcon,
  TeacherIcon,
  Logo,
  SearchIcon,
  MyPageIcon,
  CoinIcon,
} from "@/assets";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import useModal from "@/hooks/useModal";
import * as styles from "./style.css";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const { isLoggedIn } = useUser();
  const { openToast } = useModal();
  const router = useRouter();

  const handleSubmitSearchByKeyword = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return openToast("검색어를 입력해주세요!");
    router.push(`/search/${keyword}`);
  };

  return (
    <header className={styles.container}>
      <ul className={styles.navigationList}>
        <Logo className={styles.logo} />
        {navigationList.map((nav) => (
          <Link key={nav.item} href={nav.href} className={styles.navigationItem}>
            {nav.icon}
            <span>{nav.item}</span>
          </Link>
        ))}
      </ul>
      <div className={styles.utilityBox}>
        <form className={styles.searchBox} onSubmit={handleSubmitSearchByKeyword}>
          <input
            onChange={({ target: { value } }) => setKeyword(value)}
            value={keyword}
            placeholder="검색어를 입력하세요..."
            className={styles.searchInput}
          />
          <SearchIcon onClick={handleSubmitSearchByKeyword} className={styles.searchButton} />
        </form>
        {isLoggedIn ? (
          <>
            <Link href="/create" className={styles.writeButton}>
              문서 생성
            </Link>
            <Link href="/mypage" className={styles.navigationItem}>
              <MyPageIcon />
              내정보
            </Link>
          </>
        ) : (
          <Link href={process.env.NEXT_PUBLIC_OAUTH_URL || "/"} className={styles.navigationItem}>
            <MyPageIcon />
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

const navigationList = [
  { item: "학생", href: "/student", icon: <MyPageIcon /> },
  { item: "선생님", href: "/teacher", icon: <TeacherIcon /> },
  { item: "사건/사고", href: "/accident", icon: <AccidentIcon /> },
  { item: "동아리", href: "/club", icon: <ClubIcon /> },
  { item: "틀", href: "/frame", icon: <FrameIcon /> },
  { item: "코인", href: "/coin", icon: <CoinIcon /> },
];

export default Header;
