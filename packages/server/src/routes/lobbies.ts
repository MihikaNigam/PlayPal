import express, { Request, Response } from "express";
import { Lobby } from "models/lobby";
import Lobbies from "../services/lobby-svc"

const router = express.Router();

router.get("/", (_, res: Response) => {
    Lobbies.index()
        .then((list: Lobby[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:teamId", (req: Request, res: Response) => {
    const { teamId } = req.params;

    Lobbies.get(teamId)
        .then((lobby: Lobby) => res.json(lobby))
        .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newLobby = req.body;

    Lobbies.create(newLobby)
        .then((lobby: Lobby) =>
            res.status(201).json(lobby)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:teamId", (req: Request, res: Response) => {
    const { teamId } = req.params;
    const newLobby = req.body;

    Lobbies
        .update(teamId, newLobby)
        .then((lobby: Lobby) => res.json(lobby))
        .catch((err) => res.status(404).end());
});

router.delete("/:teamId", (req: Request, res: Response) => {
    const { teamId } = req.params;

    Lobbies.remove(teamId)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;