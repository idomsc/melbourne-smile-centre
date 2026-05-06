/* eslint-disable no-undef */
const { useState: usePagesState, useEffect: usePagesEffect, useRef: usePagesRef } = React;

/* ── Scroll-reveal hook ─────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = usePagesRef(null);
  usePagesEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, style }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ── Before / After slider ──────────────────────────────────── */
function BeforeAfter({ label }) {
  const [pos, setPos] = usePagesState(50);
  const [dragging, setDragging] = usePagesState(false);
  const containerRef = usePagesRef(null);

  const update = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  const onMouseDown = (e) => { e.preventDefault(); setDragging(true); };
  const onMouseUp   = ()  => setDragging(false);

  usePagesEffect(() => {
    const onMove = (e) => { if (dragging) update(e.clientX); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onMouseUp); };
  }, [dragging]);

  const beforeBg = `linear-gradient(160deg, #c8b89a 0%, #a89070 50%, #8a7258 100%)`;
  const afterBg  = `linear-gradient(160deg, #f0ede8 0%, #e4ddd4 50%, #d8d0c4 100%)`;

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onTouchMove={(e) => update(e.touches[0].clientX)}
      style={{
        position: "relative", width: "100%", aspectRatio: "4/3",
        borderRadius: 12, overflow: "hidden",
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none", touchAction: "none",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: beforeBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, color: "rgba(100,80,60,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>before · {label}</span>
      </div>
      <div style={{
        position: "absolute", inset: 0, background: afterBg,
        clipPath: `inset(0 ${100 - pos}% 0 0)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: dragging ? "none" : "clip-path 60ms ease",
      }}>
        <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, color: "rgba(80,70,60,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>after · {label}</span>
      </div>
      <div style={{ position: "absolute", top: 10, left: 12, fontSize: 10, fontWeight: 600, color: "rgba(80,60,40,0.65)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--msc-font-text)" }}>Before</div>
      <div style={{ position: "absolute", top: 10, right: 12, fontSize: 10, fontWeight: 600, color: "rgba(80,70,60,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--msc-font-text)" }}>After</div>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: `${pos}%`,
        transform: "translateX(-50%)", width: 2,
        background: "rgba(255,254,251,0.90)",
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none",
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", background: "#fff",
          boxShadow: "0 2px 12px rgba(31,26,20,0.22)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L2 7l3 5M9 2l3 5-3 5" stroke="var(--msc-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Smile Portfolio ────────────────────────────────────────── */
function SmilePortfolio({ onNavigate }) {
  const cases = [
    { label: "case 01", treatment: "Porcelain veneers",    service: "treatments" },
    { label: "case 02", treatment: "In-chair whitening",   service: "treatments" },
    { label: "case 03", treatment: "Composite bonding",    service: "treatments" },
  ];
  return (
    <section data-nav-theme="light" className="msc-portfolio-section" style={{ background: "var(--msc-canvas)", padding: "0 0 120px" }}>
      {/* Hero smile image */}
      <div style={{
        position: "relative", width: "100%", height: "60vh", minHeight: 400,
        overflow: "hidden",
        background: "linear-gradient(135deg, #E8D9C2 0%, #F2EDE4 40%, #D9B987 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(250,247,242,0) 40%, var(--msc-canvas) 100%)",
          pointerEvents: "none", zIndex: 2,
        }} />
        {/* Placeholder — replace src with real smile portrait */}
        <div style={{
          width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: 8,
        }}>
          <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, color: "rgba(140,106,63,0.45)", letterSpacing: "0.14em", textTransform: "uppercase" }}>smile portrait · editorial · 16:9</div>
        </div>
        {/* Section label */}
        <div style={{ position: "absolute", bottom: 48, left: 0, right: 0, textAlign: "center", zIndex: 3 }}>
          <h2 style={{
            fontFamily: "var(--msc-font-display)", fontWeight: 400,
            fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.018em",
            lineHeight: 1.04, color: "var(--msc-ink)", textTransform: "lowercase", margin: 0,
          }}>
            the work speaks{" "}
            <span style={{ fontFamily: "var(--msc-font-editorial)", fontStyle: "italic", color: "var(--msc-primary)" }}>for itself</span>.
          </h2>
          <p style={{ marginTop: 12, fontSize: 16, fontWeight: 300, color: "var(--msc-ink-muted-80)", fontFamily: "var(--msc-font-text)" }}>
            Drag the handle to reveal each transformation.
          </p>
        </div>
      </div>

      {/* Before/after row */}
      <div className="msc-portfolio-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 32px 0" }}>
        <div className="msc-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {cases.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <div className="hover-glow" style={{
                background: "var(--msc-surface-pearl)",
                border: "1px solid var(--msc-hairline)",
                borderRadius: 18, padding: 14,
                display: "flex", flexDirection: "column", gap: 10,
                transition: "box-shadow 300ms var(--msc-ease)",
              }}>
                <BeforeAfter label={c.label} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2px" }}>
                  <span style={{
                    fontFamily: "var(--msc-font-display)", fontSize: 16,
                    fontWeight: 400, color: "var(--msc-ink)", textTransform: "lowercase", letterSpacing: "-0.01em",
                  }}>{c.treatment}</span>
                  <a onClick={() => onNavigate(c.service)} style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "5px 12px",
                    background: "rgba(176,135,84,0.10)",
                    border: "1px solid rgba(176,135,84,0.22)",
                    borderRadius: 9999,
                    fontSize: 11, color: "var(--msc-primary)", fontWeight: 600,
                    cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase",
                    fontFamily: "var(--msc-font-text)",
                    transition: "background 200ms ease, border-color 200ms ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(176,135,84,0.20)"; e.currentTarget.style.borderColor = "rgba(176,135,84,0.45)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(176,135,84,0.10)"; e.currentTarget.style.borderColor = "rgba(176,135,84,0.22)"; }}
                  >Discover →</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Studio / Clinic photo feature ─────────────────────────── */
function StudioFeature({ onNavigate }) {
  return (
    <section data-nav-theme="dark" style={{ background: "var(--msc-surface-tile-1)", overflow: "hidden" }}>

      {/* Full-bleed exterior hero */}
      <div className="hover-scale msc-studio-img" style={{
        position: "relative", width: "100%", height: "70vh", minHeight: 480, overflow: "hidden",
      }}>
        <img
          src="assets/clinic-3.jpg"
          alt="The Melbourne Smile Centre exterior, Toorak"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }}
          onError={(e) => {
            e.target.parentNode.style.background = "linear-gradient(135deg,#1C1A17,#2C2620)";
            e.target.style.display = "none";
          }}
        />
        <div className="msc-hero-overlay" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(28,26,23,0.15) 0%, rgba(28,26,23,0.65) 100%)",
          display: "flex", flexDirection: "column", alignItems: "flex-start",
          justifyContent: "flex-end", padding: "48px 56px",
        }}>
          <div style={{ fontSize: 11, color: "var(--msc-primary-on-dark)", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, fontFamily: "var(--msc-font-text)", marginBottom: 14 }}>The studio</div>
          <h2 style={{
            fontFamily: "var(--msc-font-display)", fontWeight: 400,
            fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.018em",
            lineHeight: 1.02, color: "#fff", textTransform: "lowercase", margin: "0 0 20px",
          }}>
            a studio, not a <span style={{ fontFamily: "var(--msc-font-editorial)", fontStyle: "italic", color: "var(--msc-primary-on-dark)" }}>surgery</span>.
          </h2>
          <GhostPill onDark onClick={() => onNavigate("environment")}>Take a tour</GhostPill>
        </div>
      </div>

      {/* Two-column: sculpture corridor + text */}
      <div className="msc-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {/* Photo */}
        <div className="hover-scale msc-studio-minimg" style={{ position: "relative", overflow: "hidden", minHeight: 520 }}>
          <img
            src="assets/clinic-2.jpg"
            alt="Sculpture in clinic corridor"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.target.parentNode.style.background = "#1C1A17"; e.target.style.display = "none"; }}
          />
        </div>
        {/* Text panel */}
        <div className="msc-studio-text" style={{
          padding: "80px 64px", display: "flex", flexDirection: "column",
          justifyContent: "center",
          background: `radial-gradient(600px 400px at 80% 50%, rgba(176,135,84,0.28), transparent 70%), var(--msc-surface-tile-2)`,
        }}>
          <Reveal>
            <div style={{ fontSize: 11, color: "var(--msc-primary-on-dark)", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, fontFamily: "var(--msc-font-text)", marginBottom: 20 }}>Designed for stillness</div>
            <h3 style={{
              fontFamily: "var(--msc-font-display)", fontWeight: 400,
              fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-0.015em",
              lineHeight: 1.1, color: "#fff", textTransform: "lowercase", margin: "0 0 24px",
            }}>
              five rooms.<br/>one in-house <span style={{ fontFamily: "var(--msc-font-editorial)", fontStyle: "italic", color: "var(--msc-primary-on-dark)" }}>ceramic</span> studio.
            </h3>
            <p style={{ fontSize: 16, color: "var(--msc-body-muted)", lineHeight: 1.65, margin: "0 0 32px", fontWeight: 300 }}>
              Crowns and veneers fired the same day, on the premises. 3D scans, CBCT imaging, and same-day ceramics — kept quietly in the background.
            </p>
            <blockquote style={{
              borderLeft: "2px solid var(--msc-primary)",
              paddingLeft: 20, margin: "0 0 32px",
              fontFamily: "var(--msc-font-editorial)", fontStyle: "italic",
              fontSize: 18, color: "var(--msc-primary-on-dark)", lineHeight: 1.6,
            }}>
              "A smile costs nothing but gives much."
            </blockquote>
            <PrimaryPill onClick={() => onNavigate("contact")}>Book a consultation</PrimaryPill>
          </Reveal>
        </div>
      </div>

      {/* Two sculpture detail photos side by side */}
      <div className="msc-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div className="hover-scale" style={{ overflow: "hidden", aspectRatio: "16/9" }}>
          <img
            src="assets/clinic-1.jpg"
            alt="Sculpture detail"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.target.parentNode.style.background = "#14120F"; e.target.style.display = "none"; }}
          />
        </div>
        <div className="hover-scale" style={{ overflow: "hidden", aspectRatio: "16/9" }}>
          <img
            src="assets/clinic-4.jpg"
            alt="Sculpture side detail"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.target.parentNode.style.background = "#1C1A17"; e.target.style.display = "none"; }}
          />
        </div>
      </div>
    </section>
  );
}

/* ── Home page ──────────────────────────────────────────────── */
function HomePage({ onNavigate }) {
  const bgRef   = usePagesRef(null);
  const textRef = usePagesRef(null);

  usePagesEffect(() => {
    let raf;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        const p = Math.min(y / vh, 1); // 0→1 over one viewport height

        if (bgRef.current) {
          // background zooms in and drifts up slightly
          bgRef.current.style.transform = `scale(${1 + p * 0.12}) translateY(${p * -6}%)`;
          bgRef.current.style.opacity = 1 - p * 0.35;
        }
        if (textRef.current) {
          // text rises and fades out faster
          textRef.current.style.transform = `translateY(${p * -80}px)`;
          textRef.current.style.opacity = 1 - p * 2.2;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      {/* HERO */}
      <section data-nav-theme="dark" style={{
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-end",
        overflow: "hidden", background: "var(--msc-surface-tile-1)", paddingBottom: 80,
      }}>
        {/* Parallax background layer */}
        <div ref={bgRef} style={{
          position: "absolute", inset: "-8%",
          willChange: "transform, opacity",
          background: `
            radial-gradient(ellipse 80% 60% at 20% 60%, rgba(176,135,84,0.55), transparent 65%),
            radial-gradient(ellipse 70% 50% at 85% 40%, rgba(217,185,135,0.30), transparent 60%),
            radial-gradient(ellipse 60% 80% at 50% 100%, rgba(140,106,63,0.40), transparent 60%),
            var(--msc-surface-tile-1)
          `,
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            color: "rgba(255,254,251,0.10)", fontFamily: "ui-monospace,monospace",
            fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
            pointerEvents: "none", userSelect: "none",
          }}>hero video · 16:9</div>
        </div>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(28,26,23,0.45) 0%, transparent 30%, transparent 50%, rgba(28,26,23,0.80) 100%)",
          pointerEvents: "none",
        }} />
        {/* Parallax text layer */}
        <div ref={textRef} style={{
          position: "relative", zIndex: 3, textAlign: "center", marginBottom: 32, padding: "0 24px",
          willChange: "transform, opacity",
        }}>
          <h1 style={{
            fontFamily: "var(--msc-font-display)", fontSize: "clamp(52px, 8vw, 120px)",
            fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 0.96,
            color: "#fff", textTransform: "lowercase", margin: "0 0 20px",
          }}>
            excellence{" "}
            <span style={{ fontFamily: "var(--msc-font-editorial)", fontStyle: "italic", color: "var(--msc-primary-on-dark)" }}>every</span>{" "}
            day
          </h1>
          <p style={{
            color: "rgba(245,237,224,0.70)", fontSize: 18, fontWeight: 300,
            lineHeight: 1.5, margin: "0 0 28px", fontFamily: "var(--msc-font-text)",
            maxWidth: 520, marginLeft: "auto", marginRight: "auto",
          }}>
            A bespoke dental studio in the heart of Toorak — quietly modern, thoughtfully crafted.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <PrimaryPill large onClick={() => onNavigate("contact")}>Book a consultation</PrimaryPill>
            <GhostPill onDark onClick={() => onNavigate("treatments")}>The services</GhostPill>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 3 }}>
          <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, transparent, rgba(217,185,135,0.6))", animation: "scrollHint 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* SMILE PORTFOLIO */}
      <SmilePortfolio onNavigate={onNavigate} />

      {/* TEAM */}
      <TeamSection onNavigate={onNavigate} />

      {/* STUDIO FEATURE */}
      <StudioFeature onNavigate={onNavigate} />

      {/* SERVICES */}
      <section data-nav-theme="light" className="msc-cta-section" style={{ background: "linear-gradient(180deg, var(--msc-canvas-mist) 0%, var(--msc-canvas-parchment) 100%)", padding: "120px 24px", textAlign: "center" }}>
        <Reveal>
          <TileEyebrow>The services</TileEyebrow>
          <TileHeadline>
            a smile, <span style={{ fontFamily: "var(--msc-font-editorial)", fontStyle: "italic", color: "var(--msc-primary)" }}>considered</span>.
          </TileHeadline>
          <TileTagline muted>Veneers, whitening, implants, sleep dentistry — handled in-house with the same unhurried care.</TileTagline>
          <TileCTAs>
            <PrimaryPill onClick={() => onNavigate("treatments")}>View services</PrimaryPill>
            <GhostPill onClick={() => onNavigate("contact")}>Book</GhostPill>
          </TileCTAs>
        </Reveal>
      </section>

      {/* ACCREDITATION */}
      <section data-nav-theme="light" className="msc-cta-section" style={{ background: "var(--msc-canvas)", padding: "96px 24px", textAlign: "center" }}>
        <Reveal>
          <TileEyebrow>Accredited · trusted</TileEyebrow>
          <TileHeadline>
            quietly <span style={{ fontFamily: "var(--msc-font-editorial)", fontStyle: "italic", color: "var(--msc-primary)" }}>credentialled</span>.
          </TileHeadline>
          <TileTagline muted>QIP accredited. ADA member practice. Three decades in Toorak.</TileTagline>
          <div className="msc-accred-wrap" style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 40, alignItems: "center" }}>
            <img src="assets/ada-accreditation.png" alt="QIP Accredited" style={{ height: 88 }} />
            <img src="assets/ada-member.png" alt="ADA Member" style={{ height: 110 }} />
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ── Team section ───────────────────────────────────────────── */
/* ── Shared dentist data ────────────────────────────────────── */
const DENTISTS_DATA = [
  {
    photo: "assets/dr-1.png?v=2",
    name: "Dr George Paltoglou",
    shortTitle: "Principal Dentist",
    title: "Principal Dentist · BDSc (Melb.)",
    since: "Practising since 1987",
    bio: "George has led Melbourne Smile Centre since 1987, building a reputation for cosmetic and aesthetic dentistry that draws patients from across Australia. A member of the American Academy of Cosmetic Dentistry and the European Academy of Aesthetic Dentistry, he continues his post-graduate education internationally — bringing a quietly rigorous standard to every smile he designs.",
    specialties: ["Cosmetic Dentistry", "Porcelain Veneers", "Aesthetic Smile Design", "Occlusal Rehabilitation"],
  },
  {
    photo: "assets/dr-2.png?v=2",
    name: "Dr Ido Landau",
    shortTitle: "Dentist",
    title: "Dentist · MDent BHSC",
    since: "Multiple ADA Prize Recipient",
    bio: "Ido trained in biomimetic dentistry under Dr Pascal Magne and Dr Didier Dietschi — two of the discipline's foremost practitioners. His approach is built on the principle that the best restoration is the one that preserves the most tooth. He brings an evidence-based, unhurried precision to every case, however simple or complex.",
    specialties: ["Biomimetic Dentistry", "Digital Smile Design", "Ceramic Restorations", "Preventive Care"],
  },
  {
    photo: "assets/dr-3.png?v=2",
    name: "Dr Matthew Youssef",
    shortTitle: "Implantologist",
    title: "Dentist · MDent BHSC",
    since: "gIDE Master Clinician in Implantology",
    bio: "Matthew holds a Master Clinician designation from the global Institute of Dental Education (gIDE) — one of the most demanding post-graduate implantology programmes in the world. He performs both surgical placement and prosthetic restoration in-house, eliminating the referral handoff that typically adds months to implant treatment. Outside the practice he founded Australian Christian Dental Aid.",
    specialties: ["Dental Implants", "All-on-4", "Orthodontics & Invisalign", "Oral Surgery"],
  },
];

const HYGIENISTS_DATA = [
  { name: "Kanella Tsaconas", title: "Dental Hygienist", photo: "assets/staff-1.png" },
  { name: "Joyce Harnick",    title: "Dental Hygienist", photo: "assets/staff-2.png" },
  { name: "Laura Micutz",     title: "Dental Hygienist", photo: "assets/staff-3.png" },
];
const SUPPORT_DATA = [
  { name: "—", title: "Practice Manager",    photo: null },
  { name: "—", title: "Patient Coordinator", photo: null },
  { name: "—", title: "Reception",           photo: null },
];

/* ── Home: teaser cards ─────────────────────────────────────── */
function DentistCardTeaser({ photo, name, shortTitle, onNavigate }) {
  const [hovered, setHovered] = usePagesState(false);
  return (
    <div
      className="hover-scale"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position:"relative", borderRadius:20, overflow:"hidden", cursor:"pointer",
        aspectRatio:"3/4", background:"rgba(20,18,15,0.85)",
        boxShadow: hovered ? "0 24px 56px -12px rgba(0,0,0,0.55)" : "0 8px 32px -8px rgba(0,0,0,0.35)",
        transition:"box-shadow 400ms ease",
      }}
      onClick={() => onNavigate && onNavigate("team")}
    >
      {/* Photo */}
      <img src={photo} alt={name} style={{
        position:"absolute", inset:0, width:"100%", height:"100%",
        objectFit:"cover", objectPosition:"top center",
        mixBlendMode:"lighten",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition:"transform 600ms cubic-bezier(0.4,0,0.2,1)",
      }} onError={(e) => { e.target.style.display = "none"; }} />

      {/* Gradient */}
      <div style={{
        position:"absolute", inset:0,
        background: hovered
          ? "linear-gradient(0deg, rgba(14,12,9,0.92) 0%, rgba(14,12,9,0.35) 55%, transparent 100%)"
          : "linear-gradient(0deg, rgba(14,12,9,0.85) 0%, rgba(14,12,9,0.25) 50%, transparent 100%)",
        transition:"background 400ms ease",
      }} />

      {/* Name + title */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, padding:"24px 22px",
        transform: hovered ? "translateY(-44px)" : "translateY(0)",
        transition:"transform 360ms cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ fontSize:10, color:"var(--msc-primary-on-dark)", letterSpacing:"0.16em",
          textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:6,
          opacity: hovered ? 1 : 0.7, transition:"opacity 300ms ease",
        }}>{shortTitle}</div>
        <div style={{ fontFamily:"var(--msc-font-display)", fontSize:"clamp(18px,2.2vw,24px)",
          fontWeight:400, color:"#fff", letterSpacing:"-0.01em", lineHeight:1.1 }}>{name}</div>
      </div>

      {/* "Get to know" button — slides up on hover */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, padding:"0 22px 20px",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(8px)",
        transition:"opacity 300ms ease, transform 300ms ease",
      }}>
        <button onClick={(e) => { e.stopPropagation(); onNavigate && onNavigate("team"); }} style={{
          display:"inline-flex", alignItems:"center", gap:7,
          background:"rgba(176,135,84,0.18)", backdropFilter:"blur(8px)",
          border:"1px solid rgba(176,135,84,0.40)", borderRadius:9999,
          color:"var(--msc-primary-on-dark)", fontFamily:"var(--msc-font-text)",
          fontSize:12, fontWeight:600, letterSpacing:"0.06em",
          padding:"8px 16px", cursor:"pointer",
        }}>
          Get to know
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Home: team teaser section ──────────────────────────────── */
function TeamSection({ onNavigate }) {
  return (
    <section data-nav-theme="dark" className="msc-team-section" style={{
      background:`radial-gradient(700px 360px at 15% 40%, rgba(176,135,84,0.38), transparent 70%),
                 radial-gradient(500px 280px at 88% 70%, rgba(217,185,135,0.20), transparent 70%),
                 var(--msc-surface-tile-1)`,
      padding:"120px 32px 0", overflow:"hidden", position:"relative",
    }}>
      <div className="msc-inner-pad" style={{ maxWidth:1280, margin:"0 auto" }}>
        {/* Header row */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between",
          flexWrap:"wrap", gap:20, marginBottom:52 }}>
          <Reveal>
            <div>
              <div style={{ fontSize:11, color:"var(--msc-primary-on-dark)", letterSpacing:"0.18em",
                textTransform:"uppercase", fontWeight:500, fontFamily:"var(--msc-font-text)", marginBottom:16 }}>The team</div>
              <h2 style={{ fontFamily:"var(--msc-font-display)", fontWeight:400,
                fontSize:"clamp(40px,6vw,72px)", letterSpacing:"-0.018em",
                lineHeight:1.02, color:"#fff", textTransform:"lowercase", margin:0 }}>
                three dentists.<br/>
                <span style={{ fontFamily:"var(--msc-font-editorial)", fontStyle:"italic",
                  color:"var(--msc-primary-on-dark)" }}>one</span> studio.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <button onClick={() => onNavigate && onNavigate("team")} style={{
              display:"inline-flex", alignItems:"center", gap:8,
              background:"transparent", border:"1px solid rgba(217,185,135,0.30)",
              borderRadius:9999, padding:"11px 22px",
              color:"rgba(245,237,224,0.65)", fontFamily:"var(--msc-font-text)",
              fontSize:13, fontWeight:500, cursor:"pointer", letterSpacing:"0.01em",
              transition:"border-color 200ms ease, color 200ms ease",
            }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(217,185,135,0.60)"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(217,185,135,0.30)"; e.currentTarget.style.color="rgba(245,237,224,0.65)"; }}
            >
              Meet the full team
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Reveal>
        </div>

        {/* Teaser cards */}
        <div className="msc-grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
          {DENTISTS_DATA.map((d, i) => (
            <Reveal key={d.name} delay={i * 90}>
              <DentistCardTeaser {...d} onNavigate={onNavigate} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Hygienist horizontal scroll strip */}
      <HygienistStrip onNavigate={onNavigate} />
    </section>
  );
}

function HygienistStrip({ onNavigate }) {
  const trackRef = usePagesRef(null);
  const [dragging, setDragging] = usePagesState(false);
  const [startX, setStartX] = usePagesState(0);
  const [scrollLeft, setScrollLeft] = usePagesState(0);
  const [hasScrolled, setHasScrolled] = usePagesState(false);

  const onMouseDown = (e) => {
    setDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft - (x - startX);
    setHasScrolled(true);
  };
  const onMouseUp   = () => setDragging(false);
  const onTouchMove = (e) => {
    if (!trackRef.current) return;
    trackRef.current.scrollLeft -= e.touches[0].clientX - startX;
    setStartX(e.touches[0].clientX);
    setHasScrolled(true);
  };

  return (
    <Reveal>
      <div style={{ maxWidth:1280, margin:"48px auto 0", padding:"0 32px" }}>
        {/* Section label + drag hint */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          marginBottom:20, flexWrap:"wrap", gap:10 }}>
          <div style={{ fontSize:10, color:"rgba(245,237,224,0.35)", letterSpacing:"0.16em",
            textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)" }}>
            Hygienists
          </div>
          {/* Drag cue pill */}
          <div style={{
            display:"flex", alignItems:"center", gap:8,
            padding:"6px 14px", borderRadius:9999,
            border:"1px solid rgba(255,254,251,0.10)",
            background:"rgba(255,254,251,0.04)",
            opacity: hasScrolled ? 0 : 1,
            transition:"opacity 500ms ease",
            pointerEvents:"none",
          }}>
            {/* Animated hand icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{
              animation:"dragHint 1.8s ease-in-out infinite",
            }}>
              <path d="M5 2v5M7.5 3v4M10 4v3M2.5 5v3.5C2.5 10.5 4 12 7 12s4.5-1.5 4.5-3.5V7" stroke="rgba(217,185,135,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize:10, color:"rgba(217,185,135,0.55)", fontFamily:"var(--msc-font-text)",
              fontWeight:600, letterSpacing:"0.10em", textTransform:"uppercase" }}>drag to explore</span>
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
              <path d="M1 5h18M14 1l4 4-4 4" stroke="rgba(217,185,135,0.40)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Inject drag hint keyframe once */}
      <style>{`@keyframes dragHint { 0%,100%{transform:translateX(0)} 40%{transform:translateX(4px)} 70%{transform:translateX(-3px)} }`}</style>

      {/* Scroll track — bleeds past right edge intentionally */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={(e) => setStartX(e.touches[0].clientX)}
        onTouchMove={onTouchMove}
        style={{
          display:"flex", gap:14,
          overflowX:"auto", overflowY:"hidden",
          cursor: dragging ? "grabbing" : "grab",
          userSelect:"none", touchAction:"pan-x",
          paddingLeft:32, paddingBottom:32,
          /* No scrollbar */
          scrollbarWidth:"none", msOverflowStyle:"none",
        }}
      >
        {/* Leading spacer aligned with content */}
        <div style={{ flexShrink:0, width:0 }}/>

        {HYGIENISTS_DATA.map((h, i) => (
          <div key={h.name} style={{
            flexShrink:0, width:200, borderRadius:16, overflow:"hidden",
            background:"rgba(20,18,15,0.85)",
            border:"1px solid rgba(255,254,251,0.07)",
            aspectRatio:"3/4", position:"relative",
            opacity:0, animation:`aofFadeUp 400ms ${i * 80}ms ease both`,
          }}>
            {h.photo && (
              <img src={h.photo} alt={h.name} style={{
                position:"absolute", inset:0, width:"100%", height:"100%",
                objectFit:"cover", objectPosition:"top center",
                mixBlendMode:"lighten",
              }} onError={(e) => { e.target.style.display="none"; }} />
            )}
            <div style={{
              position:"absolute", inset:0,
              background:"linear-gradient(0deg, rgba(14,12,9,0.88) 0%, rgba(14,12,9,0.15) 55%, transparent 100%)",
            }}/>
            <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 16px" }}>
              <div style={{ fontSize:9, color:"var(--msc-primary-on-dark)", letterSpacing:"0.14em",
                textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:4,
                opacity:0.75 }}>Hygienist</div>
              <div style={{ fontFamily:"var(--msc-font-display)", fontSize:16,
                fontWeight:400, color:"#fff", letterSpacing:"-0.01em", lineHeight:1.2 }}>{h.name}</div>
            </div>
          </div>
        ))}

        {/* Right fade-out + "see more" card */}
        <div onClick={() => onNavigate && onNavigate("team")} style={{
          flexShrink:0, width:160, borderRadius:16,
          background:"rgba(176,135,84,0.07)", border:"1px solid rgba(176,135,84,0.18)",
          aspectRatio:"3/4", display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", gap:12,
          cursor:"pointer", padding:"20px",
        }}>
          <div style={{ width:40, height:40, borderRadius:"50%",
            border:"1px solid rgba(176,135,84,0.35)",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M9 3l5 5-5 5" stroke="var(--msc-primary-on-dark)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontSize:11, color:"rgba(217,185,135,0.65)", textAlign:"center",
            fontFamily:"var(--msc-font-text)", fontWeight:600, letterSpacing:"0.08em",
            textTransform:"uppercase", lineHeight:1.5 }}>Meet the full team</span>
        </div>

        {/* Right padding */}
        <div style={{ flexShrink:0, width:32 }}/>
      </div>

      {/* Right edge fade gradient overlay */}
      <div style={{
        position:"absolute", right:0, top:0, bottom:0, width:120,
        background:"linear-gradient(270deg, var(--msc-surface-tile-1) 0%, transparent 100%)",
        pointerEvents:"none",
      }}/>
    </Reveal>
  );
}

/* ── Team page: full editorial dentist row ──────────────────── */
function DentistRow({ d, index }) {
  const ref = usePagesRef(null);
  const [visible, setVisible] = usePagesState(false);
  const reversed = index % 2 === 1;

  usePagesEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const photoAnim = {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : `translateX(${reversed ? "40px" : "-40px"})`,
    transition:"opacity 700ms cubic-bezier(0.4,0,0.2,1), transform 700ms cubic-bezier(0.4,0,0.2,1)",
  };
  const textAnim = {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : `translateX(${reversed ? "-40px" : "40px"})`,
    transition:"opacity 700ms 120ms cubic-bezier(0.4,0,0.2,1), transform 700ms 120ms cubic-bezier(0.4,0,0.2,1)",
  };

  return (
    <div ref={ref} style={{
      display:"grid", gridTemplateColumns:"1fr 1fr", gap:0,
      minHeight:560, borderBottom:"1px solid rgba(255,254,251,0.07)",
    }}>
      {/* Photo column */}
      <div style={{ order: reversed ? 2 : 1, overflow:"hidden", position:"relative",
        background:"rgba(20,18,15,0.90)" }}>
        <div style={{ ...photoAnim, width:"100%", height:"100%", minHeight:480 }}>
          <img src={d.photo} alt={d.name} style={{
            width:"100%", height:"100%", objectFit:"cover",
            objectPosition:"top center", mixBlendMode:"lighten",
          }} onError={(e) => { e.target.style.display = "none"; }} />
          {/* Directional gradient towards text */}
          <div style={{
            position:"absolute", inset:0,
            background: reversed
              ? "linear-gradient(270deg, rgba(14,12,9,0.60) 0%, transparent 50%)"
              : "linear-gradient(90deg, rgba(14,12,9,0.60) 0%, transparent 50%)",
            pointerEvents:"none",
          }} />
          {/* Bottom gradient */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"30%",
            background:"linear-gradient(0deg, rgba(14,12,9,0.70), transparent)",
            pointerEvents:"none" }} />
          {/* Number watermark */}
          <div style={{ position:"absolute", top:28, left: reversed ? "auto" : 28, right: reversed ? 28 : "auto",
            fontFamily:"var(--msc-font-display)", fontSize:"clamp(80px,9vw,140px)",
            fontWeight:400, color:"rgba(255,254,251,0.05)",
            letterSpacing:"-0.04em", lineHeight:1, pointerEvents:"none", userSelect:"none",
          }}>0{index+1}</div>
        </div>
      </div>

      {/* Text column */}
      <div style={{ order: reversed ? 1 : 2,
        background: index % 2 === 0
          ? "linear-gradient(135deg, rgba(28,24,18,0.98), rgba(22,19,14,1))"
          : "linear-gradient(135deg, rgba(24,22,16,0.98), rgba(20,17,12,1))",
        display:"flex", alignItems:"center",
        padding:"60px clamp(32px,5vw,72px)",
      }}>
        <div style={{ ...textAnim, maxWidth:480, width:"100%" }}>
          {/* Eyebrow */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24 }}>
            <div style={{ width:24, height:1, background:"rgba(176,135,84,0.5)" }}/>
            <span style={{ fontSize:9, color:"var(--msc-primary-on-dark)", letterSpacing:"0.20em",
              textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)" }}>
              {d.since}
            </span>
          </div>

          {/* Name */}
          <h2 style={{ fontFamily:"var(--msc-font-display)", fontWeight:400,
            fontSize:"clamp(32px,4vw,52px)", letterSpacing:"-0.02em",
            lineHeight:1.05, color:"#fff", textTransform:"lowercase",
            margin:"0 0 6px" }}>{d.name}</h2>
          <div style={{ fontSize:11, color:"var(--msc-primary-on-dark)", letterSpacing:"0.14em",
            textTransform:"uppercase", fontWeight:600, fontFamily:"var(--msc-font-text)",
            marginBottom:28 }}>{d.shortTitle}</div>

          {/* Bio */}
          <p style={{ fontSize:15, color:"rgba(245,237,224,0.62)", lineHeight:1.78,
            margin:"0 0 32px", fontWeight:300 }}>{d.bio}</p>

          {/* Specialty tags */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {d.specialties.map(s => (
              <span key={s} style={{
                padding:"6px 13px", borderRadius:9999,
                border:"1px solid rgba(176,135,84,0.28)",
                background:"rgba(176,135,84,0.07)",
                fontSize:11, color:"var(--msc-primary-on-dark)",
                fontFamily:"var(--msc-font-text)", fontWeight:500,
                letterSpacing:"0.04em",
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Support card (used on team page) ───────────────────────── */
function SupportCard({ name, title, photo }) {
  return (
    <div className="hover-glow" style={{
      display:"flex", alignItems:"center", gap:16, padding:"18px 20px",
      background:"rgba(255,254,251,0.04)", border:"1px solid rgba(255,254,251,0.07)", borderRadius:14,
    }}>
      <div style={{
        width:52, height:52, borderRadius:"50%",
        background:"rgba(176,135,84,0.25)", border:"1px solid rgba(176,135,84,0.35)",
        overflow:"hidden", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        {photo
          ? <img src={photo} alt={name} style={{ width:"100%", height:"100%", objectFit:"cover", mixBlendMode:"lighten" }}/>
          : <span style={{ color:"var(--msc-primary-on-dark)", fontSize:18, fontFamily:"var(--msc-font-display)" }}>{name.charAt(0)}</span>
        }
      </div>
      <div>
        <div style={{ fontFamily:"var(--msc-font-text)", fontSize:15, fontWeight:500, color:"#fff", marginBottom:2 }}>{name}</div>
        <div style={{ fontSize:12, color:"var(--msc-body-muted)", letterSpacing:"0.06em" }}>{title}</div>
      </div>
    </div>
  );
}

/* ── Treatments page ────────────────────────────────────────── */
function TreatmentsPage({ onNavigate }) {
  return (
    <>
      <section data-nav-theme="light" className="msc-treatments-header" style={{
        background: "linear-gradient(180deg, var(--msc-canvas-mist) 0%, var(--msc-canvas-parchment) 100%)",
        padding: "160px 32px 72px",
      }}>
        <div className="msc-inner-pad" style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 11, color: "var(--msc-primary)", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, fontFamily: "var(--msc-font-text)", marginBottom: 16 }}>The services</div>
            <h1 style={{
              fontFamily: "var(--msc-font-display)", fontWeight: 400,
              fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "-0.022em",
              lineHeight: 0.96, color: "var(--msc-ink)", textTransform: "lowercase",
              margin: "0 0 24px",
            }}>
              considered.{" "}
              <span style={{ fontFamily: "var(--msc-font-editorial)", fontStyle: "italic", color: "var(--msc-primary)" }}>comprehensive</span>.
            </h1>
            <p style={{ fontSize: 18, fontWeight: 300, color: "var(--msc-ink-muted-80)", maxWidth: 600, lineHeight: 1.6, margin: 0 }}>
              From Digital Smile Design and porcelain veneers to dental implants, All-on-4, biomimetic restorations, and periodontal therapy — every service delivered in one Toorak studio.
            </p>
          </Reveal>
        </div>
      </section>
      <section data-nav-theme="light" style={{ background: "linear-gradient(180deg, var(--msc-canvas-parchment) 0%, #F2EDE4 100%)" }}>
        <TreatmentGrid onNavigate={onNavigate} />
      </section>
    </>
  );
}

/* ── Environment page ───────────────────────────────────────── */
function EnvironmentPage() {
  return (
    <>
      <Tile tone="dark" style={{ padding: "200px 24px 140px" }}>
        <Reveal>
          <TileEyebrow onDark>The studio</TileEyebrow>
          <h1 style={{ fontFamily: "var(--msc-font-display)", fontSize: "clamp(56px,9vw,120px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 0.96, margin: "16px 0 0", color: "#fff", textTransform: "lowercase" }}>
            a studio, not a <span style={{ fontFamily: "var(--msc-font-editorial)", fontStyle: "italic", color: "var(--msc-primary-on-dark)" }}>surgery</span>.
          </h1>
          <TileTagline large onDark muted>Light, air, and the quiet confidence of a clinic that has nothing to prove.</TileTagline>
          <TileCTAs><PrimaryPill>Book a tour</PrimaryPill></TileCTAs>
        </Reveal>
      </Tile>
      <StudioFeature onNavigate={() => {}} />
    </>
  );
}

/* ── Contact page ───────────────────────────────────────────── */
function ContactPage() {
  const [submitted, setSubmitted] = usePagesState(false);

  const details = [
    { label: "Phone",   value: "9824 7722",                             href: "tel:0398247722" },
    { label: "Email",   value: "enquiries@melbournesmile.com.au",      href: "mailto:enquiries@melbournesmile.com.au" },
    { label: "Address", value: "1007 Malvern Road, Toorak VIC 3142",   href: "https://maps.google.com/?q=1007+Malvern+Road+Toorak+VIC+3142" },
  ];
  const hours = [
    { day: "Monday – Wednesday", time: "7am – 4pm" },
    { day: "Thursday",           time: "7am – 4pm" },
    { day: "Friday",             time: "8am – 4pm" },
    { day: "Saturday",           time: "8am – 12pm" },
    { day: "Sunday",             time: "Closed" },
  ];

  return (
    <section data-nav-theme="light" className="msc-contact-outer" style={{ background: "linear-gradient(180deg, var(--msc-canvas-mist) 0%, var(--msc-canvas-parchment) 100%)", minHeight: "100vh", padding: "160px 32px 120px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <TileEyebrow>Contact</TileEyebrow>
          <h1 style={{ fontFamily: "var(--msc-font-display)", fontWeight: 400, fontSize: "clamp(40px,6vw,80px)", letterSpacing: "-0.02em", lineHeight: 1.0, color: "var(--msc-ink)", textTransform: "lowercase", margin: "16px 0 0" }}>
            book a <span style={{ fontFamily: "var(--msc-font-editorial)", fontStyle: "italic", color: "var(--msc-primary)" }}>consultation</span>.
          </h1>
          <p style={{ marginTop: 16, fontSize: 18, fontWeight: 300, color: "var(--msc-ink-muted-80)", maxWidth: 480 }}>
            We'll be in touch within one business day.
          </p>
        </Reveal>

        <div className="msc-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 64 }}>
          {/* Form */}
          <Reveal>
            {submitted ? (
              <div style={{ padding: 40, background: "var(--msc-surface-glass-light)", backdropFilter: "var(--msc-frosted-blur)", WebkitBackdropFilter: "var(--msc-frosted-blur)", border: "1px solid var(--msc-hairline-glass)", borderRadius: 18, boxShadow: "var(--msc-shadow-glass)" }}>
                <div style={{ fontFamily: "var(--msc-font-display)", fontSize: 32, fontWeight: 400, textTransform: "lowercase" }}>
                  thank <span style={{ fontFamily: "var(--msc-font-editorial)", fontStyle: "italic", color: "var(--msc-primary)" }}>you</span>.
                </div>
                <p style={{ marginTop: 10, color: "var(--msc-ink-muted-80)" }}>We've received your enquiry and will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{
                display: "flex", flexDirection: "column", gap: 14,
                padding: 32, background: "var(--msc-surface-glass-light)",
                backdropFilter: "var(--msc-frosted-blur)", WebkitBackdropFilter: "var(--msc-frosted-blur)",
                border: "1px solid var(--msc-hairline-glass)", borderRadius: 18, boxShadow: "var(--msc-shadow-glass-lg)",
              }}>
                <Field label="Your name"         placeholder="First and last" />
                <Field label="Email"             placeholder="you@example.com" type="email" />
                <Field label="Phone"             placeholder="+61" />
                <Field label="What brings you in?" placeholder="A brief note" multiline />
                <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
                  <PrimaryPill>Submit enquiry</PrimaryPill>
                </div>
              </form>
            )}
          </Reveal>

          {/* Contact details */}
          <Reveal delay={120}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {/* Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {details.map((d) => (
                  <div key={d.label}>
                    <div style={{ fontSize: 11, color: "var(--msc-primary)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500, fontFamily: "var(--msc-font-text)", marginBottom: 4 }}>{d.label}</div>
                    <a href={d.href} target={d.label === "Address" ? "_blank" : undefined} className="hover-bronze" style={{ fontSize: 16, color: "var(--msc-ink)", textDecoration: "none", fontWeight: 400 }}>{d.value}</a>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div>
                <div style={{ fontSize: 11, color: "var(--msc-primary)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500, fontFamily: "var(--msc-font-text)", marginBottom: 16 }}>Clinic hours</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {hours.map((h) => (
                    <div key={h.day} style={{ display: "flex", justifyContent: "space-between", fontSize: 15, borderBottom: "1px solid var(--msc-hairline)", paddingBottom: 8 }}>
                      <span style={{ color: "var(--msc-ink-muted-80)" }}>{h.day}</span>
                      <span style={{ color: h.time === "Closed" ? "var(--msc-ink-muted-48)" : "var(--msc-ink)", fontWeight: 500 }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <a href="https://maps.google.com/?q=1007+Malvern+Road+Toorak+VIC+3142" target="_blank" className="hover-lift" style={{
                display: "block", borderRadius: 14, overflow: "hidden", textDecoration: "none",
                background: "var(--msc-canvas-parchment)", border: "1px solid var(--msc-hairline)",
                aspectRatio: "16/7", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 12, color: "var(--msc-ink-muted-48)", fontFamily: "ui-monospace,monospace", letterSpacing: "0.08em" }}>1007 Malvern Road, Toorak · open in maps</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = "text", multiline }) {
  const Comp = multiline ? "textarea" : "input";
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13, color: "var(--msc-ink-muted-80)", fontWeight: 500 }}>{label}</span>
      <Comp type={type} placeholder={placeholder} rows={multiline ? 4 : undefined} style={{
        border: "1px solid var(--msc-hairline)", borderRadius: multiline ? 14 : 9999,
        padding: multiline ? "14px 18px" : "13px 22px",
        fontFamily: "var(--msc-font-text)", fontSize: 15, color: "var(--msc-ink)",
        outline: "none", background: "rgba(255,254,251,0.7)",
        resize: multiline ? "vertical" : undefined,
        transition: "border-color 200ms ease, box-shadow 200ms ease",
      }}
      onFocus={(e) => { e.target.style.borderColor = "var(--msc-primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(176,135,84,0.15)"; }}
      onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
      />
    </label>
  );
}

function TeamPage({ onNavigate }) {
  return (
    <>
      {/* Hero header */}
      <section data-nav-theme="dark" style={{
        background:"linear-gradient(160deg, #110F0C 0%, #1C1814 60%, #211C13 100%)",
        padding:"160px 32px 96px", position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          background:"radial-gradient(700px 500px at 10% 80%, rgba(176,135,84,0.22), transparent 65%), radial-gradient(500px 400px at 90% 20%, rgba(217,185,135,0.10), transparent 60%)",
        }}/>
        <div style={{ position:"absolute", inset:0, opacity:0.03, pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(217,185,135,1) 1px,transparent 1px),linear-gradient(90deg,rgba(217,185,135,1) 1px,transparent 1px)",
          backgroundSize:"60px 60px",
        }}/>
        <div style={{ maxWidth:1280, margin:"0 auto", position:"relative", zIndex:2 }}>
          <Reveal>
            <div style={{ fontSize:11, color:"var(--msc-primary-on-dark)", letterSpacing:"0.20em",
              textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:20 }}>The team</div>
            <h1 style={{ fontFamily:"var(--msc-font-display)", fontWeight:400,
              fontSize:"clamp(52px,8vw,104px)", letterSpacing:"-0.025em",
              lineHeight:0.94, color:"#fff", textTransform:"lowercase", margin:"0 0 28px" }}>
              the people<br/>
              behind your <span style={{ fontFamily:"var(--msc-font-editorial)", fontStyle:"italic",
                color:"var(--msc-primary-on-dark)" }}>smile</span>.
            </h1>
            <p style={{ fontSize:17, fontWeight:300, color:"rgba(245,237,224,0.55)",
              maxWidth:520, lineHeight:1.72, margin:0 }}>
              Three dentists. One studio. A shared belief that dentistry done well is barely felt at all.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Dentist editorial rows */}
      <div style={{ background:"linear-gradient(180deg, #1A1610 0%, #14120E 100%)" }}>
        {DENTISTS_DATA.map((d, i) => (
          <DentistRow key={d.name} d={d} index={i} />
        ))}
      </div>

      {/* CTA between dentists and support */}
      <section data-nav-theme="dark" style={{
        background:"#0E0C09",
        padding:"72px 32px",
        textAlign:"center",
      }}>
        <Reveal>
          <p style={{ fontSize:15, color:"rgba(245,237,224,0.45)", fontWeight:300,
            marginBottom:24, fontFamily:"var(--msc-font-text)" }}>
            Ready to meet us in person?
          </p>
          <button onClick={() => onNavigate && onNavigate("contact")} style={{
            background:"var(--msc-primary)", color:"#fff", border:"none",
            borderRadius:9999, padding:"13px 30px",
            fontSize:14, fontFamily:"var(--msc-font-text)", fontWeight:600,
            cursor:"pointer", letterSpacing:"0.02em",
            boxShadow:"0 8px 28px -4px rgba(140,95,40,0.55)",
            transition:"transform 200ms ease",
          }}
          onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform="none"; }}
          >Book a consultation</button>
        </Reveal>
      </section>

      {/* Support staff */}
      <section data-nav-theme="dark" style={{
        background:"linear-gradient(180deg, #0E0C09 0%, var(--msc-surface-tile-1) 100%)",
        padding:"80px 32px 100px",
      }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <Reveal>
            <div style={{ borderBottom:"1px solid rgba(255,254,251,0.07)", paddingBottom:40, marginBottom:48 }}>
              <div style={{ fontSize:11, color:"var(--msc-primary-on-dark)", letterSpacing:"0.18em",
                textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:16 }}>Hygienists</div>
              <div className="msc-grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
                {HYGIENISTS_DATA.map((s, i) => (
                  <Reveal key={s.name} delay={i * 60}><SupportCard {...s} /></Reveal>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ fontSize:11, color:"var(--msc-primary-on-dark)", letterSpacing:"0.18em",
              textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:28 }}>Support team</div>
            <div className="msc-grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
              {SUPPORT_DATA.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}><SupportCard {...s} /></Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
function PatientsPage() {
  return (
    <Tile tone="parchment" style={{ padding: "200px 24px 160px" }}>
      <Reveal>
        <TileEyebrow>Patients</TileEyebrow>
        <TileHeadline>the <span style={{ fontFamily: "var(--msc-font-editorial)", fontStyle: "italic", color: "var(--msc-primary)" }}>essentials</span>.</TileHeadline>
        <TileTagline muted>New patient form, fees, plans, and FAQs.</TileTagline>
      </Reveal>
    </Tile>
  );
}

Object.assign(window, { HomePage, TreatmentsPage, EnvironmentPage, ContactPage, TeamPage, PatientsPage, Reveal });
