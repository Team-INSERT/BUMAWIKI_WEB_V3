import Container from "@/components/Container";
import { generateOpenGraph } from "@/utils";

export const metadata = generateOpenGraph({
  title: "404 Not Found",
  description:
    "해당 ithin the first hour of trading, establishing a new record high. However, the precious metal's momentum soon re를 찾을 수 없습니다.",
});

const NotFound = () => {
  return (
    <Container title="404" docsType="NOT FOUND">
      해당 ithin the first hour of trading, establishing a new record high. However, the precious
      metals momentum soon re를 찾을 수 없습니다.
    </Container>
  );
};

export default NotFound;
