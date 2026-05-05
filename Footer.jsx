/* eslint-disable no-undef */

function Footer() {
  const cols = [
    { head: "treatments", links: ["Veneers", "Whitening", "Implants", "Orthodontics", "Crowns & bridges"] },
    { head: "the studio", links: ["About", "The team", "Environment", "Technology", "Excellence every day"] },
    { head: "patients",   links: ["Book a consultation", "New patient form", "Treatment plans", "Fees", "FAQ"] },
    { head: "visit",      links: ["Toorak village", "03 9824 7722", "hello@melbournesmilecentre.com.au", "Mon–Fri · 8am–6pm", "Saturday by appointment"] },
  ];
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, var(--msc-surface-tile-3) 0%, var(--msc-surface-black) 100%)",
        color: "var(--msc-body-muted)",
        padding: "96px 32px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(900px 380px at 80% 0%, rgba(176,135,84,0.18), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ marginBottom: 64 }}>
          <h3
            style={{
              fontFamily: "var(--msc-font-display)",
              fontSize: "clamp(48px, 7vw, 96px)",
              fontWeight: 400,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 0.96,
              margin: 0,
              textTransform: "lowercase",
            }}
          >
            excellence{" "}
            <span style={{ fontFamily: "var(--msc-font-editorial)", fontStyle: "italic", color: "var(--msc-primary-on-dark)" }}>every</span>{" "}
            day.
          </h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
          {cols.map((c) => (
            <div key={c.head}>
              <div style={{ fontFamily: "var(--msc-font-display)", fontSize: 18, fontWeight: 400, color: "#fff", marginBottom: 14, letterSpacing: "-0.01em", textTransform: "lowercase" }}>
                {c.head}
              </div>
              {c.links.map((l) => (
                <div key={l} style={{ fontSize: 14, lineHeight: 2.1 }}>
                  <a style={{ color: "var(--msc-body-muted)", textDecoration: "none", cursor: "pointer" }}>{l}</a>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex", alignItems: "center", gap: 24,
            marginTop: 64, paddingTop: 28,
            borderTop: "1px solid rgba(255,254,251,0.08)",
          }}
        >
          <img src="assets/ada-accreditation.png" alt="QIP / ADA Accredited" style={{ height: 56, filter: "brightness(0) invert(1) opacity(0.78)" }} />
          <img src="assets/ada-member.png" alt="ADA Member" style={{ height: 56, filter: "brightness(0) invert(1) opacity(0.78)" }} />
          <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--msc-body-muted)", opacity: 0.6 }}>
            © {new Date().getFullYear()} The Melbourne Smile Centre · Toorak
          </div>
        </div>

        <div style={{ marginTop: 18, fontSize: 11, lineHeight: 1.5, color: "var(--msc-body-muted)", opacity: 0.55, maxWidth: 760 }}>
          Treatment outcomes vary. Any surgical or invasive procedure carries risks. Before proceeding, you should seek a second opinion from an appropriately qualified health practitioner.
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
