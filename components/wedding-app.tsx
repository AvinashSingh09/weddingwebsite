"use client";

import Image from "next/image";
import {
  AirplaneTilt,
  Bed,
  Bell,
  BookmarkSimple,
  CalendarBlank,
  CalendarCheck,
  Camera,
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
import { motion, AnimatePresence } from "framer-motion";

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
  { id: "upload", label: "Upload", icon: Camera },
  { id: "contact", label: "Contact", icon: Phone },
];

export function WeddingApp() {
  const [activeTab, setActiveTab] = useState<"home" | "events" | "stay" | "travel" | "contact" | "upload">("home");
  const [selectedDateIndex, setSelectedDateIndex] = useState(1);
  const [showUploadOptions, setShowUploadOptions] = useState(false);

  // Countdown State
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-11-20T14:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

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
    void video.play().catch(() => { });
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
    setShowUploadOptions(false);
    window.scrollTo(0, 0);
  }

  return (
    <main className="site-shell" style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", background: "var(--ink)", position: "relative" }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes textBreathe {
          0%, 100% { opacity: 0.7; transform: scale(0.98); text-shadow: 0px 0px 5px rgba(205,168,90,0.2); }
          50% { opacity: 1; transform: scale(1.02); text-shadow: 0px 0px 35px rgba(205,168,90,0.9); }
        }
        @keyframes locationBreathe {
          0%, 100% { opacity: 0.5; text-shadow: 0px 0px 0px rgba(205,168,90,0); }
          50% { opacity: 1; text-shadow: 0px 0px 20px rgba(205,168,90,0.8); }
        }
        @keyframes goldColor {
          0%, 100% { color: #cda85a; }
          50% { color: #fdf6e3; }
        }
        .breathe-text {
          animation: textBreathe 4s ease-in-out infinite;
          display: inline-block;
        }
        .breathe-location {
          animation: locationBreathe 4s ease-in-out infinite;
        }
        .color-loop {
          animation: goldColor 4s ease-in-out infinite;
        }
      `}} />

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
          className={`intro-film ${introLeaving ? "is-leaving" : ""}`}
          aria-label="Wedding introduction film"
          style={{ zIndex: 9999 }}
        >
          <video
            ref={introVideoRef}
            className={`intro-video ${introReady ? "is-ready" : ""}`}
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
            <header className="app-header-nav" style={{ position: 'absolute', top: '20px', left: '5vw', right: '5vw', zIndex: 10 }}>
              <button className="brand-mark" onClick={() => switchTab("home")} aria-label="Home" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <Image src="/images/aa-monogram-alpha.png" alt="AA" width={50} height={50} priority />
              </button>

              <button
                onClick={toggleMusic}
                aria-label={musicPlaying ? "Pause music" : "Play music"}
                style={{ background: 'transparent', border: 'none', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                {musicPlaying ? <Pause weight="fill" size={24} /> : <SpeakerHigh weight="fill" size={24} />}
              </button>
            </header>

            <section className="home-hero" style={{ position: 'relative', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '-20px -5vw 30px', padding: '100px 5vw 40px', overflow: 'hidden' }}>
              <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Image src="/images/jaisalmer-ceremony.png" alt="Jaisalmer Fort" fill style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.6 }} priority />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(9,8,6,0.1) 0%, var(--ink) 100%)' }} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} style={{ position: 'relative', zIndex: 1, margin: '0 0 10px' }}>
                <h1 className="breathe-text" style={{ fontFamily: 'var(--display)', fontSize: '56px', lineHeight: 1.1, fontWeight: 400, textTransform: 'uppercase', color: 'var(--white)', textAlign: 'center', margin: 0 }}>
                  Aanya<br /><span className="color-loop" style={{ fontSize: '40px', display: 'inline-block' }}>&</span> Arjun
                </h1>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} style={{ position: 'relative', zIndex: 1, marginBottom: '30px' }}>
                <span className="breathe-location color-loop" style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'center', fontWeight: 600, display: 'block' }}>
                  Jaisalmer, Rajasthan
                </span>
              </motion.div>

              <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }} style={{ position: 'relative', zIndex: 1, width: '80%', maxWidth: '300px', height: '1px', background: 'var(--gold-dim)', margin: '0 auto 20px', transformOrigin: "center" }} />

              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }} style={{ position: 'relative', zIndex: 1, fontSize: '11px', letterSpacing: '0.1em', color: 'var(--white)', textAlign: 'center', marginBottom: '40px', fontWeight: 600 }}>
                20 — 23 November 2026
              </motion.span>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }} style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', width: '100%', maxWidth: '350px', margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid rgba(205,168,90,0.3)' }}>
                  <strong style={{ color: 'var(--gold-bright)', fontSize: '32px', fontWeight: 400, fontFamily: 'var(--display)' }}>{countdown.days.toString().padStart(2, '0')}</strong>
                  <span style={{ color: 'var(--muted)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>Days</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid rgba(205,168,90,0.3)' }}>
                  <strong style={{ color: 'var(--gold-bright)', fontSize: '32px', fontWeight: 400, fontFamily: 'var(--display)' }}>{countdown.hours.toString().padStart(2, '0')}</strong>
                  <span style={{ color: 'var(--muted)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>Hrs</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid rgba(205,168,90,0.3)' }}>
                  <strong style={{ color: 'var(--gold-bright)', fontSize: '32px', fontWeight: 400, fontFamily: 'var(--display)' }}>{countdown.minutes.toString().padStart(2, '0')}</strong>
                  <span style={{ color: 'var(--muted)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>Mins</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <strong style={{ color: 'var(--gold-bright)', fontSize: '32px', fontWeight: 400, fontFamily: 'var(--display)' }}>{countdown.seconds.toString().padStart(2, '0')}</strong>
                  <span style={{ color: 'var(--muted)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>Secs</span>
                </div>
              </motion.div>
            </section>

            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }} className="quick-actions" style={{ position: 'relative', zIndex: 10 }}>
              <h3>Quick Actions</h3>
              <div className="quick-actions-grid">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="qa-btn active" onClick={() => switchTab("contact")}>
                  <CalendarCheck weight="fill" />
                  <span>RSVP</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="qa-btn" onClick={() => switchTab("events")}>
                  <CalendarBlank />
                  <span>Events</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="qa-btn" onClick={() => switchTab("stay")}>
                  <Bed />
                  <span>Stay</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="qa-btn" onClick={() => switchTab("travel")}>
                  <AirplaneTilt />
                  <span>Travel</span>
                </motion.div>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }} className="welcome-banner">
              <Image src="/images/couple-portrait.png" alt="Couple" width={48} height={48} />
              <div>
                <h4>Welcome to our celebration!</h4>
                <p>We can&apos;t wait to celebrate with you in Jaisalmer.</p>
              </div>
              <CaretRight />
            </motion.section>
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
                <div key={d.dateStr} className={`date-item ${i === selectedDateIndex ? "active" : ""}`} onClick={() => setSelectedDateIndex(i)}>
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
              <Image src="/images/couple-portrait.png" alt="Couple" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
            </div>

            <div className="card-dark stay-hero">
              <p style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>Your Stay</p>
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>The Serai Jaisalmer</h3>
              <p style={{ marginBottom: '15px' }}>Jaisalmer - Sam - Dhanana Rd,<br />Jaisalmer, Rajasthan 345001</p>
              <button className="btn-outline"><MapPin /> View Location</button>
            </div>

            <div className="card-dark check-card">
              <div className="check-item" style={{ borderRight: '1px solid rgba(205,168,90,0.2)' }}>
                <h4>Check-In</h4>
                <p>20 Nov 2026 | 2:00 PM</p>
              </div>
              <div className="check-item">
                <h4>Check-Out</h4>
                <p>23 Nov 2026 | 11:00 AM</p>
              </div>
            </div>

            <div className="assist-card" style={{ marginTop: '20px' }}>
              <div>
                <h4>Need Help?</h4>
                <p>Contact our hospitality team</p>
              </div>
              <CaretRight style={{ color: 'var(--gold-dim)' }} />
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
                <p>Our team is here to help you<br />with your travel.</p>
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

        {activeTab === "upload" && (
          <div className="fade-in">
            <header className="app-header-nav">
              <CaretLeft onClick={() => switchTab("home")} />
              <h2>Upload Memories</h2>
              <Camera />
            </header>

            <div className="card-dark" style={{ marginTop: '20px', textAlign: 'center', padding: '40px 20px' }}>
              <Camera size={48} color="var(--gold-bright)" style={{ marginBottom: '15px', display: 'inline-block' }} />
              <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Share Your Photos</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '25px' }}>Help us capture every moment of our celebration.</p>
              
              {!showUploadOptions ? (
                <button className="btn-outline" style={{ width: '100%' }} onClick={() => setShowUploadOptions(true)}>Select Images</button>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', gap: '10px' }}>
                  <label className="btn-outline" style={{ flex: 1, cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
                    Gallery
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={() => { alert('Mock: Image selected from gallery. No save.'); setShowUploadOptions(false); }} />
                  </label>
                  <label className="btn-outline" style={{ flex: 1, cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
                    Camera
                    <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={() => { alert('Mock: Photo captured live. No save.'); setShowUploadOptions(false); }} />
                  </label>
                </motion.div>
              )}
            </div>
          </div>
        )}

      </div>

      <motion.nav initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }} className="utility-dock app-tab-bar" aria-label="App Navigation">
        {appTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button whileTap={{ scale: 0.9 }} key={tab.id} className={isActive ? "active" : ""} onClick={() => switchTab(tab.id as any)}>
              <Icon weight={isActive ? "fill" : "regular"} />
              <span>{tab.label}</span>
            </motion.button>
          );
        })}
      </motion.nav>
    </main>
  );
}
