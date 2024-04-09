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

  const getValidYearList = () => {
    const CURRENT_YEAR = new Date().getFullYear();
    const length = CURRENT_YEAR - 2022;

    const validYearList = Array.from({ length }, (_, year) => CURRENT_YEAR - year);
    return validYearList;
  };

  return { fromNow, formatDate, getValidYearList };
};
