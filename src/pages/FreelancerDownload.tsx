import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/freelancer-download.css";

export default function FreelancerDownload() {
  const navigate = useNavigate();
  const navbarRef = useRef<HTMLElement>(null);
  const fabBubbleRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const hasTypedRef = useRef(false);
  const typeIndexRef = useRef(0);
  const msg = "Welcome to XITO EVENTS! Access your dashboard, schedules, and invoices. ☕";

  useEffect(() => {
    const navbar = navbarRef.current;
    const fabBubble = fabBubbleRef.current;

    function typeWriter() {
      const el = typewriterRef.current;
      if (!el) return;
      if (typeIndexRef.current < msg.length) {
        el.innerHTML += msg.charAt(typeIndexRef.current);
        typeIndexRef.current++;
        setTimeout(typeWriter, 40);
      } else {
        setTimeout(() => {
          const cursor = document.querySelector('.support-msg-bubble .cursor') as HTMLElement | null;
          if (cursor) cursor.style.display = 'none';
        }, 2000);
      }
    }

    function startTypeWriter() {
      if (!hasTypedRef.current) {
        hasTypedRef.current = true;
        setTimeout(typeWriter, 300);
      }
    }

    function createRipple(event: MouseEvent | TouchEvent) {
      const button = event.currentTarget as HTMLElement;
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      let clientX = 0, clientY = 0;
      if (window.TouchEvent && event instanceof TouchEvent) {
        if (event.touches && event.touches.length > 0) { clientX = event.touches[0].clientX; clientY = event.touches[0].clientY; } else return;
      } else if (event instanceof MouseEvent) { clientX = event.clientX; clientY = event.clientY; }
      const rect = button.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${clientX - rect.left - radius}px`;
      circle.style.top = `${clientY - rect.top - radius}px`;
      circle.classList.add("ripple-span");
      const existing = button.querySelector('.ripple-span');
      if (existing) existing.remove();
      button.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    }

    function onScroll() {
      const y = window.scrollY;
      if (navbar) { if (y > 150) navbar.classList.add('visible'); else navbar.classList.remove('visible'); }
      if (y > 50) { fabBubble?.classList.add('show'); startTypeWriter(); } else { fabBubble?.classList.remove('show'); }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    const buttons = document.querySelectorAll('.fl-page .btn.ripple');
    buttons.forEach(btn => {
      btn.addEventListener('mousedown', createRipple as EventListener);
      btn.addEventListener('touchstart', createRipple as EventListener, { passive: true });
    });

    const faqItems = document.querySelectorAll('.fl-page .faq-item');
    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer') as HTMLElement | null;
      const icon = item.querySelector('.faq-icon');
      if (question && answer && icon) {
        question.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          faqItems.forEach(other => {
            if (other !== item) {
              other.classList.remove('open');
              const oi = other.querySelector('.faq-icon');
              const oa = other.querySelector('.faq-answer') as HTMLElement | null;
              if (oi) oi.textContent = '+';
              if (oa) oa.style.maxHeight = '0px';
            }
          });
          if (isOpen) { item.classList.remove('open'); icon.textContent = '+'; answer.style.maxHeight = '0px'; }
          else { item.classList.add('open'); icon.textContent = '−'; answer.style.maxHeight = (answer.scrollHeight + 36) + "px"; }
        });
      }
    });

    const observerOpts = { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 };
    const featureObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, observerOpts);
    document.querySelectorAll('.fl-page .feature-card').forEach((c, i) => {
      (c as HTMLElement).style.transitionDelay = `${i * 80}ms`;
      featureObs.observe(c);
    });

    const faqObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, observerOpts);
    faqItems.forEach((item, i) => {
      (item as HTMLElement).style.transitionDelay = `${i * 60}ms`;
      faqObs.observe(item);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      featureObs.disconnect();
      faqObs.disconnect();
    };
  }, []);

  const screenshots = [
    { src: "/freelancer-assets/Screenshot/HomePage.png", label: "Dashboard" },
    { src: "/freelancer-assets/Screenshot/SearchPage.png", label: "Bookings" },
    { src: "/freelancer-assets/Screenshot/MusicPage.png", label: "Discover" },
    { src: "/freelancer-assets/Screenshot/Lyrics.png", label: "Market" },
    { src: "/freelancer-assets/Screenshot/MusicRecognition.png", label: "Profile" },
  ];

  const features = [
    { cls: "feature-card-1 col-span-2 flex-row", icon: <svg className="feature-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>, title: "Event Bookings & Schedule", desc: "Keep track of all your event bookings, assignments, calendar dates, and schedules in one unified dashboard." },
    { cls: "feature-card-2", icon: <svg className="feature-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>, title: "Xito Drive & Photo Sharing", desc: "Upload, organize, and share high-resolution event media, client folders, and photography selections with Xito Drive." },
    { cls: "feature-card-3", icon: <svg className="feature-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>, title: "Finance & Payments", desc: "Track client advances, invoices, freelancer payouts, expenses, and pending balances in the integrated Finance Hub." },
    { cls: "feature-card-4", icon: <svg className="feature-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, title: "Realtime Chat & Collab", desc: "Coordinate with clients, staff, and other freelancers instantly via built-in direct messages and wedding event chat rooms." },
    { cls: "feature-card-5", icon: <svg className="feature-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>, title: "Nepali Lagan Calendar", desc: "Easily check auspicious wedding and event dates using the built-in Nepali Lagan calendar and date converter." },
    { cls: "feature-card-6 col-span-3 flex-row", icon: <svg className="feature-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.836-.437-1.124-.298-.336-.498-.78-.498-1.272 0-.986.79-1.786 1.768-1.786H17c3.31 0 6-2.69 6-6 0-4.97-5.37-9-12-9Z"/></svg>, title: "Marketplace & Portfolio", desc: "Showcase your portfolio, discover new event opportunities, and connect with clients looking for professional event services." },
  ];

  const faqs = [
    { q: "Is Freelancer Xito Events free?", a: "Yes, completely. The app is free to download for freelancers and event production staff." },
    { q: "How do I download the app?", a: 'You can download the APK package directly using the "Download APK" button above.' },
    { q: "Do I need an account to use the app?", a: "Yes, an authorized account is required to log in and access event assignments, invoices, and folders. You can sign up in the app or get invited by an agency." },
    { q: "Does it support Nepali event dates?", a: "Yes! The app features a native Nepali calendar (Lagan) with an integrated date converter to help you manage wedding seasons." },
    { q: "Can I manage event files and albums?", a: "Yes. The built-in Xito Drive and Xito Album modules let you upload event photos, select favorites, and track video/photo editing progress in realtime." },
    { q: "How do I track event finances?", a: "The app features a Finance module where you can record client advances, partial payments, payouts, and track balances on every contract." },
  ];

  return (
    <div className="fl-page">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "fixed", top: 20, left: 20, zIndex: 200,
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,250,240,0.85)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(10,10,10,0.12)", borderRadius: 999,
          padding: "10px 18px", cursor: "pointer",
          fontSize: 13, fontWeight: 600, color: "#0a0a0a",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back
      </button>

      <nav id="navbar" ref={navbarRef}>
        <div className="container nav-inner">
          <a href="#" className="nav-logo display-font">
            <img src="/freelancer-assets/Echo.png" alt="" className="nav-logo-img" />
            XITO EVENTS
          </a>
          <div className="nav-links">
            <a href="#" className="btn btn-primary ripple btn-download" style={{ height: 40, padding: "0 20px", maxWidth: "max-content" }}>Download</a>
          </div>
        </div>
      </nav>

      <header className="hero container">
        <img src="/freelancer-assets/Echo.png" alt="Freelancer Xito Events Logo" className="hero-logo" />
        <h1 className="display-xl">The ultimate platform<br /><span className="display-lg">for event professionals.</span></h1>
        <p className="hero-sub body-md">Manage event bookings, track advances and invoices, share high-res photos, and coordinate with your team - all in one powerful mobile application.</p>
        <div className="hero-ctas">
          <a href="/downloads/xito-events.apk" download="XitoEvents.apk" className="btn btn-primary ripple btn-download">Download APK</a>
          <a href="https://freelancer.xitoevents.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary ripple">Visit Web App</a>
        </div>
      </header>


      <section className="screenshots">
        <div className="container screenshots-header">
          <p className="screenshots-label caption-uppercase">SEE IT IN ACTION</p>
          <h2 className="screenshots-title display-md">Built for the way you work</h2>
        </div>
        <div className="scroll-strip-wrapper">
          {[0, 1].map(group => (
            <div className="marquee-group" key={group}>
              {screenshots.map(s => (
                <div className="phone-mockup-wrapper" key={s.label + group}>
                  <img src={s.src} alt={s.label} className="phone-mockup" />
                  <p className="caption" style={{ color: "var(--muted)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES BENTO REDESIGN */}
      <section style={{ background: "#f5f0e0", padding: "96px 0", overflowX: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{
              display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#6a6a6a", background: "rgba(10,10,10,0.06)",
              padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(10,10,10,0.1)", marginBottom: 20
            }}>Features</span>
            <h2 style={{
              fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 500, color: "#0a0a0a", lineHeight: 1.15, letterSpacing: "-1px", marginBottom: 16
            }}>Everything you need,<br />nothing you don't</h2>
            <p style={{ color: "#6a6a6a", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
              Six reasons event agencies, freelancers, and clients choose Xito Events.
            </p>
          </div>

          {/* Bento Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="fl-bento-grid">

            {/* Card 1 — Event Bookings (wide hero) */}
            <div className="fl-bento-card" style={{
              gridColumn: "span 2", background: "#b8a4ed",
              borderRadius: 24, padding: "40px 44px", display: "flex", gap: 32, alignItems: "center",
              minHeight: 200, position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.12)", pointerEvents: "none" }} />
              <div style={{
                width: 72, height: 72, borderRadius: 20, background: "rgba(255,255,255,0.25)", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(10,10,10,0.5)", textTransform: "uppercase", marginBottom: 10 }}>01</p>
                <h3 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 22, fontWeight: 500, color: "#0a0a0a", marginBottom: 10, lineHeight: 1.2 }}>Event Bookings<br />&amp; Schedule</h3>
                <p style={{ color: "rgba(10,10,10,0.65)", fontSize: 14, lineHeight: 1.6, maxWidth: 380 }}>Keep track of all your event bookings, assignments, calendar dates, and schedules in one unified dashboard.</p>
              </div>
            </div>

            {/* Card 2 — Xito Drive */}
            <div className="fl-bento-card" style={{
              background: "#ff4d8b",
              borderRadius: 24, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 16,
              position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", bottom: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.1)", pointerEvents: "none" }} />
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,0.25)", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: 8 }}>02</p>
                <h3 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 18, fontWeight: 500, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>Xito Drive &amp;<br />Photo Sharing</h3>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.6 }}>Upload, organize, and share high-res event media with Xito Drive.</p>
              </div>
            </div>

            {/* Card 3 — Finance */}
            <div className="fl-bento-card" style={{
              background: "#a7c7e7",
              borderRadius: 24, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 16,
              position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.15)", pointerEvents: "none" }} />
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,0.3)", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(10,10,10,0.45)", textTransform: "uppercase", marginBottom: 8 }}>03</p>
                <h3 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 18, fontWeight: 500, color: "#0a0a0a", marginBottom: 10, lineHeight: 1.2 }}>Finance &amp;<br />Payments</h3>
                <p style={{ color: "rgba(10,10,10,0.6)", fontSize: 13, lineHeight: 1.6 }}>Track advances, invoices, payouts, and pending balances in the Finance Hub.</p>
              </div>
            </div>

            {/* Card 4 — Chat */}
            <div className="fl-bento-card" style={{
              background: "#ffb084",
              borderRadius: 24, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 16,
              position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", bottom: -30, left: -30, width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,0.12)", pointerEvents: "none" }} />
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,0.3)", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(10,10,10,0.45)", textTransform: "uppercase", marginBottom: 8 }}>04</p>
                <h3 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 18, fontWeight: 500, color: "#0a0a0a", marginBottom: 10, lineHeight: 1.2 }}>Realtime Chat<br />&amp; Collab</h3>
                <p style={{ color: "rgba(10,10,10,0.6)", fontSize: 13, lineHeight: 1.6 }}>Coordinate with clients and staff via built-in messages and event chat rooms.</p>
              </div>
            </div>

            {/* Card 5 — Lagan Calendar */}
            <div className="fl-bento-card" style={{
              background: "#e8b94a",
              borderRadius: 24, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 16,
              position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.12)", pointerEvents: "none" }} />
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,0.3)", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(10,10,10,0.45)", textTransform: "uppercase", marginBottom: 8 }}>05</p>
                <h3 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 18, fontWeight: 500, color: "#0a0a0a", marginBottom: 10, lineHeight: 1.2 }}>Nepali Lagan<br />Calendar</h3>
                <p style={{ color: "rgba(10,10,10,0.6)", fontSize: 13, lineHeight: 1.6 }}>Check auspicious wedding dates with the built-in Nepali Lagan calendar.</p>
              </div>
            </div>

            {/* Card 6 — Marketplace (full width) */}
            <div className="fl-bento-card" style={{
              gridColumn: "span 3", background: "#a4d4c5",
              borderRadius: 24, padding: "40px 44px", display: "flex", gap: 32, alignItems: "center",
              position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.1)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -60, left: "30%", width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
              <div style={{
                width: 72, height: 72, borderRadius: 20, background: "rgba(255,255,255,0.3)", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="#0a0a0a"/><circle cx="17.5" cy="10.5" r=".5" fill="#0a0a0a"/><circle cx="8.5" cy="7.5" r=".5" fill="#0a0a0a"/><circle cx="6.5" cy="12.5" r=".5" fill="#0a0a0a"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.836-.437-1.124-.298-.336-.498-.78-.498-1.272 0-.986.79-1.786 1.768-1.786H17c3.31 0 6-2.69 6-6 0-4.97-5.37-9-12-9Z"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(10,10,10,0.45)", textTransform: "uppercase", marginBottom: 10 }}>06</p>
                <h3 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 22, fontWeight: 500, color: "#0a0a0a", marginBottom: 10, lineHeight: 1.2 }}>Marketplace &amp; Portfolio</h3>
                <p style={{ color: "rgba(10,10,10,0.6)", fontSize: 14, lineHeight: 1.6, maxWidth: 600 }}>Showcase your portfolio, discover new event opportunities, and connect with clients looking for professional event services across Nepal.</p>
              </div>
              <div style={{
                flexShrink: 0, background: "#0a0a0a", color: "#a4d4c5", fontFamily: "'Unbounded', sans-serif",
                fontSize: 13, fontWeight: 600, padding: "14px 28px", borderRadius: 999, whiteSpace: "nowrap", cursor: "pointer"
              }}>
                Explore →
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="faq">
        <div className="faq-header">
          <p className="caption-uppercase" style={{ color: "var(--muted)", marginBottom: "var(--space-sm)" }}>QUESTIONS</p>
          <h2 className="display-md" style={{ color: "var(--ink)" }}>Straight answers</h2>
        </div>
        <div className="faq-list">
          {faqs.map(f => (
            <div className="faq-item" key={f.q}>
              <div className="faq-question">
                <h3 className="title-sm">{f.q}</h3>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                <p className="body-md">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col-left">
              <div className="footer-logo display-font">
                <img src="/freelancer-assets/Echo.png" alt="" />
                XITO EVENTS
              </div>
              <div className="footer-tagline body-sm">Streamlining event production for everyone.</div>
              <div className="caption" style={{ marginTop: 16, color: "var(--muted)", maxWidth: 280, lineHeight: 1.4 }}>
                XITO EVENTS is a comprehensive event and production management suite. All rights reserved.
              </div>
            </div>
            <div className="footer-col-right">
              <div className="footer-nav nav-link" style={{ marginTop: 0 }}>
                <a href="https://photography.xitoevents.com/" className="footer-link" target="_blank" rel="noopener noreferrer">Xito Events Web App</a>
                <a href="https://sites.google.com/view/xitoevents/privacy-policy" className="footer-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                <a href="https://sites.google.com/view/xitoevents/terms" className="footer-link" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a href="https://freelancer.xitoevents.com" target="_blank" rel="noopener noreferrer" className="support-fab" id="support-fab">
        <div className="support-msg-bubble" ref={fabBubbleRef}>
          <span ref={typewriterRef}></span><span className="cursor">|</span>
        </div>
        <div className="support-btn">
          <img src="/freelancer-assets/Echo.png" alt="Xito" className="support-avatar" />
        </div>
      </a>
    </div>
  );
}
