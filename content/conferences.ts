import type { PaperVenue } from "./papers";

// Editorial classification based on official conference/society descriptions,
// checked 2026-10-16. It is independent of CORE rank and paper acceptance.
export const fieldLeadingConferences = {
  icwsm: {
    field: "Computational social science and social computing",
    fieldJa: "計算社会科学・ソーシャルコンピューティング",
    source: "https://www.icwsm.org/2027/",
    basis: "The organizers identify ICWSM as a premier venue in these fields.",
  },
  wsdm: {
    field: "Web search and data mining",
    fieldJa: "ウェブ検索・データマイニング",
    source: "https://www.wsdm-conference.org/2027/",
    basis: "The organizers describe WSDM as a premier conference for web search and data mining research.",
  },
  cikm: {
    field: "Information retrieval and knowledge management",
    fieldJa: "情報検索・知識管理",
    source: "https://cikm2026.diag.uniroma1.it/",
    basis: "The organizers describe CIKM as a premier forum spanning information retrieval, knowledge management, mining and databases.",
  },
  icmi: {
    field: "Multimodal interaction",
    fieldJa: "マルチモーダルインタラクション",
    source: "https://icmi.acm.org/2026/",
    basis: "The organizers identify ICMI as the premier forum for multimodal AI and social interaction.",
  },
  icassp: {
    field: "Acoustics, speech and signal processing",
    fieldJa: "音響・音声・信号処理",
    source: "https://2026.ieeeicassp.org/",
    basis: "IEEE describes ICASSP as a premier event for signal processing.",
  },
  rcis: {
    field: "Information science and information systems",
    fieldJa: "情報科学・情報システム",
    source: "https://rcis-conf.com/rcis2026/",
    basis: "The organizers describe RCIS as a leading annual event for information science and information systems.",
  },
} as const;

export type ConferenceSeries = keyof typeof fieldLeadingConferences;

export function fieldLeadingConference(
  paper: Pick<PaperVenue, "type" | "tier" | "conferenceSeries">,
) {
  // CORE A* has its own prominent badge; affiliated workshops do not inherit
  // the main conference's classification.
  if (paper.type !== "conference" || paper.tier === "core_a_star" || !paper.conferenceSeries) {
    return undefined;
  }
  return fieldLeadingConferences[paper.conferenceSeries];
}
