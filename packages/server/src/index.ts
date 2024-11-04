import express, { Request, Response } from "express";
import { getGame } from "./services/game-svc";
import { GamePage } from "./pages/game";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get(
    "/games/:gameName",
    (req: Request, res: Response) => {
    const { gameName } = req.params;
    const data = getGame(gameName);
    const page = new GamePage(data);
    res.set("Content-Type", "text/html").send(page.render());
    }
   );