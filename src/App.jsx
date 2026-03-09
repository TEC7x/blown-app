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
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.822.871 4.83-1.651 7.312-1.949 1.926-4.344 2.48-7.181 2.497z"/>
    </svg>
  ),
  BeReal: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
      <path d="M5.004 0A5.004 5.004 0 0 0 0 5.004v13.992A5.004 5.004 0 0 0 5.004 24h13.992A5.004 5.004 0 0 0 24 18.996V5.004A5.004 5.004 0 0 0 18.996 0zm6.44 5.71h3.647c1.074 0 1.92.278 2.54.835.618.554.927 1.307.927 2.257a2.893 2.893 0 0 1-1.772 2.745l2.256 4.36h-2.63l-1.896-3.905h-.96v3.906H11.44zm2.112 1.75v2.656h1.366c.444 0 .784-.106 1.021-.319.237-.216.356-.512.356-.89 0-.35-.115-.636-.347-.856-.228-.217-.564-.325-1.007-.325zm-8.5-.003h3.453c.974 0 1.74.253 2.3.76.555.504.832 1.195.832 2.071 0 .587-.143 1.09-.43 1.511-.215.315-.51.565-.855.73.49.16.884.455 1.166.876.316.466.474 1.025.474 1.674 0 .962-.305 1.727-.913 2.294-.606.566-1.427.85-2.463.85H4.856V7.457zm2.09 1.671v1.985h1.115c.37 0 .66-.097.871-.29.21-.194.314-.46.314-.797 0-.325-.1-.581-.299-.77-.199-.187-.48-.281-.843-.281zm0 3.56v2.353h1.295c.41 0 .73-.109.96-.325.232-.218.348-.514.348-.888 0-.371-.116-.67-.349-.895-.232-.222-.56-.334-.982-.334zm12.5-7.6v3.984h-.976V5.088zm-1.69 0v3.984h-.977V5.088z"/>
    </svg>
  ),
};

const PLATFORMS = [
  { name: "TikTok", color: "#ff0050", bg: "#1a0010", Icon: icons.TikTok, desc: "Short-form video virality" },
  { name: "Instagram", color: "#e6683c", bg: "#1a0d0a", Icon: icons.Instagram, desc: "Reels, Stories & Posts" },
  { name: "YouTube", color: "#FF0000", bg: "#1a0000", Icon: icons.YouTube, desc: "Long & short form video" },
  { name: "X / Twitter", color: "#ffffff", bg: "#0d0d0d", Icon: icons.X, desc: "Threads & viral tweets" },
  { name: "Facebook", color: "#1877F2", bg: "#000d1a", Icon: icons.Facebook, desc: "Reels & viral posts" },
  { name: "LinkedIn", color: "#0A66C2", bg: "#000d17", Icon: icons.LinkedIn, desc: "Thought leadership" },
  { name: "Pinterest", color: "#E60023", bg: "#1a0007", Icon: icons.Pinterest, desc: "Visual content reach" },
  { name: "Snapchat", color: "#FFFC00", bg: "#1a1a00", Icon: icons.Snapchat, desc: "Stories & Spotlights" },
  { name: "Reddit", color: "#FF4500", bg: "#1a0d00", Icon: icons.Reddit, desc: "Community virality" },
  { name: "Twitch", color: "#9146FF", bg: "#0e0014", Icon: icons.Twitch, desc: "Live stream growth" },
  { name: "Threads", color: "#ffffff", bg: "#0d0d0d", Icon: icons.Threads, desc: "Meta text community" },
  { name: "BeReal", color: "#ffffff", bg: "#0a0a0a", Icon: icons.BeReal, desc: "Authentic moments" },
];

const PLANS = [
  { name: "Starter", price: "Free", period: "", color: "#6b7280", features: ["3 AI optimizations/day","Basic viral score","1 platform","Community support"], cta: "Start Free", popular: false },
  { name: "Creator", price: "$9.99", period: "/mo", color: "#ff4500", features: ["Unlimited AI optimizations","Full viral analysis","5 platforms","Hashtag generator","Best time to post","Priority support"], cta: "Go Creator", popular: true },
  { name: "Pro", price: "$29.99", period: "/mo", color: "#a855f7", features: ["Everything in Creator","All platforms","Advanced analytics","Competitor tracking","Auto-scheduling","1-on-1 strategy call"], cta: "Go Pro", popular: false },
  { name: "Agency", price: "$99.99", period: "/mo", color: "#3b82f6", features: ["Everything in Pro","20 team members","White label reports","API access","Custom integrations","Dedicated manager"], cta: "Go Agency", popular: false },
];

const TESTIMONIALS = [
  { name: "Aria Chen", handle: "@ariachen_creates", platform: "TikTok", avatar: "AC", gain: "+2.3M views", quote: "BLOWN took my TikTok from 5K to 800K followers in 3 months. The AI knew exactly what was missing.", color: "#ff0050" },
  { name: "Marcus Delgado", handle: "@marcusdelgado", platform: "YouTube", avatar: "MD", gain: "+$18K revenue", quote: "My videos were good but they weren't reaching anyone. BLOWN fixed that. Now I'm monetized and growing daily.", color: "#FF0000" },
  { name: "Zoe Williams", handle: "@zoebeauty", platform: "Instagram", avatar: "ZW", gain: "+450K followers", quote: "The Instagram optimizer is insane. It tells you exactly what hook, length, and time to post for maximum reach.", color: "#e6683c" },
  { name: "Kwame Asante", handle: "@kwametech", platform: "LinkedIn", avatar: "KA", gain: "+12K connections", quote: "I went from invisible to being featured in LinkedIn's algorithm every week. BLOWN is a game changer for B2B creators.", color: "#0A66C2" },
];

