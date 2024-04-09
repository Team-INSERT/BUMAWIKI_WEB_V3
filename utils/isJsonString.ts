const isJsonString = (value: string): boolean => {
  const isString = typeof value === "string";
  if (!isString) return false;

  try {
    const result = JSON.parse(value);
    return typeof result === "object" && result !== null;
  } catch (e) {
    return false;
  }
};

export default isJsonString;
