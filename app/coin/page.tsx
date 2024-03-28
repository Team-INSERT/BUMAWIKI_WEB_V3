import { coinQuery } from "@/services/coin/coin.query";
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../getQueryClient";
import Coin from "./Coin";

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
