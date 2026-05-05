/* eslint-disable no-undef */
const { useState: useTGState, useEffect: useTGEffect, useRef: useTGRef } = React;

/* ── Keyframe injection ─────────────────────────────────────── */
const ANIM_CSS = `
@keyframes scanDown   { 0%,100%{transform:translateY(-8px);opacity:0} 40%,60%{transform:translateY(0);opacity:1} }
@keyframes scanArc    { 0%{stroke-dashoffset:120} 100%{stroke-dashoffset:0} }
@keyframes shineSweep { 0%,100%{transform:translateX(-110%)} 50%{transform:translateX(110%)} }
@keyframes whtPulse   { 0%,100%{r:6;opacity:0.6} 50%{r:22;opacity:0} }
@keyframes alignShift { 0%,100%{d:path("M10 28 Q30 16 50 28 Q70 40 90 28")} 50%{d:path("M10 28 Q30 40 50 28 Q70 16 90 28")} }
@keyframes layerRise  { 0%{transform:translateY(14px);opacity:0} 100%{transform:translateY(0);opacity:1} }
@keyframes implDrop   { 0%,100%{transform:translateY(-8px);opacity:0} 55%,80%{transform:translateY(0);opacity:1} }
@keyframes crownSpin  { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
@keyframes waveRipple { 0%,100%{transform:scaleX(1);opacity:0.6} 50%{transform:scaleX(1.18);opacity:1} }
@keyframes jawPivot   { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-12deg)} }
@keyframes moonFade   { 0%,100%{opacity:0.3;transform:scale(0.9)} 50%{opacity:1;transform:scale(1)} }
@keyframes dotPop     { 0%,100%{transform:scale(1)} 50%{transform:scale(1.5)} }
@keyframes glintLine  { 0%{opacity:0;transform:translateX(-20px) rotate(-30deg)} 40%,60%{opacity:1;transform:translateX(0) rotate(-30deg)} 100%{opacity:0;transform:translateX(20px) rotate(-30deg)} }
@keyframes drawerIn   { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
@keyframes overlayIn  { from{opacity:0} to{opacity:1} }
`;

