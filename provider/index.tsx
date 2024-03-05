import React, { PropsWithChildren } from "react";
import { Provider as JotaiProvider } from "jotai";
import ReactQueryProvider from "./ReactQueryProvider";
import LayoutProvider from "./LayoutProvider";

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <JotaiProvider>
        <LayoutProvider>{children}</LayoutProvider>
      </JotaiProvider>
    </ReactQueryProvider>
  );
};

export default AppProvider;
