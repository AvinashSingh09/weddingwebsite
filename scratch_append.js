const fs = require('fs');
const css = `
/* --- APP MOCKUP UI CLASSES --- */
.app-screen { padding: 20px 5vw 100px; background: var(--ink); min-height: 100vh; position: relative; }
.app-header-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; }
.app-header-nav h2 { margin: 0; color: var(--gold-bright); font-size: 16px; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 500; font-family: var(--display); }
.app-header-nav svg { color: var(--gold); width: 24px; height: 24px; cursor: pointer; }

.card-dark { background: #12100c; border: 1px solid rgba(205, 168, 90, 0.15); border-radius: 16px; padding: 20px; margin-bottom: 20px; }
.card-dark h3 { margin: 0 0 5px; color: var(--gold-bright); font-family: var(--display); font-weight: 500; font-size: 16px; letter-spacing: 0.1em; text-transform: uppercase; }
.card-dark p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.5; }

.home-hero { text-align: center; margin-bottom: 30px; position: relative; }
.home-hero h1 { font-family: var(--display); font-size: 42px; line-height: 1.1; font-weight: 400; text-transform: uppercase; margin: 0 0 10px; color: var(--white); }
.home-hero .location { font-size: 10px; letter-spacing: 0.2em; color: var(--gold-bright); text-transform: uppercase; margin-bottom: 20px; display: block; }
.home-hero .dates { font-size: 10px; letter-spacing: 0.1em; color: var(--muted); display: block; margin-top: 20px; }

.countdown-box { background: #0c0a08; border-top: 1px solid var(--gold-dim); padding: 20px; border-radius: 16px; text-align: center; margin-bottom: 30px; }
.countdown-box p { color: var(--muted); font-size: 10px; letter-spacing: 0.15em; margin: 0 0 15px; text-transform: uppercase; }
.countdown-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.countdown-grid div { display: flex; flex-direction: column; align-items: center; border-right: 1px solid rgba(205,168,90,0.2); }
.countdown-grid div:last-child { border-right: none; }
.countdown-grid strong { color: var(--gold-bright); font-size: 28px; font-weight: 400; font-family: var(--display); }
.countdown-grid span { color: var(--muted); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; }

.quick-actions h3 { color: var(--muted); font-size: 11px; letter-spacing: 0.15em; margin: 0 0 15px; text-transform: uppercase; }
.quick-actions-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 30px; }
.qa-btn { background: #12100c; border: 1px solid rgba(205,168,90,0.15); border-radius: 16px; padding: 15px 0; display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--muted); cursor: pointer; transition: all 0.2s; }
.qa-btn.active { background: var(--gold-dim); color: var(--white); border-color: var(--gold); }
.qa-btn svg { width: 24px; height: 24px; color: inherit; }
.qa-btn span { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; }

.welcome-banner { display: flex; align-items: center; background: #12100c; border: 1px solid rgba(205,168,90,0.15); border-radius: 16px; padding: 12px; cursor: pointer; }
.welcome-banner img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; margin-right: 15px; }
.welcome-banner > div { flex: 1; }
.welcome-banner h4 { margin: 0 0 4px; color: var(--gold-bright); font-size: 13px; font-weight: 500; font-family: var(--ui); }
.welcome-banner p { margin: 0; color: var(--muted); font-size: 10px; line-height: 1.4; }
.welcome-banner svg { color: var(--gold); width: 20px; height: 20px; }

.date-scroller { display: flex; overflow-x: auto; gap: 25px; margin-bottom: 25px; padding-bottom: 10px; border-bottom: 1px solid rgba(205,168,90,0.15); }
.date-item { display: flex; flex-direction: column; align-items: center; color: var(--muted); cursor: pointer; min-width: 50px; }
.date-item strong { font-size: 13px; font-weight: 600; font-family: var(--display); letter-spacing: 0.05em; }
.date-item span { font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 4px; }
.date-item.active { color: var(--gold-bright); position: relative; }
.date-item.active::after { content: ""; position: absolute; bottom: -11px; left: 10%; right: 10%; height: 2px; background: var(--gold-bright); }

.event-card { display: flex; background: #12100c; border: 1px solid rgba(205,168,90,0.15); border-radius: 16px; overflow: hidden; margin-bottom: 15px; }
.event-card-img { width: 110px; position: relative; }
.event-card-img img { object-fit: cover; }
.event-card-body { padding: 20px 15px; flex: 1; position: relative; }
.event-card-body h3 { margin: 0 0 6px; color: var(--gold-bright); font-family: var(--display); font-size: 16px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; }
.event-card-body p.time { color: var(--muted); font-size: 10px; margin: 0 0 10px; letter-spacing: 0.05em; }
.event-card-body p.venue { color: var(--muted); font-size: 11px; display: flex; align-items: center; gap: 6px; margin: 0; }
.event-card-body .bookmark { position: absolute; top: 15px; right: 15px; color: var(--gold-dim); cursor: pointer; }

.hero-header-img { margin: -20px -5vw 20px; height: 220px; position: relative; overflow: hidden; border-radius: 16px; border: 1px solid rgba(205,168,90,0.15); }
.hero-header-img img { object-fit: cover; }

.stay-hero { margin-bottom: 30px; }
.btn-outline { width: 100%; border: 1px solid var(--gold-dim); background: transparent; color: var(--gold-bright); padding: 12px; border-radius: 8px; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; margin-top: 15px; }

.check-card { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 20px; }
.check-item h4 { margin: 0 0 5px; color: var(--muted); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; }
.check-item p { margin: 0; color: var(--gold-bright); font-size: 12px; font-family: var(--display); }

.grid-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
.grid-item { background: #12100c; border: 1px solid rgba(205,168,90,0.15); border-radius: 16px; padding: 20px 15px; display: flex; flex-direction: column; align-items: center; text-align: center; }
.grid-item svg { color: var(--gold-bright); width: 28px; height: 28px; margin-bottom: 12px; }
.grid-item h4 { color: var(--gold-bright); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 6px; }
.grid-item p { color: var(--muted); font-size: 9px; margin: 0; }

.assist-card { display: flex; align-items: center; justify-content: space-between; background: #12100c; border: 1px solid rgba(205,168,90,0.15); border-radius: 16px; padding: 20px; }
.assist-card h4 { color: var(--gold-bright); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px; }
.assist-card p { color: var(--muted); font-size: 10px; margin: 0; }
.assist-icon { width: 40px; height: 40px; border: 1px solid var(--gold-dim); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--gold-bright); }

.profile-header { display: flex; flex-direction: column; align-items: center; margin: 10px 0 30px; text-align: center; }
.avatar-lg { width: 100px; height: 100px; border: 1px solid var(--gold-bright); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--gold-bright); font-size: 32px; font-family: var(--display); margin-bottom: 15px; }
.profile-header h2 { color: var(--gold-bright); font-size: 18px; margin: 0 0 5px; font-weight: 500; font-family: var(--ui); }
.profile-header p { color: var(--muted); font-size: 12px; margin: 0 0 15px; }
.badge { background: rgba(39, 174, 96, 0.15); color: #2ecc71; border: 1px solid rgba(39, 174, 96, 0.3); padding: 6px 12px; border-radius: 20px; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 6px; }

.list-menu { display: flex; flex-direction: column; gap: 15px; }
.list-item { display: flex; align-items: center; background: #12100c; border: 1px solid rgba(205,168,90,0.15); border-radius: 16px; padding: 18px 20px; cursor: pointer; }
.list-item-icon { color: var(--gold-dim); margin-right: 18px; }
.list-item-icon svg { width: 24px; height: 24px; }
.list-item-text { flex: 1; }
.list-item-text h4 { color: var(--gold-bright); font-size: 12px; margin: 0 0 4px; letter-spacing: 0.05em; text-transform: uppercase; }
.list-item-text p { color: var(--muted); font-size: 10px; margin: 0; }
.list-item-caret { color: var(--gold-dim); }
`;
fs.appendFileSync('d:/shivam/weddingwebsite/app/globals.css', css);
console.log('Appended CSS to globals.css');
