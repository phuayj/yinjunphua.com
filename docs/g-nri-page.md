# G-NRI project page

## Structure

- `/papers/g-nri/` is generated from `src/papers/g-nri.njk`. Its paper-specific data lives in `src/_data/gnri.js`. The BibTeX section is TBD until the official NeSy 2026 proceedings are released and registered; no `.bib` download is generated.
- The page opens directly with the paper hero, without a separate navigation header or acronym kicker, just like NRI. It matches NRI's content width, hero background/padding, venue badge, title typography, affiliation logo, resource buttons, and stat-card styling. Its own stylesheet keeps section spacing compact and charts readable on phones without changing NRI's existing design.
- `papers/nri/index.html` retains its IJCAI title, citation metadata, results, and original PDF/appendix. A short update near the top links to G-NRI. A one-line responsive fix also lets NRI's existing rule-card grid fit narrow phones (it previously forced 380-pixel cards into smaller containers). The G-NRI introduction links back to NRI; its author name and footer link to the personal homepage.
- Both languages' home/research links and the shared bibliography now point to the G-NRI page. The bibliography also keeps a separate arXiv link.
- The G-NRI HTML page enters the sitemap through Eleventy's page collection. The static NRI page keeps its existing explicit sitemap entry.

## Public copy

The visible heading uses the descriptive part of the paper title, **Symmetry-Aware Foundation Model for Logic Rule Induction**, without the “Scale Large for Free” headline or a separate subtitle. Section headings identify the method, scaling experiments, benchmark results, and code, following NRI's descriptive style. Summaries and figure captions state the setup and measurements rather than using promotional comparisons. Social-preview text uses the same restrained tone.

The full official title remains unchanged in `src/_data/gnri.js`, scholarly metadata, JSON-LD, and the shared bibliography. The PDF and reported results are unchanged.

## Sources checked

- [arXiv:2608.00383](https://arxiv.org/abs/2608.00383): exact title, sole author Yin Jun Phua, 1 August 2026 submission, NeSy 2026 acceptance comment, DOI, and CC BY 4.0 license.
- [Full paper, v1](https://arxiv.org/pdf/2608.00383v1): 25 pages, including appendices. The copied `papers/g-nri/paper.pdf` has SHA-256 `eced7dfe72026c5b578ca0503b71f0999e574f807810cb8718330059a81d460d`.
- [Official G-NRI implementation](https://github.com/phuayj/g-nri), README and repository description: method components, training/evaluation entry points, CPU smoke workflow, and experiment guide. The README does not publish a reference checkpoint, so the page links to code and local training rather than offering a nonexistent checkpoint download.
- The original [NRI repository](https://github.com/phuayj/neural-rule-inducer) is a different implementation and is not used as G-NRI's code link.

At the author's request, the provisional arXiv BibTeX and download were removed. The visible citation remains TBD, matching NRI, until the NeSy proceedings are released and registered. The verified arXiv links and discovery metadata remain intact. `datePublished` in JSON-LD is the arXiv submission date. Neither a proceedings DOI nor page numbers have been invented.

## Results and interpretation

- Section 3: the five symmetry components add no learned parameters. The full G-NRI includes architectural changes, eval-time averaging/export, and symmetrized training. It is not presented as a universal drop-in decoder upgrade for any unmodified checkpoint.
- Sections 4–5.2: training on 6–12 variables, frozen-weight evaluation up to 1,024 variables. This varies variable count within the same bounded rule family. The page states this in the figure note, rather than adding a long limitations section.
- Figure 2(a), Appendix C/Table 6: support-set accuracy at 1,024 variables is 89.4% for G-NRI and 48.7% for the NRI baseline. This is fit to the conditioning examples, not held-out accuracy.
- Figure 2(b): exported-rule fidelity on fresh assignments is shown separately. The original curves are reproduced, not reconstructed from approximate values read off the plot.
- Table 4: all 19 datasets are available in a native, expandable HTML table. Reported means are 70.2% NRI, 76.2% G-NRI, and 89.5% for per-dataset-trained decision trees. The headline gain is 6 percentage points over the NRI baseline in this study. These numbers are not mixed with the original IJCAI paper's different evaluation protocol.
- Section 5.3: the MONK's-3 two-literal example is the same rule across all eight seeds.
- The public explanation says the canonical decoder carries score symmetries through to the final rule. Detailed conditions on score equivariance, ties, numerical margins, and encoding-preserving transformations remain in the paper and the earlier [verification notes](research-update-2026-09.md).

## Figure assets

The original author-owned paper is distributed under CC BY 4.0. The page credits the paper, license, and cropping. No plotted curves, scores, or axes were changed.

Extraction from the verified PDF:

```sh
pdfimages -f 9 -l 9 -png symmetry-nri.pdf scaling
pdftoppm -f 2 -l 2 -singlefile -scale-to 2000 -png symmetry-nri.pdf page-2
```

Pillow crops (left, top, right, bottom):

- `pipeline.png`: page-2 render cropped to `(220, 225, 1330, 535)`; 1,110 × 310 pixels, excluding page text and the original caption.
- `scaling.png`: complete extracted Figure 2 image; 2,194 × 814 pixels.
- `support-scaling.png`: Figure 2 cropped to `(0, 0, 735, 375)`; 735 × 375 pixels.
- `rule-fidelity.png`: Figure 2 cropped to `(742, 0, 1460, 372)`; 718 × 372 pixels.

The first two plot panels are displayed separately so their labels remain readable on mobile. Their shared legend is reproduced as HTML text/color keys, and both link to the full original figure.

## Validation

- `npm run test:papers` builds the site and runs `scripts/check-paper-pages.js`. It checks both paper identities, PDF signatures, citation metadata, G-NRI's JSON-LD, the TBD citation notice and absence of a premature BibTeX download, all 19 rendered benchmark rows, cross-links, sitemap entries, and local assets/fragments.
- Browser checks pass at 320, 360, 390, 600, 768, 1,280, and 1,440 pixels. They also compare shared hero styles against NRI at each width and verify that both heroes start at the top with no separate navigation header. The expandable results table is keyboard-operable; the page fits the viewport with it both open and closed. Images are explicitly loaded before validation.
- The default test blocks external assets for deterministic offline checks. The same tests also passed with `PAPER_ALLOW_NETWORK=1`, allowing the Google Fonts and NRI MathJax resources. Use `PAPER_SCREENSHOTS=/tmp/paper-page-shots npm run test:papers` for optional desktop/mobile review images.
- The bilingual home/research/background regression checks and `git diff --check` pass. SHA-256 checks confirm that NRI's original PDF/appendix are untouched and G-NRI's published PDF matches the retrieved source.
- Reviewed desktop/mobile screenshots and corrected the G-NRI footer credit contrast. The new page requires no client-side JavaScript; the benchmark disclosure uses native HTML. No dependencies or lockfile entries were added.
