import "./studio.css";

// Top-level /studio layout: just loads the shared CSS and metadata.
// No sidebar here — login and signup live directly under /studio and
// shouldn't show the authenticated nav. The (main) route group below
// adds the sidebar for pages that require a logged-in session.

export const metadata = {
  title: "RestaurantAI Studio | Chicago Halal Restaurants",
  description:
    "AI marketing studio for halal restaurants — a Premium feature of Chicago Halal Restaurants.",
  robots: { index: false, follow: false },
};

export default function StudioRootLayout({ children }) {
  return <div className="studio-shell studio-shell-bare">{children}</div>;
}