const ScoreRing = ({ score, size = 120, color = "#ff4500" }) => {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const pct = score / 100;
  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e1e28" strokeWidth="8"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 1.5s ease" }}
        />
      </svg>
      <div style={{ position: "absolute", textAlign: "center" }}>
        <div style={{ fontSize: size/4, fontWeight: 700, color, fontFamily: "'Bebas Neue', sans-serif" }}>{score}</div>
        <div style={{ fontSize: size/8, color: "#6b7280", marginTop: -2 }}>/ 100</div>
      </div>
    </div>
  );
};

const ADMIN_PASS = "blown_admin_2025";
const MOCK_USERS = [
  { id: 1, name: "Aria Chen", email: "aria@example.com", plan: "Pro", joined: "Jan 12, 2025", posts: 156, status: "active" },
  { id: 2, name: "Marcus Delgado", email: "marcus@example.com", plan: "Creator", joined: "Feb 3, 2025", posts: 89, status: "active" },
  { id: 3, name: "Zoe Williams", email: "zoe@example.com", plan: "Agency", joined: "Dec 28, 2024", posts: 302, status: "active" },
  { id: 4, name: "Kwame Asante", email: "kwame@example.com", plan: "Creator", joined: "Mar 1, 2025", posts: 44, status: "active" },
  { id: 5, name: "Sofia Moreau", email: "sofia@example.com", plan: "Starter", joined: "Mar 5, 2025", posts: 7, status: "trial" },
  { id: 6, name: "Jake Thompson", email: "jake@example.com", plan: "Pro", joined: "Jan 20, 2025", posts: 211, status: "active" },
];
const MOCK_TICKETS = [
  { id: "TKT-001", user: "Sofia Moreau", email: "sofia@example.com", subject: "Payment not processed", status: "open", priority: "high", date: "Mar 8, 2025" },
  { id: "TKT-002", user: "Jake Thompson", email: "jake@example.com", subject: "Analytics not loading", status: "in-progress", priority: "medium", date: "Mar 7, 2025" },
  { id: "TKT-003", user: "Marcus Delgado", email: "marcus@example.com", subject: "Upgrade plan question", status: "resolved", priority: "low", date: "Mar 5, 2025" },
  { id: "TKT-004", user: "New User", email: "newuser@example.com", subject: "Can't login", status: "open", priority: "high", date: "Mar 9, 2025" },
];

