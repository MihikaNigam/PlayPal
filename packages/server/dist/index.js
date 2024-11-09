"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_mongo = require("./services/mongo");
var import_game = require("./pages/game");
var import_gamer = require("./pages/gamer");
var import_lobby = require("./pages/lobby");
var import_game_svc = __toESM(require("./services/game-svc"));
var import_gamer_svc = __toESM(require("./services/gamer-svc"));
var import_lobby_svc = __toESM(require("./services/lobby-svc"));
var import_games = __toESM(require("./routes/games"));
var import_gamers = __toESM(require("./routes/gamers"));
var import_lobbies = __toESM(require("./routes/lobbies"));
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
(0, import_mongo.connect)("PlayPal");
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/api/games", import_games.default);
app.use("/api/gamers", import_gamers.default);
app.use("/api/lobbies", import_lobbies.default);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.get("/hello", (req, res) => {
  res.send("Hello, World");
});
app.get(
  "/games/:gameid",
  (req, res) => {
    const { gameid } = req.params;
    import_game_svc.default.get(gameid).then((data) => {
      if (data) {
        res.set("Content-Type", "text/html").send(new import_game.GamePage(data).render());
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
  (req, res) => {
    const { userid } = req.params;
    import_gamer_svc.default.get(userid).then((data) => {
      if (data) {
        res.set("Content-Type", "text/html").send(new import_gamer.GamerPage(data).render());
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
  (req, res) => {
    const { teamid } = req.params;
    import_lobby_svc.default.get(teamid).then((data) => {
      if (data) {
        res.set("Content-Type", "text/html").send(new import_lobby.LobbyPage(data).render());
      } else {
        res.status(404).send("Lobby not found");
      }
    }).catch((err) => {
      console.error("Error fetching lobby:", err);
      res.status(500).send("Internal Server Error");
    });
  }
);
