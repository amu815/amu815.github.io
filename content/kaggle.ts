export type KaggleStatus = "active" | "completed";
export type KaggleCompType = "Featured" | "Research" | "Playground" | "Community";
export type KaggleMedal = "gold" | "silver" | "bronze";

export type KaggleEntry = {
  id: string;
  title: string;
  series?: string;
  type: KaggleCompType;
  href: string;
  status: KaggleStatus;
  rank?: number;
  teams?: number;
  medal?: KaggleMedal;
  noteEn?: string;
  noteJa?: string;
};

export const kaggleProfile = {
  username: "amusuemotoarakawalab",
  displayName: "Amu Suemoto",
  href: "https://www.kaggle.com/amusuemotoarakawalab",
};

export const kaggleEntries: KaggleEntry[] = [
  {
    id: "nemotron-2026",
    title: "NVIDIA Nemotron Model Reasoning Challenge",
    type: "Featured",
    href: "https://www.kaggle.com/competitions/nvidia-nemotron-model-reasoning-challenge",
    status: "active",
    noteEn: "Ongoing — about a month remaining at last check.",
    noteJa: "進行中。残り約 1 ヶ月（最終確認時点）。",
  },
  {
    id: "playground-s6e4",
    title: "Predicting Irrigation Need",
    series: "Playground Series — Season 6 Episode 4",
    type: "Playground",
    href: "https://www.kaggle.com/competitions/playground-series-s6e4",
    status: "completed",
    rank: 554,
    teams: 4315,
  },
];

export function percentile(rank: number, teams: number): number {
  return (rank / teams) * 100;
}
