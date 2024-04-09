const tagRemover = (contents: string) => {
  return `${contents.replace(/<[^>]+>/g, " ")} ...`;
};

export default tagRemover;