function InjectStyle() {
  useTGEffect(() => {
    const el = document.createElement("style");
    el.textContent = ANIM_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}

/* ── Per-treatment animated icons ───────────────────────────── */
function AnimIcon({ id, size = 56 }) {
  const br = "var(--msc-primary)";
  const brf = "rgba(176,135,84,0.15)";

  const icons = {
    dsd: (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="26" stroke={brf} strokeWidth="1"/>
        <path d="M12 30 Q28 44 44 30" stroke={br} strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="60" style={{animation:"scanArc 1.8s ease-in-out infinite alternate"}}/>
        <line x1="10" y1="20" x2="46" y2="20" stroke={br} strokeWidth="1" strokeDasharray="3 3" style={{animation:"scanDown 2.4s ease-in-out infinite"}}/>
        <circle cx="12" cy="30" r="2" fill={br} style={{animation:"dotPop 2.4s 0s ease-in-out infinite"}}/>
        <circle cx="28" cy="44" r="2" fill={br} style={{animation:"dotPop 2.4s 0.3s ease-in-out infinite"}}/>
        <circle cx="44" cy="30" r="2" fill={br} style={{animation:"dotPop 2.4s 0.6s ease-in-out infinite"}}/>
      </svg>
    ),
    veneers: (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        <rect x="14" y="10" width="28" height="36" rx="10" stroke={br} strokeWidth="1.5" fill={brf}/>
        <rect x="18" y="14" width="20" height="28" rx="7" fill="rgba(255,254,251,0.7)"/>
        <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden",borderRadius:10}}>
          <div style={{position:"absolute",width:8,height:60,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)",transform:"rotate(-30deg)",top:-10,left:-20,animation:"shineSweep 2.2s ease-in-out infinite"}}/>
        </div>
      </svg>
    ),
    whitening: (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="8" fill={br} opacity="0.9"/>
        <circle cx="28" cy="28" r="8" fill={br} style={{animation:"whtPulse 1.8s 0s ease-out infinite"}}/>
        <circle cx="28" cy="28" r="8" fill={br} opacity="0.4" style={{animation:"whtPulse 1.8s 0.6s ease-out infinite"}}/>
        {[0,45,90,135,180,225,270,315].map((a,i)=>(
          <line key={i} x1={28+Math.cos(a*Math.PI/180)*14} y1={28+Math.sin(a*Math.PI/180)*14} x2={28+Math.cos(a*Math.PI/180)*18} y2={28+Math.sin(a*Math.PI/180)*18} stroke={br} strokeWidth="1.5" strokeLinecap="round" style={{animation:`moonFade 1.8s ${i*0.12}s ease-in-out infinite`}}/>
        ))}
      </svg>
    ),
    aligners: (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        <path d="M8 28 Q20 16 28 28 Q36 40 48 28" stroke={br} strokeWidth="1.5" strokeLinecap="round" fill="none" style={{animation:"alignShift 2s ease-in-out infinite"}}/>
        <path d="M8 34 Q20 22 28 34 Q36 46 48 34" stroke={br} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4"/>
        <circle cx="8" cy="28" r="2.5" fill={br}/>
        <circle cx="48" cy="28" r="2.5" fill={br}/>
      </svg>
    ),
    biomimetic: (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        {[0,1,2,3].map(i=>(
          <rect key={i} x={14} y={36-i*8} width={28} height={7} rx={2} fill={br} opacity={0.2+i*0.2}
            style={{animation:`layerRise 0.6s ${i*0.15}s ease-out both infinite`, animationDelay:`${i*0.2}s`, animationDirection:"alternate"}}/>
        ))}
      </svg>
    ),
    implants: (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        <rect x="22" y="28" width="12" height="20" rx="4" fill={brf} stroke={br} strokeWidth="1.5"/>
        <line x1="28" y1="28" x2="28" y2="8" stroke={br} strokeWidth="1.5" strokeDasharray="4 3"/>
        <rect x="18" y="5" width="20" height="8" rx="3" fill={br} style={{animation:"implDrop 2s ease-in-out infinite"}}/>
        <path d="M22 48 Q28 54 34 48" stroke={br} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    crowns: (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        <path d="M14 36 L14 20 L22 28 L28 14 L34 28 L42 20 L42 36 Z" fill={brf} stroke={br} strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="12" y="36" width="32" height="6" rx="2" fill={br} opacity="0.5"/>
        <circle cx="28" cy="28" r="20" stroke={br} strokeWidth="0.5" opacity="0.2" style={{animation:"crownSpin 8s linear infinite", transformOrigin:"28px 28px"}}/>
      </svg>
    ),
    perio: (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        {[0,1,2].map(i=>(
          <path key={i} d={`M8 ${28+i*6} Q20 ${22+i*6} 28 ${28+i*6} Q36 ${34+i*6} 48 ${28+i*6}`} stroke={br} strokeWidth={1.5-i*0.4} fill="none" strokeLinecap="round" opacity={1-i*0.3}
            style={{animation:`waveRipple 1.6s ${i*0.3}s ease-in-out infinite`, transformOrigin:"28px 28px"}}/>
        ))}
      </svg>
    ),
    tmj: (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        <path d="M14 16 Q28 12 42 16 L44 36 Q28 44 12 36 Z" fill={brf} stroke={br} strokeWidth="1.5" strokeLinejoin="round" style={{animation:"jawPivot 2.4s ease-in-out infinite", transformOrigin:"28px 36px"}}/>
        <circle cx="14" cy="16" r="3" fill={br}/>
        <circle cx="42" cy="16" r="3" fill={br}/>
        <path d="M20 30 Q28 26 36 30" stroke={br} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
    sleep: (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        <path d="M30 14 Q20 16 16 24 Q12 34 18 42 Q26 50 36 46 Q28 42 26 34 Q24 24 30 14Z" fill={br} style={{animation:"moonFade 2s ease-in-out infinite"}}/>
        {[[42,12],[46,22],[38,8]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={1.5} fill={br} style={{animation:`moonFade 2s ${i*0.4}s ease-in-out infinite`}}/>
        ))}
      </svg>
    ),
  };

  return icons[id] || <div style={{width:size,height:size,borderRadius:"50%",background:brf}}/>;
}

/* ── Treatment data ─────────────────────────────────────────── */
const TREATMENTS = [
  { id:"dsd",       cat:"technology",  name:"Digital Smile Design",         sub:"Visualise your smile before treatment begins", price:"Complimentary", featured:true,
    detail:"Our Digital Smile Design workflow uses 3D facial mapping, intraoral scanning, and smile simulation software to build a precise blueprint of your ideal smile. Dr Landau and Dr Paltoglou present the design on-screen at your consultation, refine it with you, and use it to guide every step of treatment — from veneer shape to implant positioning.",
    benefits:["See your result before any treatment","Fully tailored to your face and proportion","Guides every clinical step with precision","Eliminates guesswork from cosmetic planning"] },
  { id:"veneers",   cat:"cosmetic",    name:"Porcelain Veneers",            sub:"Ultra-thin ceramic, fired in our in-house studio", price:"From $1,650",
    detail:"Porcelain veneers are the gold standard in cosmetic dentistry for transforming smile shape, colour, and symmetry. Every veneer is designed digitally, wax-mocked for your approval, and fired in our in-house ceramic studio. We use ultra-thin feldspathic porcelain bonded with biomimetic adhesive technique — preserving maximum natural tooth structure.",
    benefits:["Designed digitally, approved before bonding","In-house ceramic studio","Ultra-thin preparation, preserves enamel","10–15 year longevity"] },
  { id:"whitening", cat:"cosmetic",    name:"Teeth Whitening",              sub:"Professional whitening calibrated to your enamel", price:"From $480",
    detail:"Professional teeth whitening at Melbourne Smile Centre is always preceded by a shade and sensitivity assessment. We use pharmaceutical-grade hydrogen peroxide gel in concentrations matched to your enamel. In-chair treatment brightens 6–10 shades in a single session. Take-home trays extend and maintain results.",
    benefits:["Sensitivity assessed before treatment","In-chair or take-home","Pharmaceutical-grade agent","Shade kept on file for consistency"] },
  { id:"aligners",  cat:"cosmetic",    name:"Clear Aligners",               sub:"Discreet orthodontics, planned with 3D scanning", price:"From $3,900",
    detail:"Clear aligner therapy begins with a full intraoral 3D scan and digital bite analysis. Treatment plans are simulated in software so you see the tooth movement before agreeing to proceed. We use Invisalign and alternative aligner systems depending on case complexity. All treatments include refinement phases and a post-treatment retainer plan.",
    benefits:["3D scan and simulation on first visit","Invisalign and alternatives available","Refinements included","Retainer plan on completion"] },
  { id:"biomimetic",cat:"restorative", name:"Bonded Biomimetic Dentistry",  sub:"The most tooth-conservative restoration in modern practice", price:"From $390",
    detail:"Biomimetic dentistry restores damaged, cracked, or worn teeth by bonding composite and ceramic materials in anatomical layers — replicating the flexural properties of natural dentin and enamel. Unlike crowns, biomimetic restorations preserve almost all remaining tooth structure. Dr Ido Landau trained directly under Dr Pascal Magne and Dr Didier Dietschi.",
    benefits:["Maximum preservation of natural tooth","No crown needed in most cracked-tooth cases","Restorations that flex like natural enamel","Outlast conventional composites"] },
  { id:"implants",  cat:"restorative", name:"Dental Implants & All-on-4",   sub:"Single tooth to full-arch restoration, in one practice", price:"From $5,200",
    detail:"Dental implants are the definitive solution for missing teeth, offering a permanent, bone-integrated replacement. Dr Matthew Youssef, a gIDE Master Clinician in Implantology, performs both the surgical placement and prosthetic restoration at Melbourne Smile Centre. All-on-4 treatment provides full-arch fixed teeth on four implants, with same-day temporaries available.",
    benefits:["gIDE Master Clinician in Implantology","CT-guided surgical placement","All-on-4 full-arch restoration","Same-day temporaries for qualifying cases"] },
  { id:"crowns",    cat:"restorative", name:"Crowns & Bridges",             sub:"Same-day ceramics, matched to your natural shade", price:"From $2,100",
    detail:"At Melbourne Smile Centre, crowns are designed digitally and milled in our on-site CEREC ceramic studio — meaning many cases can be completed in a single visit. Our ceramist hand-stains and glazes each crown to match the individual translucency zones of your neighbouring teeth.",
    benefits:["Same-day CEREC crowns available","Hand-stained to match natural translucency","In-house ceramist","Lithium disilicate for anterior crowns"] },
  { id:"perio",     cat:"health",      name:"Periodontal & Gum Therapy",    sub:"Gum disease prevention and treatment", price:"From $220",
    detail:"At Melbourne Smile Centre, every hygiene appointment includes full periodontal charting, bleeding-point assessment, and personalised home-care instruction. Our hygienists are trained in ultrasonic debridement, root planing, and laser-assisted periodontal therapy for advanced cases. Maintenance intervals are personalised to your risk profile.",
    benefits:["Full periodontal charting at every visit","Ultrasonic and laser-assisted therapy","Systemic health links monitored","Personalised maintenance intervals"] },
  { id:"tmj",       cat:"health",      name:"TMJ & Occlusal Therapy",       sub:"Jaw pain, bruxism, and bite correction", price:"From $380",
    detail:"TMJ dysfunction and bruxism are frequently under-diagnosed causes of chronic jaw pain, facial headaches, tooth wear, and cracked teeth. Dr Paltoglou brings three decades of occlusal analysis experience to TMJ assessment. Treatment begins with a full joint and muscle examination and digital bite mapping. Custom splints are fabricated in-house.",
    benefits:["Three decades of occlusal expertise","Digital bite mapping","Custom splints in-house","Botulinum toxin available as adjunct"] },
  { id:"sleep",     cat:"health",      name:"Sleep Dentistry",              sub:"Treatment under sedation — comfort and complexity", price:"Price on application",
    detail:"Melbourne Smile Centre offers IV conscious sedation administered by our visiting specialist anaesthetist, allowing patients with dental phobia, a strong gag reflex, or complex multi-procedure appointments to receive treatment in a calm, controlled environment. You remain responsive throughout but have little or no memory of the appointment.",
    benefits:["IV conscious sedation by specialist","Suitable for phobia, gag reflex, complexity","Most procedures available under sedation","Minimal post-procedure recall"] },
];

const CATS = [
  { id:"all",        label:"All" },
  { id:"technology", label:"Technology" },
  { id:"cosmetic",   label:"Cosmetic" },
  { id:"restorative",label:"Restorative" },
  { id:"health",     label:"Health & Wellness" },
];

/* ── Detail drawer ──────────────────────────────────────────── */
function Drawer({ t, onClose, onBook }) {
  useTGEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200 }}>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position:"absolute", inset:0,
        background:"rgba(20,18,15,0.55)",
        backdropFilter:"blur(4px)", WebkitBackdropFilter:"blur(4px)",
        animation:"overlayIn 260ms ease",
      }}/>
      {/* Panel */}
      <div style={{
        position:"absolute", top:0, right:0, bottom:0, width:"min(520px,92vw)",
        background:"linear-gradient(160deg,#FDFCFA,#F6F1EA)",
        boxShadow:"-24px 0 80px rgba(31,26,20,0.22)",
        overflowY:"auto", display:"flex", flexDirection:"column",
        animation:"drawerIn 320ms cubic-bezier(0.4,0,0.2,1)",
      }}>
        {/* Header */}
        <div style={{ padding:"32px 36px 24px", borderBottom:"1px solid rgba(180,150,110,0.16)" }}>
          <button onClick={onClose} style={{
            position:"absolute", top:20, right:20,
            width:36, height:36, borderRadius:"50%", border:"1px solid rgba(180,150,110,0.25)",
            background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            color:"var(--msc-ink-muted-80)", fontSize:18, lineHeight:1,
          }}>×</button>
          <div style={{ marginBottom:20 }}>
            <AnimIcon id={t.id} size={52} />
          </div>
          <div style={{ fontSize:11, color:"var(--msc-primary)", letterSpacing:"0.16em", textTransform:"uppercase", fontWeight:600, fontFamily:"var(--msc-font-text)", marginBottom:10 }}>
            {CATS.find(c=>c.id===t.cat)?.label}
          </div>
          <h2 style={{
            fontFamily:"var(--msc-font-display)", fontSize:"clamp(28px,4vw,38px)",
            fontWeight:400, letterSpacing:"-0.018em", lineHeight:1.05,
            color:"var(--msc-ink)", textTransform:"lowercase", margin:"0 0 8px",
          }}>{t.name}</h2>
          <div style={{ fontSize:14, color:"var(--msc-ink-muted-80)", fontWeight:300 }}>{t.sub}</div>
        </div>
        {/* Body */}
        <div style={{ padding:"28px 36px", flex:1 }}>
          <p style={{ fontSize:15, color:"var(--msc-ink-muted-80)", lineHeight:1.75, margin:"0 0 28px", fontWeight:300 }}>{t.detail}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:32 }}>
            {t.benefits.map(b=>(
              <div key={b} style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:"var(--msc-primary)", marginTop:8, flexShrink:0 }}/>
                <span style={{ fontSize:14, color:"var(--msc-ink)", lineHeight:1.5 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div style={{
          padding:"20px 36px 32px", borderTop:"1px solid rgba(180,150,110,0.16)",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          background:"rgba(255,254,251,0.8)",
        }}>
          <div>
            <div style={{ fontSize:11, color:"var(--msc-ink-muted-80)", textTransform:"uppercase", letterSpacing:"0.10em", fontFamily:"var(--msc-font-text)", marginBottom:4 }}>Investment</div>
            <div style={{ fontSize:16, color:"var(--msc-primary)", fontWeight:600 }}>{t.price}</div>
          </div>
          <button onClick={onBook} style={{
            background:"var(--msc-primary)", color:"#fff", border:"none",
            borderRadius:9999, padding:"12px 26px",
            fontSize:14, fontFamily:"var(--msc-font-text)", fontWeight:500,
            cursor:"pointer", letterSpacing:"0.01em",
            boxShadow:"0 4px 16px -4px rgba(140,95,40,0.42)",
          }}>Book a consultation</button>
        </div>
      </div>
    </div>
  );
}

/* ── Card ───────────────────────────────────────────────────── */
function TreatCard({ t, featured, onClick }) {
  const [hov, setHov] = useTGState(false);

  if (featured) {
    return (
      <div
        onClick={onClick}
        onMouseEnter={()=>setHov(true)}
        onMouseLeave={()=>setHov(false)}
        style={{
          gridColumn:"span 3",
          position:"relative", overflow:"hidden",
          borderRadius:24,
          background:"linear-gradient(130deg, var(--msc-surface-tile-2) 0%, var(--msc-surface-tile-1) 100%)",
          border:"1px solid rgba(176,135,84,0.20)",
          padding:"52px 56px",
          display:"flex", alignItems:"center", gap:56,
          cursor:"pointer",
          transition:"box-shadow 320ms ease, border-color 320ms ease",
          boxShadow: hov ? "0 16px 56px -8px rgba(176,135,84,0.28)" : "0 4px 24px -8px rgba(31,26,20,0.18)",
        }}
      >
        {/* Ambient glow */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(600px 300px at 80% 50%, rgba(176,135,84,0.14), transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ flexShrink:0 }}>
          <AnimIcon id={t.id} size={88} />
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:"var(--msc-primary-on-dark)", letterSpacing:"0.16em", textTransform:"uppercase", fontWeight:600, fontFamily:"var(--msc-font-text)", marginBottom:12 }}>Signature service · {CATS.find(c=>c.id===t.cat)?.label}</div>
          <h3 style={{ fontFamily:"var(--msc-font-display)", fontSize:"clamp(28px,3.5vw,44px)", fontWeight:400, letterSpacing:"-0.018em", lineHeight:1.04, color:"#fff", textTransform:"lowercase", margin:"0 0 14px" }}>{t.name}</h3>
          <p style={{ fontSize:16, color:"rgba(245,237,224,0.68)", fontWeight:300, lineHeight:1.6, margin:"0 0 24px", maxWidth:480 }}>{t.detail.slice(0,180)}…</p>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, color:"var(--msc-primary-on-dark)", fontSize:13, fontWeight:500, letterSpacing:"0.04em", transition:"gap 200ms ease" }}>
            Learn more <span style={{ transition:"transform 200ms ease", transform: hov ? "translateX(4px)" : "none" }}>→</span>
          </div>
        </div>
        <div style={{ fontSize:14, color:"rgba(217,185,135,0.7)", fontWeight:400, flexShrink:0 }}>{t.price}</div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        borderRadius:20,
        background: hov ? "rgba(255,254,251,0.95)" : "rgba(255,254,251,0.72)",
        border: hov ? "1px solid rgba(176,135,84,0.32)" : "1px solid rgba(180,150,110,0.16)",
        padding:"32px 28px 28px",
        cursor:"pointer",
        transition:"all 280ms cubic-bezier(0.4,0,0.2,1)",
        boxShadow: hov ? "0 12px 40px -8px rgba(176,135,84,0.20)" : "0 2px 12px -4px rgba(31,26,20,0.06)",
        transform: hov ? "translateY(-4px)" : "none",
        display:"flex", flexDirection:"column", gap:0,
      }}
    >
      <div style={{ marginBottom:20 }}>
        <AnimIcon id={t.id} size={48} />
      </div>
      <div style={{ fontSize:10, color:"var(--msc-primary)", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:600, fontFamily:"var(--msc-font-text)", marginBottom:8 }}>
        {CATS.find(c=>c.id===t.cat)?.label}
      </div>
      <div style={{ fontFamily:"var(--msc-font-display)", fontSize:"clamp(18px,2vw,22px)", fontWeight:400, letterSpacing:"-0.012em", color:"var(--msc-ink)", textTransform:"lowercase", lineHeight:1.15, marginBottom:10 }}>{t.name}</div>
      <div style={{ fontSize:13, color:"var(--msc-ink-muted-80)", lineHeight:1.55, fontWeight:300, flex:1 }}>{t.sub}</div>
      <div style={{ marginTop:22, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:12, color:"var(--msc-primary)", fontWeight:600, letterSpacing:"0.04em" }}>{t.price}</div>
        <div style={{
          fontSize:11, color: hov ? "var(--msc-primary)" : "var(--msc-ink-muted-48)",
          fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase",
          transition:"color 220ms ease, opacity 220ms ease",
          opacity: hov ? 1 : 0.6,
          fontFamily:"var(--msc-font-text)",
        }}>Details →</div>
      </div>
    </div>
  );
}

