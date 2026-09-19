:root {
    --schwab-blue: #00a0df;
    --schwab-blue-dark: #4cc2ff;
    --schwab-navy: #0b1f3a;
    --bg-color: #070d18;
    --card-bg: rgba(255, 255, 255, 0.045);
    --text-main: #eaf1fb;
    --text-secondary: #8fa3c4;
    --muted: #64789a;
    --border-color: rgba(255, 255, 255, 0.08);
    --green: #34d399;
    --red: #f87171;
    --shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
    --content-max: 480px;
    --page-pad: 18px;
    --nav-height: 68px;
    --radius-lg: 18px;
    --radius-md: 14px;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
}

html,
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: var(--bg-color);
    color: var(--text-main);
}

body {
    overscroll-behavior: none;
}

button,
input,
select {
    font: inherit;
}

button {
    -webkit-appearance: none;
}

#app-root {
    width: 100%;
    max-width: var(--content-max);
    height: 100dvh;
    min-height: 100dvh;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    isolation: isolate;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    background:
        radial-gradient(120% 70% at 85% -10%, rgba(30, 58, 105, 0.55), transparent 60%),
        radial-gradient(100% 60% at 0% 110%, rgba(13, 34, 66, 0.6), transparent 60%),
        var(--bg-color);
}

#main-view {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: calc(var(--nav-height) + 24px);
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
}

#main-view::-webkit-scrollbar,
body::-webkit-scrollbar {
    display: none;
}

.hidden {
    display: none !important;
}

.eyebrow {
    display: block;
    font-size: 11px;
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--schwab-blue-dark);
    opacity: 0.85;
}

/* Login */
.login-screen {
    position: absolute;
    inset: 0;
    z-index: 20;
    height: 100%;
    min-height: 100%;
    padding: 0 var(--page-pad);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    color: #eaf1fb;
    background:
        radial-gradient(120% 90% at 85% -10%, rgba(99, 102, 241, 0.28), transparent 60%),
        radial-gradient(120% 90% at -10% 110%, rgba(0, 160, 223, 0.25), transparent 60%),
        linear-gradient(180deg, #0b1f3a 0%, #0e2646 55%, #123055 100%);
}

/* Layer 1: light sweep passing over */
.login-screen::before {
    content: "";
    position: absolute;
    inset: -20%;
    background: linear-gradient(115deg,
        transparent 30%,
        rgba(0, 160, 223, 0.14) 45%,
        rgba(139, 92, 246, 0.12) 60%,
        transparent 75%);
    background-size: 220% 220%;
    animation: loginSweep 12s ease-in-out infinite alternate;
    pointer-events: none;
}

/* Layer 2: drifting glow blob */
.login-screen::after {
    content: "";
    position: absolute;
    width: 75vmax;
    height: 75vmax;
    left: -28vmax;
    top: -32vmax;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 160, 223, 0.28), transparent 70%);
    box-shadow: 62vmax 48vmax 70px 16vmax rgba(139, 92, 246, 0.16);
    animation: loginBlob 24s ease-in-out infinite alternate;
    pointer-events: none;
}

.login-shell {
    position: relative;
    z-index: 1;
    width: min(100%, 390px);
    padding: 24px 0;
}

.login-header {
    text-align: center;
    margin-bottom: 30px;
}

.brand-mark {
    width: 64px;
    height: 64px;
    margin: 0 auto 18px;
    border-radius: 16px;
    background: var(--schwab-blue);
    box-shadow: 0 10px 24px rgba(0, 160, 223, 0.2);
}

.brand-mark img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border-radius: inherit;
}

/* Logo: drops in from above the viewport, bounces, then floats */
.login-header .brand-mark {
    position: relative;
    width: 84px;
    height: 84px;
    margin: 0 auto 20px;
    border-radius: 22px;
    box-shadow:
        0 18px 40px rgba(0, 0, 0, 0.45),
        0 0 40px rgba(0, 160, 223, 0.35),
        inset 0 0 0 1px rgba(255, 255, 255, 0.12);
    animation:
        logoDrop 1s cubic-bezier(0.5, 0.05, 0.3, 1) 0.15s backwards,
        logoFloat 5.5s ease-in-out 1.9s infinite;
}

