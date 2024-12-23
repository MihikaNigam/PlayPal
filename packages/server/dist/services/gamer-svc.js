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
  default: () => gamer_svc_default
});
module.exports = __toCommonJS(gamer_svc_exports);
var import_mongoose = require("mongoose");
const GamerSchema = new import_mongoose.Schema(
  {
    //userId: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    games: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Game", default: [] }],
    teams: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Lobby", default: [] }],
    avatar: { type: String, trim: true },
    email: { type: String, trim: true },
    bio: { type: String, trim: true },
    lastOnline: { type: Date }
  },
  { collection: "pp_gamers" }
);
const GamerModel = (0, import_mongoose.model)("Gamer", GamerSchema);
function index() {
  return GamerModel.find();
}
function get(userId) {
  return GamerModel.findById(userId).populate("games teams").then((gamer) => {
    if (!gamer) {
      throw new Error(`${userId} Not Found`);
    }
    return gamer;
  }).catch((err) => {
    console.log("error in gamer get: ", err);
    throw `${userId} Not Found`;
  });
}
function create(json) {
  const t = new GamerModel(json);
  return t.save();
}
function update(gamerId, gamer) {
  return GamerModel.findByIdAndUpdate(gamerId, gamer, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${gamerId} not updated`;
    else return updated;
  });
}
function remove(gamerId) {
  return GamerModel.findByIdAndDelete(gamerId).then(
    (deleted) => {
      if (!deleted) throw `${gamerId} not deleted`;
    }
  );
}
var gamer_svc_default = { index, get, create, update, remove };
