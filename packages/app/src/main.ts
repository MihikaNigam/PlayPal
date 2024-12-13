import {
  Auth, define, History, Switch, Store
} from "@calpoly/mustang";
import { Msg } from "./messages.ts";
import { Model, init } from "./model.ts";
import update from "./update";
import { html, LitElement } from "lit";
import { HeaderElement } from "./components/pp-header";
import { GameInstanceElement } from "./components/game_instance";
import { HomeViewElement } from "./views/home-view";
import { ProfileViewElement } from "./views/profile-view.ts";

class AppElement extends LitElement {

  connectedCallback(): void {
    super.connectedCallback();
    HeaderElement.initializeOnce();
  }

  render() {
    return html`<mu-switch></mu-switch>`;
  }

}

const routes: Switch.Route[] = [
  {
    auth: "protected",
    path: "/app/profile/:id",
    view: (params: Switch.Params) => html`
      <profile-view user-id=${params.id}></profile-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <home-view></home-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-store": class AppStore extends Store.Provider<
    Model,
    Msg
  > {
    constructor() {
      super(update, init, "playpal:auth");
    }
  },
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "playpal:history", "playpal:auth");
    }
  },
  "home-view": HomeViewElement,
  "profile-view": ProfileViewElement,
  "pp-app": AppElement,
  "pp-header": HeaderElement,
  "game-instance": GameInstanceElement,
});