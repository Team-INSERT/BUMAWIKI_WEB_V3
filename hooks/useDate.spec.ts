import useDate from "./useDate";

describe("useDate", () => {
  const { fromNow, formatDate, getValidYearList } = useDate();

  it("fromNow를 호출하면 주입된 시간은 현재 시간을 기점으로 몇 분 전인지를 반환한다.", () => {
    const createSometimesAgo = (ago: number) => new Date(new Date().getTime() - ago);

    const SECONDS = 1_000;
    const MINUTES = 60 * SECONDS;
    const HOURS = 60 * MINUTES;
    const DAYS = 24 * HOURS;
    const MONTHS = 30 * DAYS;
    const YEARS = 12 * MONTHS;

    const threeSecondsAgo = createSometimesAgo(3 * SECONDS);
    expect(fromNow(threeSecondsAgo)).toBe("몇 초 전");

    const threeMinutesAgo = createSometimesAgo(3 * MINUTES);
    expect(fromNow(threeMinutesAgo)).toBe("3분 전");

    const threeHoursAgo = createSometimesAgo(3 * HOURS);
    expect(fromNow(threeHoursAgo)).toBe("3시간 전");

    const threeDaysAgo = createSometimesAgo(3 * DAYS);
    expect(fromNow(threeDaysAgo)).toBe("3일 전");

    const threeMonthsAgo = createSometimesAgo(3 * MONTHS);
    expect(fromNow(threeMonthsAgo)).toBe("3달 전");

    const threeYearsAgo = createSometimesAgo(3 * YEARS);
    expect(fromNow(threeYearsAgo)).toBe("3년 전");
  });

  it("formatDate를 호출하면 지정된 형식과 같이 format된 날짜를 반환한다.", () => {
    /**
     * JavaScript의 month index는 0부터 시작한다.
     * 따라서 7을 입력하면 6월을 반환한다.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
     */
    const MONTH = (month: number) => month - 1;

    const DATE_20240716 = new Date(2024, MONTH(8), 16, 14, 30); // 2024년 8월 16일 14시 30분
    expect(formatDate(DATE_20240716)).toBe("2024년 8월 16일 PM 2시 30분");

    const DATE_20241103 = new Date(2024, MONTH(11), 3, 6, 8);
    expect(formatDate(DATE_20241103)).toBe("2024년 11월 3일 AM 6시 8분");
  });

  it("getValidYear가 반환하는 Array의 첫 요소는 현재 연도여야 한다", () => {
    const CURRENT_YEAR = new Date().getFullYear();
    const validYearList = getValidYearList();

    expect(validYearList[0]).toBe(CURRENT_YEAR);
  });

  it("getValidYear가 반환하는 Array의 끝 요소는 2021이어야 한다", () => {
    const FIRST_YEAR = 2021;
    const validYearList = getValidYearList();
    const last = validYearList.length - 1;

    expect(validYearList[last]).toBe(FIRST_YEAR);
  });

  it("getValidYear는 시작 연도부터 끝 연도 내 포함되는 모든 연도를 담고 있어야 한다", () => {
    const validYearList = getValidYearList();
    const FIRST_YEAR = 2021;
    const CURRENT_YEAR = new Date().getFullYear();

    for (let year = FIRST_YEAR; year <= CURRENT_YEAR; year += 1) {
      expect(validYearList.includes(year)).toBe(true);
    }
  });
});
