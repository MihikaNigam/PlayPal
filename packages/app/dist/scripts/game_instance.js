import { css, html, shadow, Observer } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class GameInstanceElement extends HTMLElement {
  static template = html`
    <template>
      <div>
        <div class="image-container">
          <slot name="game-image">***Featured Slot***</slot>
        </div>
          <slot name="game-title">Default Game Title</slot>
      </div>
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
      .template(GameInstanceElement.template)
      .styles(reset.styles, GameInstanceElement.styles);
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
    const slotMap = {
      "game-title": data.title,
      "game-image": html`<img
        slot="game-image"
        src="${data.imageUrl}"
        alt="${data.title}"
      />`,
    };
    this.replaceChildren();
    Object.keys(slotMap).forEach((slotName) => {
      const slotContent = slotMap[slotName];
      const element = document.createElement("span");
      element.setAttribute("slot", slotName);
      if (typeof slotContent === "string") {
        element.textContent = slotContent;
      } else {
        element.appendChild(slotContent);
      }
      this.appendChild(element);
    });
  }
}
