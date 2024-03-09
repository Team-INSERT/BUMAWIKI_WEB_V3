import Container from "@/components/Container";
import React from "react";
import Image from "next/image";
import Accordion from "@/components/Accordion";
import config from "@/config";
import * as styles from "./page.css";

const tableInformation = [
  { name: "교훈", content: "創意(창의), 誠實(성실)" },
  { name: "개교", content: "1970년 3월 26일 (가락종합고등학교)" },
  { name: "유형", content: "마이스터고등학교" },
  { name: "성별", content: "남녀공학" },
  { name: "형태", content: "공립학교" },
  { name: "교목", content: "소나무 (꿋꿋한 절개와 의지를 보이다)" },
  { name: "교화", content: "목련 (우애있고 사랑스러우며 고귀하다)" },
  {
    name: "교조",
    content: "솔개 (유연하고 민첩하며 늠름한 기상으로 높이 날아 세계를 보다)",
  },
  { name: "관할 교육청", content: "부산광역시교육청" },
  { name: "주소", content: "부산광역시 강서구 가락대로 1393 (가락동)" },
];

const Home = () => {
  return (
    <Container title="대문" classify="부마위키">
      <div className={styles.introduce.body}>
        <div className={styles.introduce.box}>
          <h1 className={styles.introduce.title}>
            여러분이 가꾸어 나가는{" "}
            <b className={styles.introduce.highlight}>역사의 고서</b>
          </h1>
          <h2 className={styles.introduce.subtitle}>
            <b className={styles.introduce.highlight}>부마위키</b>에 오신 것을
            환영합니다!
          </h2>
        </div>
        <div className={styles.introduce.box}>
          <p className={styles.introduce.description}>
            부마위키는 부산소마고 학생이라면 누구나 기여할 수 있는 위키입니다.
            <br />
            검증되지 않았거나 편향된 내용이 있을 수 있습니다.
            <br />
            <span className={styles.introduce.caution}>
              ※ 타인에 대한 조롱 또는 비방, 비난으로 인해 발생하는 문제에 대한
              책임은 본인에게 있습니다. 주의해주세요! ※
            </span>
          </p>
        </div>
      </div>
      <div className={styles.table.container}>
        <div className={styles.table.body}>
          <div className={styles.table.thead}>
            <h1 className={styles.table.title}>
              부산소프트웨어마이스터고등학교
            </h1>
            <h2 className={styles.table.subtitle}>
              Busan Software Meister High School
            </h2>
          </div>
          <Image
            width={999}
            height={999}
            className={styles.table.primaryImage}
            src="/assets/school.jpeg"
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
        <div className={styles.outline.warning}>
          {config.warningDescription}
        </div>
      </Accordion>
      <Accordion title="학과">
        <div className={styles.outline.description}>
          {config.departmentDescription}
        </div>
        <h2 className={styles.outline.departmentTitle}>소프트웨어개발과</h2>
        <div className={styles.outline.description}>
          {config.softwareDepartment}
        </div>
        <h2 className={styles.outline.departmentTitle}>임베디드소프트웨어과</h2>
        <div className={styles.outline.description}>
          {config.embeddedDepartment}
        </div>
      </Accordion>
      <Accordion title="교가">
        <div className={styles.outline.description}>{config.schoolSong}</div>
      </Accordion>
      <Accordion title="개인정보처리방침">
        <div className={styles.outline.description}>{config.privacyPolicy}</div>
      </Accordion>
      <Accordion title="부마위키 담벼락">ㅇ</Accordion>
    </Container>
  );
};

export default Home;
