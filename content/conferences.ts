import type { PaperVenue } from "./papers";

export const conferenceBadgePolicyUrl =
  "https://github.com/amu815/amu815.github.io/blob/main/README.md";

// Editorial classification, not a universal ranking or measured public opinion.
// README.md defines the threshold and documents each source's scope/limitations.
// Keep withheld assessments so missing evidence is not mistaken for approval.
export const conferenceAssessments = {
  icwsm: {
    decision: "field_leading",
    reviewedOn: "2026-10-16",
    field: "Computational social science and social computing",
    fieldJa: "計算社会科学・ソーシャルコンピューティング",
    basis: "Michigan's promotion evaluation and a research report in NII's annual report independently identify ICWSM among top conferences in the relevant fields.",
    sources: [
      { publisher: "University of Michigan", document: "2020 promotion recommendation, PDF p. 3", url: "https://regents.umich.edu/files/meetings/05-20/assets/reports/Romero%2C%20Daniel%20M..pdf#page=3" },
      { publisher: "National Institute of Informatics", document: "FY2016 annual report, printed p. 118 (researcher activity report, not an NII ranking)", url: "https://repository.nii.ac.jp/record/1213/files/H28-nenpou.pdf#page=123" },
    ],
  },
  wsdm: {
    decision: "field_leading",
    reviewedOn: "2026-10-16",
    field: "Web search and data mining",
    fieldJa: "ウェブ検索・データマイニング",
    basis: "Michigan's promotion evaluation includes Web Search and Data Mining among top conferences; Hokkaido University's research group independently calls WSDM a top data-mining conference.",
    sources: [
      { publisher: "University of Michigan", document: "2020 promotion recommendation, PDF p. 3 (computational social science context)", url: "https://regents.umich.edu/files/meetings/05-20/assets/reports/Romero%2C%20Daniel%20M..pdf#page=3" },
      { publisher: "Hokkaido University, Laboratory of Media Dynamics", document: "2025-12-05 WSDM 2026 research news (supplementary institutional publicity)", url: "https://www-lmd.ist.hokudai.ac.jp/news/22353/" },
    ],
  },
  cikm: {
    decision: "field_leading",
    reviewedOn: "2026-10-16",
    field: "Information retrieval and knowledge management",
    fieldJa: "情報検索・知識管理",
    basis: "A University of Tokyo annual research report and a Penn State research dean's statement independently place CIKM among top conferences in data science or information retrieval and knowledge management.",
    sources: [
      { publisher: "University of Tokyo, Information Technology Center", document: "FY2021 annual report, printed p. 88 (research report, not a university-wide ranking)", url: "https://www.itc.u-tokyo.ac.jp/Annual_Report/no22/AnnualReportNo22_v20231010.pdf#page=93" },
      { publisher: "Penn State University", document: "2019 research news quoting associate dean Prasenjit Mitra", url: "https://www.psu.edu/news/research/story/ist-research-well-represented-top-information-retrieval-conference" },
    ],
  },
  icmi: {
    decision: "field_leading",
    reviewedOn: "2026-10-16",
    field: "Multimodal interaction",
    fieldJa: "マルチモーダルインタラクション",
    basis: "JST CRDS's field survey identifies ICMI among top dialogue conferences; JAIST independently identifies it as a top multimodal-interaction conference. FIT's nominated target list also includes ICMI.",
    sources: [
      { publisher: "JST CRDS", document: "2021 AI research survey, printed p. 72, Figure 2-3 (verified visually; diagram text is not extracted)", url: "https://www.jst.go.jp/crds/pdf/2021/RR/CRDS-FY2021-RR-01.pdf#page=79" },
      { publisher: "JAIST", document: "2022-12-07 award news (supplementary institutional publicity)", url: "https://www.jaist.ac.jp/whatsnew/award/2022/12/07-1.html" },
      { publisher: "IPSJ / IEICE, FIT", document: "FIT2023 target nominations, PDF p. 2, hosted with FIT2024 materials (not a worldwide ranking)", url: "https://www.ipsj.or.jp/event/fit/fit2024/sample/FITmtg/tantouPDF/S06.pdf#page=2" },
    ],
  },
  icassp: {
    decision: "field_leading",
    reviewedOn: "2026-10-16",
    field: "Acoustics, speech and signal processing",
    fieldJa: "音響・音声・信号処理",
    basis: "IEEE SPS formally designates ICASSP a flagship in its governance manual; independent Tokyo teaching materials and Meiji research news identify it as a top speech/signal-processing conference.",
    sources: [
      { publisher: "IEEE Signal Processing Society", document: "Policy and Procedures Manual, 2026-02-03, p. 130 (formal governance; IEEE is affiliated with ICASSP)", url: "https://signalprocessingsociety.org/sites/default/files/2026-02/SPS%20Policy%20and%20Procedures-3Feb2026.pdf#page=130" },
      { publisher: "University of Tokyo", document: "2018 graduate signal-processing course assignment, p. 3", url: "https://www.sp.ipc.i.u-tokyo.ac.jp/~saruwatari/SP-Grad2018-report2.pdf#page=3" },
      { publisher: "Meiji University", document: "2026 ICASSP research news (independent corroboration)", url: "https://www.meiji.ac.jp/sst/information/8dafyd7i3rw3cgj.html" },
    ],
  },
  rcis: {
    decision: "withheld",
    reviewedOn: "2026-10-16",
    field: "Information science and information systems",
    fieldJa: "情報科学・情報システム",
    basis: "The organizer's leading-event description does not meet the two-institution threshold. Withhold pending independent evidence; this is not a finding of low quality, and CORE B is not the reason.",
    sources: [
      { publisher: "RCIS organizers", document: "2026 conference self-description; insufficient by itself", url: "https://rcis-conf.com/rcis2026/" },
    ],
  },
} as const;

export type ConferenceSeries = keyof typeof conferenceAssessments;

export function fieldLeadingConference(
  paper: Pick<PaperVenue, "type" | "tier" | "conferenceSeries">,
) {
  // A* uses its own prominent badge. Workshops do not inherit main-event status.
  if (paper.type !== "conference" || paper.tier === "core_a_star" || !paper.conferenceSeries) {
    return undefined;
  }
  const assessment = conferenceAssessments[paper.conferenceSeries];
  return assessment.decision === "field_leading" ? assessment : undefined;
}
