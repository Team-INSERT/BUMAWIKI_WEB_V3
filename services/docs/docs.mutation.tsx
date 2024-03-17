import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Toastify from "@/components/Toastify";
import {
  requestCreateDocs,
  requestDeleteDocs,
  requestUpdateDocs,
  requestUploadImage,
} from "./docs.api";

export const useCreateDocsMutation = () => {
  return useMutation({
    mutationFn: requestCreateDocs,
  });
};

export const useUpdateDocsMutation = () => {
  return useMutation({
    mutationFn: requestUpdateDocs,
  });
};

export const useDeleteDocsMutation = () => {
  return useMutation({
    mutationFn: requestDeleteDocs,
    onSuccess: () => {
      toast(<Toastify content="성공" />);
      window.location.href = "/";
    },
  });
};

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: requestUploadImage,
  });
};
