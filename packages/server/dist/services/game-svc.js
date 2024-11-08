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
  default: () => game_svc_default
});
module.exports = __toCommonJS(game_svc_exports);
var import_mongoose = require("mongoose");
const GameSchema = new import_mongoose.Schema(
  {
    //gameId: { type: String, required: true, trim: true, unique: true },
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true },
    genre: { type: String, trim: true },
    releaseDate: { type: Date },
    publisher: { type: String, trim: true },
    description: { type: String, trim: true }
  },
  { collection: "pp_games" }
);
const GameModel = (0, import_mongoose.model)("Game", GameSchema);
function index() {
  return GameModel.find();
}
function get(gameId) {
  return GameModel.findById(gameId).then((game) => {
    if (!game) {
      throw new Error(`${gameId} Not Found`);
    }
    return game;
  }).catch((err) => {
    console.log("errorr: ", err);
    throw `${gameId} Not Found`;
  });
}
function create(json) {
  const t = new GameModel(json);
  return t.save();
}
function update(gameId, game) {
  return GameModel.findByIdAndUpdate(gameId, game, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${gameId} not updated`;
    else return updated;
  });
}
function remove(gameId) {
  return GameModel.findByIdAndDelete(gameId).then(
    (deleted) => {
      if (!deleted) throw `${gameId} not deleted`;
    }
  );
}
var game_svc_default = { index, get, create, update, remove };
