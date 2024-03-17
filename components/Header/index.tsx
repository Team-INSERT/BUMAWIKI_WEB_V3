"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  AccidentIcon,
  ClubIcon,
  FrameIcon,
  TeacherIcon,
  Logo,
  SearchIcon,
  MyPageIcon,
} from "@/assets";
import { useRouter } from "next/navigation";
import { Storage } from "@/storage";
import { TOKEN } from "@/constants/token.constant";
import * as styles from "./style.css";
import { toast } from "react-toastify";
import Toastify from "../Toastify";

const navigationList = [
  { item: "학생", href: "/student", icon: <MyPageIcon /> },
  { item: "선생님", href: "/teacher", icon: <TeacherIcon /> },
  { item: "사건/사고", href: "/accident", icon: <AccidentIcon /> },
  { item: "동아리", href: "/club", icon: <ClubIcon /> },
  { item: "틀", href: "/frame", icon: <FrameIcon /> },
];

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmitSearchByKeyword = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return toast(<Toastify content="검색어를 입력해주세요!" />);
    router.push(`/search/${keyword}`);
  };

  useEffect(() => {
    if (Storage.getItem(TOKEN.ACCESS)) setIsLoggedIn(true);
  }, []);

  return (
    <div className={styles.container}>
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
          <div className={styles.loginUtilityBox}>
            <Link href="/create" className={styles.writeButton}>
              문서 생성
            </Link>
            <Link href="/mypage" className={styles.navigationItem}>
              <MyPageIcon />
              <span>내정보</span>
            </Link>
          </div>
        ) : (
          <Link href={process.env.NEXT_PUBLIC_OAUTH_URL || "/"} className={styles.navigationItem}>
            <MyPageIcon />
            <span>로그인</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
