import { Game } from "./game";
import type { Gamer } from "./gamer";
import { Types } from 'mongoose';

export interface Lobby {
    teamId: string,
    gameId:  Game,
    players: Array<Gamer>,
    status?: 'active' | 'inactive' | 'full';
    chatLink?: string,
    createdAt?: Date;
}
