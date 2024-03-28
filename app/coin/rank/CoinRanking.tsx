"use client";

import Container from "@/components/Container";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { coinQuery } from "@/services/coin/coin.query";
import Image from "next/image";
import Link from "next/link";
import { moneyText } from "@/utils";
import * as styles from "./style.css";

const CoinRanking = () => {
  const { data: rankingList } = useSuspenseQuery(coinQuery.rank());

  return (
    <Container title="부마코인 랭킹" docsType="코인">
      <Link href="/coin" className={styles.backButton}>
        뒤로가기
      </Link>
      <ul className={styles.rankingBox}>
        {rankingList
          .concat(rankingList)
          .concat(rankingList)
          .concat(rankingList)
          .concat(rankingList)
          .concat(rankingList)
          .concat(rankingList)
          .concat(rankingList)
          .map((ranking, index) => (
            <li key={index} className={styles.rankingListItem}>
              <hgroup className={styles.rankingListItemHGroup}>
                <h1 className={styles.rankingListItemRankText}>#{index + 1}</h1>
                <span className={styles.rankingListItemNameText}>{ranking.username}</span>
              </hgroup>
              <main className={styles.rankingListItemBody}>
                <Image src="/assets/bumamoney.png" width={40} height={20} alt="moneyicon" />
                {moneyText(ranking.totalMoney)}₩
              </main>
            </li>
          ))}
      </ul>
    </Container>
  );
};

export default CoinRanking;