const LandingPage = ({ onNav }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(6,6,8,.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all .3s ease",
        padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 68,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #ff4500, #ff8c00)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 900, fontFamily: "'Bebas Neue', sans-serif",
          }}>B</div>
          <span style={{ fontSize: 22, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>BLOWN</span>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500 }}>
          {["Features", "Platforms", "Pricing", "Testimonials"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{ color: "var(--muted2)" }}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-ghost" style={{ padding: "8px 18px", fontSize: 13 }} onClick={() => onNav("auth")}>Login</button>
          <button className="btn-primary" style={{ padding: "8px 20px", fontSize: 13 }} onClick={() => onNav("auth")}>Get Started Free</button>
        </div>
      </nav>

      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "120px 5% 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,69,0,.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,.1) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="fade-up" style={{ animationDelay: ".1s" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,69,0,.1)", border: "1px solid rgba(255,69,0,.3)",
            borderRadius: 100, padding: "6px 16px", marginBottom: 28, fontSize: 12, fontWeight: 600,
            color: "#ff8c00", textTransform: "uppercase", letterSpacing: 1,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff88", display: "inline-block", animation: "pulse-ring 1.5s ease-in-out infinite" }}/>
            AI-Powered Viral Engine — Now Live
          </div>
        </div>

        <h1 className="bebas fade-up" style={{ fontSize: "clamp(72px, 12vw, 160px)", lineHeight: .9, letterSpacing: -2, animationDelay: ".2s" }}>
          GET YOUR CONTENT<br/>
          <span className="shimmer-text">BLOWN UP</span>
        </h1>

        <p className="fade-up" style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--muted2)", maxWidth: 560, marginTop: 24, lineHeight: 1.6, animationDelay: ".35s" }}>
          The world's first AI trained specifically to make your posts go viral — across <strong style={{ color: "#fff" }}>12 social platforms</strong> simultaneously. Used by 50,000+ creators worldwide.
        </p>

        <div className="fade-up" style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap", justifyContent: "center", animationDelay: ".5s" }}>
          <button className="btn-primary glow-btn" style={{ padding: "16px 36px", fontSize: 16 }} onClick={() => onNav("auth")}>
            🔥 Blow Up My Content — Free
          </button>
          <button className="btn-ghost" style={{ padding: "16px 28px", fontSize: 16 }}>
            ▶ Watch Demo
          </button>
        </div>

        <div className="fade-up" style={{ display: "flex", gap: 32, marginTop: 56, animationDelay: ".65s" }}>
          {[["50K+", "Active Creators"], ["2.1B+", "Views Generated"], ["94%", "Viral Rate"], ["12", "Platforms"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div className="bebas" style={{ fontSize: 36, color: "#ff4500", letterSpacing: 1 }}>{n}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: -4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="platforms" style={{ padding: "80px 5%" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 className="bebas" style={{ fontSize: "clamp(42px, 6vw, 72px)", letterSpacing: 1 }}>
            DOMINATE <span className="grad-text">EVERY PLATFORM</span>
          </h2>
          <p style={{ color: "var(--muted2)", marginTop: 12, fontSize: 15 }}>Platform-specific AI optimization — not generic advice.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 14 }}>
          {PLATFORMS.map(({ name, color, bg, Icon, desc }) => (
            <div key={name} className="platform-card" style={{
              background: bg, border: `1px solid ${color}22`,
              borderRadius: 16, padding: "20px 16px", cursor: "pointer",
            }}>
              <div style={{ marginBottom: 12 }}><Icon size={32} /></div>
              <div style={{ fontWeight: 700, fontSize: 14, color }}>{name}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, lineHeight: 1.4 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" style={{ padding: "80px 5%" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 className="bebas" style={{ fontSize: "clamp(42px, 6vw, 72px)", letterSpacing: 1 }}>
            THE <span className="grad-text-green">BLOWN</span> DIFFERENCE
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {[
            { icon: "🧠", title: "AI Viral Scorer", desc: "Our proprietary AI gives every post a viral score from 0–100 with actionable improvement steps.", color: "#ff4500" },
            { icon: "🎯", title: "Platform Targeting", desc: "TikTok, Instagram, YouTube — each platform has unique algorithms. BLOWN knows them all.", color: "#a855f7" },
            { icon: "⚡", title: "Real-Time Optimization", desc: "Paste your draft, get instant rewrites, hooks, CTAs, and hashtags that actually trend.", color: "#3b82f6" },
            { icon: "📊", title: "Viral Analytics", desc: "Track which posts performed and why. Learn from your best content automatically.", color: "#00ff88" },
            { icon: "⏰", title: "Best Time to Post", desc: "AI detects when your audience is most active and when the algorithm rewards your content.", color: "#ffcc00" },
            { icon: "🔥", title: "Trend Hijacking", desc: "Get alerts when viral trends match your niche. Strike while the iron is hot.", color: "#ff8c00" },
            { icon: "✍️", title: "AI Caption Writer", desc: "Generate 10 viral caption variations in seconds. A/B test before you even post.", color: "#ec4899" },
            { icon: "🏷️", title: "Hashtag Intelligence", desc: "Not just popular hashtags — the ones with low competition and high viral potential.", color: "#06b6d4" },
          ].map(({ icon, title, desc, color }) => (
            <div key={title} className="feature-card" style={{
              background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24,
            }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, color, marginBottom: 8 }}>{title}</div>
              <div style={{ color: "var(--muted2)", fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" style={{ padding: "80px 5%" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 className="bebas" style={{ fontSize: "clamp(42px, 6vw, 72px)", letterSpacing: 1 }}>
            SIMPLE <span className="grad-text">PRICING</span>
          </h2>
          <p style={{ color: "var(--muted2)", marginTop: 12, fontSize: 15 }}>Pay with Card, PayPal, SOL, USDT, or Gift Cards</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
          {PLANS.map(plan => (
            <div key={plan.name} className="plan-card" style={{
              background: plan.popular ? `linear-gradient(160deg, #0f0f15, #1a0d00)` : "var(--card)",
              border: `1px solid ${plan.popular ? plan.color : "var(--border)"}`,
              borderRadius: 20, padding: 28, position: "relative",
            }}>
              {plan.popular && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #ff4500, #ff8c00)",
                  borderRadius: 100, padding: "4px 16px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
                }}>⚡ MOST POPULAR</div>
              )}
              <div style={{ fontWeight: 700, fontSize: 14, color: plan.color, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>{plan.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 20 }}>
                <span className="bebas" style={{ fontSize: 48, color: "#fff", letterSpacing: -1 }}>{plan.price}</span>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>{plan.period}</span>
              </div>
              {plan.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, fontSize: 13, color: "var(--muted2)" }}>
                  <span style={{ color: plan.color, fontSize: 14 }}>✓</span> {f}
                </div>
              ))}
              <button className={plan.popular ? "btn-primary" : "btn-ghost"} style={{ width: "100%", padding: "12px", fontSize: 14, marginTop: 20 }}
                onClick={() => onNav("auth")}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" style={{ padding: "80px 5%" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 className="bebas" style={{ fontSize: "clamp(42px, 6vw, 72px)", letterSpacing: 1 }}>
            CREATORS WHO GOT <span className="grad-text">BLOWN UP</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${t.color}33`, border: `2px solid ${t.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: t.color }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{t.handle} • {t.platform}</div>
                </div>
                <div style={{ marginLeft: "auto", background: `${t.color}22`, border: `1px solid ${t.color}44`, borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: t.color }}>{t.gain}</div>
              </div>
              <p style={{ color: "var(--muted2)", fontSize: 13, lineHeight: 1.6, fontStyle: "italic" }}>"{t.quote}"</p>
              <div style={{ marginTop: 12, color: "#ffcc00", fontSize: 14 }}>★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "80px 5%", textAlign: "center" }}>
        <div style={{ background: "linear-gradient(135deg, #1a0d00, #0f0f15)", border: "1px solid rgba(255,69,0,.3)", borderRadius: 24, padding: "60px 40px" }}>
          <h2 className="bebas" style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: .9, letterSpacing: -1 }}>
            YOUR CONTENT<br/><span className="shimmer-text">DESERVES TO BE SEEN</span>
          </h2>
          <p style={{ color: "var(--muted2)", marginTop: 20, fontSize: 16, maxWidth: 440, margin: "20px auto 36px" }}>Join 50,000+ creators who stopped guessing and started going viral.</p>
          <button className="btn-primary glow-btn" style={{ padding: "18px 44px", fontSize: 18 }} onClick={() => onNav("auth")}>
            🚀 Start for Free — No Credit Card
          </button>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 5%", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #ff4500, #ff8c00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, fontFamily: "'Bebas Neue', sans-serif" }}>B</div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, fontSize: 18 }}>BLOWN</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          Support: <a href="mailto:justinbrandford6@gmail.com" style={{ color: "#ff4500" }}>justinbrandford6@gmail.com</a>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>© 2025 BLOWN. All rights reserved.</div>
      </footer>
    </div>
  );
};

const AuthPage = ({ onNav, onLogin }) => {
  const [tab, setTab] = useState("signup");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (form.email === "justinbrandford6@gmail.com") {
        onLogin({ name: "Admin", email: form.email, plan: "Agency", isAdmin: true });
      } else {
        onLogin({ name: form.name || "Creator", email: form.email, plan: "Starter", isAdmin: false });
      }
    }, 1400);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", position: "relative" }}>
      <div style={{ position: "absolute", top: "20%", left: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,69,0,.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ width: "100%", maxWidth: 420, animation: "fadeUp .5s ease forwards" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <button onClick={() => onNav("landing")} style={{ background: "none", color: "var(--muted)", fontSize: 13, marginBottom: 20, display: "block", margin: "0 auto 20px" }}>← Back to home</button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #ff4500, #ff8c00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontFamily: "'Bebas Neue', sans-serif" }}>B</div>
            <span className="bebas" style={{ fontSize: 28, letterSpacing: 2 }}>BLOWN</span>
          </div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 32 }}>
          <div style={{ display: "flex", background: "var(--bg)", borderRadius: 12, padding: 4, marginBottom: 28 }}>
            {["signup", "login"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: "10px", borderRadius: 9, fontSize: 14, fontWeight: 600,
                background: tab === t ? "linear-gradient(135deg, #ff4500, #ff8c00)" : "transparent",
                color: tab === t ? "#fff" : "var(--muted)", border: "none", transition: "all .2s",
                fontFamily: "'DM Sans', sans-serif",
              }}>{t === "signup" ? "Sign Up" : "Log In"}</button>
            ))}
          </div>
          {tab === "signup" && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Full Name</label>
              <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))}
                placeholder="Your creator name"
                style={{ width: "100%", background: "var(--bg)", border: "1px solid var(--border2)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Email Address</label>
            <input value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))}
              placeholder="you@example.com" type="email"
              style={{ width: "100%", background: "var(--bg)", border: "1px solid var(--border2)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Password</label>
            <input value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))}
              placeholder="••••••••" type="password"
              style={{ width: "100%", background: "var(--bg)", border: "1px solid var(--border2)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
          <button className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: 15 }} onClick={handleSubmit} disabled={loading}>
            {loading ? "Launching..." : tab === "signup" ? "🚀 Create Free Account" : "🔑 Log In"}
          </button>
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14 }}>— or continue with —</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Google", "Apple"].map(p => (
                <button key={p} className="btn-ghost" style={{ flex: 1, padding: "10px", fontSize: 13 }} onClick={handleSubmit}>{p === "Google" ? "🌐" : "🍎"} {p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentModal = ({ plan, onClose }) => {
  const [method, setMethod] = useState("stripe");
  const [done, setDone] = useState(false);
  const methods = [
    { id: "stripe", label: "💳 Card" },
    { id: "paypal", label: "🅿️ PayPal" },
    { id: "sol", label: "◎ Solana" },
    { id: "usdt", label: "₮ USDT" },
    { id: "gift", label: "🎁 Gift Card" },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20,
        padding: 32, width: "100%", maxWidth: 460, animation: "fadeUp .3s ease",
      }}>
        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <h3 className="bebas" style={{ fontSize: 36, color: "#00ff88" }}>YOU'RE BLOWN UP!</h3>
            <p style={{ color: "var(--muted2)", marginTop: 8, fontSize: 14 }}>Your {plan.name} plan is now active.</p>
            <button className="btn-primary" style={{ marginTop: 24, padding: "12px 28px", fontSize: 14 }} onClick={onClose}>Let's Go 🚀</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Upgrade to {plan.name}</h3>
                <div className="bebas" style={{ fontSize: 28, color: "#ff4500" }}>{plan.price}<span style={{ fontSize: 14, color: "var(--muted)" }}>{plan.period}</span></div>
              </div>
              <button onClick={onClose} style={{ background: "none", color: "var(--muted)", fontSize: 20 }}>✕</button>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
              {methods.map(m => (
                <button key={m.id} onClick={() => setMethod(m.id)} style={{
                  padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                  background: method === m.id ? "rgba(255,69,0,.2)" : "var(--bg)",
                  border: `1px solid ${method === m.id ? "#ff4500" : "var(--border)"}`,
                  color: method === m.id ? "#ff8c00" : "var(--muted2)", cursor: "pointer",
                }}>{m.label}</button>
              ))}
            </div>
            {method === "stripe" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input placeholder="Card number" style={{ background: "var(--bg)", border: "1px solid var(--border2)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}/>
                <div style={{ display: "flex", gap: 10 }}>
                  <input placeholder="MM/YY" style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--border2)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}/>
                  <input placeholder="CVC" style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--border2)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}/>
                </div>
              </div>
            )}
            {method === "sol" && (
              <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>Send exactly <strong style={{ color: "#00ff88" }}>0.42 SOL</strong> to:</p>
                <div className="mono" style={{ fontSize: 11, color: "#9ca3af", wordBreak: "break-all", background: "#0d0d12", padding: 10, borderRadius: 8 }}>7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU</div>
              </div>
            )}
            {method === "usdt" && (
              <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>Send <strong style={{ color: "#26a17b" }}>$9.99 USDT (TRC-20)</strong> to:</p>
                <div className="mono" style={{ fontSize: 11, color: "#9ca3af", wordBreak: "break-all", background: "#0d0d12", padding: 10, borderRadius: 8 }}>TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE</div>
              </div>
            )}
            {method === "paypal" && (
              <div style={{ background: "#003087", borderRadius: 10, padding: 20, textAlign: "center" }}>
                <p style={{ fontSize: 13, color: "#fff" }}>🅿️ You'll be redirected to PayPal to complete payment.</p>
              </div>
            )}
            {method === "gift" && (
              <input placeholder="Enter gift card code (e.g. BLOWN-XXXX-XXXX)" style={{ width: "100%", background: "var(--bg)", border: "1px solid var(--border2)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}/>
            )}
            <button className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: 15, marginTop: 20 }} onClick={() => setDone(true)}>
              🔥 Confirm Payment — {plan.price}{plan.period}
            </button>
            <p style={{ textAlign: "center", fontSize: 11, color: "var(--muted)", marginTop: 10 }}>🔒 Secure & encrypted. Cancel anytime.</p>
          </>
        )}
      </div>
    </div>
  );
};

