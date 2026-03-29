import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@nexus/shell";
import type { PlatformModule } from "@nexus/module-sdk";
import type { RuntimeContext, UserRole } from "@nexus/types";
import { studioModule } from "./modules/studio";
import { reviewModule } from "./modules/review";

function HomePage() {
  return (
    <div>
      <h2>Home</h2>
      <p>
        Start small: modules register navigation and routes, and the shell
        decides what is visible based on runtime policies.
      </p>
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

const modules: PlatformModule[] = [studioModule, reviewModule];

function isVisible(
  context: RuntimeContext,
  policy?: (context: RuntimeContext) => boolean,
) {
  return policy ? policy(context) : true;
}

export default function App() {
  const [role, setRole] = useState<UserRole>("member");

  const context: RuntimeContext = useMemo(
    () => ({
      user: {
        id: "demo-user",
        role,
      },
    }),
    [role],
  );

  const visibleRoutes = modules.flatMap((module) =>
    (module.routes ?? []).filter((route) =>
      isVisible(context, route.isVisible),
    ),
  );

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
            />
          }
        >
          <Route index element={<HomePage />} />

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
