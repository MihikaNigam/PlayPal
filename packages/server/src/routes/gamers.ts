import express, { Request, Response } from "express";
import { Gamer } from "models/gamer";
import Gamers from "../services/gamer-svc"

const router = express.Router();

router.get("/", (_, res: Response) => {
    Gamers.index()
        .then((list: Gamer[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:userId", (req: Request, res: Response) => {
    const { userId } = req.params;

    Gamers.get(userId)
        .then((gamer: Gamer) => res.json(gamer))
        .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newGamer = req.body;

    Gamers.create(newGamer)
        .then((gamer: Gamer) =>
            res.status(201).json(gamer)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:userId", (req: Request, res: Response) => {
    const { userId } = req.params;
    const newGamer = req.body;

    Gamers
        .update(userId, newGamer)
        .then((gamer: Gamer) => res.json(gamer))
        .catch((err) => res.status(404).end());
});

router.delete("/:userId", (req: Request, res: Response) => {
    const { userId } = req.params;

    Gamers.remove(userId)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;