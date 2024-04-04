import { coinQuery } from "@/services/coin/coin.query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { dateText, moneyText, tradeStatusText } from "@/utils";
import Image from "next/image";
import { useCancelTradeMutation } from "@/services/coin/coin.mutation";
import { toast } from "react-toastify";
import Toastify from "@/components/Toastify";
import * as styles from "./TradeHistory.css";

const TradeHistory: FC<{ id: number }> = ({ id }) => {
  const { data: tradeList, isSuccess } = useQuery(coinQuery.trade(id));
  const { mutate } = useCancelTradeMutation();
  const queryClient = useQueryClient();

  const handleCancelTradeClick = (tradeId: number) => {
    mutate(tradeId, {
      onSuccess: () => {
        toast(<Toastify content="거래를 취소했어요!" />);
        queryClient.invalidateQueries({ queryKey: ["query.graph"] });
        queryClient.invalidateQueries({ queryKey: ["query.myWallet"] });
        queryClient.invalidateQueries({ queryKey: ["query.coinTrade", id] });
        queryClient.invalidateQueries({ queryKey: ["query.price"] });
      },
    });
  };
  return (
    <div>
      {isSuccess &&
        tradeList.map((trade) => (
          <div className={styles.tradeListBox} key={trade.id}>
            <div className={styles.hgroup}>
              <div className={styles.tradeStatusCircle[trade.tradeStatus]} />
              <h1 className={styles.tradeId}>
                {tradeStatusText(trade.tradeStatus)}#{trade.id}
              </h1>
              {trade.tradedTime && (
                <span className={styles.createdAt}>
                  거래일 ·&nbsp;
                  {dateText(trade.tradedTime)}
                </span>
              )}
            </div>
            <div className={styles.informationBox}>
              <span className={styles.informationText}>
                <Image src="/assets/bumamoney.png" alt="money" width={30} height={15} />
                {moneyText(trade.coinPrice)}
              </span>
              <span className={styles.informationText}>
                <Image src="/assets/bumacoin.png" alt="money" width={18} height={18} />
                {moneyText(trade.coinCount)}
              </span>
            </div>
            <span className={styles.informationText}>
              총 거래 금액 · {moneyText(trade.usedMoney)}
            </span>
            {["BUYING", "SELLING"].includes(trade.tradeStatus) && (
              <div onClick={() => handleCancelTradeClick(trade.id)} className={styles.cancelButton}>
                취소
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default TradeHistory;