/* Landing ring pulse on impact */
.login-header .brand-mark::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 2px solid rgba(0, 160, 223, 0.7);
    pointer-events: none;
    animation: logoRing 0.9s ease-out 0.95s both;
}

.login-header .eyebrow {
    color: #7fb2e5;
    opacity: 1;
    animation: loginRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.5s backwards;
}

.login-header h1 {
    margin-top: 8px;
    font-size: 28px;
    line-height: 1.08;
    letter-spacing: -0.03em;
    color: #fff;
    background: linear-gradient(90deg, #ffffff 20%, #8fd4ff 50%, #ffffff 80%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation:
        loginRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.62s backwards,
        loginShine 6s linear 1.8s infinite;
}

.login-header p {
    margin-top: 9px;
    color: rgba(234, 241, 251, 0.65);
    font-size: 14px;
    animation: loginRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.72s backwards;
}

.login-form {
    width: 100%;
}

/* Glass card around the form */
.login-screen .login-form {
    padding: 22px 18px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius-lg);
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
    animation: loginRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.85s backwards;
}

/* Dark-theme overrides for the shared form styles */
.login-screen .input-group label {
    color: rgba(234, 241, 251, 0.75);
}

.login-screen .input-group input {
    border-color: rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.07);
    color: #eaf1fb;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.login-screen .input-group input::placeholder {
    color: rgba(234, 241, 251, 0.35);
}

.login-screen .input-group input:focus {
    border-color: rgba(0, 160, 223, 0.8);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 4px rgba(0, 160, 223, 0.18);
}

/* Keep autofill readable on the dark background */
.login-screen .input-group input:-webkit-autofill {
    -webkit-text-fill-color: #eaf1fb;
    -webkit-box-shadow: 0 0 0 1000px #10294a inset;
    transition: background-color 9999s ease-in-out 0s;
}

.login-screen .login-button {
    margin-top: 22px;
    background: linear-gradient(120deg, #00a0df, #4f7cff 55%, #8b5cf6);
    background-size: 200% 200%;
    box-shadow: 0 12px 30px rgba(0, 160, 223, 0.35);
    animation: loginBtnShift 7s ease infinite;
}

.login-screen .login-button:hover {
    filter: brightness(1.07);
}

.login-screen .login-options a {
    color: #6fc4f5;
}

.login-options {
    text-align: center;
    margin-top: 16px;
}

.login-options a,
.header-link {
    color: var(--schwab-blue-dark);
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
}

@keyframes loginSweep {
    from { background-position: 0% 50%; }
    to   { background-position: 100% 50%; }
}

@keyframes loginBlob {
    to { transform: translate(14vmax, 10vmax) scale(1.18); }
}

@keyframes logoDrop {
    0%   { transform: translateY(-110vh); opacity: 0; }
    10%  { opacity: 1; }
    75%  { transform: translateY(14px); }
    87%  { transform: translateY(-8px); }
    94%  { transform: translateY(4px); }
    100% { transform: translateY(0); opacity: 1; }
}

@keyframes logoRing {
    from { opacity: 0.9; transform: scale(0.7); }
    to   { opacity: 0;   transform: scale(1.8); }
}

@keyframes logoFloat {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-6px); }
}

@keyframes loginRise {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
}

@keyframes loginShine {
    to { background-position: 200% center; }
}

@keyframes loginBtnShift {
    0%, 100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
}

/* Main shell */
.page {
    min-height: 100%;
}

.content-shell {
    width: 100%;
    padding: 20px var(--page-pad) 28px;
}

.no-top-padding {
    padding-top: 6px;
}

.page-enter {
    animation: pageEnter 220ms ease-out;
}

