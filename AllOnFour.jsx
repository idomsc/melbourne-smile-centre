/* eslint-disable no-undef */
const { useState: useAOFState, useEffect: useAOFEffect, useRef: useAOFRef } = React;

/* ── Inject styles ──────────────────────────────────────────── */
(function() {
  if (document.getElementById("aof-styles")) return;
  const s = document.createElement("style");
  s.id = "aof-styles";
  s.textContent = `
    @keyframes aofImplantPing  { 0%{transform:scale(1);opacity:0.9} 100%{transform:scale(2.6);opacity:0} }
    @keyframes aofImplantPing2 { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(3.4);opacity:0} }
    @keyframes aofShimmer      { 0%,100%{opacity:0.45} 50%{opacity:1} }
    @keyframes aofFadeUp       { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
    @keyframes aofLineGrow     { from{transform:scaleY(0);transform-origin:top} to{transform:scaleY(1)} }
    @keyframes aofSlideIn      { from{opacity:0;transform:translateX(-14px)} to{opacity:1;transform:none} }
    @keyframes aofPopIn        { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
    @keyframes aofFaqIn        { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }
    @keyframes aofCheckPop     { 0%{transform:scale(0) rotate(-45deg)} 70%{transform:scale(1.2)} 100%{transform:scale(1) rotate(0)} }
    @keyframes aofRotateArch   { from{transform:perspective(900px) rotateX(55deg) scale(0.88)} to{transform:perspective(900px) rotateX(0deg) scale(1.0)} }
    .aof-faq-answer { animation: aofFaqIn 240ms ease both; }
    .aof-step-item  { animation: aofFadeUp 400ms ease both; }
  `;
  document.head.appendChild(s);
})();

/* ── Arch SVG ───────────────────────────────────────────────── */
function DentalArchSVG() {
  const br = "var(--msc-primary)";
  const implants = [
    { cx:118, cy:162, delay:0   },
    { cx:194, cy: 74, delay:200 },
    { cx:306, cy: 74, delay:100 },
    { cx:382, cy:162, delay:300 },
  ];
  const teeth = [
    {x:105,y:185,w:18,h:13,r:145},{x:126,y:168,w:16,h:12,r:130},{x:147,y:147,w:15,h:12,r:115},
    {x:167,y:122,w:15,h:12,r:100},{x:188,y: 97,w:15,h:12,r: 85},{x:210,y: 80,w:14,h:12,r: 70},
    {x:233,y: 72,w:14,h:12,r: 55},{x:258,y: 72,w:14,h:12,r:-55},{x:280,y: 80,w:14,h:12,r:-70},
    {x:302,y: 97,w:15,h:12,r:-85},{x:323,y:122,w:15,h:12,r:-100},{x:343,y:147,w:15,h:12,r:-115},
    {x:364,y:168,w:16,h:12,r:-130},{x:384,y:185,w:18,h:13,r:-145},
  ];
  return (
    <svg viewBox="0 0 500 230" fill="none" style={{ width:"100%", height:"100%" }}>
      <defs>
        <filter id="aof-glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="aof-glow-strong">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Outer gum arch fill */}
      <path d="M 18 220 C 18 55 250 -18 482 220 L 460 220 C 460 72 250 8 40 220 Z"
        fill="rgba(176,135,84,0.05)" stroke="none"/>

      {/* Outer arch outline */}
      <path d="M 18 220 C 18 55 250 -18 482 220"
        stroke="rgba(176,135,84,0.30)" strokeWidth="1.5" fill="none"/>

      {/* Inner arch guide line */}
      <path d="M 70 215 C 70 90 250 22 430 215"
        stroke="rgba(176,135,84,0.12)" strokeWidth="1" fill="none" strokeDasharray="5 5"
        style={{animation:"aofShimmer 3s ease-in-out infinite"}}/>

      {/* Prosthesis bridge (thick path) */}
      <path d="M 108 165 C 120 100 165 60 250 48 C 335 60 380 100 392 165"
        stroke="rgba(245,237,224,0.85)" strokeWidth="18" strokeLinecap="round"
        fill="none" filter="url(#aof-glow)"/>
      <path d="M 108 165 C 120 100 165 60 250 48 C 335 60 380 100 392 165"
        stroke="rgba(176,135,84,0.45)" strokeWidth="16" strokeLinecap="round" fill="none"/>
      <path d="M 108 165 C 120 100 165 60 250 48 C 335 60 380 100 392 165"
        stroke="rgba(245,237,224,0.25)" strokeWidth="14" strokeLinecap="round" fill="none"/>

      {/* Tooth outlines along bridge */}
      {teeth.map((t, i) => (
        <rect key={i}
          x={t.x - t.w/2} y={t.y - t.h/2} width={t.w} height={t.h} rx="3"
          fill="rgba(245,237,224,0.10)"
          stroke="rgba(245,237,224,0.35)" strokeWidth="0.8"
          transform={`rotate(${t.r} ${t.x} ${t.y})`}/>
      ))}

      {/* Implant connecting dotted line */}
      <path d="M 118 162 L 194 74 M 194 74 L 306 74 M 306 74 L 382 162"
        stroke="rgba(176,135,84,0.22)" strokeWidth="1" strokeDasharray="4 4"/>

      {/* Implants */}
      {implants.map((imp, i) => (
        <g key={i}>
          {/* Outer ping rings */}
          <circle cx={imp.cx} cy={imp.cy} r="20" fill="none"
            stroke="rgba(176,135,84,0.35)" strokeWidth="1"
            style={{animation:`aofImplantPing 2.4s ${imp.delay}ms ease-out infinite`}}/>
          <circle cx={imp.cx} cy={imp.cy} r="20" fill="none"
            stroke="rgba(176,135,84,0.20)" strokeWidth="0.8"
            style={{animation:`aofImplantPing2 2.4s ${imp.delay + 400}ms ease-out infinite`}}/>
          {/* Inner fill */}
          <circle cx={imp.cx} cy={imp.cy} r="14" fill="rgba(176,135,84,0.16)" stroke="rgba(176,135,84,0.50)" strokeWidth="1"/>
          <circle cx={imp.cx} cy={imp.cy} r="7" fill={br} filter="url(#aof-glow-strong)"/>
          {/* Centre dot */}
          <circle cx={imp.cx} cy={imp.cy} r="3" fill="#fff" opacity="0.9"/>
          {/* Label */}
          <text x={imp.cx} y={imp.cy + (i < 2 ? 32 : -24)}
            textAnchor="middle" fontSize="9" fill="rgba(176,135,84,0.65)"
            fontFamily="ui-monospace,monospace" letterSpacing="0.1em">
            IMPLANT 0{i+1}
          </text>
        </g>
      ))}

    </svg>
  );
}

