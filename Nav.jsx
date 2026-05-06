/* eslint-disable no-undef */
const { useState: useNavState, useEffect: useNavEffect } = React;

function GlassNav({ onNavigate, current }) {
  const [scrolled,  setScrolled]  = useNavState(false);
  const [theme,     setTheme]     = useNavState("dark");
  const [menuOpen,  setMenuOpen]  = useNavState(false);
  const [isMobile,  setIsMobile]  = useNavState(window.innerWidth < 720);

  useNavEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 720);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useNavEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 24);
      const navBottom = 88;
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

  /* Close mobile menu on nav */
  const navigate = (id) => { onNavigate(id); setMenuOpen(false); };

  const links = [
    { id: "home",        label: "smile portfolio" },
    { id: "team",        label: "the team" },
    { id: "treatments",  label: "the services" },
    { id: "environment", label: "the studio" },
    { id: "contact",     label: "contact" },
  ];

  const dark = menuOpen ? false : theme === "dark";

  const navBg      = dark ? "rgba(12,10,8,0.42)"    : "rgba(255,254,251,0.62)";
  const brightness = dark ? "brightness(1.14)"       : "brightness(1.06)";
  const saturate   = dark ? "saturate(150%)"         : "saturate(180%)";
  const textCol    = dark ? "rgba(245,237,224,0.82)" : "rgba(31,26,20,0.72)";
  const activeCol  = dark ? "#D9B987"                : "var(--msc-primary-deep)";
  const phoneCol   = dark ? "rgba(245,237,224,0.52)" : "rgba(31,26,20,0.52)";
  const rimTop     = dark ? "rgba(255,254,251,0.18)" : "rgba(255,254,251,0.92)";
  const gloss      = dark ? "rgba(255,254,251,0.07)" : "rgba(255,254,251,0.26)";
  const ambientShadow  = dark ? `0 8px 32px -4px rgba(0,0,0,0.52),  0 2px 8px -2px rgba(0,0,0,0.38)` : `0 8px 32px -4px rgba(31,26,20,0.22), 0 2px 8px -2px rgba(31,26,20,0.14)`;
  const scrolledShadow = dark ? `0 12px 40px -4px rgba(0,0,0,0.60), 0 4px 12px -2px rgba(0,0,0,0.42)` : `0 12px 40px -4px rgba(31,26,20,0.28), 0 4px 12px -2px rgba(31,26,20,0.18)`;
  const rimBorder  = dark ? "rgba(255,254,251,0.10)" : "rgba(180,150,110,0.18)";

  const boxShadow = `
    0 0 0 0.5px ${rimBorder} inset,
    0 1px 0 0 ${rimTop} inset,
    0 -0.5px 0 0 ${dark ? "rgba(0,0,0,0.30)" : "rgba(180,150,110,0.20)"} inset,
    ${scrolled ? scrolledShadow : ambientShadow},
    0 0 0 1px ${rimBorder}
  `;

  /* ── Burger icon ─────────────────────────────────────────── */
  const BurgerIcon = () => (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
      <rect y="0" width="20" height="1.8" rx="0.9" fill="currentColor"
        style={{ transformOrigin:"10px 0.9px", transition:"transform 280ms ease, opacity 280ms ease",
          transform: menuOpen ? "translateY(6.1px) rotate(45deg)" : "none" }}/>
      <rect y="6" width="20" height="1.8" rx="0.9" fill="currentColor"
        style={{ transition:"opacity 200ms ease", opacity: menuOpen ? 0 : 1 }}/>
      <rect y="12" width="20" height="1.8" rx="0.9" fill="currentColor"
        style={{ transformOrigin:"10px 12.9px", transition:"transform 280ms ease, opacity 280ms ease",
          transform: menuOpen ? "translateY(-6.1px) rotate(-45deg)" : "none" }}/>
    </svg>
  );

  return (
    <>
      {/* ── Nav pill ── */}
      <div style={{
        position: "fixed", top: 18, left: 18, right: 18, zIndex: 100,
        height: 60, display: "flex", alignItems: "center",
        padding: "0 6px 0 22px", gap: 22,
        fontSize: 14, fontFamily: "var(--msc-font-text)",
        borderRadius: 9999,
        background: menuOpen ? "rgba(255,254,251,0.62)" : navBg,
        backdropFilter: `blur(28px) ${saturate} ${brightness}`,
        WebkitBackdropFilter: `blur(28px) ${saturate} ${brightness}`,
        boxShadow,
        color: menuOpen ? "rgba(31,26,20,0.72)" : textCol,
        transition: "background 400ms ease, box-shadow 320ms ease, color 400ms ease",
      }}>
        {/* Specular rim */}
        <div style={{ position:"absolute", top:0, left:"8%", right:"8%", height:1,
          background:`linear-gradient(90deg, transparent, ${rimTop} 30%, ${rimTop} 70%, transparent)`,
          borderRadius:9999, pointerEvents:"none" }} />
        {/* Gloss */}
        <div style={{ position:"absolute", inset:0, borderRadius:9999,
          background:`linear-gradient(160deg, ${gloss} 0%, rgba(255,254,251,0.02) 45%, transparent 65%)`,
          pointerEvents:"none" }} />

        {/* Logo */}
        <a onClick={() => navigate("home")} style={{ display:"flex", alignItems:"center", cursor:"pointer", textDecoration:"none", position:"relative", flexShrink:0 }}>
          <img
            src="assets/logo-msc-lockup.png"
            alt="m :) the melbourne smile centre"
            style={{ height:28, width:"auto",
              filter: (menuOpen || !dark) ? "none" : "brightness(0) invert(1)",
              transition:"filter 400ms ease" }}
          />
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display:"flex", gap:22, marginLeft:18, position:"relative" }}>
            {links.map(l => (
              <a key={l.id} onClick={() => navigate(l.id)} style={{
                color: current === l.id ? activeCol : textCol,
                fontWeight: current === l.id ? 600 : 500,
                cursor:"pointer", textDecoration:"none",
                transition:"color 400ms ease",
              }}>{l.label}</a>
            ))}
          </div>
        )}

        {/* Right side */}
        <div style={{ marginLeft:"auto", display:"flex", gap:12, alignItems:"center", position:"relative" }}>
          {!isMobile && (
            <a href="tel:0398247722" style={{ color: phoneCol, fontWeight:500, textDecoration:"none", transition:"color 400ms ease" }}>
              9824 7722
            </a>
          )}
          {!isMobile && (
            <button onClick={() => navigate("contact")} style={{
              background:"var(--msc-primary)", color:"#fff", border:"none",
              borderRadius:9999, padding:"10px 18px", fontSize:13,
              fontFamily:"var(--msc-font-text)", fontWeight:500, cursor:"pointer",
              letterSpacing:"0.01em", boxShadow:"var(--msc-shadow-bronze)",
            }}>Book now</button>
          )}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                width:44, height:44, borderRadius:"50%", border:"none",
                background:"transparent", cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
                color: menuOpen ? "var(--msc-ink)" : textCol,
                transition:"color 300ms ease",
              }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <BurgerIcon />
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile menu overlay ── */}
      {isMobile && menuOpen && (
        <div style={{
          position:"fixed", inset:0, zIndex:99,
          background:"rgba(253,252,250,0.97)",
          backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          gap:0, paddingBottom:40,
          animation:"mobileMenuIn 240ms cubic-bezier(0.4,0,0.2,1)",
        }}>
          {links.map((l, i) => (
            <a
              key={l.id}
              onClick={() => navigate(l.id)}
              style={{
                fontFamily:"var(--msc-font-display)",
                fontSize:"clamp(32px,8vw,48px)",
                fontWeight:400, letterSpacing:"-0.015em",
                textTransform:"lowercase",
                color: current === l.id ? "var(--msc-primary)" : "var(--msc-ink)",
                textDecoration:"none", cursor:"pointer",
                padding:"10px 0",
                opacity: current === l.id ? 1 : 0.85,
                transition:"color 200ms ease, opacity 200ms ease",
                animationDelay: `${i * 40}ms`,
              }}
            >{l.label}</a>
          ))}
          <div style={{ marginTop:36, display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
            <a href="tel:0398247722" style={{ color:"var(--msc-ink-muted-80)", fontSize:16, fontWeight:500, textDecoration:"none", fontFamily:"var(--msc-font-text)" }}>
              9824 7722
            </a>
            <button onClick={() => navigate("contact")} style={{
              background:"var(--msc-primary)", color:"#fff", border:"none",
              borderRadius:9999, padding:"14px 36px", fontSize:16,
              fontFamily:"var(--msc-font-text)", fontWeight:500, cursor:"pointer",
              boxShadow:"0 4px 20px -4px rgba(140,95,40,0.45)",
            }}>Book a consultation</button>
          </div>
        </div>
      )}
    </>
  );
}

Object.assign(window, { GlassNav });