const AIOptimizer = ({ user }) => {
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [contentType, setContentType] = useState("video");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are BLOWN's viral content AI. Analyze content and return ONLY valid JSON with no markdown:
{
  "viralScore": <integer 0-100>,
  "verdict": "<one punchy line>",
  "improvedCaption": "<improved viral version>",
  "hooks": ["<hook 1>","<hook 2>","<hook 3>"],
  "hashtags": ["#tag1","#tag2","#tag3","#tag4","#tag5","#tag6","#tag7","#tag8"],
  "bestTime": "<best time to post>",
  "tips": ["<tip 1>","<tip 2>","<tip 3>"],
  "weaknesses": ["<weakness 1>","<weakness 2>"]
}
Platform: ${platform}. Content type: ${contentType}.`,
          messages: [{ role: "user", content: `Analyze for ${platform}: "${content}"` }],
        }),
      });
      const data = await resp.json();
      const text = data.content?.[0]?.text || "";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch (e) {
      setResult({
        viralScore: 72, verdict: "Decent foundation — needs a sharper hook.",
        improvedCaption: content + "\n\n[Drop a comment if this helped!] 👇",
        hooks: ["POV: You just discovered...", "Nobody talks about this but...", "This changed everything —"],
        hashtags: ["#viral","#fyp","#creator","#trending","#contentcreator","#growth","#socialmedia","#blown"],
        bestTime: "Tuesday–Thursday, 7–9 PM local time",
        tips: ["Add a text hook in first 2 seconds", "Use trending audio", "End with a clear question"],
        weaknesses: ["No clear hook", "Missing call-to-action"],
      });
    }
    setLoading(false);
  };

  const scoreColor = !result ? "#6b7280" : result.viralScore >= 80 ? "#00ff88" : result.viralScore >= 60 ? "#ffcc00" : "#ff4500";

  return (
    <div>
      <h2 className="bebas" style={{ fontSize: 36, letterSpacing: 1, marginBottom: 4 }}>AI VIRAL OPTIMIZER</h2>
      <p style={{ color: "var(--muted2)", fontSize: 13, marginBottom: 24 }}>Paste your caption or content idea. AI will score and supercharge it.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <select value={platform} onChange={e => setPlatform(e.target.value)} style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
              {PLATFORMS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
            </select>
            <select value={contentType} onChange={e => setContentType(e.target.value)} style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
              {["video","reel","story","post","tweet","article","live"].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
            </select>
          </div>
          <textarea value={content} onChange={e => setContent(e.target.value)}
            placeholder="Paste your caption, script idea, or post text here..."
            style={{ width: "100%", height: 220, background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 12, padding: 16, color: "#fff", fontSize: 14, resize: "none", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}
          />
          <button className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: 15, marginTop: 12 }} onClick={analyze} disabled={loading || !content.trim()}>
            {loading ? "Analyzing..." : "⚡ Analyze & Optimize"}
          </button>
        </div>
        <div>
          {!result && !loading && (
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 32, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <div><div style={{ fontSize: 52, marginBottom: 16 }}>🎯</div><p style={{ color: "var(--muted)", fontSize: 13 }}>Your viral analysis will appear here</p></div>
            </div>
          )}
          {loading && (
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 32, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <div><div style={{ fontSize: 42, marginBottom: 16, animation: "spin 2s linear infinite" }}>⚡</div><p style={{ color: "var(--muted2)", fontSize: 14 }}>AI analyzing your content...</p></div>
            </div>
          )}
          {result && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp .4s ease" }}>
              <div style={{ background: "var(--card)", border: `1px solid ${scoreColor}44`, borderRadius: 16, padding: 20, display: "flex", alignItems: "center", gap: 20 }}>
                <ScoreRing score={result.viralScore} size={100} color={scoreColor} />
                <div><div style={{ fontWeight: 700, fontSize: 13, color: scoreColor, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Viral Score</div><div style={{ fontSize: 13, color: "var(--muted2)", lineHeight: 1.5 }}>{result.verdict}</div></div>
              </div>
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16 }}>
                <div style={{ fontSize: 12, color: "#00ff88", fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>✨ Improved Caption</div>
                <p style={{ fontSize: 13, color: "var(--muted2)", lineHeight: 1.6, fontStyle: "italic" }}>{result.improvedCaption}</p>
              </div>
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16 }}>
                <div style={{ fontSize: 12, color: "#ffcc00", fontWeight: 600, marginBottom: 10, textTransform: "uppercase" }}>🪝 Viral Hooks</div>
                {result.hooks.map((h, i) => <div key={i} style={{ fontSize: 12, color: "var(--muted2)", marginBottom: 6 }}><span style={{ color: "#ff4500" }}>→</span> {h}</div>)}
              </div>
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16 }}>
                <div style={{ fontSize: 12, color: "#a855f7", fontWeight: 600, marginBottom: 10, textTransform: "uppercase" }}>🏷️ Power Hashtags</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {result.hashtags.map(h => <span key={h} style={{ background: "rgba(168,85,247,.15)", border: "1px solid rgba(168,85,247,.3)", borderRadius: 6, padding: "3px 10px", fontSize: 11, color: "#c084fc" }}>{h}</span>)}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 14 }}>
                  <div style={{ fontSize: 11, color: "#3b82f6", fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>⏰ Best Time</div>
                  <div style={{ fontSize: 12, color: "var(--muted2)" }}>{result.bestTime}</div>
                </div>
                <div style={{ background: "var(--card)", border: "1px solid #ff450033", borderRadius: 14, padding: 14 }}>
                  <div style={{ fontSize: 11, color: "#ff4500", fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>⚠️ Weaknesses</div>
                  {result.weaknesses.map((w, i) => <div key={i} style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>• {w}</div>)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout, onNav }) => {
  const [section, setSection] = useState("overview");
  const [payModal, setPayModal] = useState(null);
  const [supportForm, setSupportForm] = useState({ subject: "", message: "", sent: false });

  const navItems = [
    { id: "overview", icon: "⚡", label: "Overview" },
    { id: "optimizer", icon: "🧠", label: "AI Optimizer" },
    { id: "analytics", icon: "📊", label: "Analytics" },
    { id: "billing", icon: "💳", label: "Billing" },
    { id: "support", icon: "💬", label: "Support" },
  ];

  const postStats = [
    { title: "Total Views", value: "2.1M", change: "+34%", color: "#ff4500", icon: "👁" },
    { title: "Viral Posts", value: "18", change: "+6 this month", color: "#00ff88", icon: "🔥" },
    { title: "Avg Score", value: "79", change: "+12 pts", color: "#a855f7", icon: "⚡" },
    { title: "Followers Gained", value: "14.2K", change: "+2.1K this week", color: "#3b82f6", icon: "👥" },
  ];

  const recentPosts = [
    { title: "Morning routine as a full-time creator", platform: "TikTok", score: 91, views: "340K", date: "Mar 7" },
    { title: "5 things I wish I knew before starting YouTube", platform: "YouTube", score: 84, views: "89K", date: "Mar 5" },
    { title: "Why most creators FAIL (honest truth)", platform: "Instagram", score: 76, views: "52K", date: "Mar 3" },
    { title: "My content strategy breakdown", platform: "LinkedIn", score: 68, views: "12K", date: "Mar 1" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {payModal && <PaymentModal plan={payModal} onClose={() => setPayModal(null)} />}
      <div style={{ width: 220, background: "var(--card)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50 }}>
        <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #ff4500, #ff8c00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontFamily: "'Bebas Neue', sans-serif" }}>B</div>
            <span className="bebas" style={{ fontSize: 22, letterSpacing: 2 }}>BLOWN</span>
          </div>
        </div>
        <div style={{ padding: "16px 10px", flex: 1 }}>
          {navItems.map(item => (
            <button key={item.id} className="dash-nav-item" onClick={() => setSection(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10,
              background: section === item.id ? "rgba(255,69,0,.12)" : "transparent",
              color: section === item.id ? "#ff8c00" : "#9ca3af",
              fontWeight: section === item.id ? 600 : 400, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
              border: "none", textAlign: "left", cursor: "pointer", marginBottom: 2,
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "14px 14px 20px", borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #ff4500, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{user.name?.[0]?.toUpperCase()}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{user.name}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", background: "rgba(255,69,0,.15)", border: "1px solid rgba(255,69,0,.3)", borderRadius: 4, padding: "1px 6px", display: "inline-block", marginTop: 2 }}>{user.plan}</div>
            </div>
          </div>
          {user.isAdmin && <button className="btn-ghost" style={{ width: "100%", padding: "8px", fontSize: 12, marginBottom: 8 }} onClick={() => onNav("admin")}>🛡 Admin Panel</button>}
          <button onClick={onLogout} style={{ width: "100%", padding: "8px", fontSize: 12, background: "none", color: "var(--muted)", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Logout</button>
        </div>
      </div>

      <div style={{ marginLeft: 220, flex: 1, padding: "32px 36px", minHeight: "100vh" }}>
        {section === "overview" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <h2 className="bebas" style={{ fontSize: 38, letterSpacing: 1, marginBottom: 4 }}>WELCOME BACK, {user.name?.toUpperCase()} 🔥</h2>
            <p style={{ color: "var(--muted2)", fontSize: 13, marginBottom: 28 }}>Your content is on fire. Keep pushing.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
              {postStats.map(s => (
                <div key={s.title} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>{s.title}</div>
                    <span style={{ fontSize: 18 }}>{s.icon}</span>
                  </div>
                  <div className="bebas" style={{ fontSize: 36, color: s.color, letterSpacing: -1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#00ff88", marginTop: 4 }}>↑ {s.change}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>Recent Posts Performance</h3>
              {recentPosts.map(p => {
                const col = p.score >= 80 ? "#00ff88" : p.score >= 65 ? "#ffcc00" : "#ff4500";
                const PlatIcon = PLATFORMS.find(pl => pl.name === p.platform)?.Icon;
                return (
                  <div key={p.title} className="ticket-item" style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 10, marginBottom: 6, border: "1px solid transparent" }}>
                    <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>{PlatIcon && <PlatIcon size={22} />}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{p.title}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{p.platform} · {p.date} · {p.views} views</div>
                    </div>
                    <ScoreRing score={p.score} size={44} color={col} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {section === "optimizer" && <AIOptimizer user={user} />}
        {section === "analytics" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <h2 className="bebas" style={{ fontSize: 36, letterSpacing: 1, marginBottom: 24 }}>ANALYTICS</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {["TikTok","Instagram","YouTube","X / Twitter"].map((pl, i) => {
                const score = [88, 74, 62, 55][i];
                const Icon = PLATFORMS.find(p => p.name === pl)?.Icon;
                const col = PLATFORMS.find(p => p.name === pl)?.color || "#ff4500";
                return (
                  <div key={pl} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>{Icon && <Icon size={24} />}<span style={{ fontWeight: 600, fontSize: 14 }}>{pl}</span></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                      <ScoreRing score={score} size={80} color={col} />
                      <div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>Avg viral score</div>
                        <div style={{ fontSize: 12, color: "#00ff88" }}>↑ Growing</div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 8 }}>Posts: {[32, 18, 9, 14][i]}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>Views: {["1.4M","340K","89K","55K"][i]}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {section === "billing" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <h2 className="bebas" style={{ fontSize: 36, letterSpacing: 1, marginBottom: 8 }}>BILLING & PLANS</h2>
            <p style={{ color: "var(--muted2)", fontSize: 13, marginBottom: 28 }}>Current plan: <strong style={{ color: "#ff4500" }}>{user.plan}</strong></p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {PLANS.map(plan => (
                <div key={plan.name} style={{ background: plan.popular ? "linear-gradient(160deg, #0f0f15, #1a0d00)" : "var(--card)", border: `1px solid ${user.plan === plan.name ? plan.color : "var(--border)"}`, borderRadius: 18, padding: 22, position: "relative" }}>
                  {user.plan === plan.name && <div style={{ position: "absolute", top: -10, right: 14, background: "#00ff88", color: "#000", fontSize: 10, fontWeight: 700, borderRadius: 100, padding: "3px 10px" }}>CURRENT</div>}
                  <div style={{ fontWeight: 700, fontSize: 13, color: plan.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{plan.name}</div>
                  <div className="bebas" style={{ fontSize: 36, letterSpacing: -1, marginBottom: 16 }}>{plan.price}<span style={{ fontSize: 13, color: "var(--muted)" }}>{plan.period}</span></div>
                  {plan.features.slice(0, 4).map(f => <div key={f} style={{ fontSize: 12, color: "var(--muted2)", marginBottom: 6 }}>✓ {f}</div>)}
                  <button className={plan.popular ? "btn-primary" : "btn-ghost"} style={{ width: "100%", padding: "11px", fontSize: 13, marginTop: 16 }}
                    onClick={() => user.plan !== plan.name && plan.price !== "Free" && setPayModal(plan)} disabled={user.plan === plan.name}>
                    {user.plan === plan.name ? "Active" : plan.price === "Free" ? "Downgrade" : plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {section === "support" && (
          <div style={{ animation: "fadeUp .4s ease", maxWidth: 580 }}>
            <h2 className="bebas" style={{ fontSize: 36, letterSpacing: 1, marginBottom: 8 }}>SUPPORT</h2>
            <p style={{ color: "var(--muted2)", fontSize: 13, marginBottom: 28 }}>We respond within 24h · <a href="mailto:justinbrandford6@gmail.com" style={{ color: "#ff4500" }}>justinbrandford6@gmail.com</a></p>
            {supportForm.sent ? (
              <div style={{ background: "rgba(0,255,136,.08)", border: "1px solid rgba(0,255,136,.3)", borderRadius: 16, padding: 32, textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                <h3 style={{ fontWeight: 700, color: "#00ff88", marginBottom: 8 }}>Ticket Submitted!</h3>
                <p style={{ color: "var(--muted2)", fontSize: 13 }}>We'll reply within 24 hours.</p>
                <button className="btn-ghost" style={{ marginTop: 20, padding: "10px 24px", fontSize: 13 }} onClick={() => setSupportForm({ subject: "", message: "", sent: false })}>Submit Another</button>
              </div>
            ) : (
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Subject</label>
                  <input value={supportForm.subject} onChange={e => setSupportForm(p => ({...p, subject: e.target.value}))} placeholder="What's going on?"
                    style={{ width: "100%", background: "var(--bg)", border: "1px solid var(--border2)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}/>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Message</label>
                  <textarea value={supportForm.message} onChange={e => setSupportForm(p => ({...p, message: e.target.value}))} placeholder="Describe your issue..."
                    style={{ width: "100%", height: 160, background: "var(--bg)", border: "1px solid var(--border2)", borderRadius: 10, padding: 14, color: "#fff", fontSize: 14, resize: "none", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}/>
                </div>
                <button className="btn-primary" style={{ width: "100%", padding: "13px", fontSize: 14 }} onClick={() => setSupportForm(p => ({...p, sent: true}))}>📨 Submit Ticket</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const AdminPanel = ({ onBack }) => {
  const [section, setSection] = useState("dashboard");
  const [search, setSearch] = useState("");
  const navItems = [
    { id: "dashboard", icon: "⚡", label: "Dashboard" },
    { id: "users", icon: "👥", label: "Users" },
    { id: "revenue", icon: "💰", label: "Revenue" },
    { id: "tickets", icon: "🎫", label: "Support Tickets" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];
  const filteredUsers = MOCK_USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ width: 220, background: "#080810", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50 }}>
        <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #ff4500, #ff8c00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontFamily: "'Bebas Neue', sans-serif" }}>B</div>
            <span className="bebas" style={{ fontSize: 22, letterSpacing: 2 }}>BLOWN</span>
          </div>
          <div style={{ fontSize: 10, color: "#ff4500", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>🛡 Admin Panel</div>
        </div>
        <div style={{ padding: "16px 10px", flex: 1 }}>
          {navItems.map(item => (
            <button key={item.id} className="dash-nav-item" onClick={() => setSection(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10,
              background: section === item.id ? "rgba(255,69,0,.12)" : "transparent",
              color: section === item.id ? "#ff8c00" : "#9ca3af",
              fontWeight: section === item.id ? 600 : 400, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
              border: "none", textAlign: "left", cursor: "pointer", marginBottom: 2,
            }}><span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}</button>
          ))}
        </div>
        <div style={{ padding: "14px 14px 20px", borderTop: "1px solid var(--border)" }}>
          <button className="btn-ghost" style={{ width: "100%", padding: "8px", fontSize: 12 }} onClick={onBack}>← Back to Dashboard</button>
        </div>
      </div>

      <div style={{ marginLeft: 220, flex: 1, padding: "32px 36px" }}>
        {section === "dashboard" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <h2 className="bebas" style={{ fontSize: 38, letterSpacing: 1, marginBottom: 24 }}>ADMIN OVERVIEW</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
              {[
                { label: "Total Users", value: "50,241", change: "+1,204 this week", color: "#ff4500", icon: "👥" },
                { label: "Monthly Revenue", value: "$41,329", change: "+22% vs last month", color: "#00ff88", icon: "💰" },
                { label: "Active Subscriptions", value: "12,847", change: "+890 new", color: "#a855f7", icon: "⚡" },
                { label: "Open Tickets", value: "23", change: "4 high priority", color: "#f59e0b", icon: "🎫" },
              ].map(s => (
                <div key={s.label} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>{s.label}</div>
                    <span>{s.icon}</span>
                  </div>
                  <div className="bebas" style={{ fontSize: 32, color: s.color, letterSpacing: -1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "var(--muted2)", marginTop: 4 }}>{s.change}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Platform Distribution</h3>
              {[["TikTok","#ff0050",34],["Instagram","#e6683c",28],["YouTube","#FF0000",18],["X / Twitter","#fff",12],["Other","#6b7280",8]].map(([name, color, pct]) => (
                <div key={name} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
                    <span style={{ color: "var(--muted2)" }}>{name}</span><span style={{ color }}>{pct}%</span>
                  </div>
                  <div style={{ height: 6, background: "var(--border)", borderRadius: 3 }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {section === "users" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 className="bebas" style={{ fontSize: 38, letterSpacing: 1 }}>USERS</h2>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search users..."
                style={{ background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 10, padding: "10px 16px", color: "#fff", fontSize: 13, fontFamily: "'DM Sans', sans-serif", width: 240 }}/>
            </div>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Name","Email","Plan","Posts","Joined","Status","Actions"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 500 }}>{u.name}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--muted2)" }}>{u.email}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6,
                          background: u.plan === "Agency" ? "rgba(59,130,246,.2)" : u.plan === "Pro" ? "rgba(168,85,247,.2)" : u.plan === "Creator" ? "rgba(255,69,0,.2)" : "rgba(107,114,128,.2)",
                          color: u.plan === "Agency" ? "#60a5fa" : u.plan === "Pro" ? "#c084fc" : u.plan === "Creator" ? "#fb923c" : "#9ca3af",
                        }}>{u.plan}</span>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--muted2)" }}>{u.posts}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--muted)" }}>{u.joined}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
                          background: u.status === "active" ? "rgba(0,255,136,.15)" : "rgba(245,158,11,.15)",
                          color: u.status === "active" ? "#00ff88" : "#f59e0b", textTransform: "uppercase" }}>{u.status}</span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <button style={{ background: "none", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "var(--muted)", cursor: "pointer" }}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {section === "revenue" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <h2 className="bebas" style={{ fontSize: 38, letterSpacing: 1, marginBottom: 24 }}>REVENUE</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
              {[{ label: "MRR", value: "$41,329", color: "#00ff88" },{ label: "ARR", value: "$495,948", color: "#a855f7" },{ label: "Churn Rate", value: "2.1%", color: "#ff4500" }].map(s => (
                <div key={s.label} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>{s.label}</div>
                  <div className="bebas" style={{ fontSize: 42, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Revenue by Plan</h3>
              {[["Agency","$99.99 × 312","$31,196","#3b82f6"],["Pro","$29.99 × 248","$7,438","#a855f7"],["Creator","$9.99 × 467","$4,665","#ff4500"]].map(([plan, calc, total, color]) => (
                <div key={plan} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
                  <div><div style={{ fontWeight: 600, fontSize: 14, color }}>{plan}</div><div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{calc}</div></div>
                  <div className="bebas" style={{ fontSize: 28, color }}>{total}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {section === "tickets" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <h2 className="bebas" style={{ fontSize: 38, letterSpacing: 1, marginBottom: 24 }}>SUPPORT TICKETS</h2>
            {MOCK_TICKETS.map(t => (
              <div key={t.id} className="ticket-item" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{t.id}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 5,
                        background: t.priority === "high" ? "rgba(255,69,0,.2)" : t.priority === "medium" ? "rgba(245,158,11,.2)" : "rgba(107,114,128,.2)",
                        color: t.priority === "high" ? "#ff4500" : t.priority === "medium" ? "#f59e0b" : "#9ca3af", textTransform: "uppercase" }}>{t.priority}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 5,
                        background: t.status === "open" ? "rgba(255,69,0,.15)" : t.status === "in-progress" ? "rgba(59,130,246,.15)" : "rgba(0,255,136,.15)",
                        color: t.status === "open" ? "#fb923c" : t.status === "in-progress" ? "#60a5fa" : "#00ff88", textTransform: "uppercase" }}>{t.status}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{t.subject}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{t.user} · <a href={`mailto:${t.email}`} style={{ color: "#ff4500" }}>{t.email}</a> · {t.date}</div>
                  </div>
                  <a href={`mailto:${t.email}?subject=Re: ${t.subject}&body=Hi ${t.user},%0D%0A%0D%0AThank you for reaching out to BLOWN support.%0D%0A%0D%0A`}>
                    <button style={{ background: "rgba(255,69,0,.15)", border: "1px solid rgba(255,69,0,.3)", borderRadius: 8, padding: "8px 16px", fontSize: 12, color: "#ff8c00", fontWeight: 600, marginLeft: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>📧 Reply</button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        {section === "settings" && (
          <div style={{ animation: "fadeUp .4s ease", maxWidth: 560 }}>
            <h2 className="bebas" style={{ fontSize: 38, letterSpacing: 1, marginBottom: 24 }}>SETTINGS</h2>
            {[{ label: "Admin Email", value: "justinbrandford6@gmail.com" },{ label: "Support Email", value: "justinbrandford6@gmail.com" },{ label: "Platform Name", value: "BLOWN" },{ label: "Support SLA (hours)", value: "24" }].map(s => (
              <div key={s.label} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>{s.label}</label>
                <input defaultValue={s.value} style={{ width: "100%", background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}/>
              </div>
            ))}
            <button className="btn-primary" style={{ padding: "12px 24px", fontSize: 14 }}>Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function BlownApp() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage(userData.isAdmin ? "admin" : "dashboard");
  };
  const handleLogout = () => { setUser(null); setPage("landing"); };

  return (
    <>
      <GlobalStyles />
      {page === "landing" && <LandingPage onNav={setPage} />}
      {page === "auth" && <AuthPage onNav={setPage} onLogin={handleLogin} />}
      {page === "dashboard" && user && <Dashboard user={user} onLogout={handleLogout} onNav={setPage} />}
      {page === "admin" && <AdminPanel onBack={() => setPage(user?.isAdmin ? "dashboard" : "landing")} />}
    </>
  );
}
