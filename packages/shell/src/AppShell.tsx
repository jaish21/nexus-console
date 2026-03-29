import { Link, Outlet, useLocation } from "react-router-dom";
import type { PlatformModule } from "@nexus/module-sdk";
import type { RuntimeContext, UserRole } from "@nexus/types";

type AppShellProps = {
  modules: PlatformModule[];
  context: RuntimeContext;
  onRoleChange: (role: UserRole) => void;
};

function isVisible(
  context: RuntimeContext,
  policy?: (context: RuntimeContext) => boolean,
) {
  return policy ? policy(context) : true;
}

export function AppShell({ modules, context, onRoleChange }: AppShellProps) {
  const location = useLocation();

  const navigation = modules
    .flatMap((module) => module.navigation ?? [])
    .filter((item) => isVisible(context, item.isVisible));

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>Axis Console</div>

        <nav style={styles.nav}>
          <Link style={linkStyle(location.pathname === "/")} to="/">
            Home
          </Link>

          {navigation.map((item) => (
            <Link
              key={item.id}
              style={linkStyle(location.pathname === item.to)}
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>
              Policy-driven modular frontend platform
            </h1>
            <p style={styles.subtitle}>
              Shell owns navigation and visibility. Modules only declare
              contributions.
            </p>
          </div>

          <label style={styles.roleControl}>
            <span>Role</span>
            <select
              value={context.user.role}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              style={styles.select}
            >
              <option value="guest">guest</option>
              <option value="member">member</option>
              <option value="reviewer">reviewer</option>
              <option value="admin">admin</option>
            </select>
          </label>
        </header>

        <section style={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    minHeight: "100vh",
    fontFamily: "Inter, Arial, sans-serif",
    background: "#f6f7fb",
    color: "#111827",
  },
  sidebar: {
    borderRight: "1px solid #e5e7eb",
    background: "#ffffff",
    padding: "24px 16px",
  },
  brand: {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: "24px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  main: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    padding: "24px",
    borderBottom: "1px solid #e5e7eb",
    background: "#ffffff",
  },
  title: {
    margin: 0,
    fontSize: "24px",
  },
  subtitle: {
    margin: "8px 0 0",
    color: "#4b5563",
  },
  roleControl: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontSize: "14px",
  },
  select: {
    padding: "8px 10px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    background: "#fff",
  },
  content: {
    padding: "24px",
  },
};

function linkStyle(active: boolean): React.CSSProperties {
  return {
    padding: "10px 12px",
    borderRadius: "10px",
    textDecoration: "none",
    color: active ? "#111827" : "#374151",
    background: active ? "#eef2ff" : "transparent",
    fontWeight: active ? 600 : 500,
  };
}
