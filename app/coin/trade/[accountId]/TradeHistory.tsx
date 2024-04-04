"use client";

import { FC } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { coinQuery } from "@/services/coin/coin.query";
import { dateText, moneyText, tradeStatusText } from "@/utils";
import Image from "next/image";
import Container from "@/components/Container";
import * as styles from "../../TradeHistory.css";

const Trade: FC<{ accountId: number }> = ({ accountId }) => {
  const { data: tradeList } = useSuspenseQuery(coinQuery.trade(accountId));
  return (
    <Container docsType="코인" title={`통장#${accountId}`}>
      {tradeList.map((trade) => (
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
        </div>
      ))}
    </Container>
  );
};

export default Trade;
