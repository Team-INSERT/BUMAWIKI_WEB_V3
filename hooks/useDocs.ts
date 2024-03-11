export const useDocs = () => {
  const translateClassify = (classify: string) => {
    switch (classify.toUpperCase()) {
      case "STUDENT":
        return "학생";
      case "TEACHER":
        return "선생님";
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

  return { translateClassify, getAccordionTitle };
};
