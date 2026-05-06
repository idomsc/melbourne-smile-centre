/* eslint-disable no-undef */
const { useState: useTGState, useEffect: useTGEffect } = React;

/* ── Keyframe injection ─────────────────────────────────────── */
const ANIM_CSS = `
@keyframes scanDown   { 0%,100%{transform:translateY(-8px);opacity:0} 40%,60%{transform:translateY(0);opacity:1} }
@keyframes scanArc    { 0%{stroke-dashoffset:120} 100%{stroke-dashoffset:0} }
@keyframes shineSweep { 0%,100%{transform:translateX(-110%)} 50%{transform:translateX(110%)} }
@keyframes whtPulse   { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(3.5);opacity:0} }
@keyframes alignShift { 0%,100%{transform:translateY(-4px);opacity:0.7} 50%{transform:translateY(4px);opacity:1} }
@keyframes layerRise  { 0%{transform:translateY(14px);opacity:0} 100%{transform:translateY(0);opacity:1} }
@keyframes implDrop   { 0%,100%{transform:translateY(-8px);opacity:0} 55%,80%{transform:translateY(0);opacity:1} }
@keyframes crownSpin  { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
@keyframes waveRipple { 0%,100%{transform:scaleX(1);opacity:0.6} 50%{transform:scaleX(1.18);opacity:1} }
@keyframes jawPivot   { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-12deg)} }
@keyframes moonFade   { 0%,100%{opacity:0.3;transform:scale(0.9)} 50%{opacity:1;transform:scale(1)} }
@keyframes dotPop     { 0%,100%{transform:scale(1)} 50%{transform:scale(1.5)} }
@keyframes glintLine  { 0%{opacity:0;transform:translateX(-20px) rotate(-30deg)} 40%,60%{opacity:1;transform:translateX(0) rotate(-30deg)} 100%{opacity:0;transform:translateX(20px) rotate(-30deg)} }
@keyframes drawerIn      { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
@keyframes overlayIn     { from{opacity:0} to{opacity:1} }
@keyframes progressLine  { from{width:0;opacity:0} to{width:100%;opacity:1} }
@keyframes aofFadeUp     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

/* ── Drawer tab animations ── */
@keyframes stepIn     { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
@keyframes lineGrow   { from{transform:scaleY(0);transform-origin:top} to{transform:scaleY(1);transform-origin:top} }
@keyframes checkPop   { 0%{transform:scale(0) rotate(-45deg)} 65%{transform:scale(1.2) rotate(5deg)} 100%{transform:scale(1) rotate(0deg)} }
@keyframes riskSlide  { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:none} }
@keyframes statPop    { from{opacity:0;transform:scale(0.88) translateY(8px)} to{opacity:1;transform:none} }
@keyframes phasePulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
@keyframes ringPing   { 0%{transform:scale(1);opacity:0.8} 100%{transform:scale(2.2);opacity:0} }
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
        <rect x="24" y="10" width="5" height="36" fill="rgba(255,255,255,0.5)" style={{animation:"shineSweep 2.2s ease-in-out infinite", transformBox:"fill-box", transformOrigin:"center"}}/>
      </svg>
    ),
    whitening: (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="8" fill={br} opacity="0.9"/>
        <circle cx="28" cy="28" r="8" fill={br} style={{animation:"whtPulse 1.8s 0s ease-out infinite", transformOrigin:"28px 28px"}}/>
        <circle cx="28" cy="28" r="8" fill={br} opacity="0.4" style={{animation:"whtPulse 1.8s 0.6s ease-out infinite", transformOrigin:"28px 28px"}}/>
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
            style={{animation:`layerRise 0.6s ${i*0.15}s ease-out both infinite`, animationDirection:"alternate"}}/>
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
  { id:"dsd", cat:"technology", name:"Digital Smile Design", sub:"Visualise your smile before treatment begins", price:"Complimentary", featured:true,
    detail:"Our Digital Smile Design workflow uses 3D facial mapping, intraoral scanning, and smile simulation software to build a precise blueprint of your ideal smile. Dr Landau and Dr Paltoglou present the design on-screen at your consultation, refine it with you, and use it to guide every step of treatment — from veneer shape to implant positioning.",
    benefits:["See your result before any treatment","Fully tailored to your face and proportion","Guides every clinical step with precision","Eliminates guesswork from cosmetic planning"],
    workflow:["Facial photographs and video capture from multiple angles","Full intraoral 3D scan — no impressions required","Smile simulation presented on-screen at your consultation","Refinements made with you until the design is approved","Blueprint shared with the clinical and ceramics team","All subsequent treatment is delivered according to the approved design"],
    risks:["DSD is a planning tool — underlying dental or gum issues must be resolved before cosmetic treatment proceeds","The simulation is an accurate guide, not a guarantee; minor variation from the final result is normal","Changes requested after design approval may incur additional planning time"] },

  { id:"veneers", cat:"cosmetic", name:"Porcelain Veneers", sub:"Ultra-thin ceramic, fired in our in-house studio", price:"From $1,650",
    detail:"Porcelain veneers are the gold standard in cosmetic dentistry for transforming smile shape, colour, and symmetry. Every veneer is designed digitally, wax-mocked for your approval, and fired in our in-house ceramic studio. We use ultra-thin feldspathic porcelain bonded with biomimetic adhesive technique — preserving maximum natural tooth structure.",
    benefits:["Designed digitally, approved before bonding","In-house ceramic studio","Ultra-thin preparation, preserves enamel","10–15 year longevity"],
    workflow:["DSD consultation and digital smile simulation","Wax mock-up fabricated and trialled in your mouth","Minimal enamel preparation — typically under 0.5 mm","Temporary veneers placed while ceramics are fired in-house","Try-in appointment: shade and shape confirmed","Final bonding using biomimetic adhesive protocol","Polish and occlusal check"],
    risks:["Preparation is irreversible — a small amount of enamel is permanently removed","Temporary sensitivity is common during the preparation phase and usually resolves within a few days","Porcelain can chip under extreme force — habits such as nail-biting or opening bottles with teeth must be avoided","Existing crowns, bridges, or composite in the smile zone will not match exactly and may need replacing","Active gum disease or decay must be fully treated before veneers are placed"] },

  { id:"whitening", cat:"cosmetic", name:"Teeth Whitening", sub:"Professional whitening calibrated to your enamel", price:"From $480",
    detail:"Professional teeth whitening at Melbourne Smile Centre is always preceded by a shade and sensitivity assessment. We use pharmaceutical-grade hydrogen peroxide gel in concentrations matched to your enamel. In-chair treatment brightens 6–10 shades in a single session. Take-home trays extend and maintain results.",
    benefits:["Sensitivity assessed before treatment","In-chair or take-home","Pharmaceutical-grade agent","Shade kept on file for consistency"],
    workflow:["Shade assessment and sensitivity screening","Custom tray impressions taken (take-home option)","In-chair: gel applied and activated — approximately 60–90 minutes","Take-home: trays worn for 1–2 hours per day over 2 weeks","Final shade recorded and kept on file for future maintenance"],
    risks:["Temporary tooth sensitivity is common and usually resolves within 24–48 hours","Existing crowns, bridges, veneers, and composite fillings will not lighten — they may need replacing if they become noticeably darker than your natural teeth","Results are not permanent; dietary habits, coffee, red wine, and smoking accelerate re-staining","Whitening is not recommended during pregnancy or for patients under 18","Overuse of whitening products can damage enamel — professional dosing and supervision matter"] },

  { id:"aligners", cat:"cosmetic", name:"Clear Aligners", sub:"Discreet orthodontics, planned with 3D scanning", price:"From $3,900",
    detail:"Clear aligner therapy begins with a full intraoral 3D scan and digital bite analysis. Treatment plans are simulated in software so you see the tooth movement before agreeing to proceed. We use Invisalign and alternative aligner systems depending on case complexity. All treatments include refinement phases and a post-treatment retainer plan.",
    benefits:["3D scan and simulation on first visit","Invisalign and alternatives available","Refinements included","Retainer plan on completion"],
    workflow:["Full intraoral 3D scan — no impressions or moulds","Digital bite analysis and treatment simulation presented to you","Patient approves the planned tooth movement before fabrication begins","Aligners delivered with wearing schedule — 20–22 hours per day","Progress checks every 6–8 weeks","Refinements fabricated if tooth movement deviates from plan","Retention phase: fixed or removable retainers fitted on completion"],
    risks:["Compliance is the single biggest factor in outcomes — aligners must be worn consistently; skipping wear extends treatment significantly","Some complex tooth movements, rotations, or significant bite corrections still require traditional fixed braces","Temporary speech changes (lisping) are common in the first one to two weeks","Retention is lifelong — without retainers, teeth will relapse","Attachments (small tooth-coloured buttons) are often bonded to teeth during treatment and are visible on close inspection"] },

  { id:"biomimetic", cat:"restorative", name:"Bonded Biomimetic Dentistry", sub:"The most tooth-conservative restoration in modern practice", price:"From $390",
    detail:"Biomimetic dentistry restores damaged, cracked, or worn teeth by bonding composite and ceramic materials in anatomical layers — replicating the flexural properties of natural dentin and enamel. Unlike crowns, biomimetic restorations preserve almost all remaining tooth structure. Dr Ido Landau trained directly under Dr Pascal Magne and Dr Didier Dietschi.",
    benefits:["Maximum preservation of natural tooth","No crown needed in most cracked-tooth cases","Restorations that flex like natural enamel","Outlast conventional composites"],
    workflow:["Clinical examination and crack detection — transillumination and magnification used","CBCT imaging if depth of crack or pulp proximity is uncertain","Decay removal with maximum preservation of healthy tooth structure","Biomimetic adhesive surface preparation","Layered composite or ceramic placement replicating dentin and enamel anatomy","Occlusal bite adjustment","Final polish and surface sealing"],
    risks:["Biomimetic restorations are more technique-sensitive than conventional fillings; quality depends heavily on operator skill and isolation","Larger restorations — particularly where more than 50% of the tooth is missing — may still require a crown for long-term durability","Composite can stain over time, particularly with heavy coffee, red wine, or curry consumption","If the crack has propagated to the root, the tooth may ultimately require extraction regardless of restoration quality","Root canal treatment may be needed if decay or cracking has reached the pulp"] },

  { id:"implants", cat:"restorative", name:"Dental Implants & All-on-4", sub:"Single tooth to full-arch restoration, in one practice", price:"From $5,200",
    detail:"Dental implants are the definitive solution for missing teeth, offering a permanent, bone-integrated replacement. Dr Matthew Youssef, a gIDE Master Clinician in Implantology, performs both the surgical placement and prosthetic restoration at Melbourne Smile Centre. All-on-4 treatment provides full-arch fixed teeth on four implants, with same-day temporaries available.",
    benefits:["gIDE Master Clinician in Implantology","CT-guided surgical placement","All-on-4 full-arch restoration","Same-day temporaries for qualifying cases"],
    workflow:["CT scan and digital treatment planning — implant position, angle, and depth planned virtually","Extraction of failing teeth (if required)","Bone grafting if insufficient bone volume is present — may add 3–4 months to timeline","Implant placed under local anaesthesia (IV sedation available)","Healing phase: 6–12 weeks for osseointegration","Abutment placement and impressions","Crown or bridge delivered and attached — final result checked for bite and aesthetics"],
    risks:["Surgical risks include infection, post-operative swelling, and bruising — managed with antibiotics and anti-inflammatories","In the lower jaw, proximity to the inferior alveolar nerve is assessed and planned for; numbness is a rare but recognised risk","Upper jaw implants require awareness of sinus proximity; sinus lifts add surgical complexity","Smoking significantly increases implant failure rates — cessation is strongly advised","Osseointegration failure occurs in approximately 2–5% of cases; failed implants can usually be replaced after healing","Implants are not recommended for patients with uncontrolled diabetes, history of radiation to the jaw, or active bisphosphonate therapy"] },

  { id:"crowns", cat:"restorative", name:"Crowns & Bridges", sub:"Same-day ceramics, matched to your natural shade", price:"From $2,100",
    detail:"At Melbourne Smile Centre, crowns are designed digitally and milled in our on-site CEREC ceramic studio — meaning many cases can be completed in a single visit. Our ceramist hand-stains and glazes each crown to match the individual translucency zones of your neighbouring teeth.",
    benefits:["Same-day CEREC crowns available","Hand-stained to match natural translucency","In-house ceramist","Lithium disilicate for anterior crowns"],
    workflow:["Clinical examination and radiographs","Tooth preparation — removal of decay and shaping","Digital impression taken with intraoral scanner (no gag-inducing moulds)","CEREC milling on-site (same-day) or lab fabrication for complex cases","Try-in: shade, fit, and bite confirmed","Cementation with adhesive resin or conventional cement","Occlusal adjustment and polish"],
    risks:["Tooth preparation is irreversible — the tooth is permanently reduced in size","A crowned tooth can still develop decay at the margins if oral hygiene lapses","Root canal treatment may be needed if preparation exposes or irritates the pulp — incidence is higher in teeth with existing large fillings","Bridges require preparation of adjacent healthy teeth which are used as anchors — this is a significant consideration","Porcelain can fracture under extreme load — patients with bruxism (grinding) may need a night splint"] },

  { id:"perio", cat:"health", name:"Periodontal & Gum Therapy", sub:"Gum disease prevention and treatment", price:"From $220",
    detail:"At Melbourne Smile Centre, every hygiene appointment includes full periodontal charting, bleeding-point assessment, and personalised home-care instruction. Our hygienists are trained in ultrasonic debridement, root planing, and laser-assisted periodontal therapy for advanced cases. Maintenance intervals are personalised to your risk profile.",
    benefits:["Full periodontal charting at every visit","Ultrasonic and laser-assisted therapy","Systemic health links monitored","Personalised maintenance intervals"],
    workflow:["Full-mouth periodontal charting — pocket depths, bleeding points, recession, and mobility recorded","Diagnostic periapical radiographs if bone loss is suspected","Ultrasonic debridement to remove calculus above and below the gumline","Root planing for pockets deeper than 4 mm — may require local anaesthesia","Laser-assisted periodontal therapy for resistant pockets (where indicated)","Re-assessment at 6–8 weeks — response to treatment evaluated","Personalised maintenance interval established (3, 4, or 6 monthly)"],
    risks:["Temporary sensitivity after treatment is common — especially in areas where root surfaces are exposed","Gum recession can appear more pronounced after calculus removal as the gums return to their true position","In advanced cases, non-surgical treatment alone may not be sufficient — periodontal surgery may be required","Periodontal disease is a chronic, systemic condition — it can be managed but not cured; ongoing maintenance is essential","Systemic conditions including diabetes, cardiovascular disease, and pregnancy are bidirectionally linked to gum disease and must be considered in management"] },

  { id:"tmj", cat:"health", name:"TMJ & Occlusal Therapy", sub:"Jaw pain, bruxism, and bite correction", price:"From $380",
    detail:"TMJ dysfunction and bruxism are frequently under-diagnosed causes of chronic jaw pain, facial headaches, tooth wear, and cracked teeth. Dr Paltoglou brings three decades of occlusal analysis experience to TMJ assessment. Treatment begins with a full joint and muscle examination and digital bite mapping. Custom splints are fabricated in-house.",
    benefits:["Three decades of occlusal expertise","Digital bite mapping","Custom splints in-house","Botulinum toxin available as adjunct"],
    workflow:["Comprehensive joint and muscle examination — clicking, locking, and range of motion assessed","Digital bite mapping — forces and contact points recorded across the arch","Radiographs or CBCT if structural joint changes are suspected","Custom occlusal splint fabricated in-house (usually upper arch)","Review at 4–6 weeks — symptom response assessed and splint adjusted","Occlusal adjustment of teeth if indicated (selective equilibration)","Botulinum toxin injections to masseter and temporalis if bruxism is severe"],
    risks:["Splints are a management tool, not a definitive cure — they reduce load on the joint and protect teeth but do not correct the underlying bite","Some patients require orthodontic or restorative correction of the bite to achieve lasting improvement","Bruxism is often driven by stress and sleep disruption — dental treatment should be complemented by lifestyle and psychological support","Botulinum toxin is a temporary measure (lasting 3–6 months) and requires repeat treatment","In a small number of cases, surgical intervention (arthrocentesis or open-joint surgery) may be recommended for severe structural joint disease"] },

  { id:"sleep", cat:"health", name:"Sleep Dentistry", sub:"Treatment under sedation — comfort and complexity", price:"Price on application",
    detail:"Melbourne Smile Centre offers IV conscious sedation administered by our visiting specialist anaesthetist, allowing patients with dental phobia, a strong gag reflex, or complex multi-procedure appointments to receive treatment in a calm, controlled environment. You remain responsive throughout but have little or no memory of the appointment.",
    benefits:["IV conscious sedation by specialist","Suitable for phobia, gag reflex, complexity","Most procedures available under sedation","Minimal post-procedure recall"],
    workflow:["Full medical history review — medications, allergies, and anaesthetic history assessed","Pre-appointment assessment with our visiting anaesthetist","Fasting instructions provided — typically 6 hours for food, 2 hours for clear fluids","IV cannula placed on the day; sedation administered incrementally","Treatment performed while you remain responsive but deeply relaxed","Recovery in-chair for 30–60 minutes until you are stable","A responsible adult must escort you home — you cannot drive or make legal decisions for 24 hours"],
    risks:["IV sedation carries small but recognised risks including bruising at the cannula site, nausea, and dizziness on standing","Respiratory depression is possible but continuously monitored and managed by the specialist anaesthetist","Not all medical conditions are compatible with IV sedation — a thorough pre-assessment is mandatory","Patients on blood thinners, with sleep apnoea, or with significant cardiac or respiratory conditions require additional anaesthetist review","Sedation does not eliminate the need for local anaesthetic — you will still receive injections, though you are unlikely to remember them","You must not drive, operate machinery, consume alcohol, or make legal decisions for 24 hours following sedation"] },
];

const CATS = [
  { id:"all",         label:"All" },
  { id:"technology",  label:"Technology" },
  { id:"cosmetic",    label:"Cosmetic" },
  { id:"restorative", label:"Restorative" },
  { id:"health",      label:"Health & Wellness" },
];

/* ── Drawer helpers ─────────────────────────────────────────── */
function getRiskSeverity(text) {
  const t = text.toLowerCase();
  if (t.match(/permanent|irreversible|surgical risk|nerve|failure|extraction|cannot drive|not recommended|mandatory|must not|bisphosphonat|radiation|uncontrolled|blood thinn/))
    return "high";
  if (t.match(/usually resolves|typically|temporary|common|minor|unlikely|most patients|often|short-term/))
    return "low";
  return "medium";
}

const SEVERITY_STYLES = {
  low:    { bg:"rgba(100,150,90,0.07)",  border:"rgba(100,150,90,0.22)",  badge:"NOTE",      badgeBg:"rgba(100,150,90,0.15)",  badgeCol:"#4a7a44", icon:"rgba(100,150,90,0.8)"  },
  medium: { bg:"rgba(176,135,84,0.07)",  border:"rgba(176,135,84,0.22)",  badge:"CONSIDER",  badgeBg:"rgba(176,135,84,0.14)",  badgeCol:"var(--msc-primary)", icon:"rgba(176,135,84,0.9)" },
  high:   { bg:"rgba(185,100,50,0.07)",  border:"rgba(185,100,50,0.25)",  badge:"IMPORTANT", badgeBg:"rgba(185,100,50,0.14)",  badgeCol:"#b05a28", icon:"rgba(185,100,50,0.9)"  },
};

function getStepPhase(i, total) {
  if (i === 0)         return { label:"Assessment",  color:"#7B8FA0", dot:"rgba(123,143,160,0.15)" };
  if (i === total - 1) return { label:"Completion",  color:"#7A9E7E", dot:"rgba(122,158,126,0.15)" };
  return                      { label:"Treatment",   color:"var(--msc-primary)", dot:"rgba(176,135,84,0.12)" };
}

/* ── Detail drawer ──────────────────────────────────────────── */
function Drawer({ t, onClose, onBook }) {
  const [tab, setTab] = useTGState("overview");
  const [tabKey, setTabKey] = useTGState(0);

  useTGEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const switchTab = (id) => { setTab(id); setTabKey(k => k + 1); };

  const tabs = [
    { id:"overview", label:"Overview" },
    { id:"workflow", label:"Workflow" },
    { id:"risks",    label:"Risks & Recovery" },
  ];

  const catLabel = CATS.find(c => c.id === t.cat)?.label;

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200 }}>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position:"absolute", inset:0,
        background:"rgba(20,18,15,0.58)",
        backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)",
        animation:"overlayIn 280ms ease",
      }}/>

      {/* Panel */}
      <div style={{
        position:"absolute", top:0, right:0, bottom:0, width:"min(580px,96vw)",
        background:"#FDFCFA",
        boxShadow:"-32px 0 100px rgba(31,26,20,0.26)",
        display:"flex", flexDirection:"column",
        animation:"drawerIn 340ms cubic-bezier(0.32,0,0.12,1)",
      }}>

        {/* ── Header ── */}
        <div className="msc-drawer-header" style={{
          padding:"32px 36px 24px",
          background:"linear-gradient(160deg,#FDFCFA 60%,#F4EDE2)",
          borderBottom:"1px solid rgba(180,150,110,0.14)",
          flexShrink:0, position:"relative",
        }}>
          {/* Close */}
          <button onClick={onClose} style={{
            position:"absolute", top:20, right:20,
            width:36, height:36, borderRadius:"50%",
            border:"1px solid rgba(180,150,110,0.28)",
            background:"rgba(255,254,251,0.7)", backdropFilter:"blur(8px)",
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            color:"var(--msc-ink-muted-80)", fontSize:18, lineHeight:1,
            transition:"background 200ms, border-color 200ms",
          }}
          onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,254,251,1)"; e.currentTarget.style.borderColor="rgba(176,135,84,0.5)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,254,251,0.7)"; e.currentTarget.style.borderColor="rgba(180,150,110,0.28)"; }}
          >×</button>

          {/* Icon + category */}
          <div style={{ display:"flex", alignItems:"flex-start", gap:16, marginBottom:18 }}>
            <div style={{
              width:64, height:64, borderRadius:18,
              background:"rgba(176,135,84,0.10)",
              border:"1px solid rgba(176,135,84,0.18)",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
            }}>
              <AnimIcon id={t.id} size={40} />
            </div>
            <div style={{ paddingTop:4 }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:6,
                padding:"4px 10px", borderRadius:9999,
                background:"rgba(176,135,84,0.12)", border:"1px solid rgba(176,135,84,0.22)",
                fontSize:10, color:"var(--msc-primary)", letterSpacing:"0.14em",
                textTransform:"uppercase", fontWeight:600, fontFamily:"var(--msc-font-text)",
                marginBottom:8,
              }}>{catLabel}</div>
              <h2 style={{
                fontFamily:"var(--msc-font-display)", fontSize:"clamp(22px,3vw,30px)",
                fontWeight:400, letterSpacing:"-0.018em", lineHeight:1.06,
                color:"var(--msc-ink)", textTransform:"lowercase", margin:0,
              }}>{t.name}</h2>
            </div>
          </div>

          <p style={{ fontSize:13, color:"var(--msc-ink-muted-80)", fontWeight:300, margin:0, lineHeight:1.55 }}>{t.sub}</p>
        </div>

        {/* ── Tabs ── */}
        <div style={{
          display:"flex", borderBottom:"1px solid rgba(180,150,110,0.14)",
          flexShrink:0, background:"rgba(253,252,250,0.95)",
          backdropFilter:"blur(8px)",
        }}>
          {tabs.map(tb => (
            <button key={tb.id} onClick={() => switchTab(tb.id)} style={{
              flex:1, padding:"14px 6px", border:"none", background:"transparent",
              borderBottom: tab === tb.id ? "2px solid var(--msc-primary)" : "2px solid transparent",
              color: tab === tb.id ? "var(--msc-primary)" : "var(--msc-ink-muted-80)",
              fontSize:11, fontFamily:"var(--msc-font-text)",
              fontWeight: tab === tb.id ? 700 : 400,
              cursor:"pointer", letterSpacing:"0.06em", textTransform:"uppercase",
              transition:"color 200ms ease, border-color 200ms ease",
            }}>{tb.label}</button>
          ))}
        </div>

        {/* ── Tab content ── */}
        <div className="msc-drawer-content" style={{ flex:1, overflowY:"auto", padding:"28px 36px" }}>

          {/* ════ OVERVIEW ════ */}
          {tab === "overview" && (
            <div key={`overview-${tabKey}`}>

              {/* Stats strip */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:28 }}>
                {[
                  { label:"Investment", value:t.price },
                  { label:"Steps",      value:`${t.workflow.length} steps` },
                  { label:"Category",   value:catLabel },
                ].map((s, i) => (
                  <div key={s.label} style={{
                    padding:"14px 14px 12px",
                    background:"linear-gradient(135deg,rgba(176,135,84,0.07),rgba(176,135,84,0.03))",
                    border:"1px solid rgba(176,135,84,0.16)", borderRadius:12,
                    animation:`statPop 360ms ${i * 80}ms cubic-bezier(0.34,1.56,0.64,1) both`,
                  }}>
                    <div style={{ fontSize:9, color:"var(--msc-primary)", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:5 }}>{s.label}</div>
                    <div style={{ fontSize:13, color:"var(--msc-ink)", fontWeight:600, lineHeight:1.2 }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Detail */}
              <p style={{
                fontSize:14, color:"var(--msc-ink-muted-80)", lineHeight:1.82,
                margin:"0 0 28px", fontWeight:300,
                borderLeft:"2px solid rgba(176,135,84,0.25)", paddingLeft:14,
                animation:"stepIn 400ms 60ms ease both",
              }}>{t.detail}</p>

              {/* Benefits */}
              <div style={{
                fontSize:10, color:"var(--msc-primary)", letterSpacing:"0.16em",
                textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)",
                marginBottom:14, animation:"stepIn 400ms 120ms ease both",
              }}>Key benefits</div>

              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {t.benefits.map((b, i) => (
                  <div key={b} style={{
                    display:"flex", alignItems:"flex-start", gap:12,
                    padding:"11px 14px",
                    background:"rgba(255,254,251,0.8)",
                    border:"1px solid rgba(180,150,110,0.12)", borderRadius:10,
                    animation:`stepIn 380ms ${180 + i * 70}ms ease both`,
                  }}>
                    {/* Animated checkmark */}
                    <div style={{
                      width:20, height:20, borderRadius:"50%", flexShrink:0,
                      background:"rgba(176,135,84,0.12)", border:"1px solid rgba(176,135,84,0.30)",
                      display:"flex", alignItems:"center", justifyContent:"center", marginTop:1,
                      animation:`checkPop 420ms ${200 + i * 70}ms cubic-bezier(0.34,1.56,0.64,1) both`,
                    }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="var(--msc-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize:13, color:"var(--msc-ink)", lineHeight:1.55, paddingTop:2 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════ WORKFLOW ════ */}
          {tab === "workflow" && (
            <div key={`workflow-${tabKey}`}>
              <p style={{
                fontSize:13, color:"var(--msc-ink-muted-80)", lineHeight:1.7,
                margin:"0 0 28px", fontWeight:300,
                animation:"stepIn 340ms ease both",
              }}>
                From your first consultation to your completed result — every step explained.
              </p>

              <div style={{ display:"flex", flexDirection:"column" }}>
                {t.workflow.map((step, i) => {
                  const phase = getStepPhase(i, t.workflow.length);
                  const isLast = i === t.workflow.length - 1;
                  return (
                    <div key={i} style={{
                      display:"flex", gap:0,
                      animation:`stepIn 380ms ${i * 75}ms ease both`,
                    }}>
                      {/* Left: number + line */}
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0, width:44 }}>
                        {/* Ring ping behind circle */}
                        <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center", width:32, height:32 }}>
                          <div style={{
                            position:"absolute", width:32, height:32, borderRadius:"50%",
                            border:`1.5px solid ${phase.color}`,
                            animation:`ringPing 1.6s ${i * 120}ms ease-out both`,
                            opacity:0,
                          }}/>
                          <div style={{
                            width:28, height:28, borderRadius:"50%",
                            background:phase.color, color:"#fff",
                            display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize:11, fontWeight:700, fontFamily:"var(--msc-font-text)",
                            boxShadow:`0 2px 8px -2px ${phase.color}80`,
                            position:"relative", zIndex:1,
                          }}>{i + 1}</div>
                        </div>
                        {/* Connecting line */}
                        {!isLast && (
                          <div style={{
                            width:1, flex:1, minHeight:24,
                            background:`linear-gradient(to bottom, ${phase.color}60, rgba(176,135,84,0.15))`,
                            marginTop:4,
                            animation:`lineGrow 400ms ${i * 75 + 120}ms ease both`,
                          }}/>
                        )}
                      </div>

                      {/* Right: phase + step text */}
                      <div style={{
                        flex:1, paddingLeft:12,
                        paddingBottom: isLast ? 0 : 24,
                        paddingTop:4,
                      }}>
                        <div style={{
                          fontSize:9, letterSpacing:"0.14em", textTransform:"uppercase",
                          fontWeight:700, fontFamily:"var(--msc-font-text)",
                          color:phase.color, marginBottom:5,
                        }}>{phase.label}</div>
                        <div style={{
                          padding:"12px 14px",
                          background:phase.dot,
                          border:`1px solid ${phase.color}22`,
                          borderRadius:10,
                        }}>
                          <span style={{ fontSize:13, color:"var(--msc-ink)", lineHeight:1.65 }}>{step}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════ RISKS & RECOVERY ════ */}
          {tab === "risks" && (
            <div key={`risks-${tabKey}`}>
              {/* Intro banner */}
              <div style={{
                display:"flex", alignItems:"flex-start", gap:12,
                padding:"14px 16px", marginBottom:22,
                background:"rgba(31,26,20,0.04)", borderRadius:10,
                border:"1px solid rgba(31,26,20,0.08)",
                animation:"stepIn 340ms ease both",
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink:0, marginTop:1 }}>
                  <circle cx="9" cy="9" r="8" stroke="rgba(31,26,20,0.35)" strokeWidth="1"/>
                  <path d="M9 5v5" stroke="rgba(31,26,20,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="9" cy="13" r="0.8" fill="rgba(31,26,20,0.6)"/>
                </svg>
                <p style={{ fontSize:12, color:"var(--msc-ink-muted-80)", lineHeight:1.65, margin:0, fontWeight:300 }}>
                  We believe informed patients make better decisions. Every consideration below is discussed openly before treatment begins.
                </p>
              </div>

              {/* Severity legend */}
              <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap", animation:"stepIn 380ms 40ms ease both" }}>
                {Object.entries(SEVERITY_STYLES).map(([key, s]) => (
                  <div key={key} style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:s.icon }}/>
                    <span style={{ fontSize:9, color:"var(--msc-ink-muted-80)", fontFamily:"var(--msc-font-text)", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:600 }}>{s.badge}</span>
                  </div>
                ))}
              </div>

              {/* Risk cards */}
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {t.risks.map((r, i) => {
                  const sev = getRiskSeverity(r);
                  const s = SEVERITY_STYLES[sev];
                  return (
                    <div key={i} style={{
                      display:"flex", alignItems:"flex-start", gap:12,
                      padding:"13px 14px",
                      background:s.bg, border:`1px solid ${s.border}`,
                      borderRadius:10, borderLeft:`3px solid ${s.icon}`,
                      animation:`riskSlide 360ms ${i * 65}ms ease both`,
                    }}>
                      {/* Severity icon */}
                      <div style={{ flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke={s.icon} strokeWidth="1.2" fill={s.bg}/>
                          <line x1="8" y1="5" x2="8" y2="9.5" stroke={s.icon} strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="8" cy="11.5" r="0.85" fill={s.icon}/>
                        </svg>
                        <div style={{
                          fontSize:7, fontWeight:800, letterSpacing:"0.08em",
                          fontFamily:"var(--msc-font-text)", color:s.badgeCol,
                          textTransform:"uppercase", writingMode:"vertical-lr",
                          transform:"rotate(180deg)",
                        }}>{s.badge}</div>
                      </div>
                      <span style={{ fontSize:13, color:"var(--msc-ink)", lineHeight:1.68, fontWeight:300 }}>{r}</span>
                    </div>
                  );
                })}
              </div>

              {/* Recovery footer */}
              <div style={{
                marginTop:24, padding:"16px 16px",
                background:"linear-gradient(135deg,rgba(176,135,84,0.07),rgba(176,135,84,0.03))",
                border:"1px solid rgba(176,135,84,0.16)", borderRadius:10,
                animation:`stepIn 380ms ${t.risks.length * 65 + 80}ms ease both`,
              }}>
                <div style={{ fontSize:9, color:"var(--msc-primary)", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:8 }}>Informed consent</div>
                <p style={{ fontSize:12, color:"var(--msc-ink-muted-80)", lineHeight:1.65, margin:0, fontWeight:300 }}>
                  These considerations are reviewed at your consultation and documented before any treatment proceeds. We encourage questions at every stage.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* ── Footer ── */}
        <div className="msc-drawer-footer" style={{
          padding:"16px 36px 24px",
          borderTop:"1px solid rgba(180,150,110,0.16)",
          background:"linear-gradient(0deg,#F8F3EC,#FDFCFA)",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexShrink:0, gap:16,
        }}>
          <div>
            <div style={{ fontSize:10, color:"var(--msc-ink-muted-80)", textTransform:"uppercase", letterSpacing:"0.12em", fontFamily:"var(--msc-font-text)", fontWeight:600, marginBottom:4 }}>Investment</div>
            <div style={{ fontSize:18, color:"var(--msc-primary)", fontWeight:700, letterSpacing:"-0.01em" }}>{t.price}</div>
          </div>
          <button onClick={onBook} style={{
            background:"var(--msc-primary)", color:"#fff", border:"none",
            borderRadius:9999, padding:"13px 28px",
            fontSize:13, fontFamily:"var(--msc-font-text)", fontWeight:600,
            cursor:"pointer", letterSpacing:"0.02em",
            boxShadow:"0 6px 20px -4px rgba(140,95,40,0.48)",
            transition:"transform 180ms ease, box-shadow 180ms ease",
          }}
          onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 28px -4px rgba(140,95,40,0.54)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 6px 20px -4px rgba(140,95,40,0.48)"; }}
          >Book a consultation</button>
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
        className="msc-feat-card"
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
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(600px 300px at 80% 50%, rgba(176,135,84,0.14), transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ flexShrink:0 }}>
          <AnimIcon id={t.id} size={88} />
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:"var(--msc-primary-on-dark)", letterSpacing:"0.16em", textTransform:"uppercase", fontWeight:600, fontFamily:"var(--msc-font-text)", marginBottom:12 }}>Signature service · {CATS.find(c=>c.id===t.cat)?.label}</div>
          <h3 style={{ fontFamily:"var(--msc-font-display)", fontSize:"clamp(28px,3.5vw,44px)", fontWeight:400, letterSpacing:"-0.018em", lineHeight:1.04, color:"#fff", textTransform:"lowercase", margin:"0 0 14px" }}>{t.name}</h3>
          <p style={{ fontSize:16, color:"rgba(245,237,224,0.68)", fontWeight:300, lineHeight:1.6, margin:"0 0 24px", maxWidth:480 }}>{t.detail.slice(0,180)}…</p>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, color:"var(--msc-primary-on-dark)", fontSize:13, fontWeight:500, letterSpacing:"0.04em" }}>
            View details <span style={{ transition:"transform 200ms ease", transform: hov ? "translateX(4px)" : "none" }}>→</span>
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
          opacity: hov ? 1 : 0.6, fontFamily:"var(--msc-font-text)",
        }}>Details →</div>
      </div>
    </div>
  );
}

/* ── All-on-4 showcase section ──────────────────────────────── */
function AllOnFourSection({ t, onOpen, onBook }) {
  const stats = [
    { n:"4",     label:"Titanium implants" },
    { n:"1",     label:"Full arch restored" },
    { n:"Same",  label:"Day temporaries" },
    { n:"gIDE",  label:"Master clinician" },
  ];
  const journey = [
    { step:"01", label:"CT Scan &\nPlanning" },
    { step:"02", label:"Implant\nSurgery" },
    { step:"03", label:"Osseo-\nintegration" },
    { step:"04", label:"Final\nSmile" },
  ];
  const phaseColors = ["#7B8FA0","var(--msc-primary)","var(--msc-primary)","#7A9E7E"];

  return (
    <div style={{ margin:"16px 0 20px", borderRadius:24, overflow:"hidden",
      background:"linear-gradient(135deg, var(--msc-surface-tile-1) 0%, #1C1714 60%, #241E17 100%)",
      border:"1px solid rgba(176,135,84,0.18)",
      boxShadow:"0 8px 48px -8px rgba(0,0,0,0.45)",
      position:"relative",
    }}>

      {/* Ambient glow */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(900px 500px at 25% 60%, rgba(176,135,84,0.18), transparent 65%), radial-gradient(500px 400px at 90% 20%, rgba(217,185,135,0.10), transparent 60%)",
      }}/>

      {/* Two-column interior */}
      <div className="msc-aof-grid" style={{ display:"grid", gridTemplateColumns:"1fr 320px", position:"relative", zIndex:1 }}>

        {/* ── Left: text + journey + CTAs ── */}
        <div style={{ padding:"56px 52px 52px" }}>

          {/* Eyebrow */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20,
            animation:"aofFadeUp 500ms 0ms ease both",
          }}>
            <div style={{ width:24, height:1, background:"rgba(217,185,135,0.5)" }}/>
            <span style={{ fontSize:10, color:"var(--msc-primary-on-dark)", letterSpacing:"0.22em",
              textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)",
            }}>Signature Procedure · Restorative</span>
          </div>

          {/* Headline */}
          <h2 style={{ fontFamily:"var(--msc-font-display)", fontWeight:400,
            fontSize:"clamp(44px,6vw,80px)", letterSpacing:"-0.025em",
            lineHeight:0.96, color:"#fff", textTransform:"lowercase",
            margin:"0 0 8px",
            animation:"aofFadeUp 500ms 60ms ease both",
          }}>
            all-on-<span style={{ fontFamily:"var(--msc-font-editorial)", fontStyle:"italic",
              color:"var(--msc-primary-on-dark)" }}>4</span>.
          </h2>

          <p style={{ fontSize:"clamp(15px,1.8vw,18px)", color:"rgba(245,237,224,0.62)",
            fontWeight:300, lineHeight:1.6, margin:"0 0 36px", maxWidth:480,
            animation:"aofFadeUp 500ms 120ms ease both",
          }}>
            A complete smile rebuilt on four implants — extracted, placed, and restored in one Toorak practice by our gIDE Master Clinician in Implantology.
          </p>

          {/* Journey steps */}
          <div style={{ marginBottom:36, animation:"aofFadeUp 500ms 180ms ease both" }}>
            <div style={{ fontSize:9, color:"rgba(217,185,135,0.55)", letterSpacing:"0.18em",
              textTransform:"uppercase", fontWeight:700, fontFamily:"var(--msc-font-text)", marginBottom:14,
            }}>The journey</div>
            <div className="msc-aof-journey" style={{ display:"flex", alignItems:"flex-start", gap:0 }}>
              {journey.map((j, i) => (
                <div key={j.step} className="msc-aof-journey-step" style={{ display:"flex", alignItems:"flex-start", flex:1 }}>
                  {/* Step block */}
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
                      width:32, height:32, borderRadius:"50%",
                      background:`rgba(${i===0?"123,143,160":i===3?"122,158,126":"176,135,84"},0.22)`,
                      border:`1px solid ${phaseColors[i]}44`,
                      fontSize:10, fontWeight:700, color:phaseColors[i],
                      fontFamily:"var(--msc-font-text)", flexShrink:0,
                      animation:`checkPop 500ms ${240 + i * 100}ms cubic-bezier(0.34,1.56,0.64,1) both`,
                    }}>{j.step}</div>
                    <div style={{ fontSize:10, color:"rgba(245,237,224,0.65)", fontWeight:400,
                      fontFamily:"var(--msc-font-text)", textAlign:"center",
                      marginTop:7, lineHeight:1.4, whiteSpace:"pre-line",
                    }}>{j.label}</div>
                  </div>
                  {/* Connector */}
                  {i < journey.length - 1 && (
                    <div style={{ flex:1, height:1, background:"rgba(176,135,84,0.22)", marginTop:16,
                      animation:`progressLine 600ms ${340 + i * 100}ms ease both`,
                      overflow:"hidden", minWidth:12,
                    }}/>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display:"flex", gap:12, flexWrap:"wrap",
            animation:"aofFadeUp 500ms 300ms ease both",
          }}>
            <button onClick={onOpen} style={{
              background:"var(--msc-primary)", color:"#fff", border:"none",
              borderRadius:9999, padding:"13px 28px",
              fontSize:13, fontFamily:"var(--msc-font-text)", fontWeight:600,
              cursor:"pointer", letterSpacing:"0.02em",
              boxShadow:"0 6px 24px -4px rgba(140,95,40,0.55)",
              transition:"transform 180ms ease, box-shadow 180ms ease",
            }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 32px -4px rgba(140,95,40,0.60)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 6px 24px -4px rgba(140,95,40,0.55)"; }}
            >Explore All-on-4 →</button>
            <button onClick={onBook} style={{
              background:"transparent", color:"rgba(245,237,224,0.80)",
              border:"1px solid rgba(245,237,224,0.25)", borderRadius:9999,
              padding:"13px 24px", fontSize:13,
              fontFamily:"var(--msc-font-text)", fontWeight:400,
              cursor:"pointer", letterSpacing:"0.02em",
              transition:"border-color 200ms ease, color 200ms ease",
            }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(217,185,135,0.55)"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(245,237,224,0.25)"; e.currentTarget.style.color="rgba(245,237,224,0.80)"; }}
            >Book a consultation</button>
          </div>
        </div>

        {/* ── Right: icon + stats ── */}
        <div style={{
          borderLeft:"1px solid rgba(255,254,251,0.07)",
          background:"rgba(0,0,0,0.18)",
          display:"flex", flexDirection:"column", alignItems:"center",
          justifyContent:"center", padding:"48px 32px", gap:32,
        }}>
          {/* Large animated icon */}
          <div style={{
            width:100, height:100, borderRadius:24,
            background:"rgba(176,135,84,0.14)", border:"1px solid rgba(176,135,84,0.25)",
            display:"flex", alignItems:"center", justifyContent:"center",
            animation:"statPop 600ms 100ms cubic-bezier(0.34,1.56,0.64,1) both",
          }}>
            <AnimIcon id="implants" size={64} />
          </div>

          {/* Stats grid */}
          <div className="msc-aof-stats" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10, width:"100%" }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                padding:"14px 12px", borderRadius:12, textAlign:"center",
                background:"rgba(255,254,251,0.05)", border:"1px solid rgba(255,254,251,0.08)",
                animation:`statPop 500ms ${200 + i * 80}ms cubic-bezier(0.34,1.56,0.64,1) both`,
              }}>
                <div style={{ fontFamily:"var(--msc-font-display)", fontSize:22, fontWeight:400,
                  color:"var(--msc-primary-on-dark)", letterSpacing:"-0.02em", lineHeight:1,
                  marginBottom:5,
                }}>{s.n}</div>
                <div style={{ fontSize:10, color:"rgba(245,237,224,0.50)", fontFamily:"var(--msc-font-text)",
                  fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase", lineHeight:1.3,
                }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Price chip */}
          <div style={{ padding:"10px 18px", borderRadius:9999,
            background:"rgba(176,135,84,0.14)", border:"1px solid rgba(176,135,84,0.28)",
            animation:"aofFadeUp 500ms 420ms ease both",
          }}>
            <span style={{ fontSize:11, color:"rgba(217,185,135,0.7)", fontFamily:"var(--msc-font-text)",
              letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:600,
            }}>From </span>
            <span style={{ fontSize:16, color:"var(--msc-primary-on-dark)", fontWeight:700 }}>$5,200</span>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Main grid ──────────────────────────────────────────────── */
function TreatmentGrid({ onNavigate }) {
  const [activeCat, setActiveCat] = useTGState("all");
  const [selected,  setSelected]  = useTGState(null);

  const implantsTreatment = TREATMENTS.find(t => t.id === "implants");
  const showAllOnFour     = activeCat === "all" || activeCat === "restorative";

  const visible  = activeCat === "all" ? TREATMENTS : TREATMENTS.filter(t => t.cat === activeCat);
  const featured = activeCat === "all" ? visible.find(t => t.featured) : null;
  const rest     = (featured ? visible.filter(t => !t.featured) : visible)
                    .filter(t => showAllOnFour ? t.id !== "implants" : true);

  const openDrawer  = (t) => { setSelected(t); document.body.style.overflow="hidden"; };
  const closeDrawer = () =>  { setSelected(null); document.body.style.overflow=""; };

  return (
    <div className="msc-treat-pad" style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px 120px" }}>
      <InjectStyle />

      {/* Category pills */}
      <div className="msc-cat-pills" style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:52 }}>
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

      {/* Featured DSD card */}
      {featured && (
        <div className="msc-grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:16 }}>
          <TreatCard key={featured.id} t={featured} featured onClick={()=>openDrawer(featured)} />
        </div>
      )}

      {/* All-on-4 showcase */}
      {showAllOnFour && implantsTreatment && (
        <AllOnFourSection
          t={implantsTreatment}
          onOpen={() => openDrawer(implantsTreatment)}
          onBook={() => { onNavigate && onNavigate("contact"); }}
        />
      )}

      {/* Remaining treatment cards */}
      <div className="msc-grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {rest.map(t => <TreatCard key={t.id} t={t} onClick={()=>openDrawer(t)} />)}
      </div>

      {/* Drawer */}
      {selected && <Drawer t={selected} onClose={closeDrawer} onBook={()=>{ closeDrawer(); onNavigate&&onNavigate("contact"); }} />}
    </div>
  );
}

Object.assign(window, { TreatmentCard: TreatCard, TreatmentGrid });
