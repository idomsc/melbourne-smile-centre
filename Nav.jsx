/* eslint-disable no-undef */
const { useState: useNavState, useEffect: useNavEffect, useRef: useNavRef } = React;

function GlassNav({ onNavigate, current }) {
  const [scrolled, setScrolled] = useNavState(false);
  const [theme, setTheme]       = useNavState("dark"); // "dark" | "light"

  useNavEffect(() => {
    /* ── Detect which section is under the nav ── */
    const update = () => {
      setScrolled(window.scrollY > 24);

      const navBottom = 88; // px from top of viewport to below the nav pill
      const viewY = window.scrollY + navBottom;

      const sections = document.querySelectorAll("[data-nav-theme]");
      let detected = "dark";
      sections.forEach((s) => {
        const top    = s.offsetTop;
        const bottom = top + s.offsetHeight;
        if (viewY >= top && viewY < bottom) detected = s.dataset.navTheme;
      });
      setTheme(detected);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const links = [
    { id: "home",        label: "smile portfolio" },
    { id: "team",        label: "the team" },
    { id: "treatments",  label: "the services" },
    { id: "environment", label: "the studio" },
    { id: "contact",     label: "contact" },
  ];

  const dark = theme === "dark";

  /* ── Theme-driven values ── */
  const navBg      = dark ? "rgba(12,10,8,0.42)"       : "rgba(255,254,251,0.62)";
  const brightness = dark ? "brightness(1.14)"          : "brightness(1.06)";
  const saturate   = dark ? "saturate(150%)"            : "saturate(180%)";
  const textCol    = dark ? "rgba(245,237,224,0.82)"    : "rgba(31,26,20,0.72)";
  const activeCol  = dark ? "#D9B987"                   : "var(--msc-primary-deep)";
  const phoneCol   = dark ? "rgba(245,237,224,0.52)"    : "rgba(31,26,20,0.52)";
  const rimTop     = dark ? "rgba(255,254,251,0.18)"    : "rgba(255,254,251,0.92)";
  const gloss      = dark ? "rgba(255,254,251,0.07)"    : "rgba(255,254,251,0.26)";
  const ambientShadow = dark
    ? `0 8px 32px -4px rgba(0,0,0,0.52), 0 2px 8px -2px rgba(0,0,0,0.38)`
    : `0 8px 32px -4px rgba(31,26,20,0.22), 0 2px 8px -2px rgba(31,26,20,0.14)`;
  const scrolledShadow = dark
    ? `0 12px 40px -4px rgba(0,0,0,0.60), 0 4px 12px -2px rgba(0,0,0,0.42)`
    : `0 12px 40px -4px rgba(31,26,20,0.28), 0 4px 12px -2px rgba(31,26,20,0.18)`;
  const rimBorder  = dark ? "rgba(255,254,251,0.10)"    : "rgba(180,150,110,0.18)";

  const boxShadow = `
    0 0 0 0.5px ${rimBorder} inset,
    0 1px 0 0 ${rimTop} inset,
    0 -0.5px 0 0 ${dark ? "rgba(0,0,0,0.30)" : "rgba(180,150,110,0.20)"} inset,
    ${scrolled ? scrolledShadow : ambientShadow},
    0 0 0 1px ${rimBorder}
  `;

  return (
    <div
      style={{
        position: "fixed",
        top: 18, left: 18, right: 18,
        zIndex: 50,
        height: 60,
        display: "flex",
        alignItems: "center",
        padding: "0 6px 0 22px",
        gap: 22,
        fontSize: 14,
        fontFamily: "var(--msc-font-text)",
        borderRadius: 9999,
        background: navBg,
        backdropFilter: `blur(28px) ${saturate} ${brightness}`,
        WebkitBackdropFilter: `blur(28px) ${saturate} ${brightness}`,
        boxShadow,
        color: textCol,
        transition: "background 500ms cubic-bezier(0.4,0,0.2,1), box-shadow 320ms cubic-bezier(0.4,0,0.2,1), color 400ms ease",
      }}
    >
      {/* Top-edge specular rim */}
      <div style={{
        position: "absolute", top: 0, left: "8%", right: "8%", height: 1,
        background: `linear-gradient(90deg, transparent, ${rimTop} 30%, ${rimTop} 70%, transparent)`,
        borderRadius: 9999, pointerEvents: "none",
        transition: "background 500ms ease",
      }} />
      {/* Inner gloss sweep */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 9999,
        background: `linear-gradient(160deg, ${gloss} 0%, rgba(255,254,251,0.02) 45%, transparent 65%)`,
        pointerEvents: "none",
        transition: "background 500ms ease",
      }} />

      <a onClick={() => onNavigate("home")} style={{ display: "flex", alignItems: "center", cursor: "pointer", textDecoration: "none", position: "relative" }}>
        <img
          src={dark ? "assets/logo-msc-lockup.png" : "assets/logo-msc-lockup.png"}
          alt="m :) the melbourne smile centre"
          style={{
            height: 28, width: "auto",
            filter: dark ? "brightness(0) invert(1)" : "none",
            transition: "filter 400ms ease",
          }}
        />
      </a>

      <div style={{ display: "flex", gap: 22, marginLeft: 18, position: "relative" }}>
        {links.map((l) => (
          <a
            key={l.id}
            onClick={() => onNavigate(l.id)}
            style={{
              color: current === l.id ? activeCol : textCol,
              fontWeight: current === l.id ? 600 : 500,
              cursor: "pointer",
              textDecoration: "none",
              transition: "color 400ms ease",
            }}
          >
            {l.label}
          </a>
        ))}
      </div>

      <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center", position: "relative" }}>
        <a href="tel:0398247722" style={{ color: phoneCol, fontWeight: 500, textDecoration: "none", transition: "color 400ms ease" }}>
          9824 7722
        </a>
        <button
          onClick={() => onNavigate("contact")}
          style={{
            background: "var(--msc-primary)",
            color: "#fff",
            border: "none",
            borderRadius: 9999,
            padding: "10px 18px",
            fontSize: 13,
            fontFamily: "var(--msc-font-text)",
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "0.01em",
            boxShadow: "var(--msc-shadow-bronze)",
          }}
        >
          Book now
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { GlassNav });
