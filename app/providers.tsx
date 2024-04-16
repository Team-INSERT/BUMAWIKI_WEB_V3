"use client";

import { PropsWithChildren, useState } from "react";
import { Provider as JotaiProvider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ToastContainer } from "react-toastify";
import "dayjs/locale/ko";

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    // lazy initialization
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 0,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        closeButton={false}
        className="toastify"
      />
      <JotaiProvider>{children}</JotaiProvider>
    </QueryClientProvider>
  );
};

export default Providers;
