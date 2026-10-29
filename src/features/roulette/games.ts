import type { Game } from "../../games";

export type RouletteGame = {
  name: string;
  slug: string;
  by: string;
  emoji: string;
  tag: string;
  desc: string;
};

export const ARCHIVE_GAMES: RouletteGame[] = [
  { name: "Danfo Defense", slug: "danfo-defense", by: "emmyanz", emoji: "🚐", tag: "Action", desc: "Defend your bus through Lagos rush hour chaos." },
  { name: "Jollof Rush", slug: "jollof-rush", by: "Y_Aisha", emoji: "🍲", tag: "Arcade", desc: "Collect the ingredients for the ultimate party jollof rice." },
  { name: "Agege Rush", slug: "agege-rush", by: "Mustapha", emoji: "🍞", tag: "Runner", desc: "Sprint through street corners delivering hot Agege bread." },
  { name: "Ayo Arena", slug: "ayo-arena", by: "mar", emoji: "🪵", tag: "Strategy", desc: "The ancient Yoruba Mancala board game reimagined." },
  { name: "Okada Dodge", slug: "okada-dodge", by: "Abdul-Baaqi", emoji: "🏍️", tag: "Action", desc: "Weave between gridlocked trailers and commercial buses." },
  { name: "Nepa Light Up Lagos", slug: "nepa-light-up-lagos", by: "Oluwasanmi", emoji: "⚡", tag: "Puzzle", desc: "Connect grid circuits before the community generator runs dry." },
  { name: "City Hustle Lagos", slug: "city-hustle-lagos", by: "Daniel", emoji: "🏙️", tag: "Strategy", desc: "From street vendor to island tech entrepreneur." },
  { name: "Suya Catcher", slug: "suya-catcher", by: "Vivian", emoji: "🥩", tag: "Casual", desc: "Catch seasoned skewers hot off the mallam's grill." },
  { name: "Naija Penalty", slug: "naija-penalty", by: "Obi", emoji: "⚽", tag: "Sports", desc: "Score clutch tournament goals against legendary goalkeepers." },
  { name: "Boju Boju", slug: "boju-boju", by: "99PlusOne", emoji: "🙈", tag: "Stealth", desc: "Classic Nigerian hide-and-seek street edition." },
  { name: "Mama Put Rush", slug: "mama-put-rush", by: "Stephen", emoji: "🥘", tag: "Cooking", desc: "Serve hundreds of hungry lunchtime office workers." },
  { name: "Market Dash", slug: "market-dash", by: "Michael Churchill", emoji: "🛍️", tag: "Runner", desc: "Race through bustling Balogun market picking up deals." },
  { name: "Ludo", slug: "ludo", by: "Hamzat", emoji: "🎲", tag: "Board", desc: "The four-player roll-and-move living room staple." },
  { name: "Whot", slug: "whot", by: "Hamzat", emoji: "🃏", tag: "Cards", desc: "Hold On! Pick Two! The classic Naija card party game." },
  { name: "Wheelie Wahala", slug: "wheelie-wahala", by: "bobbysam", emoji: "🚲", tag: "Skill", desc: "Balance high-speed bicycle stunts down Third Mainland Bridge." },
  { name: "Owambe", slug: "owambe", by: "Victor", emoji: "🪘", tag: "Rhythm", desc: "Tap along with talking drum beats at weekend celebrations." },
  { name: "Zobo Sort", slug: "zobo-sort", by: "Aishajoda", emoji: "🍷", tag: "Puzzle", desc: "Sort hibiscus leaves, cloves, and ginger in the kitchen." },
  { name: "Puff Puff Catch", slug: "puff-puff-catch", by: "Cee", emoji: "🍩", tag: "Casual", desc: "Catch sweet golden deep-fried dough treats from the air." },
  { name: "Lagos Bike Rush", slug: "lagos-bike-rush", by: "OBA", emoji: "🚴", tag: "Racing", desc: "Pedal hard against the evening commute across Yaba." },
  { name: "Dont Spill The Soup", slug: "dont-spill-the-soup", by: "Umar", emoji: "🍲", tag: "Balance", desc: "Deliver boiling egusi soup safely without spilling a drop." },
];

const EMOJI_PALETTE = ["🎮", "🕹️", "⚡", "🌟", "🔥", "🚀", "🎯", "🎲", "🏆", "✨"];

export function getRouletteGames(communityGames?: Game[]): RouletteGame[] {
  if (communityGames && communityGames.length > 0) {
    return communityGames.map((g, idx) => ({
      name: g.title,
      slug: g.slug,
      by: g.by,
      emoji: EMOJI_PALETTE[idx % EMOJI_PALETTE.length],
      tag: g.plays > 0 ? `${g.plays} plays` : "Community",
      desc: g.description || `Play ${g.title} by ${g.by} free in your browser.`,
    }));
  }
  return ARCHIVE_GAMES;
}
