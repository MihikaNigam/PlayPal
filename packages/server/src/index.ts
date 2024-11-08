import express, { Request, Response } from "express";
import { connect } from "./services/mongo";

import { GamePage } from "./pages/game";
import Games from "./services/game-svc";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("PlayPal");

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

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
    //const data = getGame(gameName);
    // const page = new GamePage(data);
    // res.set("Content-Type", "text/html").send(page.render());
  }
);