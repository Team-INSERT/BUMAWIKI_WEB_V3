"use client";

import Container from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { coinQuery } from "@/services/coin/coin.query";
import Image from "next/image";
import Link from "next/link";
import { priceComma, calculateCoinTier } from "@/utils";
import { WalletIcon } from "@/assets";
import * as styles from "./style.css";

const CoinRanking = () => {
  const { data: rankingList, isSuccess } = useQuery(coinQuery.rank());

  if (!isSuccess) return null;
  const rankingListMax = rankingList.length;

  return (
    <Container title="부마코인 랭킹" docsType="코인">
      <Link href="/coin" className={styles.backButton}>
        뒤로가기
      </Link>
      <ul className={styles.rankingBox}>
        {rankingList.map((ranking, index) => {
          const rank = index + 1;
          const tierStyle = rank <= 2 ? rank : "default";

          return (
            <Link
              href={`/coin/trade/${ranking.coinAccountId}`}
              key={index}
              className={styles.rankingListItem}
            >
              <Image
                src={`/assets/tier/${calculateCoinTier(rankingListMax, rank)}.png`}
                width={999}
                height={999}
                alt="tier"
                className={styles.tier[tierStyle]}
              />
              <div className={styles.informationBox}>
                <hgroup className={styles.rankingListItemHGroup}>
                  <h1 className={styles.rankingListItemRankText[tierStyle]}>#{rank}</h1>
                  <span className={styles.rankingListItemNameText[tierStyle]}>
                    {ranking.username}
                  </span>
                </hgroup>
                <span className={styles.totalMoney}>
                  <WalletIcon /> {priceComma(ranking.totalMoney)}₩
                </span>
                <hgroup className={styles.rankingListItemHGroup}>
                  <main className={styles.rankingListItemBody}>
                    <Image src="/assets/bumamoney.png" width={24} height={12} alt="moneyicon" />
                    {priceComma(ranking.money)}₩
                  </main>
                  <main className={styles.rankingListItemBody}>
                    <Image src="/assets/bumacoin.png" width={18} height={18} alt="moneyicon" />
                    {priceComma(ranking.coin)}주
                  </main>
                </hgroup>
              </div>
            </Link>
          );
        })}
      </ul>
    </Container>
  );
};

export default CoinRanking;
