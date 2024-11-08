import { Schema, model } from "mongoose";
import { Lobby } from "../models/lobby";

const LobbySchema = new Schema<Lobby>(
    {
        teamId: { type: String, required: true, trim: true, unique: true },
        gameId: {type: Schema.Types.ObjectId, ref: "Game"},
        players: [{ type: Schema.Types.ObjectId, ref: "Gamer" }],
        chatLink: { type: String, trim: true, default: null  },
        createdAt: { type: Date },
        status: { type: String, enum: ['active', 'inactive', 'full'] },
    },
    { collection: "pp_lobbies" }
);

const LobbyModel = model<Lobby>("Lobby", LobbySchema);

function index(): Promise<Lobby[]> {
    return LobbyModel.find();
}

function get(teamId: String): Promise<Lobby> {
    return LobbyModel.find({ teamId })
        // .populate("Gamer")
        .then((list) => list[0])
        .catch((err) => {
            throw `${teamId} Not Found`;
        });
}

export default { index, get };