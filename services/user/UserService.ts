import { HttpClient } from "@/apis/httpClient";
import { TOKEN } from "@/constants/token.constant";
import { Storage } from "@/storage";

class UserService extends HttpClient {
  getMyInfo() {
    return this.get(`/`, {
      headers: { Authorization: Storage.getItem(TOKEN.ACCESS) },
    });
  }

  getUser(id: number) {
    return this.get(`/id/${id}`);
  }
}

export default new UserService("api/user");