@keyframes pageEnter {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Shared entrance for page children (only when animating) */
.page-enter .hero-topline,
.page-enter .sticky-page-header,
.page-enter .metric-strip,
.page-enter .market-summary-grid {
    animation: heroIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

.page-enter .hero-topline { animation-delay: 0.05s; }
.page-enter .sticky-page-header { animation-delay: 0.02s; }
.page-enter .metric-strip,
.page-enter .market-summary-grid { animation-delay: 0.1s; }

@keyframes heroIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
}

/* Dashboard */
.dashboard-page {
    min-height: 100%;
}

.dashboard-hero {
    position: relative;
    overflow: hidden;
    width: 100%;
    color: #fff;
    padding: 24px var(--page-pad) 20px;
    border-radius: 0 0 24px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    background:
        radial-gradient(120% 100% at 85% -20%, rgba(99, 102, 241, 0.35), transparent 55%),
        radial-gradient(100% 90% at -10% 120%, rgba(0, 160, 223, 0.3), transparent 55%),
        linear-gradient(180deg, #0d2140 0%, #0b1f3a 100%);
}

/* Slow light sweep over the hero */
.dashboard-hero::before {
    content: "";
    position: absolute;
    inset: -20%;
    background: linear-gradient(115deg,
        transparent 32%,
        rgba(0, 160, 223, 0.1) 48%,
        rgba(139, 92, 246, 0.09) 62%,
        transparent 78%);
    background-size: 220% 220%;
    animation: loginSweep 16s ease-in-out infinite alternate;
    pointer-events: none;
}

.dashboard-hero > * {
    position: relative;
    z-index: 1;
}

.hero-topline {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
}

.hero-topline h1 {
    margin-top: 5px;
    font-size: 21px;
    line-height: 1.2;
}

.hero-side {
    display: flex;
    align-items: center;
    gap: 10px;
}

.hero-action,
.icon-button {
    width: 38px;
    height: 38px;
    border: 1px solid rgba(255,255,255,0.16);
    background: rgba(255,255,255,0.08);
    color: #fff;
    border-radius: 12px;
    transition: background 0.2s ease, transform 0.15s ease;
}

.icon-button:active {
    transform: scale(0.94);
}

.net-worth {
    margin-top: 18px;
    font-size: clamp(34px, 10vw, 44px);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.045em;
    background: linear-gradient(90deg, #ffffff 20%, #8fd4ff 50%, #ffffff 80%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation:
        heroIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.12s backwards,
        loginShine 6s linear 1.6s infinite;
}

.gain-line {
    display: inline-flex;
    align-items: center;
    margin-top: 14px;
    padding: 7px 12px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    animation: heroIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.18s backwards;
}

.gain-positive { color: var(--green); }
.gain-negative { color: var(--red); }
.dashboard-hero .gain-positive { color: #6fe49c; }
.dashboard-hero .gain-negative { color: #ff9b95; }

.portfolio-chart {
    height: 138px;
    margin: 18px -4px 0;
    animation: heroIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.24s backwards;
}

.portfolio-chart svg {
    width: 100%;
    height: 100%;
    display: block;
    overflow: visible;
}

.chart-line,
.chart-fill,
.chart-dot {
    stroke: rgba(255,255,255,0.95);
}

.chart-line {
    fill: none;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(0 8px 14px rgba(0, 160, 223, 0.4));
}

.chart-fill {
    fill: url(#portfolioFill);
    stroke: none;
}

.chart-dot {
    fill: #fff;
    stroke-width: 2;
    filter: drop-shadow(0 0 8px rgba(0, 160, 223, 0.8));
}

/* Chart draws itself in on animated renders */
.page-enter .chart-line {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: chartDraw 1.3s cubic-bezier(0.4, 0, 0.2, 1) 0.35s forwards;
}

.page-enter .chart-fill {
    opacity: 0;
    animation: chartFill 0.8s ease 0.95s forwards;
}

@keyframes chartDraw {
    to { stroke-dashoffset: 0; }
}

@keyframes chartFill {
    to { opacity: 1; }
}

.section-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
    animation: heroIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.26s backwards;
}

.section-heading h2,
.section-heading h3 {
    margin-top: 4px;
}

.section-heading.compact {
    align-items: center;
    margin-bottom: 10px;
}

.section-value {
    font-size: 12px;
    color: var(--text-secondary);
}

.account-stack {
    display: grid;
    gap: 10px;
}

.page-enter .account-stack > * {
    animation: heroIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

.page-enter .account-stack > :nth-child(1) { animation-delay: 0.3s; }
.page-enter .account-stack > :nth-child(2) { animation-delay: 0.36s; }
.page-enter .account-stack > :nth-child(3) { animation-delay: 0.42s; }
.page-enter .account-stack > :nth-child(4) { animation-delay: 0.48s; }

.page-enter .quick-actions {
    animation: heroIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.44s backwards;
}

.card,
.account-card,
.trade-quote-card,
.trade-form-card,
.order-card,
.details-card,
.info-card,
.notice-card,
.local-state-note {
    width: 100%;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}

.account-card {
    appearance: none;
    position: relative;
    text-align: left;
    padding: 17px;
    cursor: pointer;
    color: var(--text-main);
    transition: transform 0.15s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.account-card:hover {
    transform: translateY(-2px);
    border-color: rgba(0, 160, 223, 0.35);
    background: rgba(255, 255, 255, 0.06);
}

.card-chevron {
    position: absolute;
    right: 16px;
    top: 18px;
    color: var(--muted);
    font-size: 22px;
    line-height: 1;
}

.card-topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-right: 20px;
}

.card-topline h3 {
    font-size: 16px;
}

.account-number {
    font-size: 11px;
    color: var(--text-secondary);
}

.balance {
    margin-top: 14px;
    font-size: 23px;
    font-weight: 650;
    letter-spacing: -0.03em;
}

.sub,
.account-meta {
    margin-top: 5px;
    font-size: 12px;
    color: var(--text-secondary);
}

.account-meta {
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid var(--border-color);
}

.quick-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 18px;
}

.quick-action {
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 14px;
    padding: 14px 8px;
    color: var(--text-main);
    display: grid;
    justify-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 600;
    transition: transform 0.15s ease, border-color 0.2s ease;
}

.quick-action:hover {
    transform: translateY(-2px);
    border-color: rgba(0, 160, 223, 0.35);
}

.quick-icon {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, rgba(0, 160, 223, 0.25), rgba(139, 92, 246, 0.25));
    border: 1px solid rgba(0, 160, 223, 0.3);
    color: #7dd3fc;
    font-size: 18px;
}

/* Shared page headers */
.sticky-page-header {
    position: sticky;
    top: 0;
    z-index: 12;
    min-height: 66px;
    padding: 15px var(--page-pad);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: rgba(7, 13, 24, 0.82);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
}

.sticky-page-header h2 {
    margin-top: 3px;
    font-size: 22px;
    line-height: 1.05;
    letter-spacing: -0.03em;
}

.quote-header {
    justify-content: flex-start;
}

.quote-header .header-link {
    margin-left: auto;
}

.quote-heading {
    min-width: 0;
}

.back-button {
    width: 36px;
    height: 36px;
    flex: 0 0 auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 11px;
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-main);
    font-size: 27px;
    line-height: 1;
    transition: background 0.2s ease;
}

.back-button:active {
    transform: scale(0.94);
}

.header-link {
    background: none;
    border: 0;
    padding: 7px 0;
}

/* Metrics / positions */
.metric-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.metric-strip > div {
    min-width: 0;
    padding: 13px 10px;
    background: rgba(11, 31, 58, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #fff;
}

.metric-strip span {
    display: block;
    font-size: 10px;
    color: rgba(255,255,255,0.6);
}

.metric-strip strong {
    display: block;
    margin-top: 4px;
    font-size: 13px;
    white-space: nowrap;
}

.list-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--text-secondary);
    font-size: 12px;
    padding: 8px 2px 10px;
}

.position-list {
    overflow: hidden;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}

.position-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px;
    border: 0;
    border-bottom: 1px solid var(--border-color);
    background: transparent;
    text-align: left;
    color: var(--text-main);
    transition: background-color 0.15s ease, transform 0.1s ease;
}

.position-row:hover {
    background: rgba(255, 255, 255, 0.04);
}

.position-row:last-child {
    border-bottom: 0;
}

/* Staggered entrance on animated renders (opacity only, keeps :active transforms working) */
.page-enter .position-row {
    animation: rowIn 0.4s ease backwards;
}

.page-enter .position-row:nth-child(1) { animation-delay: 0.08s; }
.page-enter .position-row:nth-child(2) { animation-delay: 0.12s; }
.page-enter .position-row:nth-child(3) { animation-delay: 0.16s; }
.page-enter .position-row:nth-child(4) { animation-delay: 0.2s; }
.page-enter .position-row:nth-child(5) { animation-delay: 0.24s; }
.page-enter .position-row:nth-child(6) { animation-delay: 0.28s; }
.page-enter .position-row:nth-child(7) { animation-delay: 0.32s; }
.page-enter .position-row:nth-child(8) { animation-delay: 0.36s; }
.page-enter .position-row:nth-child(n+9) { animation-delay: 0.4s; }

@keyframes rowIn {
    from { opacity: 0; }
}

.position-main {
    min-width: 0;
}

.symbol-line {
    display: flex;
    gap: 8px;
    align-items: center;
}

.sym {
    font-weight: 700;
    letter-spacing: 0.01em;
}

.shares-pill {
    padding: 3px 8px;
    border-radius: 999px;
    background: rgba(0, 160, 223, 0.14);
    border: 1px solid rgba(0, 160, 223, 0.25);
    color: #7dd3fc;
    font-size: 10px;
    font-weight: 600;
}

.desc {
    margin-top: 3px;
    font-size: 12px;
    color: var(--text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.position-main .sub {
    margin-top: 8px;
    font-size: 11px;
}

.position-right {
    min-width: 122px;
    text-align: right;
}

.position-right .val {
    font-weight: 650;
}

.position-right .pl {
    margin-top: 3px;
    font-size: 11px;
    white-space: nowrap;
}

.position-right .muted {
    opacity: 0.75;
}

/* Quote */
.quote-hero {
    text-align: center;
    padding: 10px 0 24px;
}

.quote-hero .desc {
    white-space: normal;
}

.quote-price {
    margin-top: 8px;
    font-size: 42px;
    font-weight: 700;
    letter-spacing: -0.045em;
    background: linear-gradient(90deg, #ffffff 20%, #8fd4ff 50%, #ffffff 80%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: loginShine 6s linear infinite;
}

.quote-change {
    display: inline-flex;
    align-items: center;
    margin-top: 10px;
    padding: 7px 12px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
}

.quote-change.gain-positive {
    background: rgba(52, 211, 153, 0.12);
    border: 1px solid rgba(52, 211, 153, 0.28);
}

.quote-change.gain-negative {
    background: rgba(248, 113, 113, 0.12);
    border: 1px solid rgba(248, 113, 113, 0.28);
}

.quote-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.quote-grid > div,
.info-card > div,
.details-card > div {
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 14px;
    background: var(--card-bg);
}

.quote-grid span,
.info-card span,
.details-card span {
    display: block;
    color: var(--text-secondary);
    font-size: 11px;
}

.quote-grid strong,
.info-card strong,
.details-card strong {
    display: block;
    margin-top: 5px;
    font-size: 15px;
}

.info-card,
.details-card {
    display: grid;
    gap: 10px;
    margin-top: 12px;
    box-shadow: none;
    background: transparent;
    border: 0;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
}

.primary-button,
.secondary-button {
    width: 100%;
    min-height: 52px;
    border-radius: 999px;
    border: 0;
    font-size: 16px;
    font-weight: 650;
    cursor: pointer;
}

.primary-button {
    margin-top: 16px;
    color: #fff;
    background: linear-gradient(120deg, #00a0df, #4f7cff 55%, #8b5cf6);
    background-size: 200% 200%;
    animation: loginBtnShift 7s ease infinite;
    box-shadow: 0 10px 26px rgba(0, 160, 223, 0.3);
    transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

.primary-button:hover {
    filter: brightness(1.07);
    box-shadow: 0 14px 32px rgba(0, 160, 223, 0.4);
}

.primary-button:active,
.secondary-button:active,
.quick-action:active,
.position-row:active,
.account-card:active {
    transform: translateY(1px);
}

.secondary-button {
    margin-top: 18px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-main);
}

/* Forms */
.input-group {
    margin-bottom: 18px;
}

.input-group label,
.field-label {
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
    color: var(--text-secondary);
    font-weight: 600;
}

.input-group input,
.large-input,
.symbol-input {
    width: 100%;
    min-height: 50px;
    padding: 13px 14px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    outline: 0;
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-main);
    font-size: 16px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.input-group input::placeholder,
.large-input::placeholder,
.symbol-input::placeholder {
    color: var(--muted);
}

.input-group input:focus,
.large-input:focus,
.symbol-input:focus {
    border-color: rgba(0, 160, 223, 0.8);
    background: rgba(255, 255, 255, 0.09);
    box-shadow: 0 0 0 4px rgba(0, 160, 223, 0.16);
}

input:-webkit-autofill {
    -webkit-text-fill-color: var(--text-main);
    -webkit-box-shadow: 0 0 0 1000px #101b31 inset;
    transition: background-color 9999s ease-in-out 0s;
}

select.large-input option {
    background: #0e1a30;
    color: var(--text-main);
}

/* Trade */
.market-pill {
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 650;
    white-space: nowrap;
}

.market-open {
    background: rgba(52, 211, 153, 0.14);
    border: 1px solid rgba(52, 211, 153, 0.3);
    color: #4ade80;
}

.market-closed {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: var(--text-secondary);
}

.trade-shell {
    padding-top: 18px;
}

.segmented-control {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 4px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--border-color);
}

.segment {
    min-height: 40px;
    border: 0;
    border-radius: 10px;
    background: transparent;
    color: var(--text-secondary);
    font-weight: 650;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.segment.selected {
    background: rgba(255, 255, 255, 0.12);
    color: var(--text-main);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Buy/Sell tint the active segment */
#trade-side .segment.selected[data-side="BUY"] {
    background: rgba(52, 211, 153, 0.16);
    color: #4ade80;
}

#trade-side .segment.selected[data-side="SELL"] {
    background: rgba(248, 113, 113, 0.16);
    color: #f87171;
}

.trade-quote-card,
.trade-form-card,
.order-card,
.notice-card,
.local-state-note {
    margin-top: 12px;
    padding: 16px;
}

.trade-quote-card {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 12px;
}

.symbol-input {
    margin-top: 7px;
    min-height: 44px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.trade-price-block {
    text-align: right;
}

.trade-price-block span {
    display: block;
    color: var(--text-secondary);
    font-size: 11px;
}

.trade-price-block strong {
    display: block;
    margin-top: 6px;
    font-size: 17px;
}

.trade-form-card {
    display: grid;
    gap: 2px;
}

.trade-form-card .field-label:not(:first-child) {
    margin-top: 14px;
}

.large-input {
    min-height: 50px;
}

.trade-summary {
    display: grid;
    gap: 10px;
    margin-top: 18px;
    padding-top: 14px;
    border-top: 1px solid var(--border-color);
}

.trade-summary div {
    display: flex;
    justify-content: space-between;
    gap: 12px;
}

.trade-summary span {
    color: var(--text-secondary);
    font-size: 12px;
}

.trade-summary strong {
    font-size: 13px;
}

.local-state-note,
.notice-card {
    display: grid;
    gap: 4px;
    background: rgba(0, 160, 223, 0.06);
    border-color: rgba(0, 160, 223, 0.18);
    box-shadow: none;
    font-size: 12px;
    color: var(--text-secondary);
}

.local-state-note strong {
    color: var(--text-main);
}

.order-card {
    text-align: center;
    position: relative;
    overflow: hidden;
    padding: 26px 18px;
}

/* Gradient accent line across the top of the order card */
.order-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0, 160, 223, 0.7), rgba(139, 92, 246, 0.7), transparent);
}

.order-direction {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 72px;
    padding: 7px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 750;
    animation: popIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s backwards;
}

@keyframes popIn {
    from { opacity: 0; transform: scale(0.6); }
    to   { opacity: 1; transform: scale(1); }
}

.order-buy {
    background: rgba(52, 211, 153, 0.14);
    border: 1px solid rgba(52, 211, 153, 0.3);
    color: #4ade80;
}

.order-sell {
    background: rgba(248, 113, 113, 0.14);
    border: 1px solid rgba(248, 113, 113, 0.3);
    color: #f87171;
}

.order-title {
    margin-top: 14px;
    font-size: 22px;
    font-weight: 700;
}

.order-price {
    margin-top: 7px;
    font-size: 12px;
    color: var(--text-secondary);
}

/* Markets */
.market-summary-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(255, 255, 255, 0.08);
}

.market-summary-grid > div {
    position: relative;
    overflow: hidden;
    padding: 14px 8px;
    background: rgba(11, 31, 58, 0.6);
    color: #fff;
    text-align: center;
}

.market-summary-grid > div::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0, 160, 223, 0.6), transparent);
}

