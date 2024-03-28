export interface TradeType {
  id: number;
  coinPrice: number;
  coinCount: number;
  usedMoney: number;
  tradeStatus: "BUYING" | "SELLING" | "SOLD" | "BOUGHT" | "CANCELLED" | "NONE";
  coinAccountId: 1;
  tradedTime: Date;
}
