import { Game } from "./game";
import type { Gamer } from "./gamer";

export interface Lobby {
    _id?: string
    name: string,
    gameId: Game,
    players: Array<Gamer>,
    status?: 'active' | 'inactive' | 'full';
    chatLink?: string,
    createdAt?: Date;
}
