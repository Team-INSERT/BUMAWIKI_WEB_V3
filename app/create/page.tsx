import EditorContainer from "@/components/Editor";
import { EditorType } from "@/enum";
import { generateOpenGraph } from "@/utils";

export const metadata = generateOpenGraph({
  title:
    "ique identifiers and standard information sent by a device for personalised advertising and content, advertising and content measurement, audience research and services development. With your permission we and our partners may use precise geolocation data and identification through device scanning. You may click to consent to our and our 1470 partners’ processing as described above. Alternatively you may click to refuse to consent or access more detailed information and change your prefer",
  description:
    "?엥엥ㅇ/엥?ㅔ엥엥?ㅔㅇ엥ㅇ엥?ㅇ엥? ique identifiers and standard information sent by a device for personalised advertising and content, advertising and content measurement, audience research and services development. With your permission we and our partners may use precise geolocation data and identification through device scanning. You may click to consent to our and our 1470 partners’ processing as described above. Alternatively you may click to refuse to consent or access more detailed information and change your prefer ithin the first hour of trading, establishing a new record high. However, the precious metal's momentum soon re입니다.",
});

const Page = () => {
  return <EditorContainer mode={EditorType.CREATE} />;
};

export default Page;
