import type { ReactNode } from "react";
import type { RuntimeContext } from "@nexus/types";

export type VisibilityPolicy = (context: RuntimeContext) => boolean;

export type AppRoute = {
  path: string;
  element: ReactNode;
  isVisible?: VisibilityPolicy;
};

export type NavigationItem = {
  id: string;
  label: string;
  to: string;
  isVisible?: VisibilityPolicy;
};

export type PlatformModule = {
  id: string;
  title: string;
  routes?: AppRoute[];
  navigation?: NavigationItem[];
};
