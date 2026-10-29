import type { PageProps } from "../registry";
import RouletteMachine from "./RouletteMachine";
import "./roulette.css";

export default function RoulettePage({}: PageProps) {
  return (
    <div className="container roulette-page-container">
      <div className="roulette-hero-head">
        <span className="eyebrow">Arcade Game Roulette · 188+ Games</span>
        <h1>Surprise <mark>Pick</mark></h1>
        <p className="lead">
          Can't decide what to play? Pull the lever or hit Spin to let the start.ng cassette machine choose your next game!
        </p>
      </div>

      <RouletteMachine />
    </div>
  );
}

