import "./studio.css";
import StudioNav from "../../components/studio/StudioNav";

export const metadata = {
  title: "RestaurantAI Studio | Chicago Halal Restaurants",
  description:
    "AI marketing studio for halal restaurants — a Premium feature of Chicago Halal Restaurants.",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }) {
  return (
    <div className="studio-shell">
      <StudioNav />
      <main className="studio-main">{children}</main>
    </div>
  );
}
