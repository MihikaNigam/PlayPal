import express, { Request, Response } from "express";
import { Game } from "models/game";
import Games from "../services/game-svc"
import Lobbies from "../services/lobby-svc"

const router = express.Router();

router.get("/", (_, res: Response) => {
    Games.index()
        .then((list: Game[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:gameId", (req: Request, res: Response) => {
    const { gameId } = req.params;

    Games.get(gameId)
        .then((game: Game) => res.json(game))
        .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newGame = req.body;

    Games.create(newGame)
        .then((game: Game) =>
            res.status(201).json(game)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:gameId", (req: Request, res: Response) => {
    const { gameId } = req.params;
    const newGame = req.body;

    Games
        .update(gameId, newGame)
        .then((game: Game) => res.json(game))
        .catch((err) => res.status(404).end());
});

router.delete("/:gameId", (req: Request, res: Response) => {
    const { gameId } = req.params;

    Games.remove(gameId)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

router.get("/get-lobbies/:gameId", (req: Request, res: Response) => {
    const { gameId } = req.params;

    Games.get(gameId)
        .then(async (game: Game) => {
            const lobbies = await Lobbies.findByGame(game);
            return res.json(lobbies)
        })
        .catch((err) => res.status(404).send(err));
});

export default router;