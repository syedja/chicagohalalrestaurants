"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const icon = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5 19 19M19 5l-2.5 2.5M7.5 16.5 5 19" /></svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 5-5.5 8-5.5S18.5 17 20 21" /></svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 2.7 5.6 6.3.9-4.5 4.3 1 6.2L12 17l-5.5 3 1-6.2L3 9.5l6.3-.9L12 3Z" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
  ),
};

const LINKS = [
  { href: "/studio", label: "Dashboard", icon: icon.home },
  { href: "/studio/create", label: "Create Content", icon: icon.spark },
  { href: "/studio/calendar", label: "Campaign Calendar", icon: icon.calendar },
  { href: "/studio/reviews", label: "Review Replies", icon: icon.star },
  { href: "/studio/history", label: "History", icon: icon.clock },
  { href: "/studio/profile", label: "Restaurant Profile", icon: icon.user },
];

export default function StudioNav() {
  const pathname = usePathname();
  return (
    <nav className="studio-nav" aria-label="Studio">
      <div className="studio-brand">
        <div className="studio-brand-crescent" aria-hidden="true" />
        <div className="studio-brand-name">RestaurantAI Studio</div>
        <div className="studio-brand-sub">by Chicago Halal Restaurants</div>
      </div>
      <div className="studio-nav-links">
        {LINKS.map((l) => {
          const active =
            l.href === "/studio" ? pathname === "/studio" : pathname?.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} className={`studio-nav-link${active ? " active" : ""}`}>
              {l.icon}
              {l.label}
            </Link>
          );
        })}
      </div>
      <div className="studio-nav-foot">
        <span className="studio-premium-badge">Premium</span>
        <div>Included with your Premium listing on chicagohalalrestaurants.com</div>
      </div>
    </nav>
  );
}
