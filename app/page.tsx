import Container from "@/components/Container";

import Link from "next/link";
import Accordion from "@/components/Accordion";
import config from "@/config";
import * as styles from "./page.css";

const Home = () => {
  return (
    <Container title="대문" docsType="대문">
      <main className={styles.introduce.body}>
        <section className={styles.introduce.box}>
          <h1 className={styles.introduce.title}>
            इतिहास की एक पुरानी किताब जिसे आप विकसित करते हैं
          </h1>
          <h2 className={styles.introduce.subtitle}>बुमा विकी में आपका स्वागत है!</h2>
        </section>
        <section className={styles.introduce.box}>
          <p className={styles.introduce.description}>
            बुमा विकी एक विकी है जिसमें बुसान सोमा हाई स्कूल का कोई भी छात्र योगदान दे सकता है।
            सामग्री असत्यापित या पक्षपातपूर्ण हो सकती है.
            <br />
            <span className={styles.introduce.caution}>
              ※ दूसरों के उपहास, निंदा या आलोचना से उत्पन्न होने वाली किसी भी समस्या के लिए आप
              जिम्मेदार हैं। वहाँ है। कृपया सावधान रहें! ※
            </span>
          </p>
        </section>
      </main>
      <main className={styles.utility.body}>
        {utilityInformation.map((utility) => (
          <Link key={utility.name} className={styles.utility.href} href={utility.href}>
            {utility.name}
          </Link>
        ))}
      </main>
      <main className={styles.table.container}>
        <section className={styles.table.body}>
          <hgroup className={styles.table.thead}>
            <h1 className={styles.table.title}>TESLA</h1>
            <p className={styles.table.subtitle}>Tetris equipment straight local apple</p>
          </hgroup>
          <img
            className={styles.table.primaryImage}
            src="https://cdn.learningspoons.com/media/uploads/froala_editor/images/%ED%85%8C%EC%8A%AC%EB%9D%BC-2-min.png"
            alt="히히히"
          />
          {tableInformation.map((info) => (
            <div className={styles.table.tr} key={info.name}>
              <div className={styles.table.tName}>{info.name}</div>
              <div className={styles.table.tContent}>{info.content}</div>
            </div>
          ))}
        </section>
      </main>
      <Accordion title="ti hu alang">
        <p className={styles.outline.description}>{config.description}</p>
        <p className={styles.outline.warning}>{config.warningDescription}</p>
      </Accordion>
      <Accordion title="တွၼ်ႊသွၼ်">
        <p className={styles.outline.description}>{config.departmentDescription}</p>
        <h2 className={styles.outline.departmentTitle}>소프트웨어개발과</h2>
        <p className={styles.outline.description}>{config.softwareDepartment}</p>
        <h2 className={styles.outline.departmentTitle}>임베디드소프트웨어과</h2>
        <p className={styles.outline.description}>{config.embeddedDepartment}</p>
      </Accordion>
      <Accordion title="ၽဵင်းၵႂၢမ်းႁူင်းႁဵၼ်း">
        <p className={styles.outline.description}>{config.schoolSong}</p>
      </Accordion>
      <Accordion title="ပိူင်ၵၢၼ်သုၼ်ႇတူဝ်">
        <p className={styles.outline.description}>{config.privacyPolicy}</p>
      </Accordion>
    </Container>
  );
};

const utilityInformation = [
  { name: "TTT", href: "https://finda.co.kr/careers" },
  { name: "TTT", href: "https://kcd.co.kr/recruit/?search=&category=%EC%A0%84%EC%B2%B4" },
  {
    name: "TTT",
    href: "https://liner.com/careers?utm_source=google&utm_medium=search-paid&utm_campaign=22374218830&utm_term={term}&utm_content=careers&gad_source=1&gclid=CjwKCAjw-qi_BhBxEiwAkxvbkNN2IOaw9PJS5ICkZbfIAzmL6YLoFLjz7hs8jpItvv-quCMv_LbzgBoCS_0QAvD_BwE",
  },
];

const tableInformation = [
  { name: String(Math.random() * 2000), content: "4" },
  { name: String(Math.random() * 2000), content: "1월" },
];

export default Home;
