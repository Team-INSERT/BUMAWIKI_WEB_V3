interface Config {
  baseURL: string;
  nodeEnv: "development" | "production" | "test";
  clientUrl: string;
  serviceName: string;
  description: string;
  warningDescription: string;
}

const createConfig: () => Config = () => {
  if (!process.env.NEXT_PUBLIC_SERVER_URL) throw new Error("no api server url");
  if (!process.env.NODE_ENV) throw new Error("no node env");

  return {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    nodeEnv: process.env.NODE_ENV,
    clientUrl: typeof window !== "undefined" ? window.location.origin : "",
    serviceName: "부마위키",
    description: `환영합니다! 창의와 성실로 꿈을 펼치는 부산소프트웨어마이스터고등학교입니다.
    부산소프트웨어마이스터고등학교 학생이라면 누구나 문서를 편집하고 작성할 수 있습니다.
    사실에 근거하고 남을 비방하거나 칭찬하지 않는 선에서 자유롭게 문서를 편집할 수 있습니다.
    문의 및 문서삭제는 bumawiki@gmail.com으로 요청하실 수 있습니다.`,
    warningDescription: `교내의 모든 유/무선 네트워크 정보는 국가정보원 『국가·공공기관의 무선망 구축 보안 가이드라인, 국가정보보안 기본지침』과, 
    교육부 『정보보안기본지침』에 따라 대외비로 관리되고 있으니 절대로 기재해서는 안 됩니다.`,
  };
};

export default createConfig();
