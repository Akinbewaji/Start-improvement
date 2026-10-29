import { useState } from "react";
import type { PagePartProps } from "../registry";
import RouletteMachine from "./RouletteMachine";
import "./roulette.css";

export default function RouletteQuickSpin({ games }: PagePartProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="roulette-quick-bar-wrapper">
      <div className="roulette-quick-bar">
        <div className="roulette-quick-info">
          <span className="roulette-quick-icon" aria-hidden="true">
            🎰
          </span>
          <div>
            <h3>Can't decide what to play?</h3>
            <p>Roll the cassette reels to get a surprise random Naija game recommendation.</p>
          </div>
        </div>
        <button
          type="button"
          className="btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {open ? "Hide Roulette ▲" : "Surprise Me 🎲"}
        </button>
      </div>

      {open && (
        <div style={{ margin: "16px 0 24px" }}>
          <RouletteMachine games={games} />
        </div>
      )}
    </div>
  );
}
