// src/services/game-svc.ts
import { Game } from "../models";
import {gamers} from "./gamer-svc";


// Mock data as our in-memory "database"
const games = {
  apex_legends: {
    title: "Apex Legends",
    imageUrl:
      "https://shared.steamstatic.com/store_item_assets/steam/apps/1172470/header.jpg?t=1727104892",
    genre: "Battle Royale",
    releaseDate: new Date("2019-02-04"),
    activePlayers: gamers,
    lobbies: [
      { name: "LMG Abusers", link: "teams/lobby.html" },
      { name: "Olympus Enjoyers", link: "teams/lobby.html" }
    ]
  },
  overwatch: {
    title: "Overwatch",
    imageUrl: "https://i.ytimg.com/vi/dZl1yGUetjI/hqdefault.jpg",
    genre: "FPS",
    releaseDate: new Date("2016-05-24"),
    activePlayers: gamers,
    lobbies: [{ name: "Mercy Goats", link: "teams/lobby.html" }]
  }
};

export function getGame(_: string){

  return games["apex_legends"];
}
