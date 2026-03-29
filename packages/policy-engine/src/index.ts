import type { FeatureFlag } from "@nexus/feature-flags";
import type { RuntimeContext, UserRole } from "@nexus/types";

export type Policy<TContext> = (context: TContext) => boolean;

export const allowAll =
  <TContext>(): Policy<TContext> =>
  () =>
    true;

export const allowRole =
  (roles: UserRole[]): Policy<RuntimeContext> =>
  (context) =>
    roles.includes(context.user.role);

export const allowFlag =
  (flag: FeatureFlag): Policy<RuntimeContext> =>
  (context) =>
    Boolean(context.flags[flag]);

export const allOf =
  <TContext>(...policies: Policy<TContext>[]): Policy<TContext> =>
  (context) =>
    policies.every((policy) => policy(context));

export const anyOf =
  <TContext>(...policies: Policy<TContext>[]): Policy<TContext> =>
  (context) =>
    policies.some((policy) => policy(context));
