export type FeatureFlag =
  | "insights.enabled"
  | "review.auditLog"
  | "studio.newEditor";

export type FlagMap = Record<FeatureFlag, boolean>;

export const defaultFlags: FlagMap = {
  "insights.enabled": false,
  "review.auditLog": false,
  "studio.newEditor": false,
};
