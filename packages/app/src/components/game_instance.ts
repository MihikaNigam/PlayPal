import { LitElement, css, html } from "lit";

export class GameInstanceElement extends LitElement {



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
}