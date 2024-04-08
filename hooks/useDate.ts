import dayjs from "dayjs";
import moment from "moment";
import "moment/locale/ko";

export const useDate = () => {
  const fromNow = (date: Date) => {
    return moment(date).fromNow();
  };

  const formatDate = (date?: Date) => {
    if (!date) return;
    return dayjs(date).locale("ko").format("YYYY년 M월 D일 A h시 m분");
  };

  return { fromNow, formatDate };
};
