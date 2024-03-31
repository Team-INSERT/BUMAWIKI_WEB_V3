"use client";

import Container from "@/components/Container";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { coinQuery } from "@/services/coin/coin.query";
import Image from "next/image";
import Link from "next/link";
import { moneyText, tierIconMaker } from "@/utils";
import * as styles from "./style.css";

const CoinRanking = () => {
  const { data: rankingList } = useSuspenseQuery(coinQuery.rank());
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
                src={`/assets/tier/${tierIconMaker(rankingListMax, rank)}.png`}
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
                <hgroup className={styles.rankingListItemHGroup}>
                  <main className={styles.rankingListItemBody}>
                    <Image src="/assets/bumamoney.png" width={30} height={15} alt="moneyicon" />
                    {moneyText(ranking.money)}₩
                  </main>
                  <main className={styles.rankingListItemBody}>
                    <Image src="/assets/bumacoin.png" width={24} height={24} alt="moneyicon" />
                    {moneyText(ranking.coin)}주
                  </main>
                </hgroup>
                <span className={styles.totalMoney}>
                  총 이익 · {moneyText(ranking.totalMoney)}₩
                </span>
              </div>
            </Link>
          );
        })}
      </ul>
    </Container>
  );
};

export default CoinRanking;
