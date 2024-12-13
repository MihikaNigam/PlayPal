import { LitElement, TemplateResult, css, html } from "lit";
import { Observer, Auth } from "@calpoly/mustang";
import { Game } from "server/models";
import { state } from "lit/decorators.js";

export class GameInstanceElement extends LitElement {
  @state()
  userid: string = "gamer";

  render() {
    return html`
      <div>
        <div class="image-container">
          <slot name="game-image">***Featured Slot***</slot>
        </div>
          <slot name="game-title">Default Game Title</slot>
      </div>
    `;
  }
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
  }

  get src() {
    return this.getAttribute("src");
  }


  _authObserver = new Observer<Auth.Model>(
    this,
    "playpal:auth"
  );

  _user = new Auth.User();

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
        if (this.src) this.hydrate(this.src);
      }
    });

  }


  hydrate(url: string) {
    fetch(url, { headers: Auth.headers(this._user) })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        return res.json();
      })
      .then((json) => this.renderSlots(json))
      .catch((error) => console.log("Error fetching data:", error));
  }

  renderSlots(data: Game) {
    const slotMap: Record<string, string | TemplateResult<1>> = {
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
      } else if (slotContent instanceof HTMLElement) {
        element.appendChild(slotContent);
      }
      this.appendChild(element);
    });
  }
}