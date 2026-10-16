# amu815.github.io

Personal site for [@amu815](https://github.com/amu815). Bilingual (EN / JA), built with Next.js 16 App Router + Tailwind CSS v4, exported as a static site and deployed to GitHub Pages.

- Live: https://amu815.github.io/
- JA: https://amu815.github.io/ja/

## Develop

```bash
bun install
bun dev        # http://localhost:3000
bun run build  # emits ./out
```

## Deploy

Pushed commits to `main` trigger `.github/workflows/deploy.yml`, which builds with Bun and publishes `out/` via `actions/deploy-pages`. Enable **Settings → Pages → Source = "GitHub Actions"** once on a fresh repo.

## Structure

- `app/page.tsx` — English root (`/`)
- `app/ja/page.tsx` — Japanese (`/ja/`)
- `components/` — shared sections (Hero, Stats, Publications, Skills, …)
- `content/dict.ts` — bilingual string dictionary
- `public/.nojekyll` — required so Pages serves `_next/*`

## Conference badge policy

確認日 / Reviewed: **2026-10-16**

「分野トップカンファレンス」は、明示した専門分野でトップ層の発表先として扱われている会議を示す、このサイトの編集上の分類です。世界共通の認定、分野内の単独1位、CORE A*相当を意味しません。「世論」の代わりに確認可能な**研究コミュニティの評価の一致**を用います。研究者全体への世論調査や代表標本による測定は行っていません。

“Leading Conference in the Field” is this site's editorial classification of a leading group of venues within the stated field. It is not a universal certification, a claim of first place, or equivalence to CORE A*. We use corroborated academic recognition as a proxy for community standing, not a measured opinion poll.

### 判断基準 / Evidence threshold

1. **異なる2機関以上の明示的な評価**を必要とする。少なくとも1件は、研究評価文書、分野俯瞰調査、学会の正式な運営規程、研究機関の研究報告、または大学の授業資料とする。少なくとも1機関は会議主催者から独立していること。同じ紹介文の転載は1件と数える。
2. 主催者の `premier` / `leading` という宣伝文、個人の経歴、採択・受賞の広報記事**だけ**では付与しない。広報記事は補強資料として扱う。公的機関のサイトに載っていても、研究者による成果報告を機関全体の公式ランキングと読み替えない。
3. 出典が対象にしている専門分野に範囲を限定する。COREのランク、採択率、引用数の単一指標だけでは決めない。**CORE Bも対象になり得る**。CORE A*には分野バッジを重ねず、A*バッジを大きく表示する。
4. 出典間の食い違い、対象分野、資料の古さ、発信者の利害を確認する。必要な裏付けが不足する場合は保留とし、証拠がないことを低品質の証明にはしない。古い資料は継続的な評価の証拠として扱い、現在の評価を永久に保証するものとは扱わない。
5. 会議シリーズ、分野、判断、出典の該当箇所、確認日を `content/conferences.ts` と本項に記録する。新年度の会議追加時、反対の根拠が見つかった時、年次メンテナンス時に再確認する。本会議の評価を併設ワークショップには引き継がない。論文の採否・受賞とは独立した表示とし、金色は受賞・金銭的支援を伴う採択に限定する。

In English: require explicit recognition from at least two distinct academic institutions, with at least one substantive assessment, research survey/report, society governance document, or teaching source, and at least one organizer-independent source. Marketing, biographies, and acceptance/award news alone are insufficient. Scope the claim to the documented field, consider conflicting evidence and source limitations, withhold when evidence is insufficient, and review on each new conference year and annual maintenance. CORE B can qualify; CORE A* receives only its enlarged rank badge.

### 調査範囲と限界 / Scope and limitations

対象はサイトに掲載されているA*以外の国際会議6シリーズ。会議・学会の資料に加え、学術機関の評価・報告・教育資料を確認した。COREは別の評価軸として扱い、特定ランクをこの分類の自動条件にしない。[CSRankingsの選定方針](https://csrankings.org/faq.html)も確認したが、分野ごとに対象会議を絞る制度なので、その掲載有無をすべての専門分野に通用する判定とは扱わない。以下は資料に基づく編集判断であり、網羅的な計量書誌学的調査ではない。研究成果の広報を含むため、出典を複数化しても利害や選択の偏りが完全になくなるわけではない。

This review covers the six non-A* international conference series listed on the site. It is an evidence-based editorial assessment, not an exhaustive bibliometric study. Institutional publicity may have incentives; corroboration does not eliminate all selection bias. Historical sources and their original scope are identified below.

### ICWSM

**付与 / Qualifies — 計算社会科学・ソーシャルコンピューティング / Computational social science and social computing.**

[ミシガン大学の昇進評価文書（2020年、PDF 3ページ）](https://regents.umich.edu/files/meetings/05-20/assets/reports/Romero%2C%20Daniel%20M..pdf#page=3)は、計算社会科学のトップ会議群にICWSMを挙げる。[NII平成28年度年報（本文118ページ、PDF 123ページ）](https://repository.nii.ac.jp/record/1213/files/H28-nenpou.pdf#page=123)にもWeb情報学のトップ会議としての記載がある。後者は年報内の研究活動報告であり、NIIによる独立した会議ランキングではない。異なる機関・文脈での明示的な評価の一致を根拠とする。

### WSDM

**付与 / Qualifies — ウェブ検索・データマイニング / Web search and data mining.**

[ミシガン大学の昇進評価文書（2020年、PDF 3ページ）](https://regents.umich.edu/files/meetings/05-20/assets/reports/Romero%2C%20Daniel%20M..pdf#page=3)はWeb Search and Data Miningをトップ会議群に含める。ただし同文書の文脈は計算社会科学。[北海道大学メディアダイナミクス研究室の2025年12月5日の記事](https://www-lmd.ist.hokudai.ac.jp/news/22353/)はWSDM 2026をデータマイニング分野のトップ会議と明示する。後者は採択広報なので単独では使わず、前者と照合した。Short Paperの記事からFull Paperの採択率や論文の評価を推定してはいない。

### CIKM

**付与 / Qualifies — 情報検索・知識管理 / Information retrieval and knowledge management.**

[東京大学情報基盤センター2021年度年報（本文88ページ、PDF 93ページ）](https://www.itc.u-tokyo.ac.jp/Annual_Report/no22/AnnualReportNo22_v20231010.pdf#page=93)はCIKMをデータサイエンスのトップ会議群に含める。[Penn Stateの研究紹介（2019年）](https://www.psu.edu/news/research/story/ist-research-well-represented-top-information-retrieval-conference)では研究担当副学部長Prasenjit Mitraが情報検索・知識管理分野のトップ会議の一つと明言している。前者は研究報告、後者は専門家の評価を含む機関広報であり、大学全体の公式順位表とは扱わない。

### ICMI

**付与 / Qualifies — マルチモーダルインタラクション / Multimodal interaction.**

[JST CRDS『人工知能研究の新潮流～日本の勝ち筋～』（2021年、本文72ページ・図2-3、PDF 79ページ）](https://www.jst.go.jp/crds/pdf/2021/RR/CRDS-FY2021-RR-01.pdf#page=79)は対話エージェントのトップ会議にICMIを挙げる。PDFの本文抽出で落ちる図内の記載も目視確認した。[JAISTの2022年12月7日の記事](https://www.jaist.ac.jp/whatsnew/award/2022/12/07-1.html)はマルチモーダルインタラクション分野のトップ会議と明示する。[FITの対象候補資料（PDF 2ページ）](https://www.ipsj.or.jp/event/fit/fit2024/sample/FITmtg/tantouPDF/S06.pdf#page=2)にもICMIがあるが、これは「FIT2023」と題する募集結果をFIT2024の資料として掲載したものであり、別の世界ランキングとは扱わない。JSTの分野調査とJAISTの評価を主な根拠とする。

### ICASSP

**付与 / Qualifies — 音響・音声・信号処理 / Acoustics, speech and signal processing.**

[IEEE Signal Processing Societyの運営規程（2026年2月3日改訂、130ページ）](https://signalprocessingsociety.org/sites/default/files/2026-02/SPS%20Policy%20and%20Procedures-3Feb2026.pdf#page=130)はICASSPとICIPを旗艦会議として正式に区別する。IEEEは主催側なので、これだけを第三者評価とはしない。[東京大学の信号処理特論の課題資料（2018年、3ページ）](https://www.sp.ipc.i.u-tokyo.ac.jp/~saruwatari/SP-Grad2018-report2.pdf#page=3)のトップ会議という記載と、[明治大学のICASSP 2026研究紹介](https://www.meiji.ac.jp/sst/information/8dafyd7i3rw3cgj.html)の音声・信号処理分野での評価を照合した。

### RCIS

**保留・非表示 / Withheld — 情報科学・情報システム / Information science and information systems.**

[RCIS 2026公式サイト](https://rcis-conf.com/rcis2026/)の主要な年次イベントという自己紹介は確認したが、今回の調査では上記基準を満たす独立した裏付けを確立できなかった。従来の自己紹介だけに基づく付与を撤回し、追加資料が得られるまで表示を保留する。CORE Bであることが理由ではなく、RCISが低品質である、またはトップ層ではないと証明したわけでもない。
