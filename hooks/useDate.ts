import moment from "moment";
import "moment/locale/ko";

export const useDate = () => {
  const fromNow = (date: Date) => {
    return moment(date).fromNow();
  };

  return { fromNow };
};
