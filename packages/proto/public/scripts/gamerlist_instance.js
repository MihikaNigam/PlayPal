import { css, html, shadow, Observer, define } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import { GamerInstanceElement } from "./gamer_instance.js";
import pagecss from "./styles/page.css.js";

export class GamerListInstanceElement extends HTMLElement {
  static uses = define({
    "gamer-instance": GamerInstanceElement,
  });
  static template = html`
    <template>
      <div class="gamer-list"></div>
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
      .template(GamerListInstanceElement.template)
      .styles(reset.styles, GamerListInstanceElement.styles, pagecss.styles);
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
    const gamerListContainer = this.shadowRoot?.querySelector(".gamer-list");
    if (!gamerListContainer) return;

    // Clear any existing content
    gamerListContainer.innerHTML = "";

    if (!data || data.length === 0) {
      gamerListContainer.innerHTML = `<p>No active gamers available.</p>`;
      return;
    }

    data.forEach((gamer) => {
      const gamerCard = html`
        <a href="/gamers/${gamer._id}">
          <section class="card">
            <gamer-instance src="/api/gamers/${gamer._id}"></gamer-instance>
          </section>
        </a>
      `;
      gamerListContainer.appendChild(gamerCard);
    });
  }
}
