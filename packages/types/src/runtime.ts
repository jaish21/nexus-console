import type { FlagMap } from "@nexus/feature-flags";

export type UserRole = "guest" | "member" | "reviewer" | "admin";

export type RuntimeContext = {
  user: {
    id: string;
    role: UserRole;
  };
  flags: FlagMap;
};
