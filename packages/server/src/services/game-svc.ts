import { Schema, model } from "mongoose";
import { Game } from "../models/game";

const GameSchema = new Schema<Game>(
  {
    //gameId: { type: String, required: true, trim: true, unique: true },
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
  return GameModel.findById(gameId)
    .then((game) => {
      if (!game) {
        throw new Error(`${gameId} Not Found`);
      }
      return game;
    })
    .catch((err) => {
      console.log("errorr: ", err)
      throw `${gameId} Not Found`;
    });
}

function create(json: Game): Promise<Game> {
  const t = new GameModel(json);
  return t.save();
}

function update(
  gameId: String,
  game: Game
): Promise<Game> {
  return GameModel.findByIdAndUpdate(gameId, game, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${gameId} not updated`;
    else return updated as Game;
  });
}

function remove(gameId: String): Promise<void> {
  return GameModel.findByIdAndDelete(gameId).then(
    (deleted) => {
      if (!deleted) throw `${gameId} not deleted`;
    }
  );
}

export default { index, get, create, update, remove };
