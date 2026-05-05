/* eslint-disable no-undef */
const { useState: useBtnState } = React;

function PrimaryPill({ children, onClick, large, style }) {
  const [pressed, setPressed] = useBtnState(false);
  const [hover, setHover] = useBtnState(false);
  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPressed(false); }}
      onClick={onClick}
      style={{
        background: pressed ? "var(--msc-primary-deep)" : (hover ? "var(--msc-primary-focus)" : "var(--msc-primary)"),
        color: "#fff",
        border: "none",
        borderRadius: "9999px",
        padding: large ? "15px 30px" : "13px 24px",
        fontSize: large ? 16 : 14,
        fontWeight: 500,
        letterSpacing: "0.01em",
        fontFamily: "var(--msc-font-text)",
        cursor: "pointer",
        boxShadow: pressed ? "none" : "var(--msc-shadow-bronze)",
        transition: "all 200ms var(--msc-ease)",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function GhostPill({ children, onClick, onDark }) {
  const [hover, setHover] = useBtnState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        background: hover ? (onDark ? "rgba(255,254,251,0.08)" : "rgba(176,135,84,0.08)") : "transparent",
        color: onDark ? "var(--msc-primary-on-dark)" : "var(--msc-primary-deep)",
        border: `1px solid ${onDark ? "var(--msc-primary-on-dark)" : "var(--msc-primary)"}`,
        borderRadius: "9999px",
        padding: "12px 23px",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.01em",
        fontFamily: "var(--msc-font-text)",
        cursor: "pointer",
        transition: "all 200ms var(--msc-ease)",
      }}
    >
      {children}
    </button>
  );
}

function GlassPill({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "var(--msc-surface-glass-light)",
        backdropFilter: "var(--msc-frosted-blur)",
        WebkitBackdropFilter: "var(--msc-frosted-blur)",
        color: "var(--msc-ink)",
        border: "1px solid var(--msc-hairline-glass)",
        borderRadius: "9999px",
        padding: "12px 22px",
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "var(--msc-font-text)",
        cursor: "pointer",
        boxShadow: "var(--msc-shadow-glass)",
      }}
    >
      {children}
    </button>
  );
}

function TextLink({ children, onClick, onDark, style }) {
  return (
    <a
      onClick={onClick}
      style={{
        color: onDark ? "var(--msc-primary-on-dark)" : "var(--msc-primary-deep)",
        textDecoration: "none",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        letterSpacing: "0.01em",
        ...style,
      }}
    >
      {children} →
    </a>
  );
}

Object.assign(window, { PrimaryPill, GhostPill, GlassPill, TextLink });
