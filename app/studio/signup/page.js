"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/studio/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password, restaurantName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't create your account.");
      router.push("/studio");
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <div className="studio-eyebrow">Get started</div>
      <h1 className="studio-page-title">Create your account</h1>
      <p className="studio-page-sub">
        One account, saved on our servers — your profile and posts follow you to any
        device.
      </p>
      <form className="studio-card" onSubmit={submit}>
        <div className="studio-field">
          <label className="studio-label">
            Restaurant name
            <input
              className="studio-input"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="e.g. Karachi Grill"
              required
            />
          </label>
        </div>
        <div className="studio-field">
          <label className="studio-label">
            Email
            <input
              className="studio-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>
        </div>
        <div className="studio-field">
          <label className="studio-label">
            Password
            <input
              className="studio-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          <div className="studio-help">At least 8 characters.</div>
        </div>
        {error ? <div className="studio-alert">{error}</div> : null}
        <button type="submit" className="studio-btn primary" disabled={busy} style={{ width: "100%" }}>
          {busy ? "Creating account…" : "Create account"}
        </button>
        <div className="studio-help" style={{ marginTop: 14, textAlign: "center" }}>
          Already have an account? <Link href="/studio/login">Log in</Link>
        </div>
      </form>
    </div>
  );
}
