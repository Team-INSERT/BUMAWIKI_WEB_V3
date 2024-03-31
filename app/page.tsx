import Container from "@/components/Container";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import config from "@/config";
import * as styles from "./page.css";

const tableInformation = [
  {
    name: "교훈",
    content: "여럽분 고등학교 시절이 얼마안남았읍니다 공부하지말고 노세요!!! 노는게 제일좋아",
  },
  { name: "개교", content: "2024년 4월 1일 월요일" },
  { name: "유형", content: "물티슈" },
  { name: "성별", content: "크레파스" },
  { name: "형태", content: "직사각형" },
  { name: "교목", content: "바오밥 나무" },
  { name: "교화", content: "대마" },
  {
    name: "교조",
    content: "비둘기",
  },
  { name: "관할 교육청", content: "아이슬란드 마우이 부족 광역 교육청" },
  { name: "주소", content: "Cambridge, Massachusetts, U.S." },
];

const Home = () => {
  return (
    <Container title="대문" docsType="/">
      <div className={styles.introduce.body}>
        <div className={styles.introduce.box}>
          <h1 className={styles.introduce.title}>
            이사이트는 해킹당했다{" "}
            <b className={styles.introduce.highlight}>우하ㅏ하핳하ㅏ하하하핳</b>
          </h1>
          <h2 className={styles.introduce.subtitle}>
            <b className={styles.introduce.highlight}>너ㅔ접속하면 IP다터어간다!!ㅏ!ㅡㅏ$ㅜ</b>
            으앟아ㅏㅇ아ㅏㅇ아아악 우ㅏㅜ아아아앙ㅇ
          </h2>
        </div>
        <div className={styles.introduce.box}>
          <p className={styles.introduce.description}>
            나는야 퉁튤ㅇㅌ퉁ㅇ이 ~~~~ ~ ~ 골몯때장릴란ㄹ내 ~~~~~
            <br />
            우앟앟하핳핳ㅎ 여기는 거짓말밖에 없지롱 어쩔건데 어쩔건데 우쩔간ㄷ ㅔㅎㅎㅎㅎㅎ
            <br />
            <span className={styles.introduce.caution}>
              ※ 제로투 뿌빠빠빠 뿌빠빠빠ㅃ 뿌빠빠빠ㅏㅃ 뿌빠빠ㅏ ※
            </span>
          </p>
        </div>
      </div>
      <div className={styles.utility.body}>
        <Link className={styles.utility.href} href="https://google.com">
          누르면 100만원 얻는 버튼
        </Link>{" "}
        |
        <Link className={styles.utility.href} href="https://google.com">
          누르면 1000만원 얻는 버튼
        </Link>{" "}
        |
        <Link className={styles.utility.href} href="https://google.com">
          누르면 10000만원 얻는 버튼
        </Link>
      </div>
      <div className={styles.table.container}>
        <div className={styles.table.body}>
          <div className={styles.table.thead}>
            <h1 className={styles.table.title}>Harvard University</h1>
            <h2 className={styles.table.subtitle}>Universitas Harvardiana</h2>
          </div>
          <Image
            width={999}
            height={999}
            className={styles.table.primaryImage}
            src="/assets/fake.gif"
            alt="학교"
          />
          {tableInformation.map((info) => (
            <div className={styles.table.tr} key={info.name}>
              <div className={styles.table.tName}>{info.name}</div>
              <div className={styles.table.tContent}>{info.content}</div>
            </div>
          ))}
        </div>
      </div>
      <Accordion title="개요">
        <div className={styles.outline.description}>{config.description}</div>
        <div className={styles.outline.warning}>{config.warningDescription}</div>
      </Accordion>
      <Accordion title="학과">
        <div className={styles.outline.description}>{config.departmentDescription}</div>
        <h2 className={styles.outline.departmentTitle}>치킨집</h2>
        <div className={styles.outline.description}>{config.softwareDepartment}</div>
        <h2 className={styles.outline.departmentTitle}>공 장</h2>
        <div className={styles.outline.description}>{config.embeddedDepartment}</div>
      </Accordion>
      <Accordion title="교가">
        <div className={styles.outline.description}>{config.schoolSong}</div>
      </Accordion>
      <Accordion title="개인정보처리방침">
        <div className={styles.outline.description}>{config.privacyPolicy}</div>
      </Accordion>
    </Container>
  );
};

export default Home;
