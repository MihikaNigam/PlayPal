import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class GameInstanceElement extends HTMLElement {
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
}
