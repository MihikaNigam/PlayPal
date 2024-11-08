import { Schema, model } from "mongoose";
import { Gamer } from "../models/gamer";

const GamerSchema = new Schema<Gamer>(
  {
    userId: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    games: [{ type: Schema.Types.ObjectId, ref: "Game", default: [] }],
    teams: [{ type: Schema.Types.ObjectId, ref: "Lobby", default: [] }],
    avatar: { type: String, trim: true },
    email: { type: String, trim: true },
    bio: { type: String, trim: true },
    lastOnline: { type: Date },
  },
  { collection: "pp_gamers" }
);

const GamerModel = model<Gamer>("Gamer", GamerSchema);

function index(): Promise<Gamer[]> {
  return GamerModel.find();
}

function get(userId: String): Promise<Gamer> {
  return GamerModel.find({ userId })
    .then((list) => list[0])
    .catch((err) => {
      throw `${userId} Not Found`;
    });
}

export default { index, get };