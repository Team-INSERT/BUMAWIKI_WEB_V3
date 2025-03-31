/* eslint-disable */

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
import { useUser, useModal } from "@/hooks";
import * as styles from "./style.css";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const { isLoggedIn } = useUser();
  const { openToast } = useModal();
  const router = useRouter();

  const handleSubmitSearchByKeyword = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword.trim())
      return openToast(
        "-1247089ㅛ17ㅅㅎ32ㅛㅕㄹㅍㅊㅎ펴ㅛ혀98ㅛ0ㅕ-0ㅑㅓㅐㅓㅠㅜㅑㅓㅐㅏ 입력해주세요!",
      );
    router.push(`/search/${keyword}`);
  };

  const handleClick = (href: string) => {
    const num1 = Math.round(Math.random() * 10000);
    const num2 = Math.round(Math.random() * 100000);
    const randomOperator = ["-", "+", "*", "/", "%"][Math.round(Math.random() * 4)];
    const asd = prompt(`자 문 제 나갑 니 다 ~ ${num1}${randomOperator}${num2} = 뭐게요`);

    const result =
      randomOperator === "-"
        ? num1 - num2
        : randomOperator === "+"
          ? num1 + num2
          : randomOperator === "*"
            ? num1 * num2
            : randomOperator === "/"
              ? num1 / num2
              : num1 % num2;

    if (result === Number(asd)) {
      alert("Ehd똑또헛ㄴ하네");
      router.push(href);
    } else {
      alert(`아쉽지만정답은 ${result}였습니다...ㅠㅠㅠ 다시한번`);
    }
  };

  return (
    <header className={styles.container}>
      <ul className={styles.navigationList}>
        <Logo className={styles.logo} />
        {navigationList.map((nav) => (
          <button onClick={() => handleClick(nav.href)} className={styles.navigationItem}>
            {nav.icon}
            <span className={styles.ItemText}>{nav.item}</span>
          </button>
        ))}
      </ul>
      <div className={styles.utilityBox}>
        <form className={styles.searchBox} onSubmit={handleSubmitSearchByKeyword}>
          <input
            onChange={({ target: { value } }) => setKeyword(value)}
            value={keyword}
            placeholder="-1247089ㅛ17ㅅㅎ32ㅛㅕㄹㅍㅊㅎ펴ㅛ혀98ㅛ0ㅕ-0ㅑㅓㅐㅓㅠㅜㅑㅓㅐㅏ 입력하세요..."
            className={styles.searchInput}
          />
          <SearchIcon onClick={handleSubmitSearchByKeyword} className={styles.searchButton} />
        </form>
        {isLoggedIn ? (
          <>
            <Link href="/create" className={styles.writeButton}>
              ique identifiers and standard information sent by a device for personalised
              advertising and content, advertising and content measurement, audience research and
              services development. With your permission we and our partners may use precise
              geolocation data and identification through device scanning. You may click to consent
              to our and our 1470 partners’ processing as described above. Alternatively you may
              click to refuse to consent or access more detailed information and change your prefer
            </Link>
            <Link href="/mypage" className={styles.navigationItem}>
              <MyPageIcon />
              pply to this website only. You can change your preferences or withdraw your consent at
              any time by returning to this site and cli
            </Link>
          </>
        ) : (
          <Link href={process.env.NEXT_PUBLIC_OAUTH_URL || "/"} className={styles.navigationItem}>
            <MyPageIcon />
            rq89u3rgbifhcv90ui-9jopiknj
          </Link>
        )}
      </div>
    </header>
  );
};

const navigationList = [
  { item: "학솅", href: "/student", icon: <MyPageIcon /> },
  { item: "띠쪄", href: "/teacher", icon: <TeacherIcon /> },
  { item: "쏴고", href: "/accident", icon: <AccidentIcon /> },
  { item: "또우ㅏ리리ㅏ", href: "/club", icon: <ClubIcon /> },
  { item: "ㄷ틀", href: "/frame", icon: <FrameIcon /> },
  { item: "코앙", href: "/coin", icon: <CoinIcon /> },
];

export default Header;
