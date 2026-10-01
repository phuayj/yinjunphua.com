// Researchmap presentations, supplemented by the ICMLSC talk on Google Scholar.
// See docs/research-update-2026-09.md for sources.
const presentations = [
  {
    date: { en: "October 2025", ja: "2025年10月" },
    title: { en: "A Foundation Model for Learning Propositional Logic Program", ja: "A Foundation Model for Learning Propositional Logic Program" },
    url: "https://researchmap.jp/phuayj/presentations/51563015",
    authors: "Yin Jun Phua",
    venue: "Ninth International Workshop on Symbolic-Neural Learning (SNL 2025)",
    note: { en: "Poster", ja: "ポスター発表" },
  },
  {
    date: { en: "September 2025", ja: "2025年9月" },
    title: { en: "Transformers Can Admit Mistakes and Backtrack", ja: "Transformers Can Admit Mistakes and Backtrack" },
    url: "https://researchmap.jp/phuayj/presentations/51459517",
    authors: "Tony Ribeiro, Yin Jun Phua, Tuan Nguyen, Katsumi Inoue",
    venue: "5th International Joint Conference on Learning & Reasoning (IJCLR 2025)",
  },
  {
    date: { en: "August 27, 2025", ja: "2025年8月27日" },
    title: { en: "Leveraging Symbolic Invariance in Neuro-Symbolic AI", ja: "ニューロシンボリック AI における記号論理の不変性の応用" },
    url: "https://sig-fpai.org/past/fpai133.html",
    authors: "Yin Jun Phua",
    venue: "133rd SIG-FPAI",
    note: { en: "Invited talk, in Japanese", ja: "招待講演" },
    slides: "/files/toyama-250826.pdf",
  },
  {
    date: { en: "January 24, 2025", ja: "2025年1月24日" },
    title: { en: "Backtracking Enabled Transformers", ja: "Backtracking Enabled Transformers" },
    url: "https://hal.science/hal-04892712/",
    authors: "Yin Jun Phua, Tony Ribeiro, Katsumi Inoue",
    venue: "9th International Conference on Machine Learning and Soft Computing (ICMLSC 2025)",
  },
];

const localize = (lang) => presentations.map((talk) => ({
  ...talk,
  date: talk.date[lang],
  title: talk.title[lang],
  note: talk.note?.[lang],
}));

module.exports = { en: localize("en"), ja: localize("ja") };
