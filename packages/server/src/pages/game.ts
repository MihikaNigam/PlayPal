import { css, html } from "@calpoly/mustang/server";
import { Game } from "../models";
import renderPage from "./renderPage";

export class GamePage {
  data: Game;
  constructor(data: Game) {
    this.data = data;
  }
  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: ["/styles/destination.css"],
      styles: [
        css`main.page {
            --page-grids: 8;
            @media screen and (max-width: 48rem) {
            --page-grids: 6;
            }
            }`
      ],
      scripts: [
        `import { define } from "@calpoly/mustang";
            import { GameInstanceElement } from "/scripts/game_instance.js";
            define({
                "game-instance": GameInstanceElement
            });`
      ]
    });
  }
  renderBody() {
    const {
      title,
      imageUrl,
    } = this.data;



    return html`
    <section class="grid-container">
      <div class="flex-container">
        <div>
          <h2>Games</h2>
          <game-instance href="games/672db68d8232f52a313ff9f1" src= "/api/games/672db68d8232f52a313ff9f1">
            // <a slot="game-title" href="game/apex.html">${title}</a>
            // <img
            //   slot="game-image"
            //   src=${imageUrl}
            //   alt="Apex Image"
            // />
          </game-instance>
        </div>
      </div>
    </section>
    `
  }
}
