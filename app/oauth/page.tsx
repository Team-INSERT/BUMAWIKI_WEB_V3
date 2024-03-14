import React, { Suspense } from "react";
import OAuth from "./OAuth";

const Page = () => {
  return (
    <Suspense>
      <OAuth />
    </Suspense>
  );
};

export default Page;
