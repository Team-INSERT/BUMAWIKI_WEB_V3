import { HttpClient } from "@/apis/httpClient";

class DocsService extends HttpClient {
  getList(classify: string) {
    return this.get(`/${classify}`);
  }

  getByTitle(title: string) {
    return this.get(`/find/title/${title}`);
  }

  getByKeyword(keyword: string) {
    return this.get(`/find/all/title/${keyword}`);
  }

  getLastModifiedAt(page: number) {
    return this.get(`/find/modified?page=${page}`);
  }

  create() {
    return this.post("/create", null);
  }

  update(title: string) {
    return this.put(`/update/${title}`, null);
  }

  updateTitle(title: string, titleToChange: string) {
    return this.put(`/update/title/${title}`, { title: titleToChange });
  }

  remove(id: number) {
    return this.delete(`/delete/${id}`);
  }
}

export default new DocsService("api/docs");
