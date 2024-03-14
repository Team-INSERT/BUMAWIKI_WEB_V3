"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { MoonLoader } from "react-spinners";
import { theme } from "@/styles";
import { useLoginMutation } from "@/services/auth/auth.mutation";
import * as styles from "./style.css";

const OAuth = () => {
  const authCode = useSearchParams().get("code") || "";
  const { mutate } = useLoginMutation();

  useEffect(() => {
    mutate(authCode);
  }, []);

  return (
    <div className={styles.container}>
      <MoonLoader size={40} color={theme.primary} />
      <span className={styles.loadingText}>로그인 중...</span>
    </div>
  );
};

export default OAuth;