/* ── Main grid ──────────────────────────────────────────────── */
function TreatmentGrid({ onNavigate }) {
  const [activeCat, setActiveCat] = useTGState("all");
  const [selected,  setSelected]  = useTGState(null);

  const visible = activeCat === "all" ? TREATMENTS : TREATMENTS.filter(t => t.cat === activeCat);
  const featured = activeCat === "all" ? visible.find(t=>t.featured) : null;
  const rest     = featured ? visible.filter(t=>!t.featured) : visible;

  const openDrawer  = (t) => { setSelected(t); document.body.style.overflow="hidden"; };
  const closeDrawer = () =>  { setSelected(null); document.body.style.overflow=""; };

  return (
    <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px 120px" }}>
      <InjectStyle />

      {/* Category pills */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:52 }}>
        {CATS.map(c=>(
          <button key={c.id} onClick={()=>{ setActiveCat(c.id); setSelected(null); }} style={{
            padding:"9px 22px", borderRadius:9999,
            border: activeCat===c.id ? "1px solid var(--msc-primary)" : "1px solid rgba(176,135,84,0.22)",
            background: activeCat===c.id ? "var(--msc-primary)" : "rgba(255,254,251,0.70)",
            backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
            color: activeCat===c.id ? "#fff" : "var(--msc-ink-muted-80)",
            fontSize:13, fontFamily:"var(--msc-font-text)", fontWeight:500,
            cursor:"pointer", letterSpacing:"0.01em",
            transition:"all 220ms ease",
            boxShadow: activeCat===c.id ? "0 4px 14px -4px rgba(140,95,40,0.38)" : "none",
          }}>{c.label}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {featured && <TreatCard key={featured.id} t={featured} featured onClick={()=>openDrawer(featured)} />}
        {rest.map(t=><TreatCard key={t.id} t={t} onClick={()=>openDrawer(t)} />)}
      </div>

      {/* Drawer */}
      {selected && <Drawer t={selected} onClose={closeDrawer} onBook={()=>{ closeDrawer(); onNavigate&&onNavigate("contact"); }} />}
    </div>
  );
}

Object.assign(window, { TreatmentCard: TreatCard, TreatmentGrid });
