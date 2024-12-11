import type { Game } from "./game";
import type { Lobby } from "./lobby";
import type { Credential } from "./credential";

export interface Gamer {
  _id?: string,
  userId: Credential,
  name: string;
  games: Game[]; // List of games
  teams: Lobby[]; //links of teams user is a part of
  avatar: string,
  email?: string,
  bio?: string,
  lastOnline?: Date;
}