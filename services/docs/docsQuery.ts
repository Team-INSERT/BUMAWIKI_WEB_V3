import DocsService from "./DocsService";

const queryKeys = {
  list: (classify: string) => ["list", classify] as const,
  docs: (title: string) => ["docs", title] as const,
};

export const docsQuery = {
  getList: (classify: string) => ({
    queryKey: queryKeys.list(classify),
    queryFn: () => DocsService.getList(classify).then((r) => r.data),
  }),

  getByTitle: (title: string) => ({
    queryKey: queryKeys.docs(title),
    queryFn: () => DocsService.getByTitle(title).then((r) => r.data),
  }),

  getByKeyword: (keyword: string) => ({
    queryKey: queryKeys.docs(keyword),
    queryFn: () => DocsService.getByKeyword(keyword).then((r) => r.data),
  }),

  getLastModifiedAt: (page: number) => ({
    queryKey: queryKeys.docs(`lastModifiedAt ${page}`),
    queryFn: () => DocsService.getLastModifiedAt(page).then((r) => r.data),
  }),

  create: () => ({
    mutationFn: () => DocsService.create().then((r) => r.data),
  }),

  update: (title: string) => ({
    mutationFn: () => DocsService.update(title).then((r) => r.data),
  }),

  updateTitle: (title: string, titleToChange: string) => ({
    mutationFn: () =>
      DocsService.updateTitle(title, titleToChange).then((r) => r.data),
  }),

  remove: (id: number) => ({
    mutationFn: () => DocsService.remove(id).then((r) => r.data),
  }),
};
