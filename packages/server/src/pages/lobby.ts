import { css, html } from "@calpoly/mustang/server";
import { Lobby } from "../models";
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
         import { LobbyInstanceElement } from "/scripts/lobby_instance.js";

         define({
           "game-instance": LobbyInstanceElement,
           "mu-auth": Auth.Provider,
           "lobby-instance": LobbyInstanceElement,
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
                src="${""}"
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
                  <button>Join<button/>
                </div>
              </div>
          </div>
          <div class="flex-container">
              <h3>Active Lobbies</h3>
              <div class="lobby-list">
                <a href="/lobbies/672dc18719a2f499b5095584">
                  <section class ="card">
                    <lobby-instance src="/api/lobbies/675118708f17413cc4a7342a"></lobby-instance>
                    <button/>Join<button/>
                  </section>
                </a>
              <div/>
          </div>
        </section>
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
