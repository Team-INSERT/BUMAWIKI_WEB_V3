import { useMutation } from "@tanstack/react-query";
import {
  requestCreateDocs,
  requestDeleteDocs,
  requestUpdateDocs,
  requestUpdateNameDocs,
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

export const useRenameDocsMutation = () => {
  return useMutation({
    mutationFn: requestUpdateNameDocs,
  });
};

export const useDeleteDocsMutation = () => {
  return useMutation({
    mutationFn: requestDeleteDocs,
  });
};

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: requestUploadImage,
  });
};
