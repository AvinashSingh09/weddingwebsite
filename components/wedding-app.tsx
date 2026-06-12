"use client";

import Image from "next/image";
import {
  AirplaneTilt,
  Bed,
  BookOpen,
  Bus,
  CalendarBlank,
  Camera,
  CaretDown,
  CaretRight,
  Check,
  Clock,
  Compass,
  EnvelopeOpen,
  ForkKnife,
  Gift,
  Heart,
  House,
  List,
  LockKey,
  MapPin,
  MapTrifold,
  Microphone,
  MusicNotes,
  Pause,
  Phone,
  Play,
  Question,
  Scan,
  SealCheck,
  ShareNetwork,
  Sparkle,
  Sun,
  UploadSimple,
  SpeakerHigh,
  SpeakerSlash,
  X,
} from "@phosphor-icons/react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type ModalName =
  | "rsvp"
  | "itinerary"
  | "stay"
  | "travel"
  | "faq"
  | "contacts"
  | "share"
  | "passport"
  | null;

const events = [
  {
    date: "20 Nov",
    shortDate: "Thu, 5:00 PM",
    name: "Welcome High Tea",
    icon: Gift,
    eyebrow: "20 November 2026",
    description: "Tea, old friends and the first glow of the golden city.",
    venue: "Suryagarh Courtyard",
    time: "5:00 PM onwards",
    dress: "Desert chic",
    weather: "27° / 15°",
    shuttle: "4:15 PM from hotels",
  },
  {
    date: "21 Nov",
    shortDate: "Fri, 10:30 AM",
    name: "Mehndi",
    icon: Sparkle,
    eyebrow: "21 November 2026",
    description: "A morning of colour, laughter and intricate designs.",
    venue: "Sonagarh Fort Courtyard",
    time: "10:30 AM onwards",
    dress: "Bright hues & florals",
    weather: "28° / 16°",
    shuttle: "9:45 AM from city centre",
  },
  {
    date: "21 Nov",
    shortDate: "Fri, 8:00 PM",
    name: "Sangeet",
    icon: MusicNotes,
    eyebrow: "21 November 2026",
    description: "Music under the stars, followed by dancing in the dunes.",
    venue: "The Serai Amphitheatre",
    time: "8:00 PM onwards",
    dress: "Mirrorwork & jewel tones",
    weather: "22° / 12°",
    shuttle: "6:45 PM from hotels",
  },
  {
    date: "22 Nov",
    shortDate: "Sat, 4:30 PM",
    name: "Wedding",
    icon: Heart,
    eyebrow: "22 November 2026",
    description: "Vows at sunset, held beneath the watch of Jaisalmer Fort.",
    venue: "Gadisar Palace Terrace",
    time: "4:30 PM sharp",
    dress: "Indian formal",
    weather: "25° / 13°",
    shuttle: "3:15 PM from hotels",
  },
  {
    date: "23 Nov",
    shortDate: "Sun, 11:00 AM",
    name: "Farewell Brunch",
    icon: ForkKnife,
    eyebrow: "23 November 2026",
    description: "One last table together before the journey home.",
    venue: "Bawdi Pool Garden",
    time: "11:00 AM",
    dress: "Easy linens",
    weather: "27° / 16°",
    shuttle: "On request",
  },
];

const storyChapters = [
  {
    title: "How We Met",
    copy: "A rainy afternoon in Jaipur, a shared book, endless conversations, and a friendship that quietly turned into forever.",
  },
  {
    title: "First Date",
    copy: "A tiny table, two cups of chai, and a four-hour conversation neither of us wanted to end.",
  },
  {
    title: "The Proposal",
    copy: "At sunset in the dunes, Arjun asked one very important question. Aanya forgot every word except yes.",
  },
  {
    title: "Favourite Memory",
    copy: "Getting gloriously lost on a road trip and discovering that home had become wherever we were together.",
  },
  {
    title: "Why Jaisalmer",
    copy: "Because some places hold light differently. We wanted our beginning to live in the golden city.",
  },
];

const passportStamps = [
  { name: "Desert Rose", date: "20 Nov", icon: Sparkle },
  { name: "Golden Dune", date: "21 Nov", icon: Sun },
  { name: "Sunset Sky", date: "21 Nov", icon: MusicNotes },
  { name: "Royal Fort", date: "22 Nov", icon: House },
  { name: "Eternal Promise", date: "23 Nov", icon: Heart },
];

