"use client";

import Container from "@/components/Container";
import { ChangeEvent, useState } from "react";
import { useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { coinQuery } from "@/services/coin/coin.query";
import Image from "next/image";
import useModal from "@/hooks/useModal";
import { toast } from "react-toastify";
import Toastify from "@/components/Toastify";
import { priceComma } from "@/utils";
import {
  useBuyCoinMutation,
  useCreateCoinWalletMutation,
  useDailyRewardMutation,
  useSellMutation,
} from "@/services/coin/coin.mutation";
import { AxiosError, isAxiosError } from "axios";
import Accordion from "@/components/Accordion";
import Link from "next/link";
import { PartyIcon, WalletIcon } from "@/assets";
import * as styles from "./style.css";
import Graph from "./Graph";
import TradeHistory from "./TradeHistory";

const tradeText: Record<
  string,
  {
    trade: string;
    before: string;
    period: string;
  }
> = {
  BUY: {
    trade: "매수",
    before: "머니",
    period: "₩",
  },
  SELL: {
    trade: "매도",
    before: "코인",
    period: "",
  },
};

const Coin = () => {
  const queryClient = useQueryClient();
  const { data: market, refetch } = useSuspenseQuery(coinQuery.price());
  const { data: wallet, error } = useQuery(coinQuery.myWallet());

  const { mutate: dailyReward } = useDailyRewardMutation();
  const { mutate: buy } = useBuyCoinMutation();
  const { mutate: sell } = useSellMutation();
  const { mutate: signup } = useCreateCoinWalletMutation();

  const { openConfirm } = useModal();
  const [tradeMode, setTradeMode] = useState("BUY");
  const [requestAmount, setRequestAmount] = useState(0);

  if (isAxiosError(error) && error.response?.data.status === 404) {
    openConfirm({
      icon: <PartyIcon />,
      content: "지금 바로 부마코인을 시작해보세요!\n기본지원금 1000만원을 드려요 😎",
      onConfirm: signup,
    });
    return <div>코인 계정 생성 후 이용해주세요.</div>;
  }

  if (!wallet) return <div>로그인 후 이용해주세요.</div>;

  const totalMoney = market.price * wallet.coin + wallet.money;
  const maxAmountMoney = Math.floor(wallet.money / market.price);
  const tradeBeforeLeftMoney = wallet.money - requestAmount * market.price;
  const tradeRequestMoney = wallet.money - tradeBeforeLeftMoney;

  const maxAmountCoin = wallet.coin;
  const tradeBeforeLeftCoin = wallet.coin - requestAmount;
  const tradeRequestCoin = requestAmount;

  const handleTradeSuccess = () => ({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["query.myWallet"] });
      queryClient.invalidateQueries({ queryKey: ["query.coinTrade", wallet.id] });
      setRequestAmount(0);
      toast(<Toastify content="성공적으로 거래를 요청했어요!" />);
    },
  });

  const handleBuyTradeButtonClick = () => {
    if (!requestAmount) return toast(<Toastify content="수량을 입력해주세요." />);
    openConfirm({
      content: `${priceComma(requestAmount)}주를 주당 ${priceComma(market.price)}원에 매수합니다.`,
      onConfirm: () => buy({ marketPrice: market.price, requestAmount }, handleTradeSuccess()),
    });
  };

  const handleSellTradeButtonClick = () => {
    if (!requestAmount) return toast(<Toastify content="수량을 입력해주세요." />);
    openConfirm({
      content: `${priceComma(requestAmount)}주를 주당 ${priceComma(market.price)}원에 매도합니다.`,
      onConfirm: () => sell({ marketPrice: market.price, requestAmount }, handleTradeSuccess()),
    });
  };

  const handleRequestAmountChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) return;
    if (tradeMode === "BUY" && amount * market.price > wallet.money) return;
    if (tradeMode === "SELL" && amount > wallet.coin) return;
    setRequestAmount(amount);
  };

  const handleDailyRewardClick = () => {
    dailyReward(undefined, {
      onSuccess: (res) => {
        toast(<Toastify content={`${priceComma(res)}원을 받았어요!`} />);
        queryClient.invalidateQueries({ queryKey: ["query.myWallet"] });
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          toast(<Toastify content={err.response?.data.message} />);
        }
      },
    });
  };

  return (
    <Container title="부마코인" docsType="코인">
      <h1 className={styles.warningText}>
        ※ 코인 가격이 0이 되면 상장 폐지되어 보유 중이던 코인이 삭제됩니다.※
      </h1>
      <div className={styles.informationContainer}>
        <div className={styles.utilityBox}>
          <Link href="/coin/rank" className={styles.tradeButton}>
            자산 랭킹
          </Link>
          <button onClick={handleDailyRewardClick} className={styles.tradeButton}>
            일일 보상 받기
          </button>
        </div>
        <div className={styles.utilityBox}>
          <div className={styles.moneyBox}>
            <div className={styles.moneyName}>보유 총액</div>
            <div className={styles.moneyAmount}>
              <WalletIcon />
              <div className={styles.moneyAmount}>{priceComma(totalMoney)}</div>
            </div>
          </div>
          <div className={styles.moneyBox}>
            <div className={styles.moneyName}>보유 코인</div>
            <div className={styles.moneyAmount}>
              <Image alt="bumacoin" src="/assets/bumacoin.png" width={20} height={20} />
              <div className={styles.moneyAmount}>{priceComma(wallet.coin)}</div>
            </div>
          </div>
          <div className={styles.moneyBox}>
            <div className={styles.moneyName}>보유 머니</div>
            <div className={styles.moneyAmount}>
              <Image alt="bumacoin" src="/assets/bumamoney.png" width={36} height={18} />
              <div className={styles.moneyAmount}>{priceComma(wallet.money)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tradeContainer}>
        <div className={styles.tradeBox}>
          <div className={styles.tradeHeader}>
            <div
              className={styles.tradeToggle[tradeMode === "BUY" ? tradeMode : "DISABLED"]}
              onClick={() => {
                setTradeMode("BUY");
                setRequestAmount(0);
              }}
            >
              BMC 매수
            </div>
            <div
              className={styles.tradeToggle[tradeMode === "SELL" ? tradeMode : "DISABLED"]}
              onClick={() => {
                setTradeMode("SELL");
                setRequestAmount(0);
              }}
            >
              BMC 매도
            </div>
          </div>
          <figure className={styles.tradeFieldBox}>
            <h1 className={styles.tradeName}>가격</h1>
            <span className={styles.tradeItem}>
              1 BMC &nbsp;=&nbsp; ₩{priceComma(market.price)}
            </span>
          </figure>
          <figure className={styles.tradeFieldBox}>
            <h1 className={styles.tradeName}>{tradeText[tradeMode].trade} 가능</h1>
            <span className={styles.tradeItem}>
              {priceComma(tradeMode === "BUY" ? maxAmountMoney : maxAmountCoin)}주
            </span>
          </figure>
          <figure className={styles.tradeFieldBox}>
            <h1 className={styles.tradeName}>{tradeText[tradeMode].trade} 수량</h1>
            {tradeMode === "BUY" ? (
              <input
                className={styles.tradeInput}
                onChange={handleRequestAmountChange}
                value={requestAmount}
              />
            ) : (
              <input
                className={styles.tradeInput}
                onChange={handleRequestAmountChange}
                value={requestAmount}
              />
            )}
            <span className={styles.tradeInformation}>주</span>
            <span className={styles.tradeDescription}>
              총 {priceComma(tradeMode === "BUY" ? maxAmountMoney : maxAmountCoin)}주를{" "}
              {tradeText[tradeMode].trade}할 수 있어요
            </span>
          </figure>
          <figure className={styles.tradeFieldBox}>
            <div className={styles.tradeName}>총 거래 {tradeText[tradeMode].before}</div>
            <span className={styles.tradeItem}>
              {tradeText[tradeMode].period}
              {priceComma(tradeMode === "BUY" ? tradeRequestMoney : tradeRequestCoin)}
            </span>
          </figure>
          <figure className={styles.tradeFieldBox}>
            <div className={styles.tradeName}>거래 후 보유 {tradeText[tradeMode].before}</div>
            <span className={styles.tradeItem}>
              {tradeText[tradeMode].period}
              {priceComma(tradeMode === "BUY" ? tradeBeforeLeftMoney : tradeBeforeLeftCoin)}
            </span>
          </figure>
          {tradeMode === "SELL" && (
            <figure className={styles.tradeFieldBox}>
              <div className={styles.tradeName}>총 매도 이익</div>
              <span className={styles.tradeItem}>₩{priceComma(requestAmount * market.price)}</span>
            </figure>
          )}
          {tradeMode === "BUY" ? (
            <button onClick={handleBuyTradeButtonClick} className={styles.tradeButton}>
              매수
            </button>
          ) : (
            <button onClick={handleSellTradeButtonClick} className={styles.tradeButton}>
              매도
            </button>
          )}
        </div>
      </div>
      <Graph
        refetch={() => {
          refetch();
        }}
        updatedAt={market.startedTime}
        marketPrice={market.price}
      />
      <Accordion title="거래 내역 보기" open={false}>
        <TradeHistory id={wallet.id} />
      </Accordion>
    </Container>
  );
};

export default Coin;
