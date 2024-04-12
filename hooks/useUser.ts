"use client";

import { TOKEN } from "@/constants";
import { userContext } from "@/context";
import { getMyInformation } from "@/services/user/user.api";
import { Storage } from "@/storage";
import { UserType } from "@/types/user.interface";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useAtom(userContext);

  const { data: userInfo } = useQuery<UserType>({
    queryKey: ["user"],
    queryFn: getMyInformation,
    enabled: !!Storage.getItem(TOKEN.ACCESS),
  });

  useEffect(() => {
    if (userInfo) setUser(userInfo);
  }, [setUser, userInfo]);

  return {
    user,
    isLoggedIn: !!userInfo,
    isAdmin: userInfo?.authority === "ADMIN",
  };
};

export default useUser;
