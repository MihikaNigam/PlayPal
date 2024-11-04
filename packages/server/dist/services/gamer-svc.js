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
var gamer_svc_exports = {};
__export(gamer_svc_exports, {
  gamers: () => gamers
});
module.exports = __toCommonJS(gamer_svc_exports);
const gamers = [
  { name: "Person 1", profileLink: "gamer/profile.html", recentlyPlayedGames: [] },
  { name: "Person 2", profileLink: "gamer/profile.html", recentlyPlayedGames: [] },
  { name: "Person 3", profileLink: "gamer/profile.html", recentlyPlayedGames: [] }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  gamers
});
