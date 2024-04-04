import getQueryClient from "@/app/getQueryClient";
import { coinQuery } from "@/services/coin/coin.query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import CoinRanking from "./CoinRanking";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(coinQuery.rank());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoinRanking />
    </HydrationBoundary>
  );
};

export default Page;
