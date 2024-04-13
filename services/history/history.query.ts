import { queryOptions } from "@tanstack/react-query";
import { HistoryType } from "@/types";
import { getHistoryDetail, getHistoryList } from "./history.api";

export const historyQuery = {
  list: <Title extends string>(title: Title) =>
    queryOptions<{ versionDocsResponseDto: Array<HistoryType> }>({
      queryKey: ["query.historyList", title],
      queryFn: () => getHistoryList(title),
    }),
  detail: <Detail extends { title: string; id: number }>({ title, id }: Detail) =>
    queryOptions({
      queryKey: ["query.historyDetail", title, id],
      queryFn: () => getHistoryDetail(title, id),
    }),
};
