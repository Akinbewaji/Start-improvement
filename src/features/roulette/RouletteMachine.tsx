import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Game } from "../../games";
import { rouletteAudio } from "./audio";
import { getRouletteGames, type RouletteGame } from "./games";
import "./roulette.css";

const ITEM_HEIGHT = 72; // Each slot row height in px

export default function RouletteMachine({ games }: { games?: Game[] }) {
  const rouletteGames = useMemo(() => getRouletteGames(games), [games]);

  const [isSpinning, setIsSpinning] = useState(false);
  const [pulled, setPulled] = useState(false);
  const [winningGame, setWinningGame] = useState<RouletteGame | null>(null);
  const [tokens, setTokens] = useState(100);
  const [muted, setMuted] = useState(() => rouletteAudio.muted);
  const [discovered, setDiscovered] = useState<RouletteGame[]>([]);
  const [statusText, setStatusText] = useState("READY");

  const stripRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Triple duplicated list for smooth endless scrolling effect
  const displayItems = useMemo(() => {
    return [...rouletteGames, ...rouletteGames, ...rouletteGames, ...rouletteGames];
  }, [rouletteGames]);

  const spin = useCallback(() => {
    if (isSpinning || rouletteGames.length === 0) return;
    setIsSpinning(true);
    setWinningGame(null);
    setStatusText("ROLLING...");

    // Mechanical lever sound & animation
    setPulled(true);
    rouletteAudio.playLeverClunk();
    setTimeout(() => setPulled(false), 300);

    // Deduct tokens
    setTokens((t) => Math.max(0, t - 5));

    // Choose target index from the original set
    const winningIdx = Math.floor(Math.random() * rouletteGames.length);
    const chosen = rouletteGames[winningIdx];

    // Land on the item located in the 3rd set of duplicates
    const targetItemIndex = rouletteGames.length * 2 + winningIdx;
    // Center the item in the 180px high window: offset by (180 - 72) / 2 = 54px
    const targetScrollY = targetItemIndex * ITEM_HEIGHT - 54;

    const duration = 2200; // ms
    const startTime = performance.now();
    let lastTick = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);
      const currentPos = eased * targetScrollY;

      if (stripRef.current) {
        stripRef.current.style.transform = `translateY(-${currentPos}px)`;
      }

      // Audio ticks as items slide past
      if (now - lastTick > 55 + progress * 140 && progress < 0.98) {
        rouletteAudio.playTick();
        lastTick = now;
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Complete spin
        setIsSpinning(false);
        setStatusText("WINNER!");
        setTokens((t) => t + 15);
        setWinningGame(chosen);
        rouletteAudio.playWinChime();

        setDiscovered((prev) => {
          if (prev.some((g) => g.slug === chosen.slug)) return prev;
          return [chosen, ...prev];
        });
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [isSpinning, rouletteGames]);

  // Keyboard shortcut: Spacebar to spin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body && !isSpinning) {
        e.preventDefault();
        spin();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isSpinning, spin]);

  const toggleSound = () => {
    const next = !muted;
    rouletteAudio.setMuted(next);
    setMuted(next);
  };

  return (
    <div className="roulette-machine">
      <div className="machine-wrapper">
        {/* Lever arm (desktop) */}
        <div
          className={`lever-assembly ${pulled ? "pulled" : ""}`}
          onClick={spin}
          role="button"
          tabIndex={0}
          aria-label="Pull arcade lever to spin"
          title="Pull lever to spin"
        >
          <div className="lever-shaft">
            <div className="lever-knob" />
          </div>
          <div className="lever-base" />
        </div>

        {/* The Cabinet */}
        <div className="slot-cabinet">
          <div className="cabinet-header">
            <div className="cabinet-title">
              <span aria-hidden="true">🕹️</span> RANDOM GAME REEL
            </div>
            <div className="jackpot-indicator">
              <span aria-hidden="true">🪙</span> {tokens} TOKENS · {statusText}
            </div>
          </div>

          {/* Cylinder Stage */}
          <div className="reels-stage" aria-live="polite">
            <div className="payline-marker" />
            <div className="reel-container">
              <div ref={stripRef} className="reel-strip">
                {displayItems.map((game, i) => (
                  <div key={`${game.slug}-${i}`} className="slot-item">
                    <span className="slot-emoji" aria-hidden="true">
                      {game.emoji}
                    </span>
                    <div className="slot-info">
                      <div className="slot-name">{game.name}</div>
                      <div className="slot-meta">
                        <span>by {game.by}</span>
                        <span className="slot-tag">{game.tag}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="cabinet-controls">
            <button
              type="button"
              className="btn-spin"
              onClick={spin}
              disabled={isSpinning}
              aria-label="Spin the reel"
            >
              <span aria-hidden="true">🎲</span> {isSpinning ? "SPINNING..." : "SPIN THE REEL"}
            </button>
            <button
              type="button"
              className="btn-sound-toggle"
              onClick={toggleSound}
              aria-label={muted ? "Unmute audio" : "Mute audio"}
              title={muted ? "Unmute sound" : "Mute sound"}
            >
              {muted ? "🔇" : "🔊"}
            </button>
          </div>
        </div>
      </div>

      {/* Winning Result Card */}
      {winningGame && (
        <div className="match-card" aria-label="Game match result">
          <div className="match-header">
            <div className="match-badge">
              <span aria-hidden="true">🎯</span> GAME UNLOCKED
            </div>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", color: "var(--muted)" }}>
              +15 Tokens
            </span>
          </div>

          <div className="match-body">
            <div className="match-avatar" aria-hidden="true">
              {winningGame.emoji}
            </div>
            <div className="match-details">
              <h3>{winningGame.name}</h3>
              <p>by {winningGame.by} · {winningGame.desc}</p>
            </div>
          </div>

          <div className="match-actions">
            <a href={`/games/${winningGame.slug}`} className="btn-launch">
              Play Now on start.ng 🕹️
            </a>
          </div>
        </div>
      )}

      {/* Recent Discoveries */}
      {discovered.length > 0 && (
        <div className="roulette-history">
          <div className="history-title">
            <span>Recent Discoveries</span>
            <span>{discovered.length} unlocked</span>
          </div>
          <div className="history-chips">
            {discovered.map((g) => (
              <a key={g.slug} href={`/games/${g.slug}`} className="history-chip">
                <span>{g.emoji}</span> {g.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
