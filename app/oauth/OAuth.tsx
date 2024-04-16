"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
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
    <main className={styles.container}>
      <MoonLoader size={40} color={theme.primary} />
      <span className={styles.loadingText}>로그인 중...</span>
    </main>
  );
};

export default OAuth;
