const fs = require('fs');

const code = `"use client";

import Image from "next/image";
import {
  AirplaneTilt,
  Bed,
  Bell,
  BookmarkSimple,
  CalendarBlank,
  CalendarCheck,
  CaretLeft,
  CaretRight,
  CheckCircle,
  DotsThree,
  EnvelopeOpen,
  Funnel,
  Heart,
  House,
  MapPin,
  MapTrifold,
  NotePencil,
  Phone,
  Taxi,
  Users,
  Car,
  SpeakerHigh,
  SpeakerSlash,
  Pause,
  Play
} from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";

const eventsData = [
  {
    dateStr: "20 NOV",
    dayStr: "THU",
    events: [
      {
        id: "e1",
        title: "WELCOME HIGH TEA",
        time: "5:00 PM – 7:00 PM",
        venue: "Suryagarh Courtyard",
        image: "/images/jaisalmer-ceremony.png"
      }
    ]
  },
  {
    dateStr: "21 NOV",
    dayStr: "FRI",
    events: [
      {
        id: "e2",
        title: "MEHENDI",
        time: "11:00 AM – 2:00 PM",
        venue: "The Dunes Garden",
        image: "/images/couple-portrait.png"
      },
      {
        id: "e3",
        title: "SANGEET",
        time: "7:00 PM – 11:00 PM",
        venue: "Desert Courtyard",
        image: "/images/jaisalmer-ceremony.png"
      }
    ]
  },
  {
    dateStr: "22 NOV",
    dayStr: "SAT",
    events: [
      {
        id: "e4",
        title: "WEDDING",
        time: "9:30 PM – 12:30 AM",
        venue: "Fort View Terrace",
        image: "/images/couple-portrait.png"
      },
      {
        id: "e5",
        title: "RECEPTION",
        time: "8:00 PM – 11:30 PM",
        venue: "The Golden Pavilion",
        image: "/images/jaisalmer-ceremony.png"
      }
    ]
  },
  {
    dateStr: "23 NOV",
    dayStr: "SUN",
    events: [
      {
        id: "e6",
        title: "FAREWELL BRUNCH",
        time: "11:00 AM – 2:00 PM",
        venue: "Bawdi Pool",
        image: "/images/couple-portrait.png"
      }
    ]
  }
];

const appTabs = [
  { id: "home", label: "Home", icon: House },
  { id: "events", label: "Events", icon: CalendarBlank },
  { id: "stay", label: "Stay", icon: Bed },
  { id: "travel", label: "Travel", icon: AirplaneTilt },
  { id: "contact", label: "Contact", icon: Phone },
];

export function WeddingApp() {
  const [activeTab, setActiveTab] = useState<"home" | "events" | "stay" | "travel" | "contact">("home");
  const [selectedDateIndex, setSelectedDateIndex] = useState(1);

  // Intro & Audio State
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [introMuted, setIntroMuted] = useState(true);
  const [introReady, setIntroReady] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  function startMusic() {
    const music = musicRef.current;
    if (!music) return;
    music.volume = 0.45;
    void music.play().catch(() => setMusicPlaying(false));
  }

  function closeIntro() {
    if (introLeaving) return;
    startMusic();
    setIntroLeaving(true);
    window.setTimeout(() => setShowIntro(false), 700);
  }

  function toggleIntroSound() {
    const video = introVideoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIntroMuted(video.muted);
    void video.play().catch(() => {});
  }

  function toggleMusic() {
    const music = musicRef.current;
    if (!music) return;
    if (music.paused) {
      startMusic();
    } else {
      music.pause();
    }
  }

  function switchTab(tabId: typeof activeTab) {
    setActiveTab(tabId);
    window.scrollTo(0, 0);
  }

  return (
    <main className="site-shell" style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", background: "var(--ink)", position: "relative" }}>
      
      <audio
        ref={musicRef}
        src="/rajasthani-background-music.mp3"
        preload="metadata"
        loop
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      />

      {showIntro && (
        <section
          className={\`intro-film \${introLeaving ? "is-leaving" : ""}\`}
          aria-label="Wedding introduction film"
          style={{ zIndex: 9999 }}
        >
          <video
            ref={introVideoRef}
            className={\`intro-video \${introReady ? "is-ready" : ""}\`}
            src="/Intro%20Video.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onCanPlay={() => setIntroReady(true)}
            onLoadedData={() => setIntroReady(true)}
            onPlaying={() => setIntroReady(true)}
            onEnded={closeIntro}
          />
          <div className="intro-vignette" />
          <div className="intro-film-controls" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 5vw', position: 'absolute', bottom: '40px' }}>
            <button type="button" onClick={toggleIntroSound} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-bright)', background: 'transparent', border: 'none', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '10px', fontWeight: 600 }}>
              {introMuted ? <SpeakerSlash size={18} /> : <SpeakerHigh size={18} />}
              {introMuted ? "SOUND ON" : "MUTE"}
            </button>
            <button type="button" onClick={closeIntro} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-bright)', background: 'transparent', border: 'none', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '10px', fontWeight: 600 }}>
              SKIP FILM
              <CaretRight size={16} />
            </button>
          </div>
        </section>
      )}

      <div className="tab-content app-screen" style={{ flex: 1, overflowY: "auto" }}>
        
        {activeTab === "home" && (
          <div className="fade-in">
            <header className="app-header-nav">
              <button
                onClick={toggleMusic}
                aria-label={musicPlaying ? "Pause music" : "Play music"}
                style={{ background: 'transparent', border: 'none', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                {musicPlaying ? <Pause weight="fill" size={24} /> : <SpeakerHigh weight="fill" size={24} />}
              </button>
              
              <button className="brand-mark" onClick={() => switchTab("home")} aria-label="Home" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <Image src="/images/aa-monogram-alpha.png" alt="AA" width={40} height={40} priority />
              </button>
            </header>

            <section className="home-hero">
              <div style={{ position: 'absolute', top: '-100px', left: '-20vw', right: '-20vw', height: '500px', zIndex: -1, opacity: 0.6 }}>
                 <Image src="/images/jaisalmer-ceremony.png" alt="" fill style={{ objectFit: 'cover', maskImage: 'linear-gradient(to bottom, black 40%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent)' }} />
              </div>
              <h1 style={{ marginTop: '150px' }}>Aanya<br/><span style={{fontSize: '32px'}}>&</span> Arjun</h1>
              <span className="location">Jaisalmer, Rajasthan</span>
              <span className="dates">20 — 23 November 2026</span>
            </section>

            <section className="countdown-box">
              <p>The celebration begins in</p>
              <div className="countdown-grid">
                <div><strong>154</strong><span>Days</span></div>
                <div><strong>06</strong><span>Hrs</span></div>
                <div><strong>45</strong><span>Mins</span></div>
                <div style={{border: 'none'}}><strong>08</strong><span>Secs</span></div>
              </div>
            </section>

            <section className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="quick-actions-grid">
                <div className="qa-btn active" onClick={() => switchTab("contact")}>
                  <CalendarCheck weight="fill" />
                  <span>RSVP</span>
                </div>
                <div className="qa-btn" onClick={() => switchTab("events")}>
                  <CalendarBlank />
                  <span>Events</span>
                </div>
                <div className="qa-btn" onClick={() => switchTab("stay")}>
                  <Bed />
                  <span>Stay</span>
                </div>
                <div className="qa-btn" onClick={() => switchTab("travel")}>
                  <AirplaneTilt />
                  <span>Travel</span>
                </div>
              </div>
            </section>

            <section className="welcome-banner">
              <Image src="/images/couple-portrait.png" alt="Couple" width={48} height={48} />
              <div>
                <h4>Welcome to our celebration!</h4>
                <p>We can&apos;t wait to celebrate with you in Jaisalmer.</p>
              </div>
              <CaretRight />
            </section>
          </div>
        )}

        {activeTab === "events" && (
          <div className="fade-in">
            <header className="app-header-nav">
              <CaretLeft onClick={() => switchTab("home")} />
              <h2>Events</h2>
              <Funnel />
            </header>

            <div className="date-scroller">
              {eventsData.map((d, i) => (
                <div key={d.dateStr} className={\`date-item \${i === selectedDateIndex ? "active" : ""}\`} onClick={() => setSelectedDateIndex(i)}>
                  <strong>{d.dateStr}</strong>
                  <span>{d.dayStr}</span>
                </div>
              ))}
            </div>

            <div className="event-list-container">
              {eventsData[selectedDateIndex].events.map((ev) => (
                <div key={ev.id} className="event-card">
                  <div className="event-card-img">
                    <Image src={ev.image} alt={ev.title} fill />
                  </div>
                  <div className="event-card-body">
                    <BookmarkSimple className="bookmark" />
                    <h3>{ev.title}</h3>
                    <p className="time">{ev.time}</p>
                    <p className="venue"><MapPin /> {ev.venue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "stay" && (
          <div className="fade-in">
            <header className="app-header-nav">
              <CaretLeft onClick={() => switchTab("home")} />
              <h2>Stay</h2>
              <Phone />
            </header>

            <div className="hero-header-img">
              <Image src="/images/couple-portrait.png" alt="Hotel" fill />
            </div>

            <div className="card-dark stay-hero">
              <p style={{fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px'}}>Your Stay</p>
              <h3 style={{fontSize: '20px', marginBottom: '10px'}}>The Serai Jaisalmer</h3>
              <p style={{marginBottom: '15px'}}>Jaisalmer - Sam - Dhanana Rd,<br/>Jaisalmer, Rajasthan 345001</p>
              <button className="btn-outline"><MapPin /> View Location</button>
            </div>

            <div className="card-dark check-card">
              <div className="check-item" style={{borderRight: '1px solid rgba(205,168,90,0.2)'}}>
                <h4>Check-In</h4>
                <p>20 Nov 2026 | 2:00 PM</p>
              </div>
              <div className="check-item">
                <h4>Check-Out</h4>
                <p>23 Nov 2026 | 11:00 AM</p>
              </div>
            </div>

            <div className="assist-card" style={{marginTop: '20px'}}>
              <div>
                <h4>Need Help?</h4>
                <p>Contact our hospitality team</p>
              </div>
              <CaretRight style={{color: 'var(--gold-dim)'}} />
            </div>
          </div>
        )}

        {activeTab === "travel" && (
          <div className="fade-in">
            <header className="app-header-nav">
              <CaretLeft onClick={() => switchTab("home")} />
              <h2>Travel</h2>
              <MapTrifold />
            </header>

            <div className="hero-header-img">
              <Image src="/images/jaisalmer-ceremony.png" alt="Travel" fill />
            </div>

            <div className="grid-2x2">
              <div className="grid-item">
                <AirplaneTilt />
                <h4>Getting There</h4>
                <p>Flight & Route</p>
              </div>
              <div className="grid-item">
                <Car />
                <h4>Airport Pickup</h4>
                <p>Schedule & Info</p>
              </div>
              <div className="grid-item">
                <Taxi />
                <h4>Local Transport</h4>
                <p>Rides & Shuttles</p>
              </div>
              <div className="grid-item">
                <MapTrifold />
                <h4>City Guide</h4>
                <p>Explore Jaisalmer</p>
              </div>
            </div>

            <div className="assist-card">
              <div>
                <h4>Need Assistance?</h4>
                <p>Our team is here to help you<br/>with your travel.</p>
              </div>
              <div className="assist-icon">
                <Phone />
              </div>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="fade-in">
            <header className="app-header-nav">
              <CaretLeft onClick={() => switchTab("home")} />
              <h2>Contact Us</h2>
              <EnvelopeOpen />
            </header>

            <div className="card-dark" style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <Phone size={32} color="var(--gold-bright)" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '14px' }}>Guest Concierge</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)' }}>+91 98100 00000</p>
                </div>
              </div>
              <button className="btn-outline" onClick={() => window.open('tel:+919810000000')}>Call Now</button>
            </div>

            <div className="card-dark">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <Car size={32} color="var(--gold-bright)" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '14px' }}>Transfers Desk</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)' }}>+91 98200 00000</p>
                </div>
              </div>
              <button className="btn-outline" onClick={() => window.open('tel:+919820000000')}>Call Transport</button>
            </div>

            <div className="card-dark">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <EnvelopeOpen size={32} color="var(--gold-bright)" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '14px' }}>Email Support</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)' }}>celebrate@example.com</p>
                </div>
              </div>
              <button className="btn-outline" onClick={() => window.open('mailto:celebrate@example.com')}>Send Email</button>
            </div>
          </div>
        )}

      </div>

      <nav className="utility-dock app-tab-bar" aria-label="App Navigation">
        {appTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button key={tab.id} className={isActive ? "active" : ""} onClick={() => switchTab(tab.id as any)}>
              <Icon weight={isActive ? "fill" : "regular"} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </main>
  );
}
`;

fs.writeFileSync('d:/shivam/weddingwebsite/components/wedding-app.tsx', code);
console.log('Successfully rewrote wedding-app.tsx with intro film, contact tab, and top-left mute icon.');
