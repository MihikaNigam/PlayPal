import { Schema, model } from "mongoose";
import { Game } from "../models/game";

const GameSchema = new Schema<Game>(
  {
    gameId: { type: String, required: true, trim: true, unique: true },
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true },
    genre: { type: String, trim: true },
    releaseDate: { type: Date },
    publisher: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { collection: "pp_games" }
);

const GameModel = model<Game>("Game", GameSchema);

function index(): Promise<Game[]> {
  return GameModel.find();
}

function get(gameId: String): Promise<Game> {
  return GameModel.findOne({ gameId })
    .then(game => {
      if (!game) {
        throw new Error(`${gameId} Not Found`);
      }
      return game;
    })
    .catch((err) => {
      throw `${gameId} Not Found`;
    });
}

export default { index, get };

/*
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
*/
