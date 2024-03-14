import getQueryClient from "@/app/getQueryClient";
import { getHistoryDetail, getHistoryList } from "./history.api";
import { HISTORY } from "./history.key";

export const useHistoryListQuery = ({ title }: { title: string }) => {
  const queryClient = getQueryClient();
  return queryClient.fetchQuery({
    queryKey: HISTORY.LIST(title),
    queryFn: () => getHistoryList(title),
  });
};

export const useHistoryDetailQuery = ({ title, id }: { title: string; id: number }) => {
  const queryClient = getQueryClient();
  return queryClient.fetchQuery({
    queryKey: HISTORY.DETAIL(title, id),
    queryFn: () => getHistoryDetail(title, id),
  });
};
