import { registerPage, registerPagePart } from "../registry";
import CustomCursor from "./CustomCursor";
import RouletteHome from "./RouletteHome";
import RouletteQuickSpin from "./RouletteQuickSpin";

const FEATURE = "roulette";

// Custom cursor dot and leaf trail across all pages on desktop
registerPagePart({ feature: FEATURE, key: "custom-cursor", page: "everywhere", order: 1, Component: CustomCursor });

// Interactive slot machine section on the homepage
registerPagePart({ feature: FEATURE, key: "roulette-home", page: "home", order: 25, Component: RouletteHome });

// Surprise Me quick spin bar on the all games page
registerPagePart({ feature: FEATURE, key: "roulette-games", page: "games", order: 5, Component: RouletteQuickSpin });

// Standalone roulette / surprise pages
registerPage({ feature: FEATURE, path: "/roulette", shell: "app", load: () => import("./RoulettePage") });
registerPage({ feature: FEATURE, path: "/surprise", shell: "app", load: () => import("./RoulettePage") });

