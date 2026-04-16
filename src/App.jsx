import { useState, useEffect } from "react";

const PHOTO_URL = "/profile.jpeg";
const FORMSPREE_URL = "https://formspree.io/f/xqeggroe";
// Note: make sure benyona12@gmail.com is set as the recipient in Formspree dashboard

const screenshot = (url) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

const projects = [
  {
    id: 1,
    title: "History",
    link: "https://history-rosy-eight.vercel.app",
    image: screenshot("https://history-rosy-eight.vercel.app"),
  },
  {
    id: 2,
    title: "Afula App",
    link: "https://afula-app.vercel.app",
    image: screenshot("https://afula-app.vercel.app"),
  },
];

function ContactModal({ onClose }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
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
            {[["name", "שם"], ["email", "מייל"]].map(([name, label]) => (
              <div key={name}>
                <label style={{ fontFamily: "'Rubik', sans-serif", fontSize: "0.78rem", color: "#9c8265", display: "block", marginBottom: "0.4rem" }}>
                  {label}
                </label>
                <input
                  name={name}
                  required
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

function NavBar({ onContact }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: 68,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 5vw",
      background: scrolled ? "rgba(250,248,244,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      transition: "all 0.45s cubic-bezier(0.4,0,0.2,1)",
    }}>
      <span style={{ fontFamily: "'Rubik', sans-serif", fontSize: "1.35rem", fontWeight: 600, letterSpacing: "0.02em", color: "#1a1612" }}>
        בנימין יונה
      </span>
      <div className="nav-links" style={{ display: "flex", gap: "2.4rem", alignItems: "center" }}>
        {[["אודות", "#about"], ["תוצרים", "#work"]].map(([label, href]) => (
          <a key={label} href={href} style={{
            fontFamily: "'Rubik', sans-serif", fontSize: "0.88rem", letterSpacing: "0.04em",
            color: "#4a4036", textDecoration: "none",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = "#1a1612"}
            onMouseLeave={e => e.target.style.color = "#4a4036"}
          >{label}</a>
        ))}
        <button onClick={onContact} style={{
          fontFamily: "'Rubik', sans-serif", fontSize: "0.88rem", letterSpacing: "0.04em",
          color: "#4a4036", background: "none", border: "none", cursor: "pointer",
          padding: 0, transition: "color 0.2s",
        }}
          onMouseEnter={e => e.target.style.color = "#1a1612"}
          onMouseLeave={e => e.target.style.color = "#4a4036"}
        >צור קשר</button>
      </div>
    </nav>
  );
}

function HeroSection({ onContact }) {
  return (
    <section id="about" className="hero-section" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "100px 5vw 0",
      maxWidth: 1280, margin: "0 auto",
      gap: "6vw", flexWrap: "wrap",
    }}>
      <div style={{ flex: "1 1 340px", zIndex: 1 }}>
        <h1 style={{
          fontFamily: "'Rubik', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(3.2rem, 6.5vw, 6rem)",
          lineHeight: 1.1,
          color: "#1a1612",
          letterSpacing: "-0.01em",
          marginBottom: "2rem",
          opacity: 0, animation: "fadeUp 0.8s 0.25s forwards",
        }}>
          שלום, שמי<br />
          <em style={{ fontStyle: "italic", color: "#9c8265" }}>בנימין יונה</em>
        </h1>
        <p style={{
          fontFamily: "'Rubik', sans-serif", fontWeight: 300,
          fontSize: "1.1rem", lineHeight: 1.85,
          color: "#5a5048", maxWidth: 460,
          marginBottom: "2.8rem",
          opacity: 0, animation: "fadeUp 0.8s 0.55s forwards",
        }}>
          אני בונה אפליקציות ומוצרים דיגיטליים — ואלו התוצרים שלי.
        </p>
        <div style={{
          display: "flex", gap: "1rem", flexWrap: "wrap",
          opacity: 0, animation: "fadeUp 0.8s 0.7s forwards",
        }}>
          <a href="#work" style={{
            fontFamily: "'Rubik', sans-serif", fontWeight: 500,
            fontSize: "0.88rem", letterSpacing: "0.04em",
            color: "#fff", background: "#1a1612",
            padding: "0.85rem 2.2rem", borderRadius: "3px",
            textDecoration: "none", transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >לתוצרים שלי</a>
          <button onClick={onContact} style={{
            fontFamily: "'Rubik', sans-serif", fontWeight: 400,
            fontSize: "0.88rem", letterSpacing: "0.04em",
            color: "#1a1612", background: "none",
            padding: "0.85rem 2.2rem", borderRadius: "3px",
            border: "1px solid #c8b99a", cursor: "pointer",
            transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#1a1612"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#c8b99a"}
          >צור קשר</button>
        </div>
      </div>

      <div className="hero-photo" style={{
        flex: "0 0 auto",
        opacity: 0, animation: "fadeUp 0.9s 0.45s forwards",
      }}>
        <div style={{ position: "relative", width: "min(320px, 38vw)", aspectRatio: "3/4" }}>
          <div style={{
            position: "absolute", top: 18, left: 18,
            width: "100%", height: "100%",
            border: "1px solid #c8b99a",
            borderRadius: "2px", zIndex: 0,
          }} />
          <div style={{
            position: "relative", zIndex: 1,
            width: "100%", height: "100%",
            borderRadius: "2px", overflow: "hidden",
            boxShadow: "0 24px 60px rgba(26,22,18,0.12)",
          }}>
            <img src={PHOTO_URL} alt="Binyamin Yona"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                filter: "sepia(8%) saturate(0.92) contrast(1.04)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none",
        display: "block",
        borderRadius: "6px",
        overflow: "hidden",
        boxShadow: hovered ? "0 20px 50px rgba(26,22,18,0.18)" : "0 8px 24px rgba(26,22,18,0.08)",
        transition: "box-shadow 0.3s, transform 0.3s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        background: "#fff",
      }}
    >
      <img
        src={project.image}
        alt={project.title}
        style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }}
      />
      <div style={{ padding: "1.2rem 1.4rem" }}>
        <h3 style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 600, fontSize: "1.3rem", color: "#1a1612" }}>
          {project.title}
        </h3>
      </div>
    </a>
  );
}

