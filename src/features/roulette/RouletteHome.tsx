import type { PagePartProps } from "../registry";
import RouletteMachine from "./RouletteMachine";
import "./roulette.css";

export default function RouletteHome({ games }: PagePartProps) {
  return (
    <section className="container roulette-section" aria-label="Arcade Game Roulette">
      <div className="section-head" style={{ textAlign: "center", display: "block" }}>
        <span className="eyebrow">Random Game Picker</span>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", margin: "4px 0 8px" }}>
          Arcade <mark>Roulette</mark>
        </h2>
        <p className="lead" style={{ margin: "0 auto 18px", maxWidth: "480px" }}>
          Can't decide what to play next? Pull the lever or hit Spin to let the cassette reel pick a community game!
        </p>
      </div>

      <RouletteMachine games={games} />
    </section>
  );
}
