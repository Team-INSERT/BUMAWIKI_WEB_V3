import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "@/hooks";
import {
  cancelTrade,
  requestBuyCoin,
  requestCreateCoinWallet,
  requestDailyReward,
  requestSellCoin,
} from "./coin.api";

export const useCreateCoinWalletMutation = () => {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestCreateCoinWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["query.myWallet"] });
      closeModal();
    },
  });
};

export const useBuyCoinMutation = () => {
  return useMutation({
    mutationFn: requestBuyCoin,
  });
};

export const useSellMutation = () => {
  return useMutation({
    mutationFn: requestSellCoin,
  });
};

export const useDailyRewardMutation = () => {
  return useMutation({
    mutationFn: requestDailyReward,
  });
};

export const useCancelTradeMutation = () => {
  return useMutation({
    mutationFn: cancelTrade,
  });
};
