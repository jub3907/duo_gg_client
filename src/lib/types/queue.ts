const QueueType = <const>[
  'RANKED_SOLO_5x5',
  'RANKED_TFT',
  'RANKED_FLEX_SR',
  'RANKED_FLEX_TT',
];

export type Queuetype = (typeof QueueType)[number];
