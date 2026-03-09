import { useState, useEffect, useRef } from "react";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
document.head.appendChild(fontLink);

const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #060608;
      --card: #0e0e12;
      --card2: #13131a;
      --border: #1e1e28;
      --border2: #2a2a38;
      --accent: #ff4500;
      --accent2: #ff8c00;
      --green: #00ff88;
      --purple: #a855f7;
      --blue: #3b82f6;
      --text: #ffffff;
      --muted: #6b7280;
      --muted2: #9ca3af;
    }
    body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }
    .bebas { font-family: 'Bebas Neue', sans-serif; }
    .mono { font-family: 'Space Mono', monospace; }
    @keyframes pulse-ring { 0%{transform:scale(.9);opacity:.8} 70%{transform:scale(1.05);opacity:0} 100%{transform:scale(.9);opacity:0} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes glow { 0%,100%{box-shadow:0 0 20px #ff450055} 50%{box-shadow:0 0 50px #ff4500aa,0 0 80px #ff450055} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes countUp { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }
    @keyframes blob { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
    .fade-up { animation: fadeUp .6s ease forwards; }
    .glow-btn { animation: glow 2s ease-in-out infinite; }
    .float-anim { animation: float 4s ease-in-out infinite; }
    input, textarea, select { outline: none; background: transparent; }
    button { cursor: pointer; border: none; }
    a { text-decoration: none; color: inherit; }
    .grad-text {
      background: linear-gradient(135deg, #ff4500, #ff8c00, #ffcc00);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .grad-text-green {
      background: linear-gradient(135deg, #00ff88, #00ccff);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .platform-card:hover { transform: translateY(-4px) scale(1.03); }
    .platform-card { transition: all .3s ease; }
    .nav-link { transition: color .2s; }
    .nav-link:hover { color: var(--accent); }
    .feature-card:hover { border-color: var(--accent); transform: translateY(-2px); }
    .feature-card { transition: all .3s ease; }
    .plan-card:hover { transform: translateY(-6px); }
    .plan-card { transition: all .3s ease; }
    .dash-nav-item:hover { background: rgba(255,69,0,.1); color: var(--accent); }
    .dash-nav-item { transition: all .2s; }
    .ticket-item:hover { border-color: var(--border2); background: #16161e; }
    .ticket-item { transition: all .2s; }
    .btn-primary {
      background: linear-gradient(135deg, #ff4500, #ff8c00);
      color: #fff; border-radius: 10px; font-weight: 600; font-family: 'DM Sans', sans-serif;
      transition: all .3s; letter-spacing: .02em;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px #ff450055; filter: brightness(1.1); }
    .btn-ghost {
      background: transparent; border: 1px solid var(--border2); color: var(--text);
      border-radius: 10px; font-weight: 500; font-family: 'DM Sans', sans-serif;
      transition: all .2s;
    }
    .btn-ghost:hover { border-color: var(--accent); color: var(--accent); background: rgba(255,69,0,.05); }
    .shimmer-text {
      background: linear-gradient(90deg, #ff4500 0%, #ffcc00 25%, #00ff88 50%, #ff4500 75%, #ffcc00 100%);
      background-size: 200% auto;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      animation: shimmer 3s linear infinite;
    }
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.8); backdrop-filter: blur(8px);
      z-index: 1000; display: flex; align-items: center; justify-content: center;
    }
    .score-ring { position: relative; display: inline-flex; align-items: center; justify-content: center; }
    .score-ring svg { transform: rotate(-90deg); }
  `}</style>
);

const icons = {
  TikTok: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.86 4.86 0 0 1-1.01-.09z" fill="#ff0050"/>
    </svg>
  ),
  Instagram: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433"/>
          <stop offset="25%" stopColor="#e6683c"/>
          <stop offset="50%" stopColor="#dc2743"/>
          <stop offset="75%" stopColor="#cc2366"/>
          <stop offset="100%" stopColor="#bc1888"/>
        </linearGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#ig)"/>
    </svg>
  ),
  YouTube: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" fill="#FF0000"/>
    </svg>
  ),
  X: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Facebook: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
    </svg>
  ),
  LinkedIn: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"/>
    </svg>
  ),
  Pinterest: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" fill="#E60023"/>
    </svg>
  ),
  Snapchat: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12.166.007C9.184-.007 6.37 1.293 4.545 3.56c-1.27 1.587-1.913 3.592-1.76 5.612v.876c-.47.15-.968.205-1.462.162-.16.442-.097.933.168 1.316.418.478.98.797 1.598.908.038.09.078.18.12.268C4.1 14.3 5.23 15.727 6.63 16.8c-.28.177-.598.285-.929.316-.44.048-.916-.027-1.257.277a1.3 1.3 0 0 0-.434.97c.023.48.35.9.82 1.02 1.15.33 2.254.803 3.275 1.404.253.165.48.365.676.594.26.384.42.824.47 1.28.015.134.11.246.242.276C9.73 22.978 10.945 23 12 23c1.054 0 2.27-.022 2.507-.064.132-.03.227-.142.242-.276.05-.456.21-.896.47-1.28.197-.23.423-.43.676-.595 1.02-.6 2.126-1.072 3.275-1.402.47-.12.797-.54.82-1.02a1.3 1.3 0 0 0-.434-.97c-.34-.305-.818-.23-1.257-.278-.33-.03-.648-.14-.929-.315 1.4-1.073 2.53-2.5 3.42-4.097.042-.088.082-.178.12-.268.62-.11 1.18-.43 1.598-.908.265-.383.328-.874.168-1.316-.494.043-.992-.013-1.462-.162v-.876c.153-2.02-.49-4.025-1.76-5.612C15.635 1.295 12.815-.005 9.84.007z" fill="#FFFC00"/>
    </svg>
  ),
  Reddit: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#FF4500"/>
      <path d="M19.783 12.108a1.74 1.74 0 0 0-1.742-1.742c-.46 0-.876.182-1.185.477-1.168-.796-2.762-1.313-4.536-1.378l.77-3.626 2.514.534a1.236 1.236 0 1 0 1.289-1.236 1.24 1.24 0 0 0-1.086.658l-2.81-.598a.133.133 0 0 0-.158.103l-.862 4.07c-1.8.055-3.42.574-4.598 1.376a1.72 1.72 0 0 0-1.18-.471 1.74 1.74 0 0 0-.526 3.398c-.018.153-.028.308-.028.464 0 2.36 2.747 4.27 6.14 4.27s6.14-1.91 6.14-4.27c0-.156-.01-.311-.028-.464.567-.286.963-.87.886-1.535v-.25zm-10.14 1.12a1.236 1.236 0 1 1 2.47 0 1.236 1.236 0 0 1-2.47 0zm6.896 3.278c-.702.702-2.043 1.07-3.543 1.07s-2.84-.368-3.543-1.07a.261.261 0 0 1 .369-.369c.563.563 1.762.908 3.174.908s2.611-.345 3.174-.908a.261.261 0 1 1 .369.369zm-.148-2.042a1.236 1.236 0 1 1 0-2.47 1.236 1.236 0 0 1 0 2.47z" fill="white"/>
    </svg>
  ),
  Twitch: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" fill="#9146FF"/>
    </svg>
  ),
  Threads: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.87
