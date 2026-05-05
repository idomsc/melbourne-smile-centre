/* eslint-disable no-undef */

function Tile({ tone = "light", children, style }) {
  const tones = {
    light: {
      bg: `radial-gradient(900px 500px at 90% -10%, rgba(176,135,84,0.10), transparent 60%),
           radial-gradient(700px 400px at -10% 110%, rgba(217,185,135,0.10), transparent 60%),
           var(--msc-canvas)`,
      color: "var(--msc-ink)",
    },
    parchment: {
      bg: `linear-gradient(180deg, var(--msc-canvas-mist) 0%, var(--msc-canvas-parchment) 100%)`,
      color: "var(--msc-ink)",
    },
    sand: {
      bg: `linear-gradient(135deg, #E8D9C2 0%, #FAF7F2 40%, #F2EDE4 70%, #D9B987 100%)`,
      color: "var(--msc-ink)",
    },
    dark: {
      bg: `radial-gradient(700px 360px at 18% 30%, rgba(176,135,84,0.42), transparent 70%),
           radial-gradient(560px 320px at 84% 78%, rgba(217,185,135,0.28), transparent 70%),
           var(--msc-surface-tile-1)`,
      color: "#fff",
    },
    espresso: {
      bg: `var(--msc-surface-tile-3)`,
      color: "#fff",
    },
  };
  const t = tones[tone] || tones.light;
  return (
    <section
      data-tone={tone === "dark" || tone === "espresso" ? "dark" : "light"}
      style={{
        background: t.bg,
        color: t.color,
        padding: "120px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>{children}</div>
    </section>
  );
}

function TileEyebrow({ children, onDark }) {
  return (
    <div
      style={{
        fontSize: 11,
        color: onDark ? "var(--msc-primary-on-dark)" : "var(--msc-primary)",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        fontWeight: 500,
        fontFamily: "var(--msc-font-text)",
      }}
    >
      {children}
    </div>
  );
}

function TileHeadline({ children, onDark }) {
  return (
    <h2
      style={{
        fontSize: "clamp(40px, 6vw, 72px)",
        fontWeight: 400,
        letterSpacing: "-0.018em",
        lineHeight: 1.02,
        margin: "16px 0 0",
        fontFamily: "var(--msc-font-display)",
        textTransform: "lowercase",
        color: onDark ? "#fff" : "var(--msc-ink)",
      }}
    >
      {children}
    </h2>
  );
}

function TileTagline({ children, muted, onDark, large }) {
  return (
    <p
      style={{
        fontSize: large ? 24 : 20,
        fontWeight: 300,
        letterSpacing: 0,
        lineHeight: 1.4,
        marginTop: 18,
        marginBottom: 0,
        maxWidth: 640,
        marginLeft: "auto",
        marginRight: "auto",
        color: onDark
          ? (muted ? "var(--msc-body-muted)" : "var(--msc-body-on-dark)")
          : (muted ? "var(--msc-ink-muted-80)" : "var(--msc-body)"),
      }}
    >
      {children}
    </p>
  );
}

function TileCTAs({ children }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
      {children}
    </div>
  );
}

function GlassImage({ label, ratio = "16/9", style, dark }) {
  return (
    <div
      style={{
        marginTop: 56,
        background: dark ? "rgba(11,10,8,0.30)" : "rgba(255,254,251,0.30)",
        backdropFilter: "var(--msc-frosted-blur)",
        WebkitBackdropFilter: "var(--msc-frosted-blur)",
        border: "1px solid var(--msc-hairline-glass)",
        borderRadius: 18,
        aspectRatio: ratio,
        boxShadow: "var(--msc-shadow-glass-lg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: dark ? "var(--msc-body-muted)" : "var(--msc-ink-muted-48)",
        fontFamily: "ui-monospace, monospace",
        fontSize: 12,
        ...style,
      }}
    >
      {label}
    </div>
  );
}

Object.assign(window, { Tile, TileEyebrow, TileHeadline, TileTagline, TileCTAs, GlassImage });
