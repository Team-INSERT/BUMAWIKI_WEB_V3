"use client";

import { DocsListItem } from "@/types/docsListItem.interface";
import React from "react";

interface DocsListProps {
  docsList: Array<DocsListItem>;
}

const DocsList = ({ docsList }: DocsListProps) => {
  return <div>{JSON.stringify(docsList)}</div>;
};

export default DocsList;
