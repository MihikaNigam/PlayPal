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
         import { GameInstanceElement } from "/scripts/game_instance.js";
         import { LobbyListInstanceElement } from "/scripts/lobbylist_instance.js";

         define({
           "game-instance": GameInstanceElement,
           "mu-auth": Auth.Provider,
           "lobbylist-instance": LobbyListInstanceElement,
         });`
      ]
    });
  }
  renderBody() {
    const {
      _id: gameId,
      title,
      imageUrl,
      genre,
      releaseDate,
      publisher,
      description
    } = this.data;

    const endpoint = `/games/${gameId}`;
    const apiEndpoint = `/api${endpoint}`;

    return html`
      <mu-auth provides="playpal:auth">
        <pp-header></pp-header>
        <section class="grid-container">
          <div class="flex-container">
    
              <h2>About ${title}</h2>
              <img
                class="about-image"
                src="${imageUrl}"
                alt="Image of ${title}"
              />
              <div class="about-details">
                <div class="game-info">
                  Genre:
                  <span>${genre}</span>
                </div>
                <div class="game-info">
                  Release Date:
                  <span>${new Date(releaseDate).toLocaleDateString()}</span>
                </div>
                <div class="game-info">
                  Publisher:
                  <span>${publisher}</span>
                </div>
                <p>${description}</p>
              </div>
          </div>
          <div class="flex-container">
              <h3>Active Lobbies</h3>
                <lobbylist-instance src= "/api/games/get-lobbies/${gameId}"><lobbylist-instance/>
          </div>
        </section>
         <button>CREATE</button>
      </mu-auth>
    `;
  }

  // renderLobbyList() {
  //   if (this.activeLobbies.length === 0) {
  //     return html`<p>No active lobbies available.</p>`;
  //   }

  //   return html`
  //     <div class="lobby-list">
  //       ${this.activeLobbies.map(
  //     (lobby) =>
  //       html`
  //         <a href="/lobby/${lobby.id}">
  //           <section class ="card">
  //             <img src=
  //             <lobby-instance src="/api/lobbies/675118708f17413cc4a7342a"></lobby-instance>
  //             <button/>Join<button/>
  //           </section>
  //           </a>
  //           `
  //   )}
  //     </div>
  //   `;
  // }
}
