import { useMutation } from "@tanstack/react-query";
import { requestCreateLike, requestDeleteLike } from "./like.api";

export const useCreateLikeMutation = () => {
  return useMutation({
    mutationFn: (id: number) => requestCreateLike(id),
  });
};

export const useDeleteLikeMutation = () => {
  return useMutation({
    mutationFn: (id: number) => requestDeleteLike(id),
  });
};
