import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  defaultFlags,
  type FeatureFlag,
  type FlagMap,
} from "@nexus/feature-flags";
import { AppShell } from "@nexus/shell";
import type { PlatformModule } from "@nexus/module-sdk";
import type { RuntimeContext, UserRole } from "@nexus/types";
import { studioModule } from "./modules/studio";
import { reviewModule } from "./modules/review";
import { insightsModule } from "./modules/insights";

function HomePage({ context }: { context: RuntimeContext }) {
  return (
    <div>
      <h2>Home</h2>
      <p>
        This version adds runtime feature flags. Modules can now become visible
        based on role, flag state, or both.
      </p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Current role</h3>
          <p style={styles.cardText}>{context.user.role}</p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Active flags</h3>
          <ul style={styles.list}>
            {Object.entries(context.flags).map(([flag, enabled]) => (
              <li key={flag}>
                <strong>{flag}</strong>: {enabled ? "on" : "off"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div>
      <h2>Not found</h2>
      <p>The route does not exist.</p>
    </div>
  );
}

const modules: PlatformModule[] = [studioModule, reviewModule, insightsModule];

function isVisible(
  context: RuntimeContext,
  policy?: (context: RuntimeContext) => boolean,
) {
  return policy ? policy(context) : true;
}

export default function App() {
  const [role, setRole] = useState<UserRole>("member");
  const [flags, setFlags] = useState<FlagMap>(defaultFlags);

  const context: RuntimeContext = useMemo(
    () => ({
      user: {
        id: "demo-user",
        role,
      },
      flags,
    }),
    [role, flags],
  );

  const visibleRoutes = modules.flatMap((module) =>
    (module.routes ?? []).filter((route) =>
      isVisible(context, route.isVisible),
    ),
  );

  function handleFlagToggle(flag: FeatureFlag) {
    setFlags((current) => ({
      ...current,
      [flag]: !current[flag],
    }));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppShell
              modules={modules}
              context={context}
              onRoleChange={setRole}
              onFlagToggle={handleFlagToggle}
            />
          }
        >
          <Route index element={<HomePage context={context} />} />

          {visibleRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
    marginTop: "20px",
  },
  card: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    background: "#ffffff",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "8px",
    fontSize: "16px",
  },
  cardText: {
    margin: 0,
    color: "#4b5563",
  },
  list: {
    margin: 0,
    paddingLeft: "18px",
    color: "#4b5563",
    lineHeight: 1.8,
  },
};
