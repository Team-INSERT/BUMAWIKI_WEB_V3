import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// 서버사이드에서 React Query prefetch를 진행하기 위함
const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
