import EditorContainer from "@/components/Editor";
import { generateOpenGraph } from "@/utils";

export const metadata = generateOpenGraph({
  title: "문서 생성",
  description: "부마위키 문서 생성 페이지입니다.",
});

const Page = () => {
  return <EditorContainer mode="CREATE" />;
};

export default Page;
