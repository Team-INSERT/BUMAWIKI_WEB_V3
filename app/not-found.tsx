import Container from "@/components/Container";
import { generateOpenGraph } from "@/utils";
import React from "react";

export const metadata = generateOpenGraph({
  title: "404 Not Found",
  description: "해당 페이지를 찾을 수 없습니다.",
});

const NotFound = () => {
  return (
    <Container title="404" docsType="NOT FOUND">
      해당 페이지를 찾을 수 없습니다.
    </Container>
  );
};

export default NotFound;
