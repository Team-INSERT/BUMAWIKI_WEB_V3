"use client";

import { DocsItem } from "@/types/docsItem.interface";
import React from "react";

interface DocsProps {
  docs: DocsItem;
}

const Docs = ({ docs }: DocsProps) => {
  return <div>{JSON.stringify(docs)}</div>;
};

export default Docs;
