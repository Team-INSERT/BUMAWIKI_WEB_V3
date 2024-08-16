import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { getMyInformation } from "@/services/user/user.api";
import { Storage } from "@/storage";
import { PropsWithChildren } from "react";
import useUser from "./useUser";

jest.mock("../services/user/user.api.ts", () => ({ getMyInformation: jest.fn() }));
jest.mock("../storage", () => ({ Storage: { getItem: jest.fn() } }));

const TestWrapper = ({ children }: PropsWithChildren) => (
  <Provider>
    <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
  </Provider>
);

describe("useUser", () => {
  it("액세스 토큰을 소유하지 않은 유저는 로그인이 되지 않은 유저로 간주한다", async () => {
    const emptyUser = {
      authority: "",
      contributeDocs: [],
      email: "",
      id: 0,
      isLogin: false,
      name: "",
      nickName: "",
    };

    (getMyInformation as jest.Mock).mockResolvedValue(null);
    (Storage.getItem as jest.Mock).mockReturnValue(null);
    const { result } = renderHook(() => useUser(), { wrapper: TestWrapper });

    await act(async () => {
      await waitFor(() => {
        expect(result.current.user).toStrictEqual(emptyUser);
        expect(result.current.isLoggedIn).toBe(false);
        expect(result.current.isAdmin).toBe(false);
      });
    });
  });
});
