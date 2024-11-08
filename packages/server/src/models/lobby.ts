import { Game } from "./game";
import type { Gamer } from "./gamer";

export interface Lobby {
    name: string,
    gameId:  Game,
    players: Array<Gamer>,
    status?: 'active' | 'inactive' | 'full';
    chatLink?: string,
    createdAt?: Date;
}
