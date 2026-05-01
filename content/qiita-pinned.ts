// Qiita pinned ("pickup") posts. The Qiita API does not expose the
// pinned flag, so we curate it here. Order matches the order shown
// on https://qiita.com/Humanophilic_development.

export type PinnedQiita = {
  id: string;
  minViews: number;
};

export const pinnedQiita: PinnedQiita[] = [
  { id: "1747a9a07be57e8ecf6c", minViews: 10000 },
  { id: "b416c443d9f52d04eaae", minViews: 10000 },
];
