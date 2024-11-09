import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class GamerProfileElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

  static template = html`
    <template>
      <h2>Gamer Profile</h2>
      <section class="grid-container">
        <div class="flex-container">
          <div class="column">
            <div class="profile-container">
              <img slot="avatar" class="avatar-image" src="" alt="Avatar" />
            </div>
            <div>
              <p><strong>Name:</strong> <slot name="name">Johnson</slot></p>
              <p>
                <strong>Email:</strong>
                <slot name="email">Johnson@example.com</slot>
              </p>
              <p>
                <strong>Bio:</strong> <slot name="bio">Johnson is a goat</slot>
              </p>
              <p>
                <strong>Last Online:</strong>
                <slot name="name">lastOnline</slot>
              </p>
            </div>
          </div>
        </div>
        <div class="flex-container">
          <p><strong>Games Played Recently:</strong></p>
          <ul>
            <slot name="games">
              <li><a href="../game/apex.html">Apex Legends</a></li>
              <li><a href="../game/overwatch.html">Overwatch</a></li>
            </slot>
          </ul>
          <p><strong>Lobby List:</strong></p>
          <ul>
            <slot name="teams">
              <li><a href="../teams/lobby.html">Default Lobby</a></li>
            </slot>
          </ul>
        </div>
      </section>
    </template>
  `;

  static styles = css`
    .profile-container {
      width: 120px;
      height: auto;
    }

    .row div {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    h2 {
      text-align: center;
      color: var(--color-accent);
      padding-bottom: 20px;
      padding-top: 20px;
      margin-bottom: 20px;
    }
    strong {
      color: var(--color-accent);
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .flex-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 10px;
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    ul li {
      margin-bottom: 8px;
    }

    ul li a {
      color: var(--color-primary);
      text-decoration: none;
    }

    ul li a:hover {
      text-decoration: underline;
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(GamerProfileElement.template)
      .styles(reset.styles, GamerProfileElement.styles);
  }

  static observedAttributes = ["src"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && oldValue !== newValue && newValue)
      this.hydrate(newValue);
  }

  // connectedCallback() {
  //   if (this.src) this.hydrate(this.src);
  // }

  hydrate(url) {
    fetch(url)
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => this.renderSlots(json))
      .catch((error) => console.log(`Failed to render data ${url}:`, error));
  }

  renderSlots(json) {
    const entries = Object.entries(json);
    const toSlot = ([key, value]) => {
      if (key === "avatar") {
        const avatarImage = this.shadowRoot.querySelector(".avatar-image");
        if (avatarImage) {
          avatarImage.src = value;
          avatarImage.alt = json.name || "Avatar";
        }
        return;
      }
      switch (typeof value) {
        case "object":
          if (Array.isArray(value)) {
            return html`<ul slot="${key}">
              ${value.map(
                (attr) =>
                  html`<li>
                    <a
                      href="/${key === "games"
                        ? "games"
                        : "lobbies"}/${attr._id}"
                      >${key === "games" ? attr.title : attr.name}</a
                    >
                  </li>`
              )}
            </ul>`;
          }
          break;
        default:
          return html`<span slot="${key}">${value}</span>`;
      }
    };
    const fragment = entries.map(toSlot);

    this.replaceChildren(...fragment);
  }
}
