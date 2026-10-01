// Shared bibliography for both languages; only status/award labels are localized.
// Sources and publication-status decisions: docs/research-update-2026-09.md.
const publications = [
  {
    title: "Pretrain on Small Synthetic Data, Scale Large for Free: Symmetry-Aware Foundation Model for Logic Rule Induction",
    url: "https://yinjunphua.com/papers/g-nri/",
    arxiv: "https://arxiv.org/abs/2608.00383",
    authors: "<strong>Yin Jun Phua</strong>",
    venue: "20th International Conference on Neurosymbolic Learning and Reasoning (NeSy), 2026.",
    note: { en: "[Accepted]", ja: "[採択済み]" },
  },
  {
    title: "ABLE: Choosing Perturbation Experiments to Recover Gene Logic",
    url: "https://openreview.net/forum?id=JUMIngxwNC",
    authors: "<strong>Yin Jun Phua</strong>, Foo Wei Ten",
    venue: "ICML 2026 AI for Science Workshop, 2026.",
  },
  {
    title: "Can Transformers Learn to Verify During Backtracking Search?",
    url: "https://arxiv.org/abs/2605.22221",
    authors: "<strong>Yin Jun Phua</strong>, Tony Ribeiro, Tuan Nguyen, Katsumi Inoue",
    venue: "arXiv:2605.22221, 2026.",
    note: { en: "[Preprint]", ja: "[プレプリント]" },
  },
  {
    title: "A Foundation Model for Zero-Shot Logical Rule Induction",
    url: "https://yinjunphua.com/papers/nri/",
    arxiv: "https://arxiv.org/abs/2605.04916",
    authors: "<strong>Yin Jun Phua</strong>",
    venue: "35th International Joint Conference on Artificial Intelligence (IJCAI), 2026.",
  },
  {
    title: "Can We Test Consciousness Theories on AI? Ablations, Markers, and Robustness",
    url: "https://arxiv.org/abs/2512.19155",
    authors: "<strong>Yin Jun Phua</strong>",
    venue: "arXiv:2512.19155, 2025.",
    note: { en: "[Preprint]", ja: "[プレプリント]" },
  },
  {
    title: "Memory augmented using diffusion model for class-incremental learning",
    url: "https://doi.org/10.1016/j.imavis.2025.105600",
    authors: "Quentin Jodelet, Xin Liu, <strong>Yin Jun Phua</strong>, Tsuyoshi Murata",
    venue: "Image and Vision Computing, 161, 105600, 2025.",
  },
  {
    title: "Future-proofing class-incremental learning",
    url: "https://doi.org/10.1007/s00138-024-01635-y",
    authors: "Quentin Jodelet, Xin Liu, <strong>Yin Jun Phua</strong>, Tsuyoshi Murata",
    venue: "Machine Vision and Applications, 36(1), 16, 2025.",
  },
  {
    title: "Variable Assignment Invariant Neural Networks for Learning Logic Programs",
    url: "https://arxiv.org/abs/2408.10709",
    authors: "<strong>Yin Jun Phua</strong>, Katsumi Inoue",
    venue: "18th International Conference on Neural-Symbolic Learning and Reasoning (NeSy), 2024.",
  },
  {
    title: "DEGNN: Dual Experts Graph Neural Network Handling Both Edge and Node Feature Noise",
    url: "https://doi.org/10.1007/978-981-97-2253-2_30",
    authors: "Tai Hasegawa, Sukwon Yun, Xin Liu, <strong>Yin Jun Phua</strong>, Tsuyoshi Murata",
    venue: "Pacific-Asia Conference on Knowledge Discovery and Data Mining (PAKDD), 376–389, 2024.",
  },
  {
    title: "Class-Incremental Learning using Diffusion Model for Distillation and Replay",
    url: "https://openaccess.thecvf.com/content/ICCV2023W/VCL/html/Jodelet_Class-Incremental_Learning_Using_Diffusion_Model_for_Distillation_and_Replay_ICCVW_2023_paper.html",
    note: { en: "[Best Paper Award]", ja: "[最優秀論文賞]" },
    authors: "Quentin Jodelet, Xin Liu, <strong>Yin Jun Phua</strong>, Tsuyoshi Murata",
    venue: "1st Workshop on Visual Continual Learning, ICCV 2023.",
  },
  {
    title: "resVAE ensemble: Unsupervised identification of gene sets in multi-modal single-cell sequencing data using deep ensembles",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9975353/",
    authors: "Foo Wei Ten, Dongsheng Yuan, Nabil Jabareen, <strong>Yin Jun Phua</strong>, Roland Eils, Sören Lukassen, Christian Conrad",
    venue: "Frontiers in Cell and Developmental Biology, 11, 2023.",
  },
  {
    title: "Learning Logic Programs Using Neural Networks by Exploiting Symbolic Invariance",
    url: "https://doi.org/10.1007/978-3-030-97454-1_15",
    authors: "<strong>Yin Jun Phua</strong>, Katsumi Inoue",
    venue: "30th International Conference on Inductive Logic Programming (ILP), 2021.",
  },
  {
    title: "Learning Logic Programs from Noisy State Transition Data",
    url: "https://doi.org/10.1007/978-3-030-49210-6_7",
    note: { en: "[Best Student Paper Award]", ja: "[最優秀学生論文賞]" },
    authors: "<strong>Yin Jun Phua</strong>, Katsumi Inoue",
    venue: "29th International Conference on Inductive Logic Programming (ILP), 2019.",
  },
];

const localize = (lang) => publications.map((pub) => ({
  ...pub,
  note: pub.note?.[lang],
}));

module.exports = { en: localize("en"), ja: localize("ja") };
