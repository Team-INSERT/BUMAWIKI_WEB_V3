import { queryOptions } from "@tanstack/react-query";
import { TradeType } from "@/types/trade.interface";
import { CoinRank } from "@/types/coinRank.interface";
import {
  getCoinCurrentPrice,
  getCoinGraph,
  getCoinRanking,
  getMyCoinWallet,
  getTradeHistoryById,
} from "./coin.api";

export const coinQuery = {
  myWallet: () =>
    queryOptions({
      queryKey: ["query.myWallet"],
      queryFn: getMyCoinWallet,
    }),
  trade: <Id extends number>(id: Id) =>
    queryOptions<Array<TradeType>>({
      queryKey: ["query.coinTrade", id],
      queryFn: () => getTradeHistoryById(id),
    }),
  graph: <Cyc extends string>(cycle: Cyc) =>
    queryOptions({
      queryKey: ["query.graph", cycle],
      queryFn: () => getCoinGraph(cycle),
    }),
  price: () =>
    queryOptions({
      queryKey: ["query.price"],
      queryFn: getCoinCurrentPrice,
    }),
  rank: () =>
    queryOptions<Array<CoinRank>>({
      queryKey: ["query.rank"],
      queryFn: getCoinRanking,
    }),
};
