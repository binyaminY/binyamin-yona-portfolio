import { useState } from "react";
import "./App.css";

const PHOTO_URL = "/profile.jpeg";
const FORMSPREE_URL = "https://formspree.io/f/xqeggroe";
// Note: make sure benyona12@gmail.com is set as the recipient in Formspree dashboard

const screenshot = (url, force = false) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url${force ? "&force=true" : ""}`;

const projects = [
  {
    id: 1,
    title: "History",
    link: "https://history-rosy-eight.vercel.app",
    image: "/previews/history.png",
  },
  {
    id: 2,
    title: "Afula App",
    link: "https://afula-app.vercel.app",
    image: screenshot("https://afula-app.vercel.app"),
  },
  {
    id: 4,
    title: "Data Structures",
    link: "https://data-structures-beta.vercel.app",
    image: screenshot("https://data-structures-beta.vercel.app"),
    college: true,
  },
  {
    id: 5,
    title: "המתמידים",
    link: "https://hamatmidim.vercel.app",
    image: screenshot("https://hamatmidim.vercel.app"),
    college: true,
  },
  {
    id: 6,
    title: "משחק מבחן – הסכסוך הישראלי-ערבי",
    link: "https://exam-game-rho.vercel.app",
    image: screenshot("https://exam-game-rho.vercel.app"),
    college: true,
  },
  {
    id: 7,
    title: "Tree Traversal Master",
    link: "https://tree-traversal-master.vercel.app",
    image: screenshot("https://tree-traversal-master.vercel.app"),
    college: true,
  },
  {
    id: 8,
    title: "Access App",
    link: "https://access-app23.vercel.app",
    image: "/previews/access-app.png",
  },
];

function ContactModal({ onClose }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    const data = new FormData(e.target);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        background: "rgba(26,22,18,0.45)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#faf8f4", borderRadius: "6px",
          padding: "2.5rem", width: "100%", maxWidth: 460,
          boxShadow: "0 32px 80px rgba(26,22,18,0.22)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, left: 16,
            background: "none", border: "none", cursor: "pointer",
            fontSize: "1.3rem", color: "#9c8265", lineHeight: 1,
          }}
        >×</button>

        <p style={{ fontFamily: "'Rubik', sans-serif", fontSize: "0.75rem", letterSpacing: "0.08em", color: "#9c8265", marginBottom: "0.5rem" }}>
          דברו איתי
        </p>
        <h2 style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 600, fontSize: "1.8rem", color: "#1a1612", marginBottom: "2rem" }}>
          צור קשר
        </h2>

        {status === "sent" ? (
          <p style={{ fontFamily: "'Rubik', sans-serif", color: "#5a5048", lineHeight: 1.8 }}>
            תודה! ההודעה נשלחה בהצלחה. אחזור אליך בהקדם.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
            {[["name", "שם"], ["email", "מייל"]].map(([name, label]) => (
              <div key={name}>
                <label style={{ fontFamily: "'Rubik', sans-serif", fontSize: "0.78rem", color: "#9c8265", display: "block", marginBottom: "0.4rem" }}>
                  {label}
                </label>
                <input
                  name={name}
                  required
                  maxLength={name === "email" ? 120 : 80}
                  type={name === "email" ? "email" : "text"}
                  style={{
                    width: "100%", padding: "0.7rem 1rem",
                    border: "1px solid #e8e0d4", borderRadius: "3px",
                    fontFamily: "'Rubik', sans-serif", fontSize: "0.9rem",
                    background: "#fff", color: "#1a1612", outline: "none",
                    direction: "rtl",
                  }}
                />
              </div>
            ))}
            <div>
              <label style={{ fontFamily: "'Rubik', sans-serif", fontSize: "0.78rem", color: "#9c8265", display: "block", marginBottom: "0.4rem" }}>
                הודעה
              </label>
              <textarea
                name="message"
                required
                maxLength={2000}
                rows={4}
                style={{
                  width: "100%", padding: "0.7rem 1rem",
                  border: "1px solid #e8e0d4", borderRadius: "3px",
                  fontFamily: "'Rubik', sans-serif", fontSize: "0.9rem",
                  background: "#fff", color: "#1a1612", outline: "none",
                  resize: "vertical", direction: "rtl",
                }}
              />
            </div>
            {status === "error" && (
              <p style={{ fontFamily: "'Rubik', sans-serif", fontSize: "0.82rem", color: "#c0392b" }}>
                משהו השתבש, נסה שוב.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                fontFamily: "'Rubik', sans-serif", fontWeight: 500,
                fontSize: "0.88rem", color: "#fff", background: "#1a1612",
                border: "none", padding: "0.85rem 2.2rem",
                borderRadius: "3px", cursor: "pointer",
                opacity: status === "sending" ? 0.6 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {status === "sending" ? "שולח..." : "שליחה"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [failed, setFailed] = useState(false);
  return (
    <a className="project-card" href={project.link} target="_blank" rel="noopener noreferrer">
      <div className="project-preview">
        {failed ? <div className="preview-fallback"><span>BY / {String(index + 1).padStart(2, "0")}</span><strong>{project.title}</strong></div> :
          <img src={project.image} alt={project.title} loading="lazy" onError={() => setFailed(true)} />}
        <span className="project-open" aria-hidden="true">↗</span>
      </div>
      <div className="project-info"><div><span className="project-type">{project.college ? "למידה ואינטראקטיביות" : "אפליקציה ומוצר דיגיטלי"}</span><h3 dir="auto">{project.title}</h3></div><span className="project-number">{String(index + 1).padStart(2, "0")}</span></div>
    </a>
  );
}

export default function Portfolio() {
  const [showContact, setShowContact] = useState(false);
  const [filter, setFilter] = useState("all");
  const visibleProjects = projects.filter(p => filter === "all" || (filter === "college" ? p.college : !p.college));
  return (
    <>
      <header className="site-header"><nav className="navigation" aria-label="ניווט ראשי">
        <a className="brand" href="#about"><span className="brand-mark">by.</span><span>בנימין יונה</span></a>
        <div className="nav-links"><a href="#about">אודות</a><a href="#work">העבודות שלי</a></div>
        <button className="nav-contact" onClick={() => setShowContact(true)}>בואו נדבר <span aria-hidden="true">↗</span></button>
      </nav></header>
      <main>
        <section id="about" className="hero-section">
          <div className="hero-copy"><p className="eyebrow"><span /> רעיונות שהופכים למוצרים</p>
            <h1>שלום, אני<br /><span>בנימין יונה.</span></h1>
            <p className="hero-description">אני בונה אפליקציות ומוצרים דיגיטליים.<br />מרעיון ראשון ועד חוויה שאפשר לגעת בה —<br className="desktop-break" /> כאן תמצאו את הדברים שיצרתי בדרך.</p>
            <div className="hero-actions"><a className="button button-primary" href="#work">לעבודות שלי <span aria-hidden="true">↙</span></a><button className="button button-secondary" onClick={() => setShowContact(true)}>ניצור משהו יחד</button></div>
            <div className="hero-note"><span className="note-line" /><span>פיתוח. סקרנות. תשומת לב לפרטים.</span></div>
          </div>
          <div className="hero-visual"><div className="photo-frame"><img src={PHOTO_URL} alt="בנימין יונה" /><span className="photo-caption">קצת קוד, הרבה יצירתיות.</span></div><span className="visual-label">THE PERSON BEHIND THE PIXELS</span><div className="photo-stamp" aria-hidden="true">רעיון.<br />קוד.<br /><span>מציאות.</span></div></div>
        </section>
        <section id="work" className="projects-section"><div className="section-heading"><div><p className="eyebrow">מחשבה, בנייה ותוצאה</p><h2>העבודות שלי<span>.</span></h2></div><p>מוצרים עצמאיים ופרויקטים מהלימודים.<br />כל אחד מהם הוא עוד צעד בדרך.</p></div>
          <div className="project-toolbar"><div className="project-filters" role="group" aria-label="סינון פרויקטים">{[["all", "כל הפרויקטים"], ["general", "פרויקטים עצמאיים"], ["college", "מהלימודים"]].map(([value, label]) => <button key={value} aria-pressed={filter === value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div><span className="project-count" aria-live="polite">{visibleProjects.length} פרויקטים</span></div>
          <div className="projects-grid">{visibleProjects.map(project => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />)}</div>
        </section>
        <section className="contact-section"><p className="eyebrow">הפרויקט הבא מתחיל בשיחה</p><h2>יש לכם רעיון?<br /><span>בואו נבנה אותו.</span></h2><button className="button button-primary" onClick={() => setShowContact(true)}>דברו איתי <span aria-hidden="true">↗</span></button></section>
      </main>
      <footer><a className="brand" href="#about"><span className="brand-mark">by.</span><span>בנימין יונה</span></a><span>נבנה עם סקרנות ותשומת לב לפרטים.</span><a href="#about">בחזרה למעלה ↑</a></footer>
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </>
  );
}
