# Research content refresh — 7 September 2026

## Sources

- [Google Scholar profile](https://scholar.google.com/citations?user=XOBpuB8AAAAJ&hl=en&pagesize=100&sortby=pubdate): recent papers, preprints, and the ICMLSC presentation.
- [researchmap profile](https://researchmap.jp/phuayj), retrieved through its [public JSON API](https://api.researchmap.jp/phuayj): publication venues, presentations, committee service, awards, employment, and grants. The profile HTML returned an incomplete page; the API returned all items in these categories.

### New bibliography entries

| Work | Supporting record | Treatment on the site |
| --- | --- | --- |
| Pretrain on Small Synthetic Data, Scale Large for Free | [arXiv:2608.00383](https://arxiv.org/abs/2608.00383), researchmap published paper 54488253 | Accepted at NeSy 2026, not merely an unreviewed preprint. |
| ABLE: Choosing Perturbation Experiments to Recover Gene Logic | [Scholar detail and abstract](https://scholar.google.com/citations?view_op=view_citation&user=XOBpuB8AAAAJ&citation_for_view=XOBpuB8AAAAJ%3ASe3iqnhoufwC), researchmap published paper 53771952 | ICML 2026 AI for Science **Workshop**, July 2026; not an ICML main-track paper. Link to the OpenReview record supplied by Scholar. |
| Can Transformers Learn to Verify During Backtracking Search? | [arXiv:2605.22221](https://arxiv.org/abs/2605.22221), researchmap misc 54194860 | Explicitly labeled a preprint. |
| Can We Test Consciousness Theories on AI? Ablations, Markers, and Robustness | [arXiv:2512.19155](https://arxiv.org/abs/2512.19155), Scholar profile | Explicitly labeled a preprint. |
| Memory augmented using diffusion model for class-incremental learning | researchmap published paper 51051199, Scholar profile | Image and Vision Computing 161, 105600 (2025), DOI 10.1016/j.imavis.2025.105600. |
| Future-proofing class-incremental learning | researchmap published paper 48730315, Scholar profile | Machine Vision and Applications 36(1), 16 (2025), DOI 10.1007/s00138-024-01635-y. Omit the Scholar title's appended author artifact. |
| DEGNN: Dual Experts Graph Neural Network Handling Both Edge and Node Feature Noise | researchmap published paper 46429062, Scholar profile | PAKDD 2024, pp. 376–389, DOI 10.1007/978-981-97-2253-2_30. |

The existing [NRI paper](https://arxiv.org/abs/2605.04916) remains one bibliography entry with its project page and arXiv link. Its current arXiv comments confirm the IJCAI 2026 camera-ready version. Bibliographic records are shared between English and Japanese; award and status labels are localized. The bibliography is now on the research pages, not the homepage.

## Other activities and corrections

- Add the October 2025 SNL poster (researchmap presentation 51563015), September 2025 IJCLR presentation (51459517), and January 24, 2025 ICMLSC talk ([Scholar record](https://scholar.google.com/citations?view_op=view_citation&user=XOBpuB8AAAAJ&citation_for_view=XOBpuB8AAAAJ%3AW7OEmFMy1HYC), linking to HAL hal-04892712). These are presented as talks/presentations, not new archival papers. Preserve all credited contributors and the existing SIG-FPAI invited talk and local slides.
- Add NeSy program committee service, 2024–present (researchmap committee membership 51051074).
- Add the 2023 Visual Continual Learning workshop Best Paper Award to the awards section (researchmap award 43859997); it was already noted beside the paper.
- Correct the Japanese employment start date to October 2024 (researchmap research experience 48022759), matching the English page and both introductions.
- Match the English title of the 2026 NII project to researchmap research project 54315169, including “Reasoning.” Other existing funding amounts and participation periods are unchanged; overall grant periods in researchmap need not equal an individual's participation period.
- Correct resVAE coauthor spellings to Dongsheng Yuan, Roland Eils, and Sören Lukassen using researchmap published paper 43028764.
- Add the supplied Google Scholar profile to the footer, publication-list links, and Person structured data. Do not embed citation metrics that would quickly become stale.

## Full-text verification follow-up

The first pass used profile records and abstracts. Following the request for full-paper checks, the four PDFs below were downloaded and identified as real PDFs with `pdfinfo`, then converted with `pdftotext`. Methods, experimental results, and limitations were checked, with the symmetry paper's appendices also read. This is a content-to-paper check, not an independent replication of the experiments or certification of the proofs.

| Full text retrieved | Pages | Evidence used for the site |
| --- | --- | --- |
| [NRI, arXiv:2605.04916v2](https://arxiv.org/pdf/2605.04916v2) | 12 | Sections 4.1–4.8 and 5.1, Appendix A: synthetic bounded-DNF pretraining, labeled support examples, no task-specific retraining, literal statistics plus an example-conditioned branch, and auxiliary losses. “Zero-shot” does not mean no labeled examples, universal rule recovery, or a pure prediction-only objective. |
| [Symmetry-aware NRI, arXiv:2608.00383v1](https://arxiv.org/pdf/2608.00383v1) | 25 | Sections 3–5 and 7, Appendices A–F: train on 6–12 variables, evaluate frozen checkpoints up to 1,024 while keeping the generator/rule complexity bounded; canonical export is conditional on score equivariance and tie handling. Equivariance is not semantic correctness. Real-data accuracy is not generally competitive with task-trained learners; the empirical extension is tested on NRI only. |
| [Backtracking, arXiv:2605.22221v1](https://arxiv.org/pdf/2605.22221v1) | 51 | Sections 2.2–2.3, Proposition 1 and Section 3.1, Sections 4 and 6: localization and state isolation address different failures. SSA keeps the problem prefix/current block, blocks earlier blocks, and needs block-relative positions for full prior-history invariance. Symbolic propagation, conflict exposure, and search mechanics remain external. Proactive verification and pretrained-LLM context clearing are open directions. The manuscript's journal-template header is not evidence of acceptance; keep the preprint label. |
| [Consciousness, arXiv:2512.19155v1](https://arxiv.org/pdf/2512.19155v1) | 25 | Sections 3–5 and 6.6: behavior-cloned gridworld agents, architectural lesions, access/calibration/noise measurements. The IIT-adjacent complexity probe is not a direct test of Φ. Findings are implementation-specific, and the paper explicitly does not claim conscious agents. This work stays on the research page, not in the homepage spotlights. |

Downloaded PDF SHA-256 hashes (retrieval audit, not dependencies of the site build):

- NRI v2: `ba2a7cc11a8840ec78ea1ef5a05b1924dfd60b2221a4c7a24e4942f03775361d`
- Symmetry v1: `eced7dfe72026c5b578ca0503b71f0999e574f807810cb8718330059a81d460d`
- Backtracking v1: `ced58d89547df2131cfed6eed9c70655bb617da88080de5f4db0c636cba7293e`
- Consciousness v1: `c7f72e5a774aa2c3f94a3aa22b2f931ba0581c7ebb3d898bbf477f003dec57d8`

### Access limitations

ABLE's OpenReview PDF, API, and attachment routes returned a browser challenge rather than a PDF, including the responses saved with `.pdf` filenames. Those responses were **not** treated as papers. The [official ICML workshop record](https://icml.cc/virtual/2026/73563) and [author's code repository](https://github.com/phuayj/able) corroborate the public abstract, but are not substitutes for full-paper verification. An accessible paper or author-provided PDF is still needed. ABLE is therefore **not a homepage spotlight**. Its research-page introduction stays with the abstract-supported loop of proposing rules, checking observations, and choosing experiments, described as simulations. The technical qualification remains here: an idealized in-silico Boolean intervention oracle, support-conditional uniqueness, and explicit abstention; no wet-lab or unconditional recovery claims.

The two 2025 journal entries and DEGNN remain bibliographic entries checked against researchmap/Scholar, not full-text-verified result summaries. Earlier research narratives were not part of this new full-text audit.

## Homepage curation

- Two interest-led spotlights replace the exhaustive front-page publication list: transferable rule induction (NRI and its symmetry-aware extension) and state-based backtracking (SSA). All three papers behind these spotlights were fetched as full PDFs and checked as above.
- Keep the affiliation, a short research introduction, profile links, contact information, and at most three recent notes on each homepage.
- Move the bibliography to `/my-research.html#publications` and its Japanese counterpart.
- Move grants, talks, service, education, employment, awards, teaching, and the complete notes archive to `/about.html` and `/ja/about.html`. Existing information remains accessible rather than being discarded.
- Language switches now lead to the corresponding localized page, including the new background pages.

The initial content refresh left existing blog posts, standalone paper pages, and downloadable research artifacts unchanged; its paper downloads and extracted text were temporary verification materials. A subsequent request adds a dedicated G-NRI page, its PDF, and a cross-link from NRI; see [G-NRI page provenance](g-nri-page.md).

## Personal-homepage tone

Following the author's feedback, the English and Japanese introductions and recent-research summaries now lead with interests, intuitive explanations, and reasons to get in touch. The homepage spotlights are “Learning to Discover Rules” and “Learning When to Backtrack.”

A later pass aligned the new copy with the voice of the earlier site. English uses full forms (“I am”) with straight apostrophes. The introductions reuse the original wording (“bridging the gap between symbolic AI and neural networks”; 「シンボリックAIおよびニューラルネットワークの融合」). Research sections follow the older pattern of problem, “we proposed” / 「提案した」, and a parenthetical citation. Japanese research copy stays in である調, and the homepage stays in です・ます調. Sentences in a paragraph are not broken across source lines, since a line break between Japanese sentences renders as a space. The original section names are restored: Thoughts / メモ帳, Lectures, 競争的資金・共同研究, 業績.

After that, at the author's request, the homepage, background-page introductions, and contact lines were made warmer and less formal. They use contractions and a conversational first person, and the Japanese uses softer です/ます phrasing (「気軽にご連絡ください」), while keeping the concrete details. The detailed research sections keep the more formal voice (English "we proposed…" with citations; Japanese である調).

Technical conditions, theorem details, and defensive statements about what each paper does not prove belong in this verification record and the linked papers, not in every introductory paragraph. The public copy describes the work without promising universal correctness, and distinguishes research ambitions from results. Publication status labels and the description of ABLE's experiments as simulations remain intact.

## Validation after curation and tone revision

- `npm test` (clean Eleventy build) and `git diff --check` pass.
- Playwright checks pass for both languages of the home, research, and background pages at 360, 390, 768, and 1,280 pixels: no horizontal overflow, broken images, HTTP errors, or browser exceptions.
- Confirmed two spotlights per homepage, three English notes/one Japanese note, no front-page bibliography or ABLE/consciousness spotlight, 13 bibliography entries per research page, four presentations per background page, and preservation of all ten English notes/one Japanese note in the archives.
- Checked internal files and fragments, corresponding-page language switches, canonical links, Scholar-linked Person structured data, and sitemap inclusion of both new background pages.
- Inspected desktop and mobile screenshots. Spotlights appear side by side on desktop/tablet and stack on phones. The English homepage's main container is 1,697 characters; the Japanese one is 832 characters (including headings and links, excluding the footer).

## Visual audit after the tone revisions

A browser audit (agent-browser) captured full-page screenshots of all 20 built pages at 320, 360, 390, 600, 768, 1,024, and 1,280 pixels. It checked for horizontal overflow, broken images, console errors, failed requests, and broken internal links and fragments. The fixes that followed:

- Grant, talk, publication, and career entries get 1rem separation. Links after a list (“All thoughts”, “Back to home”) no longer touch it. Stacked date/title pairs on phones are spaced apart.
- Page subtitles wrap as a unit, so Japanese headings no longer break mid-word on phones.
- Between 600 and 1,023 pixels, list and talk date columns get a fixed width, so dates do not wrap.
- G-NRI: on phones the title wraps naturally instead of orphaning “Model”, and the results table fits from 320 pixels with its caption and all five columns visible.
- NRI: on phones the results table shows every column, including NRI (zero-shot), and the BibTeX notice wraps instead of being clipped.
- The 404 page no longer repeats the copyright line above the site footer, and “工事中” stays on one line.