/* ── Hero section ───────────────────────────────────────────── */
function ArchHero({ onBook }) {
  const archWrapRef = useAOFRef(null);

  useAOFEffect(() => {
    const onScroll = () => {
      if (!archWrapRef.current) return;
      const p = Math.min(window.scrollY / 560, 1);
      const rotX  = 55  - p * 55;
      const rotY  = Math.sin(p * Math.PI) * 6;
      const sc    = 0.88 + p * 0.18;
      const trans = p * -20;
      archWrapRef.current.style.transform =
        `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${sc}) translateY(${trans}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section data-nav-theme="dark" style={{
      position:"relative", minHeight:"100vh",
      background:"linear-gradient(160deg, #110F0C 0%, #1C1814 50%, #241E15 100%)",
      overflow:"hidden",
      display:"flex", flexDirection:"column",
    }}>
      {/* Ambient radial glows */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(800px 600px at 20% 70%, rgba(176,135,84,0.18), transparent 65%), radial-gradient(500px 400px at 85% 20%, rgba(217,185,135,0.10), transparent 60%)",
      }}/>
      {/* Grid texture */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:0.04,
        backgroundImage:"linear-gradient(rgba(217,185,135,1) 1px,transparent 1px),linear-gradient(90deg,rgba(217,185,135,1) 1px,transparent 1px)",
        backgroundSize:"60px 60px",
      }}/>

      {/* Content */}
      <div style={{ position:"relative", zIndex:2, flex:1, display:"flex", alignItems:"center",
        maxWidth:1280, margin:"0 auto", width:"100%", padding:"120px 56px 60px",
        gap:40,
      }}>
        {/* Left: text */}
        <div style={{ flex:"0 0 auto", maxWidth:480 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24,
            animation:"aofFadeUp 600ms 0ms ease both",
          }}>
            <div style={{ width:28, height:1, background:"rgba(217,185,135,0.5)" }}/>
            <span style={{ fontSize:10, color:"var(--msc-primary-on-dark)", letterSpacing:"0.22em",
              textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)",
            }}>Signature Restoration</span>
          </div>

          <h1 style={{ fontFamily:"var(--msc-font-display)", fontWeight:400,
            fontSize:"clamp(52px,7vw,96px)", letterSpacing:"-0.025em",
            lineHeight:0.94, color:"#fff", textTransform:"lowercase", margin:"0 0 10px",
            animation:"aofFadeUp 600ms 80ms ease both",
          }}>
            all-on-<span style={{ fontFamily:"var(--msc-font-editorial)", fontStyle:"italic",
              color:"var(--msc-primary-on-dark)" }}>4</span>.
          </h1>
          <h2 style={{ fontFamily:"var(--msc-font-display)", fontWeight:400,
            fontSize:"clamp(22px,3vw,34px)", letterSpacing:"-0.018em",
            color:"rgba(245,237,224,0.50)", textTransform:"lowercase", margin:"0 0 28px",
            animation:"aofFadeUp 600ms 140ms ease both",
          }}>full arch. fixed forever. one journey.</h2>

          <p style={{ fontSize:16, color:"rgba(245,237,224,0.58)", fontWeight:300,
            lineHeight:1.7, margin:"0 0 36px", maxWidth:420,
            animation:"aofFadeUp 600ms 200ms ease both",
          }}>
            A permanent fixed bridge secured to four titanium implants — replacing an entire arch of failing or missing teeth with the stability, aesthetics, and confidence of natural teeth.
          </p>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap",
            animation:"aofFadeUp 600ms 280ms ease both",
          }}>
            <button onClick={onBook} style={{
              background:"var(--msc-primary)", color:"#fff", border:"none",
              borderRadius:9999, padding:"14px 32px",
              fontSize:14, fontFamily:"var(--msc-font-text)", fontWeight:600,
              cursor:"pointer", letterSpacing:"0.02em",
              boxShadow:"0 8px 28px -4px rgba(140,95,40,0.55)",
              transition:"transform 200ms ease, box-shadow 200ms ease",
            }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="none"; }}
            >Book a consultation</button>
            <a href="#aof-procedure" style={{
              background:"transparent", color:"rgba(245,237,224,0.75)",
              border:"1px solid rgba(245,237,224,0.22)", borderRadius:9999,
              padding:"14px 24px", fontSize:14,
              fontFamily:"var(--msc-font-text)", fontWeight:400,
              cursor:"pointer", textDecoration:"none", display:"inline-flex",
              transition:"border-color 200ms ease, color 200ms ease",
            }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(217,185,135,0.55)"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(245,237,224,0.22)"; e.currentTarget.style.color="rgba(245,237,224,0.75)"; }}
            >Learn more ↓</a>
          </div>

          {/* Key stats row */}
          <div style={{ display:"flex", gap:24, marginTop:48,
            animation:"aofFadeUp 600ms 360ms ease both",
          }}>
            {[
              { n:"4–6",  label:"Implants" },
              { n:"1",    label:"Full arch" },
              { n:"1 day",label:"Temporaries" },
              { n:"1",    label:"Practice" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily:"var(--msc-font-display)", fontSize:22, fontWeight:400,
                  color:"var(--msc-primary-on-dark)", letterSpacing:"-0.02em" }}>{s.n}</div>
                <div style={{ fontSize:10, color:"rgba(245,237,224,0.40)", fontFamily:"var(--msc-font-text)",
                  letterSpacing:"0.10em", textTransform:"uppercase", fontWeight:600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D arch */}
        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", minWidth:0 }}>
          <div ref={archWrapRef} style={{
            width:"100%", maxWidth:560,
            transform:"perspective(900px) rotateX(55deg) scale(0.88)",
            transition:"none", willChange:"transform",
          }}>
            <DentalArchSVG />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", zIndex:3,
        display:"flex", flexDirection:"column", alignItems:"center", gap:6,
      }}>
        <span style={{ fontSize:9, color:"rgba(217,185,135,0.4)", letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:"var(--msc-font-text)" }}>Scroll</span>
        <div style={{ width:1, height:36, background:"linear-gradient(180deg, transparent, rgba(217,185,135,0.5))", animation:"scrollHint 2s ease-in-out infinite" }}/>
      </div>
    </section>
  );
}

/* ── What is All-on-4 ───────────────────────────────────────── */
const OVERVIEW_ICONS = {
  "What it is": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M5 22 C5 12 14 4 23 4" stroke="var(--msc-primary)" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.35"/>
      <path d="M7 22 C7 13 14 6 21 6" stroke="var(--msc-primary)" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.55"/>
      <rect x="9" y="8" width="4" height="10" rx="2" stroke="var(--msc-primary)" strokeWidth="1.4" fill="rgba(176,135,84,0.10)"/>
      <rect x="15" y="8" width="4" height="10" rx="2" stroke="var(--msc-primary)" strokeWidth="1.4" fill="rgba(176,135,84,0.10)"/>
      <rect x="7" y="18" width="14" height="5" rx="2" stroke="var(--msc-primary)" strokeWidth="1.4" fill="rgba(176,135,84,0.08)"/>
    </svg>
  ),
  "Who it's for": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="9" r="5" stroke="var(--msc-primary)" strokeWidth="1.4" fill="rgba(176,135,84,0.08)"/>
      <path d="M4 26c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="var(--msc-primary)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <circle cx="21" cy="8" r="3" fill="rgba(176,135,84,0.15)" stroke="var(--msc-primary)" strokeWidth="1.2"/>
      <path d="M19.5 8l1 1 2-2" stroke="var(--msc-primary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Why All-on-4": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="20" width="22" height="5" rx="2" stroke="var(--msc-primary)" strokeWidth="1.4" fill="rgba(176,135,84,0.08)"/>
      <line x1="8" y1="20" x2="6" y2="8" stroke="var(--msc-primary)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="20" x2="22" y2="8" stroke="var(--msc-primary)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="20" x2="12" y2="8" stroke="var(--msc-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="16" y1="20" x2="16" y2="8" stroke="var(--msc-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <circle cx="6" cy="7" r="2.5" fill="var(--msc-primary)" opacity="0.8"/>
      <circle cx="22" cy="7" r="2.5" fill="var(--msc-primary)" opacity="0.8"/>
      <circle cx="12" cy="7" r="1.8" stroke="var(--msc-primary)" strokeWidth="1.2" fill="rgba(176,135,84,0.2)" opacity="0.6"/>
      <circle cx="16" cy="7" r="1.8" stroke="var(--msc-primary)" strokeWidth="1.2" fill="rgba(176,135,84,0.2)" opacity="0.6"/>
    </svg>
  ),
  "In one practice": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="10" width="20" height="16" rx="2" stroke="var(--msc-primary)" strokeWidth="1.4" fill="rgba(176,135,84,0.06)"/>
      <path d="M10 4h8l2 6H8L10 4z" stroke="var(--msc-primary)" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(176,135,84,0.10)"/>
      <rect x="11" y="17" width="6" height="9" rx="1" stroke="var(--msc-primary)" strokeWidth="1.2" fill="rgba(176,135,84,0.08)"/>
      <circle cx="9" cy="15" r="1.5" fill="var(--msc-primary)" opacity="0.5"/>
      <circle cx="19" cy="15" r="1.5" fill="var(--msc-primary)" opacity="0.5"/>
      <line x1="14" y1="7" x2="14" y2="4" stroke="var(--msc-primary)" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
};

function ProcedureOverview() {
  const cards = [
    { key:"What it is",    title:"What it is",    body:"Four to six titanium implants anchor a fixed full-arch prosthesis — eliminating the need for a denture and preserving bone structure that would otherwise resorb." },
    { key:"Who it's for",  title:"Who it's for",  body:"Patients with extensive tooth loss, severe decay, failing dentitions, or those currently wearing full dentures seeking a permanent, fixed alternative." },
    { key:"Why All-on-4",  title:"Why All-on-4",  body:"Implants are placed at angles optimised for your individual bone anatomy — often avoiding the need for bone grafting and significantly shortening treatment timelines." },
    { key:"In one practice",title:"In one practice",body:"Dr Matthew Youssef — gIDE Master Clinician in Implantology — performs both the surgical placement and prosthetic restoration at Melbourne Smile Centre. No referrals, no hand-offs." },
  ];
  return (
    <section id="aof-procedure" data-nav-theme="light" style={{
      background:"linear-gradient(180deg, var(--msc-canvas-mist) 0%, var(--msc-canvas-parchment) 100%)",
      padding:"120px 32px",
    }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <Reveal>
          <div style={{ fontSize:11, color:"var(--msc-primary)", letterSpacing:"0.18em", textTransform:"uppercase",
            fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:16 }}>The procedure</div>
          <h2 style={{ fontFamily:"var(--msc-font-display)", fontWeight:400,
            fontSize:"clamp(36px,5vw,64px)", letterSpacing:"-0.02em", lineHeight:1.02,
            color:"var(--msc-ink)", textTransform:"lowercase", margin:"0 0 56px",
          }}>everything you need to <span style={{ fontFamily:"var(--msc-font-editorial)", fontStyle:"italic",
            color:"var(--msc-primary)" }}>know</span>.</h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
          {cards.map((c, i) => (
            <Reveal key={c.key} delay={i * 80}>
              <div className="hover-glow" style={{
                padding:"32px 28px", borderRadius:18,
                background:"rgba(255,254,251,0.85)",
                border:"1px solid rgba(180,150,110,0.14)",
                height:"100%",
              }}>
                <div style={{
                  width:52, height:52, borderRadius:14, marginBottom:20,
                  background:"rgba(176,135,84,0.08)", border:"1px solid rgba(176,135,84,0.18)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  {OVERVIEW_ICONS[c.key]}
                </div>
                <h3 style={{ fontFamily:"var(--msc-font-display)", fontSize:22, fontWeight:400,
                  color:"var(--msc-ink)", textTransform:"lowercase", margin:"0 0 12px",
                  letterSpacing:"-0.01em" }}>{c.title}</h3>
                <p style={{ fontSize:14, color:"var(--msc-ink-muted-80)", lineHeight:1.72,
                  fontWeight:300, margin:0 }}>{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Workflow timeline ───────────────────────────────────────── */
function WorkflowTimeline() {
  const steps = [
    { n:"01", phase:"Assessment",    title:"CT Scan & Digital Planning",        body:"Full CBCT imaging to map bone density, nerve locations, and sinus proximity. Implant positions, angles, and depths are planned virtually before any surgery begins.", color:"#7B8FA0" },
    { n:"02", phase:"Assessment",    title:"Treatment planning & Consent",       body:"Dr Youssef walks through the planned positions on-screen with you. Surgical guide fabricated. Full discussion of risks, timeline, and temporary prosthesis design.", color:"#7B8FA0" },
    { n:"03", phase:"Surgery",       title:"Extraction of failing teeth",        body:"Teeth beyond saving are extracted under local anaesthetic or IV sedation. Bone grafting performed if required — this can add 3–4 months to the timeline if bone volume is insufficient.", color:"var(--msc-primary)" },
    { n:"04", phase:"Surgery",       title:"Implant placement",                  body:"Four to six implants placed at positions and angles optimised for your bone anatomy — determined during virtual planning. Surgery performed under IV sedation if preferred.", color:"var(--msc-primary)" },
    { n:"05", phase:"Surgery",       title:"Same-day temporaries fitted",        body:"For qualifying cases, a temporary fixed bridge is attached the same day — so you leave with teeth. These remain in place throughout the healing phase.", color:"var(--msc-primary)" },
    { n:"06", phase:"Healing",       title:"Osseointegration period",            body:"6–12 weeks for titanium implants to fully fuse with the jaw bone. Regular monitoring appointments during this phase. Soft diet required.", color:"#9E8A6A" },
    { n:"07", phase:"Completion",    title:"Final prosthesis delivered",         body:"Impressions taken once osseointegration is confirmed. The final zirconia or acrylic bridge is fabricated in our ceramic studio, delivered, adjusted for bite, and polished.", color:"#7A9E7E" },
  ];

  return (
    <section data-nav-theme="dark" style={{
      background:"linear-gradient(160deg,var(--msc-surface-tile-1),#1A1610)",
      padding:"120px 32px",
    }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <Reveal>
          <div style={{ fontSize:11, color:"var(--msc-primary-on-dark)", letterSpacing:"0.18em", textTransform:"uppercase",
            fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:16 }}>Step by step</div>
          <h2 style={{ fontFamily:"var(--msc-font-display)", fontWeight:400,
            fontSize:"clamp(36px,5vw,64px)", letterSpacing:"-0.02em", lineHeight:1.02,
            color:"#fff", textTransform:"lowercase", margin:"0 0 64px",
          }}>the <span style={{ fontFamily:"var(--msc-font-editorial)", fontStyle:"italic",
            color:"var(--msc-primary-on-dark)" }}>journey</span> explained.</h2>
        </Reveal>
        <div style={{ display:"flex", flexDirection:"column" }}>
          {steps.map((s, i) => {
            const isLast = i === steps.length - 1;
            return (
              <Reveal key={s.n} delay={i * 60}>
                <div className="aof-step-item" style={{ display:"flex", gap:0 }}>
                  {/* Left spine */}
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0, width:52 }}>
                    <div style={{ position:"relative", width:36, height:36,
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>
                      <div style={{ width:36, height:36, borderRadius:"50%",
                        background:`rgba(${s.color.startsWith("var") ? "176,135,84" : s.color.replace("#","").match(/../g).map(h=>parseInt(h,16)).join(",")},0.18)`,
                        border:`1px solid ${s.color}44`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:10, fontWeight:700, color:s.color,
                        fontFamily:"var(--msc-font-text)",
                      }}>{s.n}</div>
                    </div>
                    {!isLast && (
                      <div style={{ width:1, flex:1, minHeight:32,
                        background:`linear-gradient(to bottom, ${s.color}50, rgba(176,135,84,0.10))`,
                        marginTop:4,
                      }}/>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex:1, paddingLeft:20, paddingBottom:isLast ? 0 : 36, paddingTop:6 }}>
                    <div style={{ fontSize:9, color:s.color, letterSpacing:"0.14em", textTransform:"uppercase",
                      fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:6,
                    }}>{s.phase}</div>
                    <div style={{ padding:"18px 20px",
                      background:"rgba(255,254,251,0.05)", border:`1px solid ${s.color}1A`,
                      borderLeft:`3px solid ${s.color}`, borderRadius:"0 12px 12px 0",
                    }}>
                      <h4 style={{ fontFamily:"var(--msc-font-display)", fontSize:18, fontWeight:400,
                        color:"#fff", textTransform:"lowercase", margin:"0 0 8px",
                        letterSpacing:"-0.01em" }}>{s.title}</h4>
                      <p style={{ fontSize:13, color:"rgba(245,237,224,0.62)", lineHeight:1.7,
                        margin:0, fontWeight:300 }}>{s.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Before / After gallery ─────────────────────────────────── */
function AOFSlider({ label, before, after }) {
  const [pos, setPos] = useAOFState(50);
  const [drag, setDrag] = useAOFState(false);
  const ref = useAOFRef(null);

  const update = (clientX) => {
    const rect = ref.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  useAOFEffect(() => {
    const onMove = (e) => { if (drag) update(e.clientX); };
    const onUp   = ()  => setDrag(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [drag]);

  return (
    <div ref={ref} onMouseDown={(e) => { e.preventDefault(); setDrag(true); }}
      onTouchMove={(e) => update(e.touches[0].clientX)}
      style={{ position:"relative", width:"100%", aspectRatio:"4/3",
        borderRadius:14, overflow:"hidden", cursor:drag?"grabbing":"grab",
        userSelect:"none", touchAction:"none",
      }}>
      {/* Before */}
      <div style={{ position:"absolute", inset:0, background:before,
        display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontFamily:"ui-monospace,monospace", fontSize:10,
          color:"rgba(100,80,60,0.4)", letterSpacing:"0.1em", textTransform:"uppercase" }}>Before</span>
      </div>
      {/* After */}
      <div style={{ position:"absolute", inset:0, background:after,
        clipPath:`inset(0 ${100-pos}% 0 0)`,
        transition:drag?"none":"clip-path 60ms ease",
        display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontFamily:"ui-monospace,monospace", fontSize:10,
          color:"rgba(80,70,60,0.35)", letterSpacing:"0.1em", textTransform:"uppercase" }}>After</span>
      </div>
      {/* Labels */}
      <div style={{ position:"absolute", top:10, left:12, fontSize:10, fontWeight:600,
        color:"rgba(80,60,40,0.65)", letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"var(--msc-font-text)" }}>Before</div>
      <div style={{ position:"absolute", top:10, right:12, fontSize:10, fontWeight:600,
        color:"rgba(80,70,60,0.50)", letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"var(--msc-font-text)" }}>After</div>
      {/* Handle */}
      <div style={{ position:"absolute", top:0, bottom:0, left:`${pos}%`,
        transform:"translateX(-50%)", width:2, background:"rgba(255,254,251,0.90)",
        display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none",
      }}>
        <div style={{ width:34, height:34, borderRadius:"50%", background:"#fff",
          boxShadow:"0 2px 12px rgba(31,26,20,0.22)",
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L2 7l3 5M9 2l3 5-3 5" stroke="var(--msc-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {/* Case label */}
      <div style={{ position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)",
        padding:"4px 12px", borderRadius:9999,
        background:"rgba(20,18,15,0.62)", backdropFilter:"blur(8px)",
        fontSize:10, color:"rgba(245,237,224,0.8)", fontFamily:"var(--msc-font-text)",
        letterSpacing:"0.10em", textTransform:"uppercase", fontWeight:500, whiteSpace:"nowrap",
      }}>{label}</div>
    </div>
  );
}

function CaseGallery() {
  const cases = [
    { label:"Full upper arch", treatment:"All-on-4 upper",
      before:"linear-gradient(160deg,#a09080,#887060)", after:"linear-gradient(160deg,#f0ede8,#e4ddd4)" },
    { label:"Failing dentition", treatment:"All-on-4 lower",
      before:"linear-gradient(160deg,#9a8876,#7c6a58)", after:"linear-gradient(160deg,#ece8e0,#dcd4ca)" },
    { label:"Implant-retained", treatment:"Full arch bilateral",
      before:"linear-gradient(160deg,#b09080,#948070)", after:"linear-gradient(160deg,#f4f1ec,#e8e2d8)" },
  ];
  return (
    <section data-nav-theme="light" style={{
      background:"var(--msc-canvas)", padding:"120px 32px",
    }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <Reveal>
          <div style={{ fontSize:11, color:"var(--msc-primary)", letterSpacing:"0.18em", textTransform:"uppercase",
            fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:16 }}>Case gallery</div>
          <h2 style={{ fontFamily:"var(--msc-font-display)", fontWeight:400,
            fontSize:"clamp(36px,5vw,60px)", letterSpacing:"-0.02em", lineHeight:1.02,
            color:"var(--msc-ink)", textTransform:"lowercase", margin:"0 0 14px",
          }}>the work speaks <span style={{ fontFamily:"var(--msc-font-editorial)", fontStyle:"italic",
            color:"var(--msc-primary)" }}>for itself</span>.</h2>
          <p style={{ fontSize:16, fontWeight:300, color:"var(--msc-ink-muted-80)", margin:"0 0 48px" }}>
            Drag the handle to reveal each transformation. Real patients. Real results.
          </p>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {cases.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <div className="hover-glow" style={{
                background:"var(--msc-surface-pearl)", border:"1px solid var(--msc-hairline)",
                borderRadius:18, padding:14, display:"flex", flexDirection:"column", gap:10,
              }}>
                <AOFSlider label={c.label} before={c.before} after={c.after} />
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 2px" }}>
                  <span style={{ fontFamily:"var(--msc-font-display)", fontSize:15, fontWeight:400,
                    color:"var(--msc-ink)", textTransform:"lowercase" }}>{c.treatment}</span>
                  <span style={{ fontSize:10, color:"var(--msc-primary)", fontWeight:600,
                    letterSpacing:"0.08em", textTransform:"uppercase", fontFamily:"var(--msc-font-text)" }}>All-on-4</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p style={{ marginTop:28, fontSize:12, color:"var(--msc-ink-muted-48)", textAlign:"center", fontWeight:300 }}>
            Images are placeholder representations. Patient photography available at your consultation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── FAQ accordion ──────────────────────────────────────────── */
function FAQSection() {
  const [open, setOpen] = useAOFState(null);
  const faqs = [
    { q:"Am I a candidate for All-on-4?",
      a:"Most patients who have lost most or all of their teeth — or have a dentition beyond saving — are candidates. The key requirements are adequate bone volume at the implant sites and no uncontrolled systemic disease. Unlike traditional implants, the angled posterior implants often allow placement without bone grafting, making more patients eligible. A CT scan at your first appointment gives a definitive answer." },
    { q:"Will I leave with teeth on the day of surgery?",
      a:"For the majority of patients, yes. A temporary fixed bridge (not a removable denture) is attached to the implants on the day of surgery or the following day. You leave with a full, fixed set of teeth. The final prosthesis is delivered after osseointegration is confirmed — typically at 3–4 months." },
    { q:"How long does the whole process take?",
      a:"From first consultation to final smile: approximately 4–6 months for straightforward cases. If bone grafting is required at the time of extraction, this extends to 8–12 months. The process involves: initial CT scanning and planning, surgery and same-day temporaries, a healing phase of 6–12 weeks, and then final impressions and prosthesis delivery." },
    { q:"Is the procedure painful?",
      a:"Most patients are surprised by how manageable the post-operative period is. Surgery is performed under local anaesthetic, with IV conscious sedation available for those who prefer it. Swelling and discomfort are expected for 3–5 days post-operatively and are managed with prescribed anti-inflammatories and analgesics. The majority of patients report that discomfort was significantly less than they anticipated." },
    { q:"How long does All-on-4 last?",
      a:"The titanium implants themselves are designed to last a lifetime with good maintenance. The prosthetic bridge typically lasts 10–20 years before requiring replacement or relining due to normal wear. With excellent home hygiene (daily brushing, water flosser, implant-specific floss) and 6-monthly professional maintenance appointments, All-on-4 can provide decades of function and aesthetics." },
    { q:"What is the difference between All-on-4 and All-on-6?",
      a:"All-on-6 uses six implants rather than four, distributing the load over a larger area of bone. This can increase stability and longevity, particularly in patients with lower bone density. However, All-on-4 provides excellent outcomes for the majority of patients and avoids the greater surgical complexity. Your CT scan will determine which approach is appropriate for your anatomy." },
    { q:"Can I use my superannuation to pay for All-on-4?",
      a:"Eligible patients may apply to access superannuation early under compassionate grounds for dental treatment that improves quality of life. SuperCare can assist with the application process. This is a government-administered process and approval is not guaranteed. We can provide the necessary clinical documentation to support your application." },
  ];
  return (
    <section data-nav-theme="light" style={{
      background:"linear-gradient(180deg,var(--msc-canvas-parchment),var(--msc-canvas))",
      padding:"120px 32px",
    }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <Reveal>
          <div style={{ fontSize:11, color:"var(--msc-primary)", letterSpacing:"0.18em", textTransform:"uppercase",
            fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:16 }}>Questions & answers</div>
          <h2 style={{ fontFamily:"var(--msc-font-display)", fontWeight:400,
            fontSize:"clamp(36px,5vw,60px)", letterSpacing:"-0.02em", lineHeight:1.02,
            color:"var(--msc-ink)", textTransform:"lowercase", margin:"0 0 52px",
          }}>every question, <span style={{ fontFamily:"var(--msc-font-editorial)", fontStyle:"italic",
            color:"var(--msc-primary)" }}>answered</span>.</h2>
        </Reveal>
        <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 40}>
              <div style={{
                borderBottom:"1px solid var(--msc-hairline)",
                overflow:"hidden",
              }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width:"100%", padding:"22px 0", display:"flex", alignItems:"center",
                  justifyContent:"space-between", gap:16,
                  background:"transparent", border:"none", cursor:"pointer", textAlign:"left",
                }}>
                  <span style={{ fontFamily:"var(--msc-font-display)", fontSize:"clamp(16px,2vw,20px)",
                    fontWeight:400, color:"var(--msc-ink)", textTransform:"lowercase",
                    letterSpacing:"-0.01em", lineHeight:1.2 }}>{f.q}</span>
                  <div style={{ width:24, height:24, borderRadius:"50%", flexShrink:0,
                    border:"1px solid rgba(176,135,84,0.35)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"var(--msc-primary)", fontSize:14,
                    transform: open === i ? "rotate(45deg)" : "none",
                    transition:"transform 260ms cubic-bezier(0.4,0,0.2,1)",
                  }}>+</div>
                </button>
                {open === i && (
                  <div className="aof-faq-answer" style={{ paddingBottom:22 }}>
                    <p style={{ fontSize:14, color:"var(--msc-ink-muted-80)", lineHeight:1.78,
                      margin:0, fontWeight:300 }}>{f.a}</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Risks & considerations ─────────────────────────────────── */
function RisksSection() {
  const [activeTab, setActiveTab] = useAOFState("short");
  const [tabKey, setTabKey] = useAOFState(0);
  const [openIdx, setOpenIdx] = useAOFState(null);
  const [filter, setFilter] = useAOFState("all");

  const switchTab = (id) => { setActiveTab(id); setTabKey(k => k+1); setOpenIdx(null); };

  const SEV = {
    low:    { col:"rgba(100,155,88,0.9)",  bg:"rgba(100,155,88,0.08)",  badge:"Note",     label:"Low risk"      },
    medium: { col:"rgba(176,135,84,0.95)", bg:"rgba(176,135,84,0.08)", badge:"Consider", label:"Moderate"      },
    high:   { col:"rgba(190,90,44,0.95)",  bg:"rgba(190,90,44,0.08)",  badge:"Important",label:"Important"     },
  };

  const shortTerm = [
    { sev:"low",    title:"Post-operative swelling & bruising",
      body:"Expected for 3–5 days following surgery. Managed with prescribed anti-inflammatories and ice packs.",
      action:"Apply ice packs 20 min on, 20 off. Take anti-inflammatories regularly for 3–5 days as prescribed." },
    { sev:"low",    title:"Temporary difficulty eating & speaking",
      body:"Common in the first days as you adapt to the temporary bridge. Resolves quickly as swelling settles.",
      action:"Soft diet for 6 weeks. Avoid biting directly on the front of the temporary bridge." },
    { sev:"medium", title:"Infection at implant sites",
      body:"Risk is minimised with antibiotic prophylaxis, chlorhexidine rinse, and strict post-operative care.",
      action:"Complete the full antibiotic course. Use prescribed chlorhexidine rinse twice daily for 2 weeks." },
    { sev:"medium", title:"Bleeding",
      body:"Minor bleeding from surgical sites in the first 24 hours is normal. Heavy or prolonged bleeding requires review.",
      action:"Bite firmly on gauze for 30 minutes. Avoid hot drinks. Contact us immediately if heavy bleeding continues." },
    { sev:"high",   title:"Inferior alveolar nerve proximity (lower jaw)",
      body:"Proximity to the nerve is planned carefully via CT imaging. Temporary or, rarely, permanent altered sensation is a recognised risk.",
      action:"Report any prolonged numbness, tingling, or altered sensation to Dr Youssef immediately." },
    { sev:"high",   title:"Sinus proximity (upper jaw)",
      body:"Sinus assessment is standard. A sinus lift may be required. Avoid forceful nose-blowing post-operatively.",
      action:"Avoid blowing your nose or sneezing forcefully for 2 weeks. Inform Dr Youssef of any sinus pressure or discharge." },
    { sev:"high",   title:"Implant failure",
      body:"Occurs in approximately 2–5% of cases, most often in the early healing phase. Failed implants can usually be replaced.",
      action:"Attend all monitoring appointments. Avoid smoking — the single largest modifiable risk factor for implant failure." },
  ];

  const longTerm = [
    { sev:"low",    title:"Daily home maintenance",
      body:"Brushing after meals, water flossing twice daily, and implant-specific interdental brushes are essential — not optional.",
      action:"Brush after every meal. Water flosser twice daily. Use interdental brushes at least once daily." },
    { sev:"medium", title:"6-monthly professional hygiene",
      body:"Tartar and biofilm accumulate around implant fixtures and must be professionally removed to prevent tissue breakdown.",
      action:"Book your next hygiene appointment before leaving every visit. Do not defer these appointments." },
    { sev:"medium", title:"Annual bone level radiographs",
      body:"Bone levels around implants should be radiographically monitored yearly to detect early marginal bone loss.",
      action:"Bone level X-rays are taken at each annual review. Never skip this appointment." },
    { sev:"medium", title:"Prosthesis wear & eventual replacement",
      body:"The zirconia or acrylic bridge experiences normal wear. Relining or replacement is typically required at 10–20 years.",
      action:"Budget for prosthesis refresh at 10–15 years. Report any looseness, chipping, or bite changes promptly." },
    { sev:"high",   title:"Peri-implantitis",
      body:"An infection of the tissue around the implant — similar to gum disease. Risk rises sharply with smoking, diabetes, and poor hygiene.",
      action:"If you smoke, cessation is strongly recommended. Report any gum swelling, bleeding, or pain around implants immediately." },
    { sev:"high",   title:"Progressive bone resorption",
      body:"If maintenance lapses, bone loss around implants can become irreversible and ultimately compromise implant stability.",
      action:"Regular professional cleaning and annual radiographic assessment are essential — bone loss cannot be undone once established." },
  ];

  const allData = activeTab === "short" ? shortTerm : longTerm;
  const visible = filter === "all" ? allData : allData.filter(r => r.sev === filter);

  return (
    <section data-nav-theme="dark" style={{
      background:"linear-gradient(170deg, #131109 0%, #1D1912 60%, #231E14 100%)",
      padding:"120px 32px",
    }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>

        <Reveal>
          <div style={{ fontSize:11, color:"var(--msc-primary-on-dark)", letterSpacing:"0.18em", textTransform:"uppercase",
            fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:16 }}>Risks & long-term care</div>
          <h2 style={{ fontFamily:"var(--msc-font-display)", fontWeight:400,
            fontSize:"clamp(36px,5vw,60px)", letterSpacing:"-0.02em", lineHeight:1.02,
            color:"#fff", textTransform:"lowercase", margin:"0 0 14px",
          }}>informed, <span style={{ fontFamily:"var(--msc-font-editorial)", fontStyle:"italic",
            color:"var(--msc-primary-on-dark)" }}>always</span>.</h2>
          <p style={{ fontSize:16, fontWeight:300, color:"rgba(245,237,224,0.52)", maxWidth:520, margin:"0 0 48px" }}>
            Every consideration below is discussed openly at your consultation before any commitment is made.
          </p>
        </Reveal>

        {/* Tab switcher */}
        <Reveal>
          <div style={{ display:"flex", gap:0, marginBottom:36, position:"relative",
            background:"rgba(255,254,251,0.05)", borderRadius:12,
            padding:4, width:"fit-content", border:"1px solid rgba(255,254,251,0.08)",
          }}>
            {[
              { id:"short", label:"Short-term risks", count:shortTerm.length },
              { id:"long",  label:"Long-term care",   count:longTerm.length  },
            ].map(tab => (
              <button key={tab.id} onClick={() => switchTab(tab.id)} style={{
                padding:"10px 24px", borderRadius:9, border:"none", cursor:"pointer",
                fontFamily:"var(--msc-font-text)", fontSize:13, fontWeight:600,
                letterSpacing:"0.01em", transition:"all 220ms ease",
                background: activeTab === tab.id ? "rgba(176,135,84,0.22)" : "transparent",
                color: activeTab === tab.id ? "var(--msc-primary-on-dark)" : "rgba(245,237,224,0.40)",
                boxShadow: activeTab === tab.id ? "0 0 0 1px rgba(176,135,84,0.30)" : "none",
                display:"flex", alignItems:"center", gap:8,
              }}>
                {tab.label}
                <span style={{
                  padding:"2px 7px", borderRadius:9999, fontSize:10,
                  background: activeTab === tab.id ? "rgba(176,135,84,0.30)" : "rgba(255,254,251,0.08)",
                  color: activeTab === tab.id ? "var(--msc-primary-on-dark)" : "rgba(245,237,224,0.30)",
                  fontWeight:700,
                }}>{tab.count}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Severity filter pills */}
        <Reveal>
          <div style={{ display:"flex", gap:8, marginBottom:28, flexWrap:"wrap" }}>
            {[
              { id:"all", label:"All", col:"rgba(245,237,224,0.55)" },
              { id:"low",    label:"Note",      col:SEV.low.col    },
              { id:"medium", label:"Consider",  col:SEV.medium.col },
              { id:"high",   label:"Important", col:SEV.high.col   },
            ].map(f => (
              <button key={f.id} onClick={() => { setFilter(f.id); setOpenIdx(null); }} style={{
                padding:"6px 14px", borderRadius:9999, border:"none", cursor:"pointer",
                fontFamily:"var(--msc-font-text)", fontSize:11, fontWeight:700,
                letterSpacing:"0.08em", textTransform:"uppercase",
                transition:"all 200ms ease",
                background: filter === f.id ? "rgba(255,254,251,0.10)" : "transparent",
                color: filter === f.id ? f.col : "rgba(245,237,224,0.28)",
                outline: filter === f.id ? `1px solid ${f.col.replace("0.9","0.35").replace("0.95","0.35")}` : "none",
              }}>
                {f.id !== "all" && (
                  <span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%",
                    background:f.col, marginRight:6, verticalAlign:"middle" }}/>
                )}
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Risk rows */}
        <div key={`${activeTab}-${tabKey}`} style={{ display:"flex", flexDirection:"column", gap:2 }}>
          {visible.map((r, i) => {
            const s = SEV[r.sev];
            const isOpen = openIdx === i;
            return (
              <div key={i} style={{
                animation:`aofFadeUp 320ms ${i * 45}ms ease both`,
                borderRadius:12, overflow:"hidden",
                background: isOpen ? s.bg : "rgba(255,254,251,0.03)",
                border:`1px solid ${isOpen ? s.col.replace("0.9","0.22").replace("0.95","0.22") : "rgba(255,254,251,0.07)"}`,
                transition:"background 260ms ease, border-color 260ms ease",
              }}>
                <button onClick={() => setOpenIdx(isOpen ? null : i)} style={{
                  width:"100%", padding:"17px 20px", display:"flex", alignItems:"center", gap:14,
                  background:"transparent", border:"none", cursor:"pointer", textAlign:"left",
                }}>
                  {/* Severity dot */}
                  <div style={{
                    width:8, height:8, borderRadius:"50%", flexShrink:0,
                    background:s.col, boxShadow:`0 0 8px ${s.col.replace("0.9","0.5").replace("0.95","0.5")}`,
                  }}/>
                  {/* Title */}
                  <span style={{ flex:1, fontFamily:"var(--msc-font-display)", fontSize:17, fontWeight:400,
                    color:"rgba(245,237,224,0.88)", textTransform:"lowercase", letterSpacing:"-0.01em",
                    lineHeight:1.3,
                  }}>{r.title}</span>
                  {/* Badge */}
                  <span style={{
                    padding:"3px 9px", borderRadius:9999, fontSize:9, fontWeight:700,
                    letterSpacing:"0.10em", textTransform:"uppercase", fontFamily:"var(--msc-font-text)",
                    background:s.bg, color:s.col, border:`1px solid ${s.col.replace("0.9","0.30").replace("0.95","0.30")}`,
                    flexShrink:0,
                  }}>{s.badge}</span>
                  {/* Chevron */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
                    flexShrink:0, transition:"transform 260ms ease",
                    transform: isOpen ? "rotate(180deg)" : "none",
                  }}>
                    <path d="M4 6l4 4 4-4" stroke="rgba(245,237,224,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ animation:"aofFaqIn 220ms ease both", padding:"0 20px 20px 42px" }}>
                    <p style={{ fontSize:13.5, color:"rgba(245,237,224,0.62)", lineHeight:1.75,
                      margin:"0 0 14px", fontWeight:300 }}>{r.body}</p>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:10,
                      padding:"12px 14px", borderRadius:9,
                      background:"rgba(255,254,251,0.05)", border:`1px solid ${s.col.replace("0.9","0.18").replace("0.95","0.18")}`,
                    }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink:0, marginTop:1 }}>
                        <path d="M7 1v6M7 10v.5" stroke={s.col} strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="7" cy="7" r="6" stroke={s.col} strokeWidth="1" opacity="0.5"/>
                      </svg>
                      <span style={{ fontSize:12, color:s.col, fontWeight:500, lineHeight:1.6,
                        fontFamily:"var(--msc-font-text)" }}>{r.action}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {visible.length === 0 && (
          <div style={{ padding:"40px 0", textAlign:"center",
            color:"rgba(245,237,224,0.28)", fontFamily:"var(--msc-font-text)", fontSize:13 }}>
            No items match the selected filter.
          </div>
        )}

      </div>
    </section>
  );
}

/* ── Payment options ────────────────────────────────────────── */
function PaymentSection({ onBook }) {
  const plans = [
    { name:"Staged payments",  icon:"staged", tag:"In-house", highlight:true,
      desc:"Structured milestone payments across the treatment journey — deposit at planning, balance at surgery, final payment at delivery. No third-party involvement.",
      features:["Deposit to commence","Milestone-based","No interest","Flexible timing"],
    },
    { name:"DentiCare",        icon:"monthly", tag:"Monthly plan", highlight:false,
      desc:"Interest-free monthly payment plans from $25/week. Apply at your first appointment. Approval in minutes. Spread the cost across 12, 18, or 24 months.",
      features:["Interest-free plans","From $25/week","12–24 month terms","Same-day approval"],
    },
    { name:"SuperCare",        icon:"super", tag:"Super release", highlight:false,
      desc:"Apply to access your superannuation early on compassionate grounds for dental treatment that significantly improves quality of life. We provide the clinical documentation.",
      features:["Use your super","Compassionate grounds","We assist with paperwork","Subject to ATO approval"],
    },
    { name:"TLC Finance",      icon:"finance", tag:"Health finance", highlight:false,
      desc:"Specialist health finance for larger treatment investments. Flexible repayment terms, competitive rates, and approval available for eligible applicants.",
      features:["Specialist health finance","Flexible repayment","Competitive rates","Online application"],
    },
  ];
  return (
    <section data-nav-theme="dark" style={{
      background:"linear-gradient(160deg,#1A1610,var(--msc-surface-tile-1))",
      padding:"120px 32px",
    }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <Reveal>
          <div style={{ fontSize:11, color:"var(--msc-primary-on-dark)", letterSpacing:"0.18em", textTransform:"uppercase",
            fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:16 }}>Investment & financing</div>
          <h2 style={{ fontFamily:"var(--msc-font-display)", fontWeight:400,
            fontSize:"clamp(36px,5vw,64px)", letterSpacing:"-0.02em", lineHeight:1.02,
            color:"#fff", textTransform:"lowercase", margin:"0 0 16px",
          }}>a smile that <span style={{ fontFamily:"var(--msc-font-editorial)", fontStyle:"italic",
            color:"var(--msc-primary-on-dark)" }}>fits your life</span>.</h2>
          <p style={{ fontSize:16, fontWeight:300, color:"rgba(245,237,224,0.58)", maxWidth:540, margin:"0 0 56px" }}>
            All-on-4 starts from <strong style={{ color:"var(--msc-primary-on-dark)", fontWeight:600 }}>$18,500 per arch</strong>. Multiple payment pathways available — discuss what works for you at your consultation.
          </p>
        </Reveal>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <div className="hover-glow" style={{
                borderRadius:20, padding:"28px 24px",
                background: p.highlight
                  ? "linear-gradient(135deg,rgba(176,135,84,0.22),rgba(176,135,84,0.10))"
                  : "rgba(255,254,251,0.05)",
                border: p.highlight
                  ? "1px solid rgba(176,135,84,0.40)"
                  : "1px solid rgba(255,254,251,0.09)",
                position:"relative", height:"100%",
              }}>
                {p.highlight && (
                  <div style={{ position:"absolute", top:16, right:16,
                    padding:"4px 10px", borderRadius:9999,
                    background:"var(--msc-primary)", fontSize:9,
                    color:"#fff", fontWeight:700, letterSpacing:"0.10em",
                    textTransform:"uppercase", fontFamily:"var(--msc-font-text)",
                  }}>Recommended</div>
                )}
                <div style={{ fontSize:24, marginBottom:14 }}>{p.icon}</div>
                <div style={{ fontSize:9, color:"var(--msc-primary-on-dark)", letterSpacing:"0.14em",
                  textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:6,
                }}>{p.tag}</div>
                <h3 style={{ fontFamily:"var(--msc-font-display)", fontSize:22, fontWeight:400,
                  color:"#fff", textTransform:"lowercase", margin:"0 0 12px",
                  letterSpacing:"-0.01em" }}>{p.name}</h3>
                <p style={{ fontSize:13, color:"rgba(245,237,224,0.58)", lineHeight:1.7,
                  margin:"0 0 20px", fontWeight:300 }}>{p.desc}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:16, height:16, borderRadius:"50%", flexShrink:0,
                        background:"rgba(176,135,84,0.20)", border:"1px solid rgba(176,135,84,0.40)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                      }}>
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3l2 2 4-4" stroke="var(--msc-primary-on-dark)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{ fontSize:12, color:"rgba(245,237,224,0.65)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA strip */}
        <Reveal>
          <div style={{ marginTop:56, padding:"36px 40px", borderRadius:20,
            background:"rgba(176,135,84,0.10)", border:"1px solid rgba(176,135,84,0.24)",
            display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:20,
          }}>
            <div>
              <div style={{ fontFamily:"var(--msc-font-display)", fontSize:24, fontWeight:400,
                color:"#fff", textTransform:"lowercase", marginBottom:6, letterSpacing:"-0.01em" }}>
                ready to begin?
              </div>
              <p style={{ fontSize:14, color:"rgba(245,237,224,0.58)", margin:0, fontWeight:300 }}>
                Your first consultation includes a full CT scan assessment and treatment plan — at no charge.
              </p>
            </div>
            <button onClick={onBook} style={{
              background:"var(--msc-primary)", color:"#fff", border:"none",
              borderRadius:9999, padding:"15px 36px",
              fontSize:14, fontFamily:"var(--msc-font-text)", fontWeight:600,
              cursor:"pointer", letterSpacing:"0.02em", whiteSpace:"nowrap",
              boxShadow:"0 8px 28px -4px rgba(140,95,40,0.55)",
              transition:"transform 200ms ease",
            }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="none"; }}
            >Book a free consultation</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
function AllOnFourPage({ onNavigate }) {
  return (
    <>
      <ArchHero onBook={() => onNavigate("contact")} />
      <ProcedureOverview />
      <WorkflowTimeline />
      <CaseGallery />
      <FAQSection />
      <RisksSection />
      <PaymentSection onBook={() => onNavigate("contact")} />
    </>
  );
}

Object.assign(window, { AllOnFourPage });
