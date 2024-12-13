import {
  Auth, define, History, Switch,
} from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { HeaderElement } from "./components/pp-header";
import { GameInstanceElement } from "./components/game_instance";
import { HomeViewElement } from "./views/home-view";

class AppElement extends LitElement {
  static uses = define({
    "home-view": HomeViewElement
  });

  protected render() {
    return html`
      <home-view></home-view>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    HeaderElement.initializeOnce();
  }
}

const routes = [
  // {
  //   path: "/app/games/:id",
  //   view: (params: Switch.Params) => html`
  //     <tour-view tour-id=${params.id}></tour-view>
  //   `
  // },
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
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "playpal:history", "playpal:auth");
    }
  },
  "pp-app": AppElement,
  "pp-header": HeaderElement,
  "game-instance": GameInstanceElement,
});