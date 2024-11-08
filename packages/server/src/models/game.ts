import type { Lobby } from "./lobby";

export interface Game {
    //gameId: string,
    title: string,
    imageUrl: string,
    genre: string,
    releaseDate: Date,
    publisher?: string;
    description?: string;
  }
  