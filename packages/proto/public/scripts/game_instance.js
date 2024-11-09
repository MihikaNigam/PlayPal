import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class GameInstanceElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }
  static template = html`
    <template>
      <div>
        <h3>
          <svg class="icon">
            <use href="/icons/controller.svg#icon-globe-roller" />
          </svg>
          <slot name="game-title">Default Game Title</slot>
        </h3>
        <div class="image-container">
          <slot name="game-image">***Featured Slot***</slot>
        </div>
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

  connectedCallback() {
    if (this.src) this.hydrate(this.src);
  }

  hydrate(url) {
    fetch(url)
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
      />`
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

/*import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class GameInstanceElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }
  static template = html`
    <template>
      <div>
        <h3>
          <svg class="icon">
            <use href="/icons/controller.svg#icon-globe-roller" />
          </svg>
          <slot name="title">Default Game Title</slot>
        </h3>
        <div class="image-container">
          <slot name="imageUrl">***Featured Slot***</slot>
        </div>
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
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        return res.json();
      })
      .then((json) => this.renderSlots(json))
      .catch((error) => console.log("Error fetching data:", error));
  }

  renderSlots(json) {
    const entries = Object.entries(json);
    const toSlot = ([key, value]) => {
      if (key === "imageUrl") {
      //   return `<img
      //   slot="imageUrl"
      //   src="${json.imageUrl}"
      //   alt="${json.title}"
      // />`;
      const imageElement = this.shadowRoot.querySelector(".image-container img");
      if (imageElement) {
        imageElement.src = value;
        imageElement.alt = json.title || "Game Image";
      }
      return;
      }
      return html`<span slot="${key}">${value}</span>`;
    };
    const fragment = entries.map(toSlot);

    this.replaceChildren(...fragment);
  }
}
*/
