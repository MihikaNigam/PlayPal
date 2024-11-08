import type { Game } from "./game";
import type { Lobby } from "../models/lobby";

export interface Gamer {
  userId: string,
  name: string;
  games?: Array<Game>; // List of games
  teams?: Array<Lobby>; //links of teams user is a part of
  avatar: string,
  email?: string;
  bio?: string;
  lastOnline?: Date;
}