import type { PlatformModule } from "@nexus/module-sdk";
import { allowFlag, allowRole, anyOf } from "@nexus/policy-engine";

function InsightsPage() {
  return (
    <div>
      <h2>Insights</h2>
      <p>
        Insights demonstrates flag-aware module visibility. It becomes available
        either for admins or when the insights.enabled flag is turned on.
      </p>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Module intent</h3>
        <p style={styles.cardText}>
          This module represents a product area that is being rolled out
          gradually. The platform decides whether it appears using runtime
          policies instead of hardcoded page checks.
        </p>
      </div>
    </div>
  );
}

export const insightsModule: PlatformModule = {
  id: "insights",
  title: "Insights",
  navigation: [
    {
      id: "insights-nav",
      label: "Insights",
      to: "/insights",
      isVisible: anyOf(allowRole(["admin"]), allowFlag("insights.enabled")),
    },
  ],
  routes: [
    {
      path: "/insights",
      element: <InsightsPage />,
      isVisible: anyOf(allowRole(["admin"]), allowFlag("insights.enabled")),
    },
  ],
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    marginTop: "20px",
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
    lineHeight: 1.6,
  },
};