.market-summary-grid span,
.market-summary-grid small {
    display: block;
    font-size: 10px;
}

.market-summary-grid span { opacity: 0.65; }
.market-summary-grid strong { display: block; margin-top: 4px; font-size: 13px; }
.market-summary-grid small { margin-top: 3px; }

/* Empty / privacy / toast */
.empty-state {
    padding: 48px 24px;
    text-align: center;
    border: 1px dashed rgba(255, 255, 255, 0.16);
    border-radius: var(--radius-lg);
    background: var(--card-bg);
}

.empty-state.spacious {
    margin-top: 20px;
}

.empty-icon {
    width: 54px;
    height: 54px;
    margin: 0 auto 16px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(0, 160, 223, 0.25), rgba(139, 92, 246, 0.25));
    border: 1px solid rgba(0, 160, 223, 0.3);
    color: #7dd3fc;
    font-size: 25px;
    font-weight: 700;
}

.empty-state h3 {
    font-size: 18px;
}

.empty-state p {
    margin-top: 7px;
    color: var(--text-secondary);
    font-size: 13px;
    line-height: 1.5;
}

.overlay {
    position: absolute;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(7, 13, 24, 0.92);
    color: #fff;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
}

.privacy-content {
    display: grid;
    justify-items: center;
    gap: 8px;
    text-align: center;
}

