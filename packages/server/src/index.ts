import express, { Request, Response } from "express";
import { connect } from "./services/mongo";

import { GamePage } from "./pages/game";
import { GamerPage } from "./pages/gamer";
import { LobbyPage } from "./pages/lobby";

import Games from "./services/game-svc";
import Gamers from "./services/gamer-svc";
import Lobbies from "./services/lobby-svc";

import games from "./routes/games"
import gamers from "./routes/gamers"
import lobbies from "./routes/lobbies"

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("PlayPal");

app.use(express.static(staticDir));

//middleware
app.use(express.json());

//apis
app.use("/api/games", games);
app.use("/api/gamers", gamers);
app.use("/api/lobbies", lobbies);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});


// dynamic content
app.get(
  "/games/:gameid",
  (req: Request, res: Response) => {
    const { gameid } = req.params;
    Games.get(gameid).then((data) => {
      if (data) {
        res.set("Content-Type", "text/html").send((new GamePage(data)).render());
      } else {
        res.status(404).send("Game not found");
      }
    }).catch((err) => {
      console.error("Error fetching game:", err);
      res.status(500).send("Internal Server Error");
    });
  }
);

app.get(
  "/gamers/:userid",
  (req: Request, res: Response) => {
    const { userid } = req.params;
    Gamers.get(userid).then((data) => {
      if (data) {
        res.set("Content-Type", "text/html").send((new GamerPage(data)).render());
      } else {
        res.status(404).send("Gamer not found");
      }
    }).catch((err) => {
      console.error("Error fetching gamers:", err);
      res.status(500).send("Internal Server Error");
    });
  }
);

app.get(
  "/lobbies/:teamid",
  (req: Request, res: Response) => {
    const { teamid } = req.params;
    Lobbies.get(teamid).then((data) => {
      if (data) {
        res.set("Content-Type", "text/html").send((new LobbyPage(data)).render());
      } else {
        res.status(404).send("Lobby not found");
      }
    }).catch((err) => {
      console.error("Error fetching lobby:", err);
      res.status(500).send("Internal Server Error");
    });
  }
);