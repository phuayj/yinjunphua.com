// G-NRI page data, checked against arXiv:2608.00383v1, especially Table 4.
// Provenance and figure extraction: docs/g-nri-page.md.
const title = "Pretrain on Small Synthetic Data, Scale Large for Free: Symmetry-Aware Foundation Model for Logic Rule Induction";
const arxiv = "https://arxiv.org/abs/2608.00383";

module.exports = {
  title,
  arxiv,
  code: "https://github.com/phuayj/g-nri",
  benchmarks: [
    { name: "adult", variables: 105, nri: 65.6, gnri: 64.4, tree: 81.5 },
    { name: "breast-cancer", variables: 9, nri: 92.7, gnri: 92.0, tree: 93.7 },
    { name: "car", variables: 21, nri: 30.4, gnri: 73.8, tree: 96.7 },
    { name: "credit", variables: 46, nri: 70.7, gnri: 80.7, tree: 80.6 },
    { name: "diabetes", variables: 8, nri: 72.0, gnri: 71.8, tree: 70.0 },
    { name: "german", variables: 61, nri: 58.4, gnri: 60.9, tree: 65.3 },
    { name: "hepatitis", variables: 32, nri: 80.6, gnri: 80.0, tree: 77.7 },
    { name: "ionosphere", variables: 34, nri: 71.9, gnri: 73.1, tree: 79.4 },
    { name: "kr-vs-kp", variables: 73, nri: 66.8, gnri: 69.9, tree: 99.6 },
    { name: "mushroom", variables: 116, nri: 78.0, gnri: 81.0, tree: 100.0 },
    { name: "nursery", variables: 27, nri: 68.4, gnri: 75.9, tree: 98.7 },
    { name: "spambase", variables: 57, nri: 71.0, gnri: 79.0, tree: 90.7 },
    { name: "tic-tac-toe", variables: 27, nri: 60.1, gnri: 69.9, tree: 93.1 },
    { name: "vote", variables: 32, nri: 91.3, gnri: 94.3, tree: 94.5 },
    { name: "monks-1", variables: 17, nri: 74.1, gnri: 74.6, tree: 98.4 },
    { name: "monks-2", variables: 17, nri: 61.1, gnri: 55.9, tree: 98.5 },
    { name: "monks-3", variables: 17, nri: 90.3, gnri: 96.4, tree: 96.8 },
    { name: "mutag", variables: 51, nri: 63.9, gnri: 73.1, tree: 84.6 },
    { name: "clevr-hans3", variables: 105, nri: 66.4, gnri: 81.5, tree: 100.0 },
  ],
  // Means as reported in the paper, before per-dataset rounding.
  mean: { nri: 70.2, gnri: 76.2, tree: 89.5 },
};
