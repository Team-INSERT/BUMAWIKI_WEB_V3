import { ChangeEvent } from "react";

const generateClosingTag = (tagName: string, value: string, selection: number) => {
  if (tagName.includes("링크"))
    return `</${tagName.substring(0, tagName.indexOf(" "))}>${value.slice(selection, value.length)}`;
  return `</${tagName}${value.slice(selection, value.length)}`;
};

const eventDecomposer = (event: ChangeEvent<HTMLTextAreaElement>) => {
  const { target } = event;
  const { selectionStart: selection, value } = target;
  const { inputType } = event.nativeEvent as InputEvent;

  return { target, selection, value, inputType };
};

const autoClosingTag = (event: ChangeEvent<HTMLTextAreaElement>): string => {
  const { target, selection, value, inputType } = eventDecomposer(event);
  const isSubjectToClosure = value[selection - 1] === ">";

  if (!isSubjectToClosure) return value;
  if (inputType === "deleteContentBackward") return value;

  const content = value.slice(0, selection);
  const CONTENT_LENGTH = content.length;

  const tag = content.substring(content.lastIndexOf("<"), CONTENT_LENGTH);
  const tagName = tag.slice(1, CONTENT_LENGTH);

  // 내용이 있을 경우 또는 이미 닫는 태그일 경우 return
  const isInvalidFormatTag = !tag.includes("<") || tagName.includes("/");
  if (isInvalidFormatTag) return value;

  const completedContent = `${content}${generateClosingTag(tagName, value, selection)}`;
  const insideTag = content.slice(content.lastIndexOf("<"), CONTENT_LENGTH);

  // ">" 반복 사용으로 인한 태그 증식 방지
  if (insideTag.split(">").length > 2) return value;

  // selection 바라보는 지점 테스크 큐로 처리
  setTimeout(() => {
    target.selectionStart = selection;
    target.selectionEnd = selection;
  });
  return completedContent;
};

export default autoClosingTag;
