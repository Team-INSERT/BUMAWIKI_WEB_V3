"use client";

import { coinQuery } from "@/services/coin/coin.query";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { priceComma } from "@/utils";
import { useDate } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import * as styles from "./style.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  pointStyle: "circle",
  pointBorderWidth: 0,
  cubicInterpolationMode: "monotone",
  plugins: { legend: { display: false }, title: { display: false } },
  interaction: { intersect: false },
};

const cycleList = [
  { name: "전체", id: "full" },
  { name: "보름", id: "halfMonth" },
  { name: "일주일", id: "week" },
  { name: "하루", id: "day" },
  { name: "12시간", id: "halfDay" },
  { name: "3시간", id: "threeHours" },
];

interface GraphProps {
  updatedAt: Date;
  marketPrice: number;
  refetch: () => void;
}

const Graph: FC<GraphProps> = ({ updatedAt, marketPrice, refetch }) => {
  const { formatDate } = useDate();
  const differenceInSeconds = dayjs().diff(dayjs(updatedAt), "second");
  const remainingSeconds = 3 * 60 - differenceInSeconds;

  const [cycle, setCycle] = useState("threeHours");
  const { data: coin, refetch: graphRefetch, isSuccess } = useQuery(coinQuery.graph(cycle));

  const labels = coin.map(({ startedTime }: { startedTime: Date }) =>
    dayjs(startedTime).format("M/D H:m"),
  );
  const data = coin.map(({ price }: { price: string }) => price);

  useEffect(() => {
    setTimeout(() => {
      refetch();
      graphRefetch();
    }, remainingSeconds * 1000);
  }, [updatedAt]);

  if (!isSuccess) return null;

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <div className={styles.chartCoinBox}>
          <Image alt="bumacoin" src="/assets/bumacoin.png" width={62} height={62} />
          <div className={styles.chartCoinInfoBox}>
            <span className={styles.chartCoinTitle}>₩{priceComma(marketPrice)}</span>
            <span className={styles.chartCoinDate}>{formatDate(updatedAt)}</span>
            <span className={styles.chartCoinDate}>3분마다 업데이트됩니다.</span>
          </div>
        </div>
        <div className={styles.categoryBox}>
          {cycleList.map((cycleItem) => {
            const className =
              cycle === cycleItem.id ? styles.category.ENABLED : styles.category.DISABLED;
            return (
              <button
                key={cycleItem.id}
                onClick={() => setCycle(cycleItem.id)}
                className={className}
              >
                {cycleItem.name}
              </button>
            );
          })}
        </div>
      </div>
      <Line
        options={options}
        data={{
          labels,
          datasets: [
            {
              data,
              fill: true,
              label: "부마코인",
              borderColor: "#274168",
              borderWidth: 1.5,
              backgroundColor: "#274168AA",
            },
          ],
        }}
      />
    </div>
  );
};

export default Graph;
