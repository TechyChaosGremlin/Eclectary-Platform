export const intentions = [
  'Protection',
  'Love',
  'Abundance',
  'Healing',
  'Self-Care',
  'Intuition',
  'Manifestation',
  'Creativity',
  'Spiritual Growth',
  'Shadow Work',
  'Home',
  'Moon & Cycles',
  'Seasonal',
] as const;

export type Intention = (typeof intentions)[number];
