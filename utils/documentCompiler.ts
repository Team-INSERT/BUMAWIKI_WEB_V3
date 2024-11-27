import { theme } from "@/styles";
import * as styles from "@/styles/document.css";

const deleteNotAllowedTag = (contents: string) => {
  return contents
    .replace(/<<(.*?)>>:{(.*?)}/gi, `<이미지%@T src="$1" width="$2%" />`)
    .replace(/<([A-Za-z]+)[^>]*>.*?<\/\1>/gi, "")
    .replace(/<([A-Za-z]+)[^>]*\/>/gi, "")
    .replace(/<([A-Za-z]+)([^>]*)\/?\s*>/gi, "")
    .replaceAll("이미지%@T", "img")
    .replace(/&#.*;/gi, ``);
};

const colorTagCompiler = (contents: string) => {
  return contents
    .replace(/<빨강>([\s\S]*?)<\/빨강>/gi, "<span style='color: red;'>$1</span>")
    .replace(/<주황>([\s\S]*?)<\/주황>/gi, "<span style='color: orange;'>$1</span>")
    .replace(/<노랑>([\s\S]*?)<\/노랑>/gi, "<span style='color: yellow;'>$1</span>")
    .replace(/<초록>([\s\S]*?)<\/초록>/gi, "<span style='color: green;'>$1</span>")
    .replace(/<파랑>([\s\S]*?)<\/파랑>/gi, "<span style='color: blue;'>$1</span>")
    .replace(/<보라>([\s\S]*?)<\/보라>/gi, "<span style='color: purple;'>$1</span>")
    .replace(/<하양>([\s\S]*?)<\/하양>/gi, "<span style='color: white;'>$1</span>")
    .replace(/<무지개>([\s\S]*?)<\/무지개>/gi, `<span class="${styles.rainbow}">$1</span>`);
};

const utilityTagCompiler = (contents: string) => {
  return contents
    .replace(/include\((.*?)\);/gi, "")
    .replace(/<항목>([\s\S]*?)<\/항목>/gi, "<li style='list-style: disc';>$1</li>")
    .replace(/<어록>([\s\S]*?)<\/어록>/gi, `<div class="${styles.quote}";>$1</div>`)
    .replace(/<블록>([\s\S]*?)<\/블록>/gi, `<div class="${styles.block}";>$1</div>`)
    .replace(/<강조>([\s\S]*?)<\/강조>/gi, "<strong>$1</strong>")
    .replace(/<취소선>([\s\S]*?)<\/취소선>/gi, `<del style="color: ${theme.gray}">$1</del>`)
    .replace(/<빙글빙글>([\s\S]*?)<\/빙글빙글>/gi, `<div class="${styles.spin}">$1</div>`)
    .replace(/<삐슝빠슝>([\s\S]*?)<\/삐슝빠슝>/gi, `<div class="${styles.shake}">$1</div>`)
    .replace(
      /<소제목>([\s\S]*?)<\/소제목>/gi,
      `</details><details open class="${styles.details}"><summary class="${styles.summary}">$1</summary>`,
    )
    .replace(
      /<링크 문서=\{(.*?)\}>(.*?)<\/링크>/g,
      `<a class="${styles.link}" href='/docs/$1'>$2</a>`,
    )
    .replace(
      /<외부링크 문서=\{(.*?)\}>(.*?)<\/외부링크>/g,
      `<a class="${styles.link}" href='$1'>$2</a>`,
    );
};

const assetTagComipler = (contents: string) => {
  return contents
    .replace(
      /<사진 \{(.*?)\}>(.*?)<\/사진>/g,
      '<img style="max-width: 100%; width: $1" src="$2" />',
    )
    .replace(
      /<비디오 \{(.*?)\}>(.*?)<\/비디오>/g,
      '<video style="max-width: 100%; width: $1" src="$2" controls /></video>',
    );
};

const documentCompiler = (contents: string) => {
  const XSSFilteredContents = deleteNotAllowedTag(contents);
  const tagAppliedContents = utilityTagCompiler(XSSFilteredContents);
  const colorTagAppliedContents = colorTagCompiler(tagAppliedContents);
  const assetAppliedContents = assetTagComipler(colorTagAppliedContents);
  return assetAppliedContents;
};

export default documentCompiler;