const utilityItems = [
  { label: "Itinerary", note: "Plan your days", icon: CalendarBlank, modal: "itinerary" as ModalName },
  { label: "Stay", note: "Hotels & places", icon: Bed, modal: "stay" as ModalName },
  { label: "Getting there", note: "Flights & airport", icon: AirplaneTilt, modal: "travel" as ModalName },
  { label: "FAQs", note: "Everything you need", icon: Question, modal: "faq" as ModalName },
  { label: "Contacts", note: "We're here for you", icon: Phone, modal: "contacts" as ModalName },
  { label: "Share", note: "Invite & share", icon: ShareNetwork, modal: "share" as ModalName },
];

const memorySeeds = [
  { src: "/images/couple-portrait.png", caption: "The day before forever" },
  { src: "/images/jaisalmer-ceremony.png", caption: "Golden hour at the fort" },
  { src: "/images/couple-portrait.png", caption: "A quiet courtyard" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function WeddingApp() {
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [introMuted, setIntroMuted] = useState(true);
  const [introReady, setIntroReady] = useState(false);
  const [activeEvent, setActiveEvent] = useState(1);
  const [activeStory, setActiveStory] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modal, setModal] = useState<ModalName>(null);
  const [rsvpConfirmed, setRsvpConfirmed] = useState(true);
  const [unlockedStamps, setUnlockedStamps] = useState(2);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([
    "May your life together always feel this golden.",
    "Counting down to dance beneath the Jaisalmer sky.",
  ]);
  const [pollChoice, setPollChoice] = useState("Sangeet");
  const [pollSubmitted, setPollSubmitted] = useState(false);
  const [uploads, setUploads] = useState<string[]>([]);

  const event = events[activeEvent];
  const EventIcon = event.icon;

  const countdown = useMemo(
    () => [
      ["142", "Days"],
      ["07", "Hrs"],
      ["36", "Mins"],
      ["18", "Secs"],
    ],
    [],
  );

  useEffect(() => {
    const onKeyDown = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === "Escape") {
        setModal(null);
        setMobileMenu(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!showIntro) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showIntro]);

  function closeIntro() {
    if (introLeaving) return;
    setIntroLeaving(true);
    window.setTimeout(() => setShowIntro(false), 700);
  }

  function toggleIntroSound() {
    const video = introVideoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIntroMuted(video.muted);
    void video.play().catch(() => {
      // Some browsers still require a second gesture before resuming with sound.
    });
  }

  function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRsvpConfirmed(true);
    setModal(null);
  }

  function submitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!note.trim()) return;
    setNotes((current) => [note.trim(), ...current]);
    setNote("");
  }

  function handleUpload(files: FileList | null) {
    if (!files?.length) return;
    const nextUploads = Array.from(files).map((file) => URL.createObjectURL(file));
    setUploads((current) => [...nextUploads, ...current].slice(0, 6));
  }

  function unlockNextStamp() {
    setUnlockedStamps((current) => Math.min(current + 1, passportStamps.length));
    setModal(null);
    scrollToSection("passport");
  }

  return (
    <main className="site-shell">
      {showIntro && (
        <section
          className={`intro-film ${introLeaving ? "is-leaving" : ""}`}
          aria-label="Wedding introduction film"
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
          <div className="intro-film-controls">
            <button type="button" onClick={toggleIntroSound}>
              {introMuted ? <SpeakerSlash /> : <SpeakerHigh />}
              {introMuted ? "Sound on" : "Mute"}
            </button>
            <button type="button" onClick={closeIntro}>
              Skip film
              <CaretRight />
            </button>
          </div>
          <p className="intro-loading" aria-live="polite">
            {introReady ? "" : "Preparing the celebration"}
          </p>
        </section>
      )}

      <section className="hero" id="home">
        <Image
          className="hero-image"
          src="/images/jaisalmer-ceremony.png"
          alt="A candlelit wedding ceremony beneath Jaisalmer Fort"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />

        <header className="topbar">
          <button className="brand-mark" onClick={() => scrollToSection("home")} aria-label="Back to top">
            <Image src="/images/aa-monogram-alpha.png" alt="Aanya and Arjun monogram" width={88} height={88} priority />
          </button>

          <nav className="desktop-nav" aria-label="Main navigation">
            {[
              ["Story", "story"],
              ["Events", "journey"],
              ["Travel", "hospitality"],
              ["Passport", "passport"],
              ["Memories", "memories"],
            ].map(([label, id]) => (
              <button key={id} className={id === "journey" ? "active" : ""} onClick={() => scrollToSection(id)}>
                {label}
              </button>
            ))}
          </nav>

          <button className="music-control" onClick={() => setMusicPlaying((current) => !current)}>
            {musicPlaying ? <Pause weight="fill" /> : <Play weight="fill" />}
            <span>
              <strong>Kesariya Balam</strong>
              <small>Rajasthani Folk</small>
            </span>
          </button>

          <button className="mobile-menu-button" onClick={() => setMobileMenu(true)} aria-label="Open menu">
            <List />
          </button>
        </header>

        <div className="hero-copy">
          <h1>
            <span className="name-line">Aanya</span>
            <span className="name-line second-line">
              <em>&</em> Arjun
            </span>
          </h1>
          <p className="location">Jaisalmer, Rajasthan</p>
          <div className="hero-rule" />
          <p className="wedding-date">20 — 23 November 2026</p>
          <div className="countdown" aria-label="Wedding countdown">
            {countdown.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => setModal("rsvp")}>
              RSVP now
            </button>
            <span className="rsvp-status">
              <Check weight="bold" />
              {rsvpConfirmed ? "You're RSVP'd" : "Awaiting your reply"}
            </span>
          </div>
        </div>

        <button className="scroll-cue" onClick={() => scrollToSection("journey")} aria-label="Scroll to events">
          <span>Enter the celebration</span>
          <CaretDown />
        </button>
      </section>

      <section className="journey-section" id="journey">
        <div className="event-rail">
          <p className="section-kicker">The celebration journey</p>
          <div className="event-list">
            {events.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  className={`event-tab ${index === activeEvent ? "selected" : ""}`}
                  key={item.name}
                  onClick={() => setActiveEvent(index)}
                >
                  <span>{item.date}</span>
                  <Icon />
                  <strong>{item.name}</strong>
                  <small>{item.shortDate}</small>
                </button>
              );
            })}
          </div>
        </div>

        <div className="event-detail" aria-live="polite">
          <div className="event-heading">
            <p className="section-kicker">{event.eyebrow}</p>
            <h2>
              {event.name} <EventIcon />
            </h2>
            <p>{event.description}</p>
          </div>
          <div className="event-facts">
            <Fact icon={MapPin} label="Venue" value={event.venue} />
            <Fact icon={Clock} label="Time" value={event.time} />
            <Fact icon={Sparkle} label="Dress code" value={event.dress} />
            <Fact icon={Sun} label="Weather" value={event.weather} />
            <Fact icon={Bus} label="Shuttle" value={event.shuttle} />
          </div>
        </div>
      </section>

      <section className="story-passport-band">
        <div className="story-feature" id="story">
          <div className="story-copy">
            <p className="section-kicker">Our story</p>
            <h2>{storyChapters[activeStory].title}</h2>
            <p>{storyChapters[activeStory].copy}</p>
            <div className="story-tabs">
              {storyChapters.map((chapter, index) => (
                <button
                  key={chapter.title}
                  className={index === activeStory ? "active" : ""}
                  onClick={() => setActiveStory(index)}
                  aria-label={`Read ${chapter.title}`}
                />
              ))}
            </div>
            <button className="text-link" onClick={() => setActiveStory((activeStory + 1) % storyChapters.length)}>
              Read our story <CaretRight />
            </button>
          </div>
          <div className="story-image">
            <Image
              src="/images/couple-portrait.png"
              alt="Aanya and Arjun in a sandstone courtyard"
              fill
              sizes="(max-width: 900px) 100vw, 30vw"
            />
          </div>
        </div>

        <div className="passport-feature" id="passport">
          <div className="passport-heading">
            <div>
              <p className="section-kicker">Golden passport</p>
              <h2>Your journey</h2>
              <p>Collect a stamp as you celebrate with us.</p>
            </div>
            <button className="scan-button" onClick={() => setModal("passport")}>
              <Scan />
              Scan
            </button>
          </div>
          <div className="passport-stamps">
            {passportStamps.map((stamp, index) => {
              const Icon = stamp.icon;
              const unlocked = index < unlockedStamps;
              return (
                <button
                  key={stamp.name}
                  className={`passport-stamp ${unlocked ? "unlocked" : ""}`}
                  onClick={() => (unlocked ? undefined : setModal("passport"))}
                >
                  {unlocked ? <Icon /> : <LockKey />}
                  <strong>{stamp.name}</strong>
                  <span>{stamp.date}</span>
                </button>
              );
            })}
          </div>
          <p className="stamp-progress">{unlockedStamps} / 5 stamps collected</p>
        </div>
      </section>

      <section className="editorial-section hidden-note-section">
        <div>
          <p className="section-kicker">Hidden love note · Day 18</p>
          <h2>One small secret, every day.</h2>
        </div>
        <article className="love-letter">
          <EnvelopeOpen />
          <p>
            “The first time we saw Jaisalmer together, the whole city looked dipped in honey. We knew we
            would return with everyone we love.”
          </p>
          <span>A memory from Aanya</span>
        </article>
      </section>

      <section className="dress-studio editorial-section" id="dress">
        <div className="section-intro">
          <p className="section-kicker">Dress code studio</p>
          <h2>Dress for the desert light.</h2>
          <p>Consider this inspiration, never instruction. Wear what makes you feel celebratory.</p>
        </div>
        <div className="dress-columns">
          <article>
            <span>For her</span>
            <h3>Bright hues & florals</h3>
            <p>Marigold, rose, coral and leaf green. Light fabrics, easy drapes and heirloom details.</p>
            <div className="swatches" aria-label="Women's colour palette">
              <i className="swatch saffron" />
              <i className="swatch rose" />
              <i className="swatch green" />
              <i className="swatch ivory" />
            </div>
          </article>
          <article>
            <span>For him</span>
            <h3>Sun-washed tailoring</h3>
            <p>Ivory, ochre and muted sage. Bandhgalas, kurtas and breathable jackets work beautifully.</p>
            <div className="swatches" aria-label="Men's colour palette">
              <i className="swatch ivory" />
              <i className="swatch ochre" />
              <i className="swatch sage" />
              <i className="swatch charcoal" />
            </div>
          </article>
          <article>
            <span>Underfoot</span>
            <h3>Fort-friendly footwear</h3>
            <p>Choose block heels, juttis or polished flats. The sandstone paths reward comfort.</p>
            <button className="text-link" onClick={() => setModal("itinerary")}>
              See every event <CaretRight />
            </button>
          </article>
        </div>
      </section>

      <section className="hospitality-section" id="hospitality">
        <div className="hospitality-title">
          <p className="section-kicker">Hospitality & transfers</p>
          <h2>From touchdown to turban tying, we have you.</h2>
        </div>
        <div className="hospitality-list">
          <HospitalityRow
            icon={AirplaneTilt}
            title="Airport welcome"
            detail="Our team will meet you at Jaisalmer Airport from 9:00 AM to 7:00 PM."
            action={() => setModal("travel")}
          />
          <HospitalityRow
            icon={Bed}
            title="Your stay"
            detail="Rooms are held at Suryagarh and Jaisalmer Marriott from 19–24 November."
            action={() => setModal("stay")}
          />
          <HospitalityRow
            icon={Bus}
            title="Celebration shuttles"
            detail="Air-conditioned coaches leave 45–75 minutes before every event."
            action={() => setModal("itinerary")}
          />
          <HospitalityRow
            icon={Phone}
            title="Guest concierge"
            detail="For medicines, accessibility or a late-night rescue, our team is one tap away."
            action={() => setModal("contacts")}
          />
        </div>
      </section>

      <section className="memories-section" id="memories">
        <div className="section-intro">
          <p className="section-kicker">Memory wall</p>
          <h2>The wedding, through every guest&apos;s eyes.</h2>
          <label className="upload-button">
            <UploadSimple />
            Add a photo or video
            <input type="file" accept="image/*,video/*" multiple onChange={(event) => handleUpload(event.target.files)} />
          </label>
        </div>
        <div className="memory-rail">
          {uploads.map((src, index) => (
            <figure key={src}>
              {/* User-selected local preview intentionally uses a native image URL. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Guest upload ${index + 1}`} />
              <figcaption>Just added by you</figcaption>
            </figure>
          ))}
          {memorySeeds.map((memory, index) => (
            <figure key={`${memory.caption}-${index}`}>
              <Image src={memory.src} alt={memory.caption} fill sizes="(max-width: 700px) 80vw, 31vw" />
              <figcaption>{memory.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="community-section">
        <div className="notes-panel">
          <p className="section-kicker">Love notes</p>
          <h2>Leave something for forever.</h2>
          <form onSubmit={submitNote}>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Write a wish, a memory, or one piece of advice..."
              aria-label="Your love note"
            />
            <div className="note-actions">
              <button type="button" aria-label="Record audio message">
                <Microphone />
                Audio
              </button>
              <button type="button" aria-label="Record video blessing">
                <Camera />
                Video
              </button>
              <button className="primary-button" type="submit">
                Send note
              </button>
            </div>
          </form>
          <div className="note-stream">
            {notes.slice(0, 3).map((item) => (
              <blockquote key={item}>“{item}”</blockquote>
            ))}
          </div>
        </div>

        <div className="poll-panel">
          <p className="section-kicker">Live poll</p>
          <h2>Which moment are you most excited for?</h2>
          <div className="poll-options">
            {events.slice(0, 4).map((item) => (
              <button
                key={item.name}
                className={pollChoice === item.name ? "selected" : ""}
                onClick={() => {
                  setPollChoice(item.name);
                  setPollSubmitted(false);
                }}
              >
                <span>{item.name}</span>
                <i />
              </button>
            ))}
          </div>
          <button className="primary-button" onClick={() => setPollSubmitted(true)}>
            {pollSubmitted ? "Vote counted" : "Submit vote"}
          </button>
          {pollSubmitted && <p className="poll-result">Sangeet leads with 42% of guest votes.</p>}
        </div>
      </section>

      <section className="legacy-section">
        <Image
          src="/images/jaisalmer-ceremony.png"
          alt=""
          fill
          sizes="100vw"
          className="legacy-image"
        />
        <div className="legacy-shade" />
        <div className="legacy-copy">
          <p className="section-kicker">After the last dance</p>
          <h2>The celebration becomes an archive.</h2>
          <p>Return here for the professional gallery, wedding film, guestbook and anniversary notes.</p>
          <button className="primary-button" onClick={() => scrollToSection("home")}>
            Save this celebration
          </button>
        </div>
      </section>

      <footer className="footer">
        <Image src="/images/aa-monogram-alpha.png" alt="" width={74} height={74} />
        <p>Aanya & Arjun · Jaisalmer · 20—23 November 2026</p>
        <button onClick={() => setModal("contacts")}>Guest concierge</button>
      </footer>

      <nav className="utility-dock" aria-label="Guest essentials">
        {utilityItems.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.label} onClick={() => setModal(item.modal)}>
              <Icon />
              <span>
                <strong>{item.label}</strong>
                <small>{item.note}</small>
              </span>
            </button>
          );
        })}
      </nav>

      {mobileMenu && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button className="close-button" onClick={() => setMobileMenu(false)} aria-label="Close menu">
            <X />
          </button>
          <Image src="/images/aa-monogram-alpha.png" alt="" width={100} height={100} />
          {[
            ["Our story", "story"],
            ["Celebration journey", "journey"],
            ["Hospitality", "hospitality"],
            ["Golden passport", "passport"],
            ["Memory wall", "memories"],
          ].map(([label, id]) => (
            <button
              key={id}
              onClick={() => {
                setMobileMenu(false);
                scrollToSection(id);
              }}
            >
              {label}
              <CaretRight />
            </button>
          ))}
        </div>
      )}

      {modal && (
        <ModalShell title={modalTitle(modal)} onClose={() => setModal(null)}>
          {modal === "rsvp" && (
            <form className="rsvp-form" onSubmit={submitRsvp}>
              <p>We would be honoured to celebrate with you in Jaisalmer.</p>
              <label>
                Guest name
                <input required defaultValue="Rhea Kapoor" />
              </label>
              <label>
                Attendance
                <select defaultValue="all">
                  <option value="all">Joyfully attending all events</option>
                  <option value="some">Attending selected events</option>
                  <option value="no">Celebrating from afar</option>
                </select>
              </label>
              <label>
                Dietary or accessibility notes
                <textarea placeholder="Anything our hospitality team should know?" />
              </label>
              <button className="primary-button" type="submit">
                Confirm response
              </button>
            </form>
          )}
          {modal === "passport" && (
            <div className="passport-modal">
              <Scan />
              <p>Point your camera at the event QR code to unlock the next golden stamp.</p>
              <button className="primary-button" onClick={unlockNextStamp}>
                Simulate event scan
              </button>
            </div>
          )}
          {modal === "itinerary" && (
            <div className="modal-list">
              {events.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveEvent(events.indexOf(item));
                    setModal(null);
                    scrollToSection("journey");
                  }}
                >
                  <CalendarBlank />
                  <span>
                    <strong>{item.date} · {item.name}</strong>
                    <small>{item.shortDate} · {item.venue}</small>
                  </span>
                  <CaretRight />
                </button>
              ))}
            </div>
          )}
          {modal === "stay" && (
            <ModalDetails
              icon={Bed}
              headline="Suryagarh, Jaisalmer"
              copy="Check-in from 2:00 PM on 19 November. Breakfast, airport transfers and celebration shuttles are included."
              action="View room details"
            />
          )}
          {modal === "travel" && (
            <ModalDetails
              icon={AirplaneTilt}
              headline="Arriving in the golden city"
              copy="Share flight details at least seven days before arrival. Our airport desk will coordinate every pickup."
              action="Add flight details"
            />
          )}
          {modal === "faq" && (
            <div className="faq-list">
              <details open>
                <summary>What will the weather be like?</summary>
                <p>Warm afternoons around 27°C and cool evenings near 13°C. Bring one elegant layer.</p>
              </details>
              <details>
                <summary>Are children welcome?</summary>
                <p>Absolutely. Childcare and an activity room will be available during evening events.</p>
              </details>
              <details>
                <summary>Do I need cash?</summary>
                <p>Cards and UPI are widely accepted. A little cash helps for small local purchases.</p>
              </details>
            </div>
          )}
          {modal === "contacts" && (
            <div className="contact-list">
              <a href="tel:+919810000000"><Phone /> Guest concierge · +91 98100 00000</a>
              <a href="tel:+919820000000"><Bus /> Transfers desk · +91 98200 00000</a>
              <a href="mailto:celebrate@example.com"><EnvelopeOpen /> celebrate@example.com</a>
            </div>
          )}
          {modal === "share" && (
            <div className="share-panel">
              <ShareNetwork />
              <p>Share the celebration with another invited guest.</p>
              <button
                className="primary-button"
                onClick={async () => {
                  await navigator.clipboard?.writeText(window.location.href);
                  setModal(null);
                }}
              >
                Copy invitation link
              </button>
            </div>
          )}
        </ModalShell>
      )}
    </main>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="fact">
      <Icon />
      <span>
        <strong>{label}</strong>
        <small>{value}</small>
      </span>
    </div>
  );
}

function HospitalityRow({
  icon: Icon,
  title,
  detail,
  action,
}: {
  icon: typeof MapPin;
  title: string;
  detail: string;
  action: () => void;
}) {
  return (
    <button className="hospitality-row" onClick={action}>
      <Icon />
      <span>
        <strong>{title}</strong>
        <small>{detail}</small>
      </span>
      <CaretRight />
    </button>
  );
}

function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="section-kicker">Guest services</p>
            <h2>{title}</h2>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close dialog">
            <X />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

function ModalDetails({
  icon: Icon,
  headline,
  copy,
  action,
}: {
  icon: typeof MapPin;
  headline: string;
  copy: string;
  action: string;
}) {
  return (
    <div className="modal-details">
      <Icon />
      <h3>{headline}</h3>
      <p>{copy}</p>
      <button className="primary-button">{action}</button>
    </div>
  );
}

function modalTitle(modal: Exclude<ModalName, null>) {
  const titles = {
    rsvp: "Your RSVP",
    itinerary: "Celebration itinerary",
    stay: "Your stay",
    travel: "Getting to Jaisalmer",
    faq: "Questions, answered",
    contacts: "Emergency & guest contacts",
    share: "Share the invitation",
    passport: "Unlock a passport stamp",
  };
  return titles[modal];
}
