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
var import_pages = require("./pages/index");
var import_game_svc = __toESM(require("./services/game-svc"));
var import_gamer_svc = __toESM(require("./services/gamer-svc"));
var import_games = __toESM(require("./routes/games"));
var import_gamers = __toESM(require("./routes/gamers"));
var import_lobbies = __toESM(require("./routes/lobbies"));
var import_auth = __toESM(require("./routes/auth"));
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
(0, import_mongo.connect)("PlayPal");
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/api/games", import_auth.authenticateUser, import_games.default);
app.use("/api/gamers", import_auth.authenticateUser, import_gamers.default);
app.use("/api/lobbies", import_auth.authenticateUser, import_lobbies.default);
app.use("/auth", import_auth.default);
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
        res.set("Content-Type", "text/html").send(new import_pages.GamePage(data).render());
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
        res.set("Content-Type", "text/html").send(new import_pages.GamerPage(data).render());
      } else {
        res.status(404).send("Gamer not found");
      }
    }).catch((err) => {
      console.error("Error fetching gamers:", err);
      res.status(500).send("Internal Server Error");
    });
  }
);
app.get("/login", (req, res) => {
  const page = new import_pages.LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});
app.get("/register", (req, res) => {
  const page = new import_pages.LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});
