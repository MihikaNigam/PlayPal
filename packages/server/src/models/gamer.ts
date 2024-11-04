import { Game } from "./game";

export interface Gamer {
    name: string;
    profileLink: string;
    recentlyPlayedGames: Array<Game>;
  }