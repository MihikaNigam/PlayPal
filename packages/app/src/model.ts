import { Game, Gamer, Lobby } from "server/models";

export interface Model {
    tour?: Game;
    profile?: Gamer;
    lobby?: Lobby;
}

export const init: Model = {};