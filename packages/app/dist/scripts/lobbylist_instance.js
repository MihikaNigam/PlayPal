import { css, html, shadow, Observer, define } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import { LobbyInstanceElement } from "./lobby_instance.js";
import pagecss from "./styles/page.css.js";

export class LobbyListInstanceElement extends HTMLElement {
  static uses = define({
    "lobby-instance": LobbyInstanceElement,
  });
  static template = html`
    <template>
      <div class="lobby-list"></div>
    </template>
  `;

  static styles = css`
    .image-container {
      display: flex;
      justify-content: center;
      padding: 10px;
    }
    h2 {
      text-align: center;
      color: var(--color-accent);
    }

    svg.icon {
      display: inline;
      height: 2.6em;
      width: 2em;
      vertical-align: top;
      fill: var(--color-text-inverted);
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(LobbyListInstanceElement.template)
      .styles(reset.styles, LobbyListInstanceElement.styles, pagecss.styles);
  }

  get src() {
    return this.getAttribute("src");
  }

  get authorization() {
    if (this._user && this._user.authenticated)
      return {
        Authorization: `Bearer ${this._user.token}`,
      };
    else return {};
  }

  _authObserver = new Observer(this, "playpal:auth");
  static observedAttributes = ["src"];

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      this._user = user;
      if (this.src) this.hydrate(this.src);
    });
  }

  hydrate(url) {
    const headers = this.authorization || {};
    fetch(url, { headers: headers })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        return res.json();
      })
      .then((json) => this.renderSlots(json))
      .catch((error) => console.log("Error fetching data:", error));
  }

  renderSlots(data) {
    const lobbyListContainer = this.shadowRoot?.querySelector(".lobby-list");
    if (!lobbyListContainer) return;

    // Clear any existing content
    lobbyListContainer.innerHTML = "";

    if (!data || data.length === 0) {
      lobbyListContainer.innerHTML = `<p>No active lobbies available.</p>`;
      return;
    }

    data.forEach((lobby) => {
      const lobbyCard = html`
        <a href="/lobbies/${lobby._id}">
          <section class="card">
            <lobby-instance src="/api/lobbies/${lobby._id}"></lobby-instance>
            <button class="join-button">Join</button>
          </section>
        </a>
      `;
      // Append the lobby card to the lobby list
      lobbyListContainer.appendChild(lobbyCard);
    });
  }

  //   renderSlots(data) {
  //     data.map(
  //     `<a href="/lobbies/${}">
  //                   <section class ="card">
  //                     <lobby-instance src="/api/lobbies/672dc18719a2f499b5095584"></lobby-instance>
  //                     <button/>Join<button/>
  //                   </section>
  //                 </a>
  //                 `
  //   }

  //   renderSlots(data: any[]) {
  //     const lobbyListContainer = this.shadowRoot?.querySelector(".lobby-list");
  //     if (!lobbyListContainer) return;

  //     // Clear any existing content
  //     lobbyListContainer.innerHTML = "";

  //     if (!data || data.length === 0) {
  //       lobbyListContainer.innerHTML = `<p>No active lobbies available.</p>`;
  //       return;
  //     }

  //     // Iterate over each lobby and create card elements
  //     data.forEach((lobby: any) => {
  //       const lobbyCard = html`
  //         <a href="/lobbies/${lobby.id}">
  //           <section class="card">
  //             <lobby-instance src="/api/lobbies/${lobby.id}"></lobby-instance>
  //             <button class="join-button">Join</button>
  //           </section>
  //         </a>
  //       `;
  //       // Append the lobby card to the lobby list
  //       lobbyListContainer.appendChild(lobbyCard);
  //     });
  //   }
}
