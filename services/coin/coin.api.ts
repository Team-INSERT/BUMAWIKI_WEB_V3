import { http } from "@/apis";
import { authorization } from "@/apis/header";

export const getMyCoinWallet = async () => {
  const { data } = await http.get("/coins/mine", authorization());
  return data;
};

export const getTradeHistoryById = async (id: number) => {
  const { data } = await http.get(`/coins/trades/${id}`, authorization());
  return data;
};

export const getCoinGraph = async (period: string) => {
  const { data } = await http.get("/coins/graph", { params: { period } });
  return data;
};

export const getCoinCurrentPrice = async () => {
  const { data } = await http.get("/coins/prices");
  return data;
};

export const getCoinRanking = async () => {
  const { data } = await http.get("/coins/ranking?size=200");
  return data;
};

export const requestCreateCoinWallet = async () => {
  const { data } = await http.post("/coins", null, authorization());
  return data;
};

interface RequestTrade {
  requestAmount: number;
  marketPrice: number;
}

export const requestBuyCoin = async ({ requestAmount, marketPrice }: RequestTrade) => {
  const { data } = await http.post(
    "/coins/buy",
    {
      coinPrice: marketPrice,
      coinCount: requestAmount,
    },
    authorization(),
  );
  return data;
};

export const requestSellCoin = async ({ requestAmount, marketPrice }: RequestTrade) => {
  const { data } = await http.post(
    "/coins/sell",
    {
      coinPrice: marketPrice,
      coinCount: requestAmount,
    },
    authorization(),
  );
  return data;
};

export const requestDailyReward = async () => {
  const { data } = await http.post("/coins/daily", null, authorization());
  return data;
};

export const cancelTrade = async (id: number) => {
  const { data } = await http.delete(`/coins/${id}`, authorization());
  return data;
};
