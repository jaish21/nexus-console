import type { PlatformModule } from "@nexus/module-sdk";
import { allowRole } from "@nexus/policy-engine";

function ReviewPage() {
  return (
    <div>
      <h2>Review</h2>
      <p>
        Review is only visible to reviewer and admin roles. This proves the
        shell can filter module contributions using policies.
      </p>
    </div>
  );
}

export const reviewModule: PlatformModule = {
  id: "review",
  title: "Review",
  navigation: [
    {
      id: "review-nav",
      label: "Review",
      to: "/review",
      isVisible: allowRole(["reviewer", "admin"]),
    },
  ],
  routes: [
    {
      path: "/review",
      element: <ReviewPage />,
      isVisible: allowRole(["reviewer", "admin"]),
    },
  ],
};
