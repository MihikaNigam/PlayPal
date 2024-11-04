import { Gamer } from "./gamer";

export interface Game {
    title: string;
    imageUrl: string;
    genre: string;
    releaseDate: Date;
    activePlayers: Array<Gamer>;
    lobbies: Array<Lobby>;
  }
  
  export interface Lobby {
    name: string;
    link: string;
  }