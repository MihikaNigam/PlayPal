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
      styles: [
        css`
          main.page {
            --page-grids: 8;
            @media screen and (max-width: 48rem) {
              --page-grids: 6;
            }
          }
        `
      ],
      scripts: [
        `import { define, Auth } from "@calpoly/mustang";
         import { GameInstanceElement } from "/scripts/game_instance.js";

         define({
           "game-instance": GameInstanceElement,
           "mu-auth": Auth.Provider,
         });`
      ]
    });
  }
  renderBody() {
    const {
      _id: gameId
    } = this.data;

    const endpoint = `/games/${gameId}`;
    const apiEndpoint = `/api${endpoint}`;

    return html`
      <mu-auth provides="playpal:auth">
        <pp-header></pp-header>
        <section class="grid-container">
          <div class="flex-container">
            <div>
              <h2>Games</h2>
              <game-instance href="${endpoint}" src="${apiEndpoint}">
              </game-instance>
            </div>
          </div>
        </section>
      </mu-auth>
    `;
  }
}
