import { useState, useEffect } from "react";

const PHOTO_URL = "/mnt/user-data/uploads/WhatsApp_Image_2026-03-06_at_18_37_19.jpeg";

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

function NavBar() {
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
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 600, letterSpacing: "0.06em", color: "#1a1612" }}>
        B. Yona
      </span>
      <div className="nav-links" style={{ display: "flex", gap: "2.4rem", alignItems: "center" }}>
        {["About", "Work", "Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily: "'Jost', sans-serif", fontSize: "0.82rem", letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#4a4036", textDecoration: "none",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = "#1a1612"}
            onMouseLeave={e => e.target.style.color = "#4a4036"}
          >{l}</a>
        ))}
        <a href="#contact" style={{
          fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", letterSpacing: "0.12em",
          textTransform: "uppercase", color: "#fff", background: "#1a1612",
          padding: "0.55rem 1.4rem", borderRadius: "3px", textDecoration: "none",
          transition: "opacity 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >Hire Me</a>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="about" className="hero-section" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "100px 5vw 0",
      maxWidth: 1280, margin: "0 auto",
      gap: "6vw", flexWrap: "wrap",
    }}>
      <div style={{ flex: "1 1 340px", zIndex: 1 }}>
        <p style={{
          fontFamily: "'Jost', sans-serif", fontSize: "0.78rem",
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "#9c8265", marginBottom: "1.4rem",
          opacity: 0, animation: "fadeUp 0.8s 0.1s forwards",
        }}>
          Backend Developer · Mobile Apps · Israel
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: "clamp(3.2rem, 6.5vw, 6rem)",
          lineHeight: 1.0,
          color: "#1a1612",
          letterSpacing: "-0.01em",
          marginBottom: "2rem",
          opacity: 0, animation: "fadeUp 0.8s 0.25s forwards",
        }}>
          Binyamin<br />
          <em style={{ fontStyle: "italic", color: "#9c8265" }}>Yona</em>
        </h1>
        <div style={{
          width: 48, height: 1, background: "#1a1612", marginBottom: "2rem",
          opacity: 0, animation: "fadeUp 0.8s 0.4s forwards",
        }} />
        <p style={{
          fontFamily: "'Jost', sans-serif", fontWeight: 300,
          fontSize: "1.1rem", lineHeight: 1.85,
          color: "#5a5048", maxWidth: 460,
          marginBottom: "2.8rem",
          opacity: 0, animation: "fadeUp 0.8s 0.55s forwards",
        }}>
          I design and build robust backend systems and polished mobile applications —
          turning complex engineering challenges into elegant, reliable products.
        </p>
        <div style={{
          display: "flex", gap: "1rem", flexWrap: "wrap",
          opacity: 0, animation: "fadeUp 0.8s 0.7s forwards",
        }}>
          <a href="#work" style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 500,
            fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#fff", background: "#1a1612",
            padding: "0.85rem 2.2rem", borderRadius: "3px",
            textDecoration: "none", transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >View Work</a>
          <a href="#contact" style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 400,
            fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#1a1612",
            padding: "0.85rem 2.2rem", borderRadius: "3px",
            textDecoration: "none", border: "1px solid #c8b99a",
            transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#1a1612"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#c8b99a"}
          >Get in Touch</a>
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
          <div style={{
            position: "absolute", bottom: -16, right: -20, zIndex: 10,
            background: "#fff", borderRadius: "4px",
            padding: "0.6rem 1.1rem",
            boxShadow: "0 8px 28px rgba(26,22,18,0.12)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", color: "#9c8265", textTransform: "uppercase" }}>
              Available · 2026
            </span>
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
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.3rem", color: "#1a1612" }}>
          {project.title}
        </h3>
      </div>
    </a>
  );
}

function ProjectsSection() {
  return (
    <section id="work" className="projects-section" style={{ maxWidth: 1280, margin: "0 auto", padding: "6rem 5vw 8rem" }}>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9c8265", marginBottom: "0.8rem" }}>
        Selected Work
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1a1612", marginBottom: "3rem" }}>
        Projects
      </h2>
      <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem" }}>
        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Jost:wght@300;400;500&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #faf8f4; color: #1a1612; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
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
        <NavBar />
        <HeroSection />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 5vw" }}>
          <div style={{ height: 1, background: "#e8e0d4" }} />
        </div>
        <ProjectsSection />
      </div>
    </>
  );
}
