"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var game_svc_exports = {};
__export(game_svc_exports, {
  getGame: () => getGame
});
module.exports = __toCommonJS(game_svc_exports);
var import_gamer_svc = require("./gamer-svc");
const games = {
  apex_legends: {
    title: "Apex Legends",
    imageUrl: "https://shared.steamstatic.com/store_item_assets/steam/apps/1172470/header.jpg?t=1727104892",
    genre: "Battle Royale",
    releaseDate: /* @__PURE__ */ new Date("2019-02-04"),
    activePlayers: import_gamer_svc.gamers,
    lobbies: [
      { name: "LMG Abusers", link: "teams/lobby.html" },
      { name: "Olympus Enjoyers", link: "teams/lobby.html" }
    ]
  },
  overwatch: {
    title: "Overwatch",
    imageUrl: "https://i.ytimg.com/vi/dZl1yGUetjI/hqdefault.jpg",
    genre: "FPS",
    releaseDate: /* @__PURE__ */ new Date("2016-05-24"),
    activePlayers: import_gamer_svc.gamers,
    lobbies: [{ name: "Mercy Goats", link: "teams/lobby.html" }]
  }
};
function getGame(_) {
  return games["apex_legends"];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getGame
});
