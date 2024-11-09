import { css, define, html, shadow, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class HeaderElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }
  static template = html`
    <template>
      <header>
        <h1>PlayPal</h1>
        <p>Connect with gamers</p>
        <label id="dark-mode-label">
          <input type="checkbox" class="dark-mode-switch" autocomplete="off" />
          Dark Mode
        </label>
      </header>
    </template>
  `;

  static styles = css`
    header {
      background-color: var(--color-background-header);
      color: var(--color-text-inverted);
      padding-left: 10px;
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(HeaderElement.template)
      .styles(reset.styles, HeaderElement.styles);

    const dm = this.shadowRoot.querySelector(".dark-mode-switch");

    if (dm) {
      dm.addEventListener("change", (event) =>
        Events.relay(event, "dark-mode", {
          checked: event.target.checked,
        })
      );
    }
  }

  connectedCallback() {
    if (this.src) this.hydrate(this.src);
  }

  static initializeOnce() {
    function toggleDarkMode(checked) {
      document.body.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event) =>
      toggleDarkMode(event.detail.checked)
    );
  }
}
