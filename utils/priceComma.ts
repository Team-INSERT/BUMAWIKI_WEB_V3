const priceComma = (price: number) => {
  const parts = String(price)
    .replace(/\D/g, "")
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g);
  return parts?.join(",").split("").reverse().join("");
};

export default priceComma;
