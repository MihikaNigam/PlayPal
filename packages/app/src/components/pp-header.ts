import { LitElement, css, html } from "lit";
import {
    Auth,
    define,
    Dropdown,
    Events,
    Observer
} from "@calpoly/mustang";
import { state } from "lit/decorators.js";
import headings from "../styles/headings.css";
import reset from "../styles/reset.css";

function toggleDarkMode(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    const checked = target.checked;

    Events.relay(ev, "dark-mode", { checked });
}

function signOut(ev: MouseEvent) {
    Events.relay(ev, "auth:message", ["auth/signout"]);
}

export class HeaderElement extends LitElement {
    static uses = define({
        "mu-dropdown": Dropdown.Element
    });

    @state()
    userid: string = "gamer";

    // @state()
    // get gamer(): Gamer | undefined {
    //     return this.model.gamer;
    // }

    render() {
        return html`
      <header>
      <h1>PlayPal</h1>
      <nav>
        <p><slot> Connect with fellow gamers! </slot></p>
        <mu-dropdown>
          <a slot="actuator">
            Hello,
            <span id="userid"></span>
          </a>
          <menu class="custom-menu">
            <li>
              <label class="dark-mode-switch" @change=${toggleDarkMode}>
                <input type="checkbox" />
                Dark Mode
              </label>
            </li>
            <li class="when-signed-in">
              <a id="signout" @click=${signOut}>Sign Out</a>
            </li>
            <li class="when-signed-out">
              <a href="/login">Sign In</a>
            </li>
          </menu>
        </mu-dropdown>
      </nav>
    </header>
    `;
    }

    static styles = [
        reset.styles,
        headings.styles,
        css`
    :host {
      display: contents;
    }
    header {
      display: flex;
      flex-wrap: wrap;
      align-items: bottom;
      justify-content: space-between;
      padding: var(--size-spacing-medium);
      background-color: var(--color-background-header);
      color: var(--color-text-inverted);
      padding-left: 10px;
      padding-right: 10px;
    }
    header ~ * {
      margin: var(--size-spacing-medium);
    }
    header p {
      --color-link: var(--color-link-inverted);
    }
    nav {
      display: flex;
      flex-direction: column;
      flex-basis: max-content;
      align-items: end;
    }
    a[slot="actuator"] {
      color: var(--color-link-inverted);
      cursor: pointer;
    }
    #userid:empty::before {
      content: "gamer";
    }
    menu a {
      color: white;
      cursor: pointer;
      text-decoration: underline;
    }
    a:has(#userid:empty) ~ menu > .when-signed-in,
    a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
      display: none;
    }

    .custom-menu {
      background-color: var(--color-background-header);
      padding: 0;
      list-style: none;
      padding: 10px;
    }
  `];

    constructor() {
        super();
    }

    _authObserver = new Observer<Auth.Model>(
        this,
        "playpal:auth"
    );

    connectedCallback() {
        super.connectedCallback();

        this._authObserver.observe(({ user }) => {
            if (user && user.username !== this.userid) {
                this.userid = user.username;
            }
        });
    }

    static initializeOnce() {
        function toggleDarkMode(
            page: HTMLElement,
            checked: boolean
        ) {
            page.classList.toggle("dark-mode", checked);
        }

        document.body.addEventListener("dark-mode", (event) =>
            toggleDarkMode(
                event.currentTarget as HTMLElement,
                (event as CustomEvent).detail?.checked
            )
        );
    }
}