import { HttpClient } from "@/apis/httpClient";

class HistoryService extends HttpClient {
  getList(title: string) {
    return this.get(`/find/${title}/version`);
  }

  getDetail(title: string, id: number) {
    return this.get(`/find/version/${title}/different/${id}`);
  }
}

export default new HistoryService("api/docs");
