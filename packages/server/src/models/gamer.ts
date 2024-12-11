import type { Game } from "./game";
import type { Lobby } from "./lobby";

export interface Gamer {
  _id?: string,
  userId: string,
  name: string,
  games: Game[], // List of games
  teams: Lobby[], //links of teams user is a part of
  avatar: string,
  email?: string,
  bio?: string,
  lastOnline?: Date;
}