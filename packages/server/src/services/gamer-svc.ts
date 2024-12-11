import { Schema, model, Types } from "mongoose";
import { Gamer } from "../models/gamer";

const GamerSchema = new Schema<Gamer>(
  {
    //userId: { type: String, required: true, trim: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "Credential", required: true, unique: true },
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
  return GamerModel.findById(userId).populate("games teams")
    .then((gamer) => {
      if (!gamer) {
        throw new Error(`${userId} Not Found`);
      }
      return gamer;
    })
    .catch((err) => {
      console.log("error in gamer get: ", err)
      throw `${userId} Not Found`;
    });
}

function create(json: Gamer): Promise<Gamer> {
  const t = new GamerModel(json);
  return t.save();
}

function update(
  gamerId: String,
  gamer: Gamer
): Promise<Gamer> {
  return GamerModel.findByIdAndUpdate(gamerId, gamer, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${gamerId} not updated`;
    else return updated as Gamer;
  });
}

function remove(gamerId: String): Promise<void> {
  return GamerModel.findByIdAndDelete(gamerId).then(
    (deleted) => {
      if (!deleted) throw `${gamerId} not deleted`;
    }
  );
}

function findByUserId(userId: Types.ObjectId | string): Promise<Gamer> {
  return GamerModel.findOne({ userId: userId }).populate("games teams")
    .then((gamer) => {
      if (!gamer) {
        throw new Error(`Gamer profile not found for userId: ${userId}`);
      }
      return gamer;
    })
    .catch((err) => {
      console.log("Error in findByUserId:", err);
      throw `Gamer profile not found for userId: ${userId}`;
    });
}

export default { index, get, create, update, remove, findByUserId };