import type { PlatformModule } from "@nexus/module-sdk";

function StudioPage() {
  return (
    <div>
      <h2>Studio</h2>
      <p>
        Studio is available to all signed-in roles. In later commits, this can
        contribute widgets and feature-gated editor experiences.
      </p>
    </div>
  );
}

export const studioModule: PlatformModule = {
  id: "studio",
  title: "Studio",
  navigation: [
    {
      id: "studio-nav",
      label: "Studio",
      to: "/studio",
    },
  ],
  routes: [
    {
      path: "/studio",
      element: <StudioPage />,
    },
  ],
};
