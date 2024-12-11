import { css, html } from "@calpoly/mustang/server";
import { Gamer, Lobby } from "../models";
import renderPage from "./renderPage";

export class LobbyPage {
  data: Lobby;
  constructor(data: Lobby) {
    this.data = data;
  }
  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: ["/styles/token.css", "/styles/page.css", "/styles/game-page.css"],
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
         import { GamerInstanceElement } from "/scripts/gamer_instance.js";

         define({
           "gamer-instance": GamerInstanceElement,
           "mu-auth": Auth.Provider,
         });`
      ]
    });
  }
  renderBody() {
    const {
      _id: teamId,
      name,
      gameId,
      status,
      createdAt,
      chatLink,
      players
    } = this.data;

    const endpoint = `/games/${teamId}`;
    const apiEndpoint = `/api${endpoint}`;

    return html`
      <mu-auth provides="playpal:auth">
        <pp-header></pp-header>
        <section class="grid-container">
          <div class="flex-container">
              <h2>Lobby Info</h2>
              <img
                class="about-image"
                src="${"https://img.freepik.com/premium-vector/straw-doll-pixel-art-style_475147-1499.jpg"}"
                alt="Image of ${name}"
              />
              <div class="about-details">
                <div class="game-info">
                  Game:
                  <span>${gameId.title}</span>
                </div>
                <div class="game-info">
                  Created At:
                  <span>${new Date(createdAt ?? "").toLocaleDateString()}</span>
                </div>
                <div class="game-info">
                  <button>Join</button>
                </div>
              </div>
              <button>Chat</button>
          </div>
          <div class="flex-container">
              <h3>Members</h3>
                ${this.renderGamerList(players)}
          </div>
        </section>
      </mu-auth>
    `;
  }


  renderGamerList(players: Gamer[]) {
    console.log('platerss: ', players)
    if (players.length === 0) {
      return html`<p>No active players here.</p>`;
    }
    return html`
    <div class="gamer-list">
      ${players.map(
      (player: Gamer) => html`
        <a href="/gamers/${player._id}">
          <section class="card">
            <gamer-instance src="/api/gamers/${player._id}"></gamer-instance>
          </section>
        </a>
        `
    )}
    </div>
  `;
  }
}