function ProjectsSection() {
  return (
    <section id="work" className="projects-section" style={{ maxWidth: 1280, margin: "0 auto", padding: "6rem 5vw 8rem" }}>
      <p style={{ fontFamily: "'Rubik', sans-serif", fontSize: "0.75rem", letterSpacing: "0.08em", color: "#9c8265", marginBottom: "0.8rem" }}>
        התוצרים שלי
      </p>
      <h2 style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1a1612", marginBottom: "3rem" }}>
        פרויקטים
      </h2>
      <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem" }}>
        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;1,400;1,600&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #faf8f4; color: #1a1612; overflow-x: hidden; -webkit-font-smoothing: antialiased; direction: rtl; }
        ::selection { background: #1a1612; color: #f5f1eb; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #faf8f4; }
        ::-webkit-scrollbar-thumb { background: #c8b99a; border-radius: 99px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .hero-section {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 90px 6vw 3rem !important;
            min-height: unset !important;
            gap: 2.5rem !important;
          }
          .hero-photo {
            width: 100% !important;
            max-width: 280px !important;
            align-self: center !important;
          }
          .hero-photo > div:first-child {
            width: 100% !important;
          }
          .nav-links { display: none !important; }
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .projects-section {
            padding: 3rem 6vw 5rem !important;
          }
        }
      `}</style>

      <div style={{ background: "#faf8f4" }}>
        <NavBar onContact={() => setShowContact(true)} />
        <HeroSection onContact={() => setShowContact(true)} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 5vw" }}>
          <div style={{ height: 1, background: "#e8e0d4" }} />
        </div>
        <ProjectsSection />
      </div>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </>
  );
}
