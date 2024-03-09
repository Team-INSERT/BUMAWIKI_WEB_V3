import HistoryService from "./HistoryService";

const queryKeys = {
  list: (title: string) => ["history", title] as const,
  detail: (title: string, id: number) =>
    ["history", "detail", title, id] as const,
};

export const historyQuery = {
  getList: (title: string) => ({
    queryKey: queryKeys.list(title),
    queryFn: () => HistoryService.getList(title).then((r) => r.data),
  }),

  getDetail: (title: string, id: number) => ({
    queryKey: queryKeys.detail(title, id),
    queryFn: () => HistoryService.getDetail(title, id).then((r) => r.data),
  }),
};