.privacy-content .brand-mark {
    margin-bottom: 6px;
}

.privacy-content span {
    color: rgba(255,255,255,0.66);
    font-size: 12px;
}

.toast {
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: calc(var(--nav-height) + env(safe-area-inset-bottom) + 26px);
    z-index: 90;
    padding: 13px 15px;
    border-radius: 13px;
    background: rgba(13, 23, 44, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    color: #fff;
    font-size: 13px;
    text-align: center;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 160ms ease, transform 160ms ease;
    pointer-events: none;
}

.toast.show {
    opacity: 1;
    transform: translateY(0);
}

/* Bottom nav: floating glass pill */
.bottom-nav {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: calc(env(safe-area-inset-bottom) + 10px);
    z-index: 50;
    height: var(--nav-height);
    padding: 6px 4px 5px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    background: rgba(10, 17, 32, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 22px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}

.nav-item {
    height: 100%;
    border: 0;
    background: transparent;
    color: var(--text-secondary);
    display: grid;
    place-items: center;
    align-content: center;
    gap: 3px;
    font-size: 9px;
    font-weight: 600;
    min-width: 0;
    transition: color 0.2s ease;
}

.nav-icon {
    width: 44px;
    height: 26px;
    display: grid;
    place-items: center;
    font-size: 19px;
    line-height: 1;
    border-radius: 999px;
    border: 1px solid transparent;
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.nav-item.active {
    color: var(--schwab-blue-dark);
}

.nav-item.active .nav-icon {
    background: linear-gradient(135deg, rgba(0, 160, 223, 0.2), rgba(139, 92, 246, 0.2));
    border-color: rgba(0, 160, 223, 0.35);
    color: #7dd3fc;
    font-weight: 750;
}

@media (min-width: 481px) {
    #app-root {
        box-shadow: 0 0 60px rgba(0, 0, 0, 0.5);
    }
}

@media (max-width: 360px) {
    :root { --page-pad: 15px; }
    .position-right { min-width: 110px; }
    .nav-item { font-size: 8px; }
    .nav-icon { font-size: 17px; }
}

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    /* Gradient-clipped text is invisible without its shine animation — restore solid color */
    .login-header h1,
    .net-worth,
    .quote-price {
        background: none;
        -webkit-text-fill-color: initial;
        color: #fff;
    }
}
