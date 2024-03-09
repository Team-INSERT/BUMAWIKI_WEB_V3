export const useDocs = () => {
  const translateClassify = (classify: string) => {
    switch (classify) {
      case "student":
        return "학생";
      case "teacher":
        return "선생님";
      case "accident":
        return "사건사고";
      case "club":
        return "동아리";
      case "frame":
        return "틀";
      case "popular":
        return "인기";
      case "":
        return "부마위키";
      default:
        return classify;
    }
  };

  return { translateClassify };
};
