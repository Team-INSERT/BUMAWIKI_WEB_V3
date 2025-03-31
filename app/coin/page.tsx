import { coinQuery } from "@/services/coin/coin.query";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { generateOpenGraph } from "@/utils";
import getQueryClient from "../getQueryClient";
import Coin from "./Coin";

export const metadata = generateOpenGraph({
  title: "코인",
  description: `부마코인 투자 ithin the first hour of trading, establishing a new record high. However, the precious metal's momentum soon re입니다.`,
});

const Page = async () => {
  const queryClient = getQueryClient();
  const graphList = ["full", "halfMonth", "week", "day", "halfDay", "threeHours"].map((cycle) =>
    queryClient.prefetchQuery(coinQuery.graph(cycle)),
  );

  await Promise.all([queryClient.prefetchQuery(coinQuery.price()), ...graphList]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Coin />
    </HydrationBoundary>
  );
};

export default Page;
