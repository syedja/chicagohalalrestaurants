"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/studio/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't log you in.");
      router.push("/studio");
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <div className="studio-eyebrow">Welcome back</div>
      <h1 className="studio-page-title">Log in</h1>
      <form className="studio-card" onSubmit={submit}>
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
              autoComplete="current-password"
              required
            />
          </label>
        </div>
        {error ? <div className="studio-alert">{error}</div> : null}
        <button type="submit" className="studio-btn primary" disabled={busy} style={{ width: "100%" }}>
          {busy ? "Logging in…" : "Log in"}
        </button>
        <div className="studio-help" style={{ marginTop: 14, textAlign: "center" }}>
          New here? <Link href="/studio/signup">Create an account</Link>
        </div>
      </form>
    </div>
  );
}
