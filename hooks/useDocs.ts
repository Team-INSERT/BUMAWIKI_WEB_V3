export const useDocs = () => {
  const translateClassify = (classify: string) => {
    switch (classify) {
      case "학생":
        return "student";
      case "선생님":
        return "teacher";
      case "사건/사고":
        return "accident";
      case "동아리":
        return "club";
      case "틀":
        return "frame";
      case "인기":
        return "popular";
      case "부마위키":
        return "";
      default:
        return classify;
    }
  };

  return { translateClassify };
};
