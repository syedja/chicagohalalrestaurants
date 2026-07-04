"use client";

// Branded promo graphics engine (client-side canvas, no external services).
// Draws the owner's REAL details onto branded templates -- never fake food
// photos. Exports PNG at exact platform sizes.

export const GRAPHIC_TEMPLATES = [
  {
    id: "emerald",
    label: "Deep Emerald",
    bgTop: "#0b2e23",
    bgBottom: "#17573f",
    text: "#fdfaf2",
    sub: "rgba(242,246,241,0.85)",
    accent: "#d8b957",
    accentText: "#e8cf8a",
  },
  {
    id: "ivory",
    label: "Ivory & Green",
    bgTop: "#fdfcf7",
    bgBottom: "#f4f1e6",
    text: "#0b2e23",
    sub: "#4b5a52",
    accent: "#15803d",
    accentText: "#15803d",
  },
  {
    id: "gold",
    label: "Warm Gold",
    bgTop: "#f7eed6",
    bgBottom: "#efdfb4",
    text: "#4a3708",
    sub: "#6d5a1f",
    accent: "#0b2e23",
    accentText: "#0b2e23",
  },
];

export const GRAPHIC_FORMATS = [
  { id: "square", label: "Instagram / WhatsApp -- square", w: 1080, h: 1080 },
  { id: "story", label: "Story / Status -- vertical", w: 1080, h: 1920 },
  { id: "wide", label: "Facebook link -- wide", w: 1200, h: 630 },
];

function wrapText(ctx, text, maxWidth) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawCrescent(ctx, cx, cy, r, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.arc(cx + r * 0.32, cy - r * 0.18, r * 0.86, 0, Math.PI * 2, true);
  ctx.fillStyle = color;
  ctx.fill("evenodd");
  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function drawGraphic(canvas, opts) {
  const t = opts.template;
  const f = opts.format;
  canvas.width = f.w;
  canvas.height = f.h;
  const ctx = canvas.getContext("2d");
  const s = f.w / 1080;
  const isWide = f.id === "wide";
  const isStory = f.id === "story";
  const pad = Math.round((isWide ? 72 : 88) * s);
  const contentW = f.w - pad * 2;

  const grad = ctx.createLinearGradient(0, 0, f.w * 0.3, f.h);
  grad.addColorStop(0, t.bgTop);
  grad.addColorStop(1, t.bgBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, f.w, f.h);

  drawCrescent(ctx, f.w - 130 * s, 150 * s, 170 * s, t.accent, 0.16);

  const serif = "Georgia, 'Times New Roman', serif";
  const sans = "system-ui, -apple-system, 'Segoe UI', Arial, sans-serif";

  let y = isStory ? f.h * 0.2 : isWide ? 96 * s : 190 * s;

  if (opts.logoImg) {
    const lr = (isWide ? 54 : 72) * s;
    ctx.save();
    ctx.beginPath();
    ctx.arc(pad + lr, y, lr, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(opts.logoImg, pad, y - lr, lr * 2, lr * 2);
    ctx.restore();
    y += lr + 56 * s;
  }

  if (opts.eyebrow) {
    ctx.fillStyle = t.accentText;
    ctx.font = `600 ${Math.round((isWide ? 26 : 30) * s)}px ${sans}`;
    const spaced = String(opts.eyebrow).toUpperCase().split("").join("\u200a\u200a");
    ctx.fillText(spaced, pad, y);
    y += (isWide ? 58 : 76) * s;
  }

  const headSize = Math.round((isWide ? 74 : isStory ? 104 : 96) * s);
  ctx.fillStyle = t.text;
  ctx.font = `700 ${headSize}px ${serif}`;
  const headLines = wrapText(ctx, opts.headline, contentW).slice(0, 3);
  for (const line of headLines) {
    ctx.fillText(line, pad, y + headSize * 0.8);
    y += headSize * 1.08;
  }
  y += (isWide ? 26 : 40) * s;

  if (opts.subline) {
    const subSize = Math.round((isWide ? 30 : 36) * s);
    ctx.fillStyle = t.sub;
    ctx.font = `400 ${subSize}px ${sans}`;
    const subLines = wrapText(ctx, opts.subline, contentW).slice(0, isStory ? 4 : 3);
    for (const line of subLines) {
      ctx.fillText(line, pad, y + subSize * 0.8);
      y += subSize * 1.4;
    }
  }

  let fy = f.h - (isWide ? 88 : isStory ? 220 : 150) * s;

  if (opts.cta) {
    const ctaSize = Math.round(30 * s);
    ctx.font = `600 ${ctaSize}px ${sans}`;
    const tw = ctx.measureText(opts.cta).width;
    const ph = 72 * s;
    const pw = tw + 84 * s;
    const py = fy - ph - 64 * s;
    roundRect(ctx, pad, py, pw, ph, ph / 2);
    ctx.strokeStyle = t.accent;
    ctx.lineWidth = 3 * s;
    ctx.stroke();
    ctx.fillStyle = t.accentText;
    ctx.fillText(opts.cta, pad + 42 * s, py + ph / 2 + ctaSize * 0.34);
  }

  ctx.strokeStyle = t.accent;
  ctx.globalAlpha = 0.75;
  ctx.lineWidth = 2.5 * s;
  ctx.beginPath();
  ctx.moveTo(pad, fy - 26 * s);
  ctx.lineTo(f.w - pad, fy - 26 * s);
  ctx.stroke();
  ctx.globalAlpha = 1;

  if (opts.restaurantName) {
    const nameSize = Math.round((isWide ? 34 : 40) * s);
    ctx.fillStyle = t.text;
    ctx.font = `700 ${nameSize}px ${serif}`;
    ctx.fillText(opts.restaurantName, pad, fy + nameSize * 0.6);
    fy += nameSize * 1.15;
  }

  if (opts.contact) {
    const cSize = Math.round((isWide ? 24 : 28) * s);
    ctx.fillStyle = t.sub;
    ctx.font = `400 ${cSize}px ${sans}`;
    const contactLines = wrapText(ctx, opts.contact, contentW).slice(0, 2);
    for (const line of contactLines) {
      ctx.fillText(line, pad, fy + cSize * 0.9);
      fy += cSize * 1.35;
    }
  }
}

export function downloadCanvas(canvas, filename) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }, "image/png");
}