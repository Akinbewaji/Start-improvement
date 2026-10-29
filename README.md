# start.ng · Arcade Game Roulette 🎰

> **Nigeria's home for free browser games.** A whimsical, retro-arcade slot machine for discovering 188+ free Naija browser games on start.ng.

---

## 🕹️ About The Feature

With over 188 community-built web games on **start.ng** (from *Danfo Defense* and *Jollof Rush* to *Agege Rush* and *Okada Dodge*), deciding what to play can cause decision fatigue.

**Arcade Game Roulette** transforms game selection into an engaging mini-game:

- **Mechanical Lever & Spin Controls**: Click or pull the vintage arcade lever arm or press the `[SPACE]` bar to set the physical cassette reels in motion.
- **Synthesized Web Audio**: Authentic audio feedback powered entirely by the native browser Web Audio API:
  - Mechanical lever pull clunks
  - Decelerating cylinder ticking sound effects
  - Golden victory fanfare chimes
  - Complete with a 1-click mute toggle
- **Curved Reel Physics**: Realistic 3D-styled curved slot machine cylinder with top & bottom horizon gradient shadows and non-linear `easeOutCubic` deceleration.
- **Match Card & Instant Play**: Displays the matched game's creator, description, and direct link to `https://start.ng/games/<slug>` to launch in one click.
- **Token Economy & Discovery Log**: Earn arcade tokens for every spin and track discovered games in a live history drawer.
- **Naija Street Gaming Theme**: Built strictly following start.ng's design system (`--bg: #f6f5ee`, `--ink: #292a23`, `--lime: #d8fd71`), full dark mode support, and 100% responsive down to 375px mobile screens.

---

## 🚀 How to Run & Test

Open [index.html](file:///c:/Users/HP/Desktop/HNG/HNG%2015/Start.ng/index.html) directly in any modern browser:

```powershell
Start-Process index.html
```

Or serve with Python / static server:
```powershell
python -m http.server 3000
```
