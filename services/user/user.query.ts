import getQueryClient from "@/app/getQueryClient";
import { useQuery } from "@tanstack/react-query";
import { getMyInformation, getUserById } from "./user.api";
import { USER } from "./user.key";

export const useMyInformationQuery = () => {
  return useQuery({
    queryKey: USER.MY,
    queryFn: getMyInformation,
  });
};

export const useUserByIdQuery = ({ id }: { id: number }) => {
  const queryClient = getQueryClient();
  return queryClient.fetchQuery({
    queryKey: USER.ID(id),
    queryFn: () => getUserById(id),
  });
};
