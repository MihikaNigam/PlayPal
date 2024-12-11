import { Schema, model } from "mongoose";
import { Lobby } from "../models/lobby";
import { Game } from "../models/game"
import { console } from "inspector";

const LobbySchema = new Schema<Lobby>(
  {
    name: { type: String, trim: true },
    gameId: { type: Schema.Types.ObjectId, ref: "Game" },
    players: [{ type: Schema.Types.ObjectId, ref: "Gamer" }],
    chatLink: { type: String, trim: true, default: null },
    status: { type: String, enum: ['active', 'inactive', 'full'] },
  },
  {
    collection: "pp_lobbies",
    timestamps: true

  }
);

const LobbyModel = model<Lobby>("Lobby", LobbySchema);

function index(): Promise<Lobby[]> {
  return LobbyModel.find();
}

function get(teamId: String): Promise<Lobby> {
  return LobbyModel.findById(teamId).populate("players gameId")
    .then((team) => {
      if (!team) {
        throw new Error(`${teamId} Not Found`);
      }
      return team;
    })
    .catch((err) => {
      console.log('err in lobby get: ', get)
      throw `${teamId} Not Found`;
    });
}

function create(json: Lobby): Promise<Lobby> {
  const t = new LobbyModel(json);
  return t.save();
}

function update(
  teamId: String,
  team: Lobby
): Promise<Lobby> {
  return LobbyModel.findByIdAndUpdate(teamId, team, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${teamId} not updated`;
    else return updated as Lobby;
  });
}

function remove(teamId: String): Promise<void> {
  return LobbyModel.findByIdAndUpdate(teamId).then(
    (deleted) => {
      if (!deleted) throw `${teamId} not deleted`;
    }
  );
}

function findByGame(gameId: Game): Promise<Lobby[]> {
  return LobbyModel.find({ gameId: gameId })
    .then((games) => {
      if (!games) {
        throw new Error(`${gameId} Not Found`);
      }
      return games;
    })
    .catch((err) => {
      console.log('err in lobby get: ', get)
      throw `${gameId} Not Found`;
    });

}



export default { index, get, create, update, remove, findByGame };