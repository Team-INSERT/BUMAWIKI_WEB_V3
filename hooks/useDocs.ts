import { ChangeEvent } from "react";

export const useDocs = () => {
  const translateClassify = (classify: string) => {
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
      case "":
        return "부마위키";
      default:
        return classify;
    }
  };

  const getAccordionTitle = (key: string) => {
    return `${translateClassify(String(key))}년`;
  };

  const autoClosingTag = (event: ChangeEvent<HTMLTextAreaElement>): string => {
    const { target } = event;
    const { selectionStart } = target;
    const { inputType } = event.nativeEvent as InputEvent;
    const { value } = target;

    if (value[selectionStart - 1] === ">") {
      if (inputType === "deleteContentBackward") return value;
      let text = value.slice(0, selectionStart);
      const openingTag = text.substring(text.lastIndexOf("<") + 1, text.length);
      const isWrongTag = text.substring(text.lastIndexOf("<"), text.length);
      if (!isWrongTag.includes("<") || openingTag.includes("/") || openingTag.includes("사진"))
        return value;
      if (openingTag.includes("링크")) {
        text += `</${openingTag.substring(0, openingTag.indexOf(" "))}>${value.slice(selectionStart, value.length)}`;
      } else {
        text += `</${openingTag}${value.slice(selectionStart, value.length)}`;
      }
      const textBeforeSelection = value.slice(0, selectionStart);
      const insideTag = textBeforeSelection.slice(
        textBeforeSelection.lastIndexOf("<"),
        textBeforeSelection.length,
      );
      const textAfterSelection = value.slice(selectionStart, value.length);
      const closingTag = textAfterSelection
        .slice(textAfterSelection.indexOf("</"), textAfterSelection.indexOf(">") + 1)
        .replace("/", "");
      if (insideTag === closingTag || (insideTag.includes("링크") && closingTag.includes("링크")))
        return value;
      if (insideTag.split(">").length === 3) return value;
      setTimeout(() => {
        target.selectionStart = selectionStart;
        target.selectionEnd = selectionStart;
      });
      return text;
    }
    return value;
  };

  const getDocsTypeByClassify = (classify: string) => {
    switch (classify) {
      case "멘토선생님":
        return "MENTOR_TEACHER";
      case "전공선생님":
        return "MAJOR_TEACHER";
      case "일반선생님":
        return "TEACHER";
      case "사건":
        return "ACCIDENT";
      case "전공동아리":
        return "CLUB";
      case "사설동아리":
        return "FREE_CLUB";
      case "틀":
        return "FRAME";
      default:
        return classify;
    }
  };

  return { translateClassify, getAccordionTitle, getDocsTypeByClassify, autoClosingTag };
};
