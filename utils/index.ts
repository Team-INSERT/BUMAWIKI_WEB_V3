import { details, summary } from "@/components/Accordion/style.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export const decodeContent = (content: string) => {
  const decoded = content
    .replace(/<<(.*?)>>:{(.*?)}/gi, `<이미지%@T src="$1" width="$2%" />`)
    /** xss */
    // .replace(/<([A-Za-z]+)[^>]*>.*?<\/\1>/gi, "")
    // .replace(/<([A-Za-z]+)[^>]*\/>/gi, "")
    // .replace(/<([A-Za-z]+)([^>]*)\/?\s*>/gi, "")
    .replaceAll("이미지%@T", "img")
    /** */
    .replaceAll(
      "<틀>",
      `<details class="frame_details"><table class="frame_table" style="width:100%;" >`,
    )
    .replaceAll("</틀>", `</table></details>`)
    .replaceAll("<틀제목", `<summary class="frame_caption" `)
    .replaceAll("</틀제목>", `<br><span>[ 펼치기 · 접기 ]</span></summary>`)

    .replace(/<행>(.*?)<\/행>/gi, "<tr>$1</tr>")
    .replace(/<열/gi, `<td class="frame_td" `)
    .replace(/스타일={{/gi, `style="`)
    .replace(/배경색=\(/gi, `;background-color:`)
    .replace(/글자색=\(/gi, `;color:`)
    .replace(/<\/열>/gi, `</td>`)
    .replace(/가로병합={{/gi, ` colspan="`)
    .replace(/세로병합={{/gi, ` rowspan="`)

    .replace(/}}/gi, `"`)
    .replace(/include\((.*?)\);/gi, "틀 개발중!\n\n")

    .replace(/<항목>([\s\S]*?)<\/항목>/gi, "<li style='list-style: disc';>$1</li>")
    .replace(/<어록>([\s\S]*?)<\/어록>/gi, "<div class='analects';>$1</div>")
    .replace(/<블록>([\s\S]*?)<\/블록>/gi, "<div class='block';>$1</div>")
    .replace(/<강조>([\s\S]*?)<\/강조>/gi, "<strong>$1</strong>")
    .replace(/<빨강>([\s\S]*?)<\/빨강>/gi, "<span style='color: red;'>$1</span>")
    .replace(/<주황>([\s\S]*?)<\/주황>/gi, "<span style='color: orange;'>$1</span>")
    .replace(/<노랑>([\s\S]*?)<\/노랑>/gi, "<span style='color: yellow;'>$1</span>")
    .replace(/<초록>([\s\S]*?)<\/초록>/gi, "<span style='color: green;'>$1</span>")
    .replace(/<파랑>([\s\S]*?)<\/파랑>/gi, "<span style='color: blue;'>$1</span>")
    .replace(/<보라>([\s\S]*?)<\/보라>/gi, "<span style='color: purple;'>$1</span>")
    .replace(/<하양>([\s\S]*?)<\/하양>/gi, "<span style='color: white;'>$1</span>")
    .replace(/<취소선>([\s\S]*?)<\/취소선>/gi, "<del style='color: #ccc;'>$1</del>")
    .replace(
      /<소제목>([\s\S]*?)<\/소제목>/gi,
      `</details><details open class="${details}"><summary class="${summary}">$1</summary>`,
    )
    .replace(/<빙글빙글>([\s\S]*?)<\/빙글빙글>/gi, "<div class='spin'>$1</div>")
    .replace(/<삐슝빠슝>([\s\S]*?)<\/삐슝빠슝>/gi, "<div class='shake'>$1</div>")
    .replace(/<링크 문서=\{(.*?)\}>(.*?)<\/링크>/g, "<a class='link' href='/docs/$1'>$2</a>")
    .replace(/<외부링크 문서=\{(.*?)\}>(.*?)<\/외부링크>/g, "<a class='link' href='$1'>$2</a>")
    .replace(/<사진 \{(.*?)\}>(.*?)<\/사진>/g, '<img style="width: $1" src="$2" />')
    .replace(
      /<비디오 \{(.*?)\}>(.*?)<\/비디오>/g,
      '<video style="width: $1" src="$2" controls /></video>',
    )

    // deprecated
    .replace(
      /(?<=<<<|<<|>>|>>>)\s*http:\/\/bumawiki\.kro\.kr\/api\/\s*/g,
      process.env.NEXT_PUBLIC_SERVER_URL || "",
    )
    .replace(/(?<=<<<|<<)\s+|\s+(?=>>>|>>)/g, "%20")
    // .replace(/<</gi, `<img src="`)
    // .replace(/>>:{/gi, `" alt='' style="width:`)
    // .replace(/}/gi, `%; !important"/>`)
    .replace(/&#.*;/gi, ``);

  return decoded;
};

export const dateText = (date: Date) => {
  return dayjs(date).locale("ko").format("YYYY년 M월 D일 A h시 m분");
};

export const translateAuthority = (authority: string) => {
  switch (authority) {
    case "ADMIN":
      return "관리자";
    case "USER":
      return "유저";
    case "READONLY":
      return "읽기전용 사용자";
    default:
      return authority;
  }
};

export const getYear = () => {
  const startYear = 2021;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index,
  );
  return years;
};

export const generateOpenGraph = <OG extends { title: string; description: string }>({
  title,
  description,
}: OG) => ({
  metadataBase: new URL("https://buma.wiki"),
  title: `부마위키 - ${title}`,
  description,
  icons: { icon: "/favicon.ico" },
  additionalLinkTags: [{ rel: "icon", href: "/favicon.ico" }],
  openGraph: {
    type: "website",
    title: `부마위키 - ${title}`,
    description,
    images:
      "https://bumawiki.s3.ap-northeast-2.amazonaws.com/file2a809fd7-66f4-421e-9b64-005b34ea8020",
  },
  other: {
    "og:image":
      "https://bumawiki.s3.ap-northeast-2.amazonaws.com/file2a809fd7-66f4-421e-9b64-005b34ea8020",
  },
});

export const translateClassify = (classify: string) => {
  switch (classify.toUpperCase()) {
    case "/":
      return "부마위키";
    case "MYPAGE":
    case "USER":
      return "유저";
    case "STUDENT":
      return "학생";
    case "MAJOR_TEACHER":
      return "전공교과 선생님";
    case "TEACHER":
      return "보통교과 선생님";
    case "MENTOR_TEACHER":
      return "멘토 선생님";
    case "ACCIDENT":
      return "사건";
    case "CLUB":
      return "동아리";
    case "FRAME":
      return "틀";
    case "POPULAR":
      return "인기";
    case "NOTICE":
      return "공지";
    case "READONLY":
      return "읽기전용";
    case "":
      return "부마위키";
    default:
      return classify;
  }
};

export const contentsCleaner = (contents: string) => {
  return `${contents.replace(/<[^>]+>/g, " ")} ...`;
};
