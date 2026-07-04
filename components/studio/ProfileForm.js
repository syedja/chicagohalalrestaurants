"use client";

// Shared profile editor used by both Onboarding (to review AI-extracted data)
// and the Restaurant Profile page.

export default function ProfileForm({ value, onChange }) {
  const p = value;
  const set = (key, v) => onChange({ ...p, [key]: v });
  const setSocial = (key, v) =>
    onChange({ ...p, socials: { ...(p.socials || {}), [key]: v } });

  return (
    <div>
      <h3 className="studio-section-title">The basics</h3>
      <div className="studio-form-grid">
        <Field label="Restaurant name">
          <input className="studio-input" value={p.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Karachi Grill" />
        </Field>
        <Field label="Cuisine">
          <input className="studio-input" value={p.cuisine} onChange={(e) => set("cuisine", e.target.value)} placeholder="e.g. Pakistani, BBQ" />
        </Field>
        <Field label="Phone">
          <input className="studio-input" value={p.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(630) 555-0100" />
        </Field>
        <Field label="WhatsApp (if different)">
          <input className="studio-input" value={p.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
        </Field>
        <Field label="Website">
          <input className="studio-input" value={p.website} onChange={(e) => set("website", e.target.value)} placeholder="yourrestaurant.com" />
        </Field>
        <Field label="Email">
          <input className="studio-input" value={p.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label="Address" full>
          <input className="studio-input" value={p.address} onChange={(e) => set("address", e.target.value)} placeholder="Street, city, state" />
        </Field>
        <Field label="Neighborhood / area">
          <input className="studio-input" value={p.neighborhood} onChange={(e) => set("neighborhood", e.target.value)} placeholder="e.g. Glendale Heights" />
        </Field>
        <Field label="Business hours">
          <input className="studio-input" value={p.hours} onChange={(e) => set("hours", e.target.value)} placeholder="e.g. Daily 11am–10pm" />
        </Field>
      </div>

      <h3 className="studio-section-title">Food & services</h3>
      <div className="studio-form-grid">
        <Field label="Popular dishes" help="Separate with commas. The AI names these in your posts." full>
          <input
            className="studio-input"
            value={(p.popularDishes || []).join(", ")}
            onChange={(e) =>
              set(
                "popularDishes",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
              )
            }
            placeholder="Chicken Biryani, Seekh Kabab, Nihari"
          />
        </Field>
        <Field label="Online ordering links" full>
          <input className="studio-input" value={p.orderingLinks} onChange={(e) => set("orderingLinks", e.target.value)} placeholder="Your website ordering page, DoorDash, Uber Eats…" />
        </Field>
        <Field label="Reservations">
          <input className="studio-input" value={p.reservationLink} onChange={(e) => set("reservationLink", e.target.value)} placeholder="Phone, link, or walk-in only" />
        </Field>
        <Field label="Halal certification" help="Only list a certifier your restaurant actually holds (e.g. HFSAA, HMS). The AI will never claim one you don't list.">
          <input className="studio-input" value={p.certification} onChange={(e) => set("certification", e.target.value)} placeholder="e.g. HFSAA" />
        </Field>
        <Field label="Catering" full>
          <textarea className="studio-textarea" value={p.cateringInfo} onChange={(e) => set("cateringInfo", e.target.value)} placeholder="What you cater, minimums, lead time, delivery area…" />
        </Field>
        <Field label="Current promotions" full>
          <textarea className="studio-textarea" value={p.promos} onChange={(e) => set("promos", e.target.value)} placeholder="Any running deals the AI can mention" />
        </Field>
      </div>

      <h3 className="studio-section-title">Brand voice</h3>
      <div className="studio-form-grid">
        <Field label="About the restaurant" full>
          <textarea className="studio-textarea" value={p.about} onChange={(e) => set("about", e.target.value)} placeholder="Your story in 2–3 sentences" />
        </Field>
        <Field label="Who are your customers?">
          <input className="studio-input" value={p.audience} onChange={(e) => set("audience", e.target.value)} placeholder="e.g. families, students, office workers" />
        </Field>
        <Field label="Preferred tone">
          <input className="studio-input" value={p.tone} onChange={(e) => set("tone", e.target.value)} placeholder="e.g. warm and family-oriented" />
        </Field>
        <Field label="Anything the AI should always or never say?" full>
          <textarea className="studio-textarea" value={p.brandVoiceNotes} onChange={(e) => set("brandVoiceNotes", e.target.value)} placeholder='e.g. Always mention "family-owned since 2015". Never use slang.' />
        </Field>
      </div>

      <h3 className="studio-section-title">Social accounts</h3>
      <div className="studio-form-grid">
        <Field label="Instagram">
          <input className="studio-input" value={p.socials?.instagram || ""} onChange={(e) => setSocial("instagram", e.target.value)} placeholder="@yourhandle" />
        </Field>
        <Field label="Facebook">
          <input className="studio-input" value={p.socials?.facebook || ""} onChange={(e) => setSocial("facebook", e.target.value)} placeholder="Page name or link" />
        </Field>
        <Field label="TikTok">
          <input className="studio-input" value={p.socials?.tiktok || ""} onChange={(e) => setSocial("tiktok", e.target.value)} placeholder="@yourhandle" />
        </Field>
      </div>
    </div>
  );
}

function Field({ label, help, full, children }) {
  return (
    <div className={`studio-field${full ? " full" : ""}`}>
      <label className="studio-label">
        {label}
        {children}
      </label>
      {help ? <div className="studio-help">{help}</div> : null}
    </div>
  );
}
