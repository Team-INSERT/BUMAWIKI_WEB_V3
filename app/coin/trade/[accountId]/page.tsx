import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { coinQuery } from "@/services/coin/coin.query";
import { generateOpenGraph } from "@/utils";
import TradeHistory from "./TradeHistory";

interface PageProps {
  params: {
    accountId: string;
  };
}

export const metadata = generateOpenGraph({
  title: "코인 거래 내역",
  description: `부마코인 거래 내역 페이지입니다.`,
});

const Page = async ({ params: { accountId } }: PageProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(coinQuery.trade(Number(accountId)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TradeHistory accountId={Number(accountId)} />
    </HydrationBoundary>
  );
};

export default Page;
